export default {
  name: 'photography',
  title: 'Photography',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category Type',
      type: 'string',
      options: {
        list: [
          { title: 'Street', value: 'street' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Landscape', value: 'landscape' },
          { title: 'Commercial', value: 'commercial' },
        ],
      },
    },
    {
      name: 'mainImage',
      title: 'Main Showcase Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Primary Description',
      type: 'text',
    },
    {
      name: 'secondDescription',
      title: 'Secondary Description (for horizontal focus)',
      type: 'text',
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }
          ]
        }
      ],
    },
    {
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      validation: (Rule: any) => Rule.max(160),
    }
  ],
}
