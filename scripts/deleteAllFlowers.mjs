// import "dotenv/config";
// import { createClient } from "@sanity/client";

// const sanity = createClient({
//   projectId: process.env.VITE_SANITY_PROJECT_ID,
//   dataset: process.env.VITE_SANITY_DATASET || "production",
//   apiVersion: process.env.VITE_SANITY_API_VERSION || "2025-01-01",
//   token: process.env.SANITY_WRITE_TOKEN,
//   useCdn: false,
// });

// async function main() {
//   const flowers = await sanity.fetch(`*[_type == "flower"]{ _id }`);

//   console.log(`Found ${flowers.length} flowers.`);

//   for (const flower of flowers) {
//     console.log(`Deleting ${flower._id}`);
//     await sanity.delete(flower._id);
//   }

//   console.log("All flowers deleted.");
// }

// main().catch(console.error);