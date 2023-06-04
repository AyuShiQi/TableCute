import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: {
    preprocessorOptions: {
        less: {
            modifyVars: {
                hack: `true; @import (reference) "${path.resolve("src/assets/css/base.less")}";`,
            },
            javascriptEnabled: true,
        },
    },
  },
  server: {
    // 跨域配置
    proxy: {
      '/register': {
          target: 'http://182.43.52.124:7137', // 代理接口地址。实际请求接口地址会是：https://api.mz-moe.cn/api/xxx/xxx
          changeOrigin: true, // 默认false，是否需要改变原始主机头为目标URL
          ws: true, // 是否代理websockets
          // pathRewrite: {
          //   '^/api': '', // 重写请求。实际接口中并没有 /api，所以需要替换为空 ''
          // },
      }
    }
  }
})
