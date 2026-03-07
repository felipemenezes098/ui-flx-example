import { Blocks } from "@/sanity.types";

import { Carousel, Content, Hero, Showcase } from ".";

type BlockTypeMap = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in Blocks[number]["_type"]]: React.ComponentType<any>;
};

export const blockRegistry: BlockTypeMap = {
  contentBadgeList: Content.BadgeList,
  carouselFocus: Carousel.CarouselFocus,
  carouselMedia: Carousel.CarouselMedia,
  contentCenteredText: Content.CenteredText,
  contentGridCards: Content.GridCards,
  contentGridContentColumns: Content.GridContentColumns,
  contentGridMediaCards: Content.GridMediaCards,
  contentFocusGrid: Content.FocusGrid,
  contentGridTwoColumns: Content.GridTwoColumns,
  contentSelectRevealMedia: Content.SelectRevealMedia,
  contentTabsMedia: Content.TabsMedia,
  contentGridWithMediaTop: Content.GridWithMediaTop,
  contentIconList: Content.IconList,
  contentTitleWithMedia: Content.TitleWithMedia,
  heroBackgroundMedia: Hero.BackgroundMedia,
  heroTextBadges: Hero.TextBadges,
  showcaseGridImageCards: Showcase.GridImageCards,
};

export type BlockType = keyof typeof blockRegistry;
