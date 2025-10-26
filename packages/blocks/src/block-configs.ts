import type { BlockType } from '@site-builder/types'

export interface BlockConfig {
  type: BlockType
  name: string
  icon: string
  description: string
  category: 'layout' | 'content' | 'form'
  defaultProps: Record<string, any>
  defaultStyle?: Record<string, any>
  defaultFrame?: { x: number; y: number; width: number; height: number }
}

export const blockConfigs: Record<string, BlockConfig> = {
  Hero: {
    type: 'Hero',
    name: 'Hero Section',
    icon: '🎯',
    description: 'Hero section with title, subtitle, and CTA button',
    category: 'content',
    defaultProps: {
      title: {
        text: 'Welcome to Our Site',
        variant: 'h1'
      },
      subtitle: {
        text: 'Build amazing websites with our no-code builder'
      },
      cta: {
        label: 'Get Started',
        href: '#'
      }
    },
    defaultFrame: { x: 40, y: 40, width: 960, height: 420 }
  },
  Text: {
    type: 'Text',
    name: 'Text',
    icon: '📝',
    description: 'Rich text content',
    category: 'content',
    defaultProps: {
      content: 'Add your text here',
      variant: 'p',
      align: 'left'
    },
    defaultFrame: { x: 40, y: 40, width: 600, height: 120 }
  },
  Image: {
    type: 'Image',
    name: 'Image',
    icon: '🖼️',
    description: 'Display an image',
    category: 'content',
    defaultProps: {
      assetId: '',
      alt: 'Image',
      objectFit: 'cover'
    },
    defaultFrame: { x: 40, y: 40, width: 480, height: 320 }
  },
  Button: {
    type: 'Button',
    name: 'Button',
    icon: '🔘',
    description: 'Clickable button',
    category: 'content',
    defaultProps: {
      label: 'Button',
      href: '#',
      variant: 'primary',
      size: 'md'
    },
    defaultFrame: { x: 40, y: 40, width: 160, height: 48 }
  },
  Section: {
    type: 'Section',
    name: 'Section',
    icon: '📦',
    description: 'Container section',
    category: 'layout',
    defaultProps: {
      grid: {
        cols: 3,
        gap: 16
      }
    },
    defaultStyle: {
      padding: 'md'
    },
    defaultFrame: { x: 0, y: 0, width: 1024, height: 600 }
  }
}

export function getBlockConfig(type: string): BlockConfig | undefined {
  return blockConfigs[type]
}

export function getAllBlockConfigs(): BlockConfig[] {
  return Object.values(blockConfigs)
}

