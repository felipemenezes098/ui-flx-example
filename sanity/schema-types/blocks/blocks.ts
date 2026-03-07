import {defineType} from 'sanity'

export const blocks = defineType({
  name: 'blocks',
  title: 'UI Blocks',
  type: 'array',
  options: {
    insertMenu: {
      groups: [
        {
          name: 'content',
          title: 'Content',
          of: [
            'contentBadgeList',
            'contentCenteredText',
            'contentGridCards',
            'contentGridContentColumns',
            'contentGridMediaCards',
            'contentFocusGrid',
            'contentGridTwoColumns',
            'contentSelectRevealMedia',
            'contentTabsMedia',
            'contentGridWithMediaTop',
            'contentIconList',
            'contentTitleWithMedia',
          ],
        },
        {
          name: 'carousel',
          title: 'Carousel',
          of: ['carouselFocus', 'carouselMedia'],
        },
        {
          name: 'hero',
          title: 'Hero',
          of: ['heroBackgroundMedia', 'heroTextBadges'],
        },
        {
          name: 'showcase',
          title: 'Showcase',
          of: ['showcaseGridImageCards'],
        },
      ],
      views: [
        {
          name: 'grid',
          previewImageUrl: (schemaTypeName: string) => `/preview/blocks/${schemaTypeName}.png`,
        },
        {name: 'list'},
      ],
    },
  },
  of: [
    {type: 'contentBadgeList', title: 'Content • Badge List'},
    {type: 'carouselFocus', title: 'Carousel • Carousel Focus'},
    {type: 'carouselMedia', title: 'Carousel • Carousel Media'},
    {type: 'contentCenteredText', title: 'Content • Centered Text'},
    {type: 'contentGridCards', title: 'Content • Grid Cards'},
    {type: 'contentGridContentColumns', title: 'Content • Grid Content Columns'},
    {type: 'contentGridMediaCards', title: 'Content • Grid Media Cards'},
    {type: 'contentFocusGrid', title: 'Content • Focus Grid'},
    {type: 'contentGridTwoColumns', title: 'Content • Grid Two Columns'},
    {type: 'contentSelectRevealMedia', title: 'Content • Select Reveal Media'},
    {type: 'contentTabsMedia', title: 'Content • Tabs Media'},
    {type: 'contentGridWithMediaTop', title: 'Content • Grid With Media Top'},
    {type: 'contentIconList', title: 'Content • Icon List'},
    {type: 'contentTitleWithMedia', title: 'Content • Title With Media'},
    {type: 'heroBackgroundMedia', title: 'Hero • Background Media'},
    {type: 'heroTextBadges', title: 'Hero • Text Badges'},
    {type: 'showcaseGridImageCards', title: 'Showcase • Grid Image Cards'},
  ],
})
