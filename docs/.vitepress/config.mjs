import { defineConfig } from 'vitepress'
import katex from 'markdown-it-katex'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const docsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
function generateSidebar() {
  const months = fs.readdirSync(docsDir, { withFileTypes: true }).filter(d => d.isDirectory() && /^\d{4}-\d{2}$/.test(d.name)).map(d => d.name).sort().reverse()
  const years = [...new Set(months.map(m => m.slice(0,4)))].sort().reverse()
  return years.map(year => ({ text: year, collapsed: false, items: months.filter(m => m.startsWith(year)).map(month => ({ text: month, link: `/${month}/` })) }))
}
export default defineConfig({
  base: '/Arxiv-res/', cleanUrls: false, title: 'ArXiv Daily Papers', description: 'ArXiv 论文汇总，按日期分类',
  markdown: { config: md => md.use(katex) }, contentProps: { aside: true },
  themeConfig: {
    appearance: true, footer: false,
    nav: [{ text: '🔍 搜索论文', link: '/search' }],
    sidebar: [{ text: '文献总览', link: '/overview/', collapsed: false, items: generateSidebar() }],
    outline: { level: [2,3], label: '页面导航' },
    
  }
})
