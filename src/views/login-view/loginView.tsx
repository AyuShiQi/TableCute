import { defineComponent } from "vue"

export default defineComponent({
  name: 'LoginView',
  setup(props, context) {
    const name = 'ysq'

    return () => (
      <div class="ok">
        login view
        <div>{name}</div>
      </div>
    )
  }
})
