// Core Entities
export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Workspace {
  id: string
  name: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  workspaceId: string
  name: string
  domain?: string
  published?: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Page {
  id: string
  projectId: string
  name: string
  slug: string
  tree: PageTree
  isTemplate: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Revision {
  id: string
  pageId: string
  tree: PageTree
  createdAt: Date
}

export interface Asset {
  id: string
  workspaceId: string
  filename: string
  url: string
  type: string
  size: number
  createdAt: Date
}

// Page Tree Schema
export type Breakpoint = 'lg' | 'md' | 'sm'

export interface GridArea {
  [key in Breakpoint]?: string
}

// Geometry
export interface Frame {
  x: number
  y: number
  width: number
  height: number
}

export interface BaseBlock {
  id: string
  type: string
  gridArea?: GridArea
  props: Record<string, any>
  style?: Record<string, any>
  frame: Frame
  zIndex: number
}

export interface SectionBlock extends BaseBlock {
  type: 'Section'
  grid: {
    cols: number
    gap: number
  }
  children: BaseBlock[]
}

export type PageTreeBlock = BaseBlock | SectionBlock

export interface PageTree {
  version: number
  meta: {
    breakpoints: Breakpoint[]
  }
  body: PageTreeBlock[]
}

// Editor State
export interface EditorState {
  tree: PageTree
  selectedId: string | null
  selectedBlockIds?: string[]
  hoveredBlockId?: string | null
  interactionMode?: 'idle' | 'drag' | 'resize' | 'marquee'
  history: Patch[]
  future: Patch[]
  breakpoint: Breakpoint
}

export interface Patch {
  op: string
  path: string
  value?: any
  oldValue?: any
}

// Block Types
export type BlockType = 
  | 'Section'
  | 'Hero'
  | 'Text'
  | 'Image'
  | 'Gallery'
  | 'Button'
  | 'Form'
  | 'Footer'
  | 'Header'

export interface BlockProps {
  [key: string]: any
}

// Publishing
export interface Publish {
  id: string
  projectId: string
  status: 'pending' | 'building' | 'success' | 'failed'
  url?: string
  createdAt: Date
  completedAt?: Date
}

