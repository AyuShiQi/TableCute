<template>
  <div>欢迎来到制作界面</div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { getToken } from '@/global/local-storage-option';
  import { useProfileStore } from './store';
  const profileStore = useProfileStore()

  onMounted(() => {
    profileStore.getProfile(getToken() as string)
  }) 
</script>

<style lang="less">
</style>