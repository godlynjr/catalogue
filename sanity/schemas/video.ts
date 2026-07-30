export default {
  name: 'video',
  title: 'Video',
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
      name: 'videoType',
      title: 'Video Category',
      type: 'string',
      options: {
        list: [
          { title: 'Commercial', value: 'commercial' },
          { title: '360° Experience', value: '360' },
          { title: 'Short Film', value: 'short' },
          { title: 'Music Video', value: 'music' },
        ],
      },
    },
  ],
}
