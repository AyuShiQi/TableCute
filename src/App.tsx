import { defineComponent } from 'vue'
import './App.less'

export default defineComponent({
  name: 'App',
  setup(props, ctx) {
    return () => (
      <div id="app">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    )
  },
})
