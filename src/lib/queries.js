export const categoriesQuery = `
  *[_type == "category"] | order(sortOrder asc, title asc) {
    _id,
    title,
    isVisible,
    "slug": slug.current
  }
`

export const categoryBySlugQuery = `
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    introText,
    heroImage,
    "slug": slug.current
  }
`
// export const flowersByCategoryQuery = `
//   *[_type == "flower" && category->slug.current == $categorySlug && coalesce(isVisible, true) == true] | order(title asc) {
//     _id,
//     title,
//     shortDescription,
//     mainImage,
//     features,
//     colors,
//     bloomTime,
//     "slug": slug.current,
//     "categorySlug": category->slug.current
//   }
// `
export const flowerBySlugQuery = `
  *[
    _type == "flower" &&
    slug.current == $flowerSlug &&
    category->slug.current == $categorySlug
  ][0] {
    _id,
    title,
    shortDescription,
    description,
    harvestingVaseLife,
    mainImage,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "categoryTitle": category->title
  }
`

export const featuredCategoriesQuery = `
  *[_type == "category" && coalesce(isFeatured, false) == true] | order(sortOrder asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    heroImage
  }
`
export const allFlowersQuery = `
  *[_type == "flower" && coalesce(isVisible, true) == true] | order(title asc) {
    _id,
    title,
    shortDescription,
    mainImage,
    features,
    colors,
    bloomTime,
    "slug": slug.current,
    "categorySlug": category->slug.current
  }
`

export const flowersByCategorySlugQuery = `
  *[
    _type == "flower" &&
    category->slug.current == $slug &&
    coalesce(isVisible, true) == true
  ] | order(title asc) {
    _id,
    title,
    shortDescription,
    mainImage,
    features,
    colors,
    bloomTime,
    "slug": slug.current,
    "categorySlug": category->slug.current
  }
`