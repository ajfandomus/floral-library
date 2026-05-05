import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'jdzjqd7d',
  dataset: 'production',
  apiVersion: '2026-05-02',
  useCdn: true,
  perspective: 'published',
  token: import.meta.env.VITE_SANITY_READ_TOKEN,
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source)
}