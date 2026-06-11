import type { AppMeta } from './types'

export const APPS: AppMeta[] = [
  { id: 'terminal',   title: 'terminal — mukul@portfolio', icon: '>_', label: 'terminal',       width: 640, height: 440 },
  { id: 'about',      title: 'about.txt — editor',         icon: '📄', label: 'about.txt',      width: 560, height: 460 },
  { id: 'projects',   title: '~/projects — file explorer', icon: '📁', label: 'projects',       width: 760, height: 540 },
  { id: 'skills',     title: 'skills.sys — monitor',       icon: '📊', label: 'skills.sys',     width: 620, height: 520 },
  { id: 'experience', title: 'experience.log — git',       icon: '🗂', label: 'experience.log', width: 640, height: 480 },
  { id: 'github',     title: 'github — activity feed',     icon: '🟩', label: 'github',         width: 780, height: 380 },
  { id: 'feedback',   title: 'feedback/ — logs',           icon: '💬', label: 'feedback',       width: 560, height: 420 },
  { id: 'contact',    title: 'ssh mukul@hire-me',          icon: '📡', label: 'hire_me',        width: 560, height: 560 },
  { id: 'ai',         title: 'MUKUL.AI v1.0',              icon: '🤖', label: 'mukul.ai',       width: 460, height: 540 },
]

export const getApp = (id: string) => APPS.find((a) => a.id === id)
