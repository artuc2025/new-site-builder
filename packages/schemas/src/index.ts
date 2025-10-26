import { z } from 'zod'

export const BreakpointSchema = z.enum(['lg', 'md', 'sm'])

export const GridAreaSchema = z.record(
  BreakpointSchema,
  z.string()
).optional()

export const BaseBlockSchema = z.object({
  id: z.string(),
  type: z.string(),
  gridArea: GridAreaSchema,
  props: z.record(z.any()),
  style: z.record(z.any()).optional()
})

export const SectionBlockSchema = BaseBlockSchema.extend({
  type: z.literal('Section'),
  grid: z.object({
    cols: z.number(),
    gap: z.number()
  }),
  children: z.array(BaseBlockSchema)
})

export const PageTreeBlockSchema = z.union([
  BaseBlockSchema,
  SectionBlockSchema
])

export const PageTreeSchema = z.object({
  version: z.number(),
  meta: z.object({
    breakpoints: z.array(BreakpointSchema)
  }),
  body: z.array(PageTreeBlockSchema)
})

// Block prop schemas
export const HeroPropsSchema = z.object({
  title: z.object({
    text: z.string(),
    variant: z.enum(['h1', 'h2', 'h3'])
  }),
  subtitle: z.object({
    text: z.string()
  }),
  cta: z.object({
    label: z.string(),
    href: z.string()
  }),
  image: z.object({
    assetId: z.string()
  }).optional(),
  background: z.object({
    color: z.string().optional(),
    image: z.string().optional()
  }).optional()
})

export const TextPropsSchema = z.object({
  content: z.string(),
  variant: z.enum(['h1', 'h2', 'h3', 'p', 'span']).optional(),
  align: z.enum(['left', 'center', 'right', 'justify']).optional()
})

export const ImagePropsSchema = z.object({
  assetId: z.string(),
  alt: z.string(),
  objectFit: z.enum(['contain', 'cover', 'fill', 'none', 'scale-down']).optional()
})

export const ButtonPropsSchema = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'secondary', 'outline']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional()
})

