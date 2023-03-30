import { defineComponent } from "vue"

export default defineComponent({
  name: 'HomeView',
  setup(props, context) {
    const name = 'ysq'

    return () => (
      <div class="ok">
        home view
        <div>{name}</div>
      </div>
    )
  }
})
