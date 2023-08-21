<template>
  <div class="my-project-chart-project">
    <div class="not-found-img" v-if="projectStore.chartList.length === 0">
      <img src="../img/notfound.png">
    </div>
    <project-card v-for="pro in projectStore.chartList" :info="pro"></project-card>
  </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from '@/store'
import projectCard from '@/components/content/projectCard.vue'

const projectStore = useProjectStore()
</script>

<style lang="less" scoped>
.my-project-chart-project {
  display: flex;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

.not-found-img {
    width: 100%;
    text-align: center;

    > img {
      width: 100%;
      max-width: 300px;
    }
  }
</style>
