import type { BlockType } from './index'

export interface HeroProps {
  title: {
    text: string
    variant: 'h1' | 'h2' | 'h3'
  }
  subtitle: {
    text: string
  }
  cta: {
    label: string
    href: string
  }
  image?: {
    assetId: string
  }
  background?: {
    color?: string
    image?: string
  }
}

export interface TextProps {
  content: string
  variant?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  align?: 'left' | 'center' | 'right' | 'justify'
}

export interface ImageProps {
  assetId: string
  alt: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

export interface GalleryProps {
  images: Array<{
    assetId: string
    alt?: string
  }>
  columns: number
  gap: number
}

export interface ButtonProps {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export interface FormProps {
  title: string
  fields: Array<{
    type: 'text' | 'email' | 'textarea'
    name: string
    label: string
    required: boolean
  }>
  submitLabel: string
  endpoint: string
}

export interface HeaderProps {
  logo?: {
    assetId: string
  }
  links: Array<{
    label: string
    href: string
  }>
}

export interface FooterProps {
  copyright: string
  links?: Array<{
    label: string
    href: string
  }>
}

export interface SectionProps {
  background?: {
    color?: string
    image?: string
  }
  padding?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export type BlockPropsMap = {
  Hero: HeroProps
  Text: TextProps
  Image: ImageProps
  Gallery: GalleryProps
  Button: ButtonProps
  Form: FormProps
  Header: HeaderProps
  Footer: FooterProps
  Section: SectionProps
}

