import { defineComponent, KeepAlive } from 'vue'

export default defineComponent({
  name: 'App',
  setup(props, ctx) {
    return () => (
      <router-view>
        {/* <keep-alive>
        </keep-alive> */}
      </router-view>
    )
  },
})
