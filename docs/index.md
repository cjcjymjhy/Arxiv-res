---
layout: home

hero:
  name: "ArXiv Daily Papers"
  tagline: 自动爬取和整理 arXiv 最新论文，每日更新
  actions:
    - theme: brand
      text: 开始浏览
      link: /overview/

features:
  - icon: 🗓️
    title: 每日自动更新
    details: 每天北京时间中午 8:00 自动爬取最新论文，确保你不会错过任何重要研究。
  - icon: 🏷️
    title: 分类管理
    details: 按 arXiv 分类进行整理，包括 cs.AR、cs.DC、cs.NI、cs.OS、cs.PF 等多个方向。
  - icon: 📊
    title: 数据丰富
    details: 包含标题、作者、摘要和 PDF 链接，一站式获取论文全部信息。
  - icon: 🔎
    title: 快速搜索
    details: 内置本地搜索功能，输入关键词即可在所有论文中快速定位相关内容。
  - icon: 🗂️
    title: 按日期归档
    details: 按年月归档，方便查找和回顾历史论文，结构清晰明了。
  - icon: 🚀
    title: 快速部署
    details: 使用 VitePress 构建，加载速度快，支持暗色模式。
---

<!--
网站结构：
- /：本站首页（本文件）
- /search：论文搜索页，读取 public/search-index.json
- /YYYY-MM/：按月归档目录
- /YYYY-MM/YYYY-MM-DD：每日论文列表
- scripts/fetch_arxiv.py：抓取 arXiv 并生成每日 Markdown
- scripts/build-search-index.mjs：从每日 Markdown 构建搜索索引
- config/arxiv_config.yaml：抓取分类、关键词和输出配置
-->

<style>
.VPHero .name { background: linear-gradient(135deg, #101017, #18161b); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.dark .VPHero .name { background: none; color: #ffffff; -webkit-text-fill-color: #ffffff; }
.VPHero .text { color: var(--vp-c-text-1); }
.VPFeature .icon { font-size: 28px !important; }
.VPFeature:hover { border-color: var(--vp-c-brand-1) !important; }
</style>
