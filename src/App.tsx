import { defineComponent } from 'vue'
import './App.less'

export default defineComponent({
  name: 'App',
  setup(props, ctx) {
    return () => (
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <router-link to="/login">
          <a target="_blank">
            <img src="/src/assets/logo.png" class="logo vue" alt="Vue logo" />
          </a>
        </router-link>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    )
  },
})
