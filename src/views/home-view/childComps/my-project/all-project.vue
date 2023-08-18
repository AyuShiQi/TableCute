<template>
  <h6>最近更新</h6>
  <h6>所有项目</h6>
  <div class="my-project-all-project">
    <project-card v-for="pro in projectStore.projectList.list" :info="pro"></project-card>
  </div>
  <h6>回收站</h6>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import projectCard from '@/components/content/projectCard.vue'
import { useProjectStore, useProfileStore } from '@/store';
const projectStore = useProjectStore()
const profileStore = useProfileStore()
</script>

<style lang="less">
</style>
