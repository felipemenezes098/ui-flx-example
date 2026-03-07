import {CubeIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Pages')
    .items([
      S.listItem()
        .title('Home')
        .icon(CubeIcon)
        .child(S.document().schemaType('home').documentId('home')),
    ])
