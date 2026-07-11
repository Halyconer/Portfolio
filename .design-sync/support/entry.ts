// design-sync bundle entry: this app repo has no library barrel, so this file
// enumerates the synced components explicitly (mirrors componentSrcMap in
// ../config.json — keep the two in step when adding components).
export { Hero } from '../../src/components/editorial/Hero'
export { Masthead } from '../../src/components/editorial/Masthead'
export { Colophon } from '../../src/components/editorial/Colophon'
export { Demos } from '../../src/components/editorial/Demos'
export { LightDemo } from '../../src/components/editorial/LightDemo'
export { Connect4Inline } from '../../src/components/editorial/Connect4Inline'
export { Projects } from '../../src/components/editorial/Projects'
// ProjectsIndex.tsx exports a function also named `Projects` — alias it.
export { Projects as ProjectsIndex } from '../../src/components/editorial/ProjectsIndex'
export { ResumePDF } from '../../src/components/editorial/ResumePDF'
export { MetaField } from '../../src/components/editorial/MetaField'
export { SectionEyebrow } from '../../src/components/editorial/SectionEyebrow'
export { StatusDot } from '../../src/components/editorial/StatusDot'
export { CreativeHero } from '../../src/components/creative/CreativeHero'
export { CreativeFooter } from '../../src/components/creative/CreativeFooter'
export { FeaturedPlate } from '../../src/components/creative/FeaturedPlate'
export { Lightbox } from '../../src/components/creative/Lightbox'
export { PhotoSection } from '../../src/components/creative/PhotoSection'
export { PhotoTile } from '../../src/components/creative/PhotoTile'
export { PreviewRouter } from './preview-router'
