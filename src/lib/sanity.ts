import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '1ggen9wb',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-24',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function fetchPhotographyCategories() {
  return await client.fetch(`*[_type == "photography"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    description,
    category,
    images,
    mainImage,
    heroImage,
    editorialLayout
  }`)
}

export async function fetchCategoryBySlug(slug: string) {
  return await client.fetch(`*[_type == "photography" && slug.current == $slug][0] {
    title,
    description,
    mainImage,
    heroImage,
    editorialLayout[] {
      ...,
      _type == "gridBlock" => {
        "images": images[].asset->url
      },
      _type == "horizontalBlock" => {
        "image": image.asset->url
      },
      _type == "dualBlock" => {
        "leftImage": leftImage.asset->url,
        "rightImage": rightImage.asset->url
      },
      _type == "galleryBlock" => {
        "images": images[].asset->url
      }
    },
    images,
    seoDescription
  }`, { slug })
}

export async function fetchVideos() {
  return await client.fetch(`*[_type == "video"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    videoType,
    "videoUrl": videoFile.asset->url,
    streamingUrl,
    "thumbnail": thumbnail.asset->url,
    description
  }`)
}

export async function fetchDesignProjects() {
  return await client.fetch(`*[_type == "design"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    description,
    mainImage,
    editorialLayout[] {
      ...,
      _type == "gridBlock" => {
        "images": images[].asset->url
      },
      _type == "horizontalBlock" => {
        "image": image.asset->url
      },
      _type == "dualBlock" => {
        "leftImage": leftImage.asset->url,
        "rightImage": rightImage.asset->url
      },
      _type == "galleryBlock" => {
        "images": images[].asset->url
      }
    }
  }`)
}

export async function fetchDesignBySlug(slug: string) {
  return await client.fetch(`*[_type == "design" && slug.current == $slug][0] {
    title,
    description,
    mainImage,
    editorialLayout[] {
      ...,
      _type == "gridBlock" => {
        "images": images[].asset->url
      },
      _type == "horizontalBlock" => {
        "image": image.asset->url
      },
      _type == "dualBlock" => {
        "leftImage": leftImage.asset->url,
        "rightImage": rightImage.asset->url
      },
      _type == "galleryBlock" => {
        "images": images[].asset->url
      }
    },
    seoDescription
  }`, { slug })
}
