<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
const papers=ref([])
const updateDate=ref('暂无')
onMounted(async()=>{document.body.classList.add('overview-route'); const base=import.meta.env.BASE_URL; const [r,u]=await Promise.all([fetch(`${base}search-index.json`),fetch(`${base}last_update.yml`)]); if(r.ok){const data=await r.json(); papers.value=data.papers||[]} if(u.ok){const text=await u.text(); const match=text.match(/last_update_date:\s*(.+)/); if(match) updateDate.value=match[1].trim()}})
onUnmounted(()=>document.body.classList.remove('overview-route'))
const descriptions={
  'cs.LG':'机器学习、深度学习、神经网络与表示学习相关文献。',
  'cs.AI':'人工智能、智能体、推理、规划与通用智能方法相关文献。',
  'stat.ML':'统计学习、概率建模、推断与机器学习交叉方向文献。',
  'cs.NE':'神经网络、进化计算、神经形态计算与结构搜索相关文献。',
  'physics.ao-ph':'大气、海洋、气候与环境物理相关文献。',
  'physics.geo-ph':'地球物理、地表过程、地震与地球内部相关文献。',
  'eess.SP':'信号处理、语音、图像与时频分析相关文献。',
  'eess.EN':'环境工程、能源系统与可持续技术相关文献。'
}
const categories=computed(()=>{const m={}; papers.value.forEach(p=>{const key=(p.category||'未分类').split(' - ')[0];m[key]=(m[key]||0)+1}); return Object.entries(m).sort((a,b)=>b[1]-a[1])})
const latest=computed(()=>updateDate.value)
</script>
<template>
<div class="overview-page"><h1>文献总览</h1><p>按学科分类汇总当前抓取结果，先看全局，再进入具体归档。</p><div class="cards"><div>📚 文献总数<strong>{{papers.length}}</strong></div><div>🏷️ 学科分类<strong>{{categories.length}} 个</strong></div><div>🕘 数据截止更新<strong>{{latest}}</strong></div></div><table><thead><tr><th>分类名称</th><th>文献数量</th><th>文献类型说明</th></tr></thead><tbody><tr v-for="([name,count]) in categories" :key="name"><td>{{name}}</td><td>{{count}}</td><td>{{descriptions[name]||'按 ArXiv 学科分类整理的相关研究文献。'}}</td></tr></tbody></table></div>
</template>
<style scoped>.overview-page{max-width:900px;margin:0 auto;padding:32px 24px}.overview-page h1{font-size:42px;margin:0 0 14px}.overview-page>p{font-size:18px;margin:0 0 24px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:24px 0}.cards>div{padding:18px;background:#f8f9fa;border:1px solid #e5e7eb;border-radius:12px;font-size:16px}.cards strong{display:block;font-size:24px;margin-top:10px}table{width:100%;border-collapse:collapse;font-size:16px}th,td{padding:12px 16px;border:1px solid #e0e2e5;text-align:left}th{background:#f7f7f8}@media(max-width:900px){.cards{grid-template-columns:1fr}}</style>
