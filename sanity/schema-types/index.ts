import {homeType} from './pages/home-type'
import {blocks} from './blocks/blocks'
import {carouselBlocks} from './blocks/carousel'
import {contentBlocks} from './blocks/content'
import {heroBlocks} from './blocks/hero'
import {showcaseBlocks} from './blocks/showcase'
import {cta} from './objects'

export const schemaTypes = [homeType, blocks, cta, ...carouselBlocks, ...contentBlocks, ...heroBlocks, ...showcaseBlocks]
