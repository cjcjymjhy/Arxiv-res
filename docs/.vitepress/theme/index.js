import DefaultTheme from 'vitepress/theme'
import './custom.css'
import SearchPage from './SearchPage.vue'
import HomeOverview from '../components/HomeOverview.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    // 注册搜索页面组件
    app.component('SearchPage', SearchPage)
    app.component('HomeOverview', HomeOverview)

    if (typeof document !== 'undefined') {
      
      // 创建顶部视图切换按钮
      const toggleBtn = document.createElement('button')
      toggleBtn.className = 'sidebar-toggle'
      toggleBtn.innerHTML = '切换视图'
      
      let isFullWidth = false
      
      const toggleView = () => {
        isFullWidth = !isFullWidth
        if (isFullWidth) {
          document.body.classList.add('full-width')
          document.body.classList.remove('sidebar-visible')
          toggleBtn.innerHTML = '◀ 显示侧栏'
        } else {
          document.body.classList.remove('full-width')
          document.body.classList.add('sidebar-visible')
          toggleBtn.innerHTML = '📖 切换视图'
        }
      }
      
      toggleBtn.addEventListener('click', toggleView)

      // Theme lamp: keeps VitePress appearance state, replaces the visible switch.
      const lampBtn = document.createElement('button')
      lampBtn.className = 'theme-lamp'
      lampBtn.type = 'button'
      lampBtn.setAttribute('aria-label', '切换深浅色模式')
      lampBtn.innerHTML = `
        <span class="theme-lamp__beam" aria-hidden="true"></span>
        <svg class="theme-lamp__svg" viewBox="0 0 128 196" aria-hidden="true" focusable="false">
          <g class="theme-lamp__head">
            <path class="theme-lamp__shade" d="M42 50 L86 50 L97 82 H31 Z" />
            <path class="theme-lamp__rim" d="M31 82 C47 86 81 86 97 82" />
          </g>
          <path class="theme-lamp__accent theme-lamp__arm" d="M64 82 C63 101 63 120 63 145" />
          <path class="theme-lamp__accent theme-lamp__arm" d="M63 145 C63 156 63 167 63 176" />
          <path class="theme-lamp__base-fill" d="M45 176 C50 167 56 163 63 163 C70 163 76 167 81 176 Z" />
          <path class="theme-lamp__accent" d="M45 176 C50 167 56 163 63 163 C70 163 76 167 81 176 Z" />
        </svg>
      `

      const toggleAppearance = () => {
        lampBtn.classList.remove('is-pulled')
        void lampBtn.offsetWidth
        lampBtn.classList.add('is-pulled')

        const nativeSwitch = document.querySelector('.VPSwitchAppearance button, button.VPSwitchAppearance, .VPSwitchAppearance')
        if (nativeSwitch) {
          nativeSwitch.click()
          return
        }

        const root = document.documentElement
        const nextTheme = root.classList.contains('dark') ? 'light' : 'dark'
        root.classList.toggle('dark', nextTheme === 'dark')
        localStorage.setItem('vitepress-theme-appearance', nextTheme)
      }

      lampBtn.addEventListener('click', toggleAppearance)
      
      // 初始化页面控件
      const initPage = () => {
        const navEnd = document.querySelector('.VPNavBarAppearance')?.parentElement
        if (navEnd) {
          navEnd.insertBefore(toggleBtn, navEnd.firstChild)
        } else if (!document.body.contains(toggleBtn)) {
          document.body.appendChild(toggleBtn)
        }
        if (!document.body.contains(lampBtn)) {
          document.body.appendChild(lampBtn)
        }
        document.body.classList.add('sidebar-visible')
      }

      // 延迟一次初始化，确保页面 DOM 已就绪
      initPage()
      setTimeout(initPage, 100)
    }
  }
}
