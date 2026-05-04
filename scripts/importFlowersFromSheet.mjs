import "dotenv/config";
import { createClient } from "@sanity/client";
import { google } from "googleapis";

const DRY_RUN = process.argv.includes("--dry-run");

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || "Flowers_Master";
const SERVICE_ACCOUNT_FILE = process.env.GOOGLE_SERVICE_ACCOUNT_FILE;

const sanity = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET || "production",
  apiVersion: process.env.VITE_SANITY_API_VERSION || "2025-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

function clean(value) {
  return String(value || "").trim();
}

function slugify(value) {
  return clean(value)
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toNumber(value) {
  const num = Number(clean(value));
  return Number.isFinite(num) ? num : undefined;
}
function toArray(value) {
  return clean(value)
    .split(/[;,]/)
    .map((item) => clean(item))
    .filter(Boolean);
}
async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

async function main() {
  if (!SHEET_ID) throw new Error("GOOGLE_SHEET_ID missing in .env");
  if (!SERVICE_ACCOUNT_FILE) throw new Error("GOOGLE_SERVICE_ACCOUNT_FILE missing in .env");
  if (!process.env.SANITY_WRITE_TOKEN) throw new Error("SANITY_WRITE_TOKEN missing in .env");

  const sheets = await getSheetsClient();

  console.log("Reading Google Sheet...");

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:Q`,
  });

  const values = response.data.values || [];
  const headers = values[0];
  const rows = values.slice(1);

  if (!headers?.length) throw new Error("No headers found in sheet");

  const col = {};
  headers.forEach((header, index) => {
    col[clean(header)] = index;
  });

  console.log(`Found ${rows.length} rows in sheet.`);

  const categories = await sanity.fetch(`
    *[_type == "category"]{
      _id,
      "slug": slug.current
    }
  `);

  const categoryMap = new Map(categories.map((cat) => [cat.slug, cat._id]));

  let processed = 0;
  let skipped = 0;
  let failed = 0;

  const updates = [];

  for (let i = 0; i < rows.length; i++) {
    const rowNumber = i + 2;
    const row = rows[i];

    const action = clean(row[col.action]).toLowerCase();

    if (!action) {
      skipped++;
      continue;
    }

    if (action === "skip") {
      skipped++;
      updates.push({
        range: `${SHEET_NAME}!B${rowNumber}`,
        values: [["draft"]],
      });
      updates.push({
        range: `${SHEET_NAME}!N${rowNumber}`,
        values: [[`Skipped at ${new Date().toLocaleString()}`]],
      });
      continue;
    }

    const title = clean(row[col.title]);
    const rawDocumentId = clean(row[col.documentId]);
    const documentSlug = slugify(rawDocumentId.replace(/^flower\./, ""));
    const documentId = `flower.${documentSlug}`;
    const slug = slugify(row[col.slug] || title);
    const categorySlug = slugify(row[col.categorySlug]);

    try {
      if (!["create", "update", "delete"].includes(action)) {
        throw new Error(`Invalid action "${action}"`);
      }

      if (!title) throw new Error("Missing title");
      if (!documentSlug) throw new Error("Missing documentId");
      if (!slug) throw new Error("Missing slug");
      if (!categorySlug) throw new Error("Missing categorySlug");
      if (!categoryMap.has(categorySlug)) {
        throw new Error(`Category "${categorySlug}" not found in Sanity`);
      }

      if (action === "delete") {
        console.log(`Row ${rowNumber}: hiding ${documentId}`);

        if (!DRY_RUN) {
          await sanity.patch(documentId).set({ isVisible: false }).commit();
        }

        updates.push({
          range: `${SHEET_NAME}!A${rowNumber}`,
          values: [[""]],
        });
        updates.push({
          range: `${SHEET_NAME}!B${rowNumber}`,
          values: [["draft"]],
        });
        updates.push({
          range: `${SHEET_NAME}!N${rowNumber}`,
          values: [[`Hidden successfully at ${new Date().toLocaleString()}`]],
        });

        processed++;
        continue;
      }

      const categoryId = categoryMap.get(categorySlug);

      const fieldsToSet = {
        _type: "flower",
        title,
        slug: {
          _type: "slug",
          current: slug,
        },
        category: {
          _type: "reference",
          _ref: categoryId,
        },
        shortDescription: clean(row[col.shortDescription]),
        description: clean(row[col.description]),
        harvestingVaseLife: clean(row[col.harvestingVaseLife]),
        features: toArray(row[col.features]),
colors: toArray(row[col.colors]),
bloomTime: toArray(row[col.bloomTime]),
        sortOrder: toNumber(row[col.sortOrder]),
        isVisible: true,
        seoTitle: clean(row[col.seoTitle]),
        seoDescription: clean(row[col.seoDescription]),
      };

      Object.keys(fieldsToSet).forEach((key) => {
        if (fieldsToSet[key] === undefined) delete fieldsToSet[key];
      });

      console.log(`Row ${rowNumber}: ${action} ${documentId} - ${title}`);

      if (!DRY_RUN) {
        await sanity.createIfNotExists({
          _id: documentId,
          _type: "flower",
        });

        await sanity.patch(documentId).set(fieldsToSet).commit();
      }

      updates.push({
        range: `${SHEET_NAME}!A${rowNumber}`,
        values: [[""]],
      });
      updates.push({
        range: `${SHEET_NAME}!B${rowNumber}`,
        values: [["published"]],
      });
      updates.push({
        range: `${SHEET_NAME}!N${rowNumber}`,
        values: [[`${action} success at ${new Date().toLocaleString()}`]],
      });

      processed++;
    } catch (error) {
      failed++;
      console.log(`Row ${rowNumber}: failed - ${error.message}`);

      updates.push({
        range: `${SHEET_NAME}!N${rowNumber}`,
        values: [[`ERROR: ${error.message}`]],
      });
    }
  }

  if (!DRY_RUN && updates.length > 0) {
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        valueInputOption: "USER_ENTERED",
        data: updates,
      },
    });
  }

  console.log("\nImport finished.");
  console.log(`Processed: ${processed}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);

  if (DRY_RUN) {
    console.log("\nDry run only. No Sanity or Sheet data was changed.");
  }
}

main().catch((error) => {
  console.error("Import failed:", error.message);
  process.exit(1);
});