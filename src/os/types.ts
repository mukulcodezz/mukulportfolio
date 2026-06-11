export type AppId =
  | 'terminal'
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'github'
  | 'feedback'
  | 'contact'
  | 'ai'

export interface WinState {
  id: AppId
  z: number
  minimized: boolean
  maximized: boolean
  pos: { x: number; y: number }
}

export interface AppMeta {
  id: AppId
  title: string
  icon: string
  label: string
  width: number
  height: number
}
