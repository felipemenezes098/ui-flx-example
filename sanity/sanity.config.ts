import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schema-types'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'ui-blocks',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [structureTool({structure}), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
