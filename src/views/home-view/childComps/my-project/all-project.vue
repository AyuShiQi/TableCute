<template>
  <h6>最近更新</h6>
  <div class="my-project-lastest-project">
    <div class="not-found-img" v-if="projectStore.latestList.length === 0">
      <img src="../img/notfound.png">
    </div>
    <project-card v-for="pro in projectStore.latestList" :info="pro"></project-card>
  </div>
  <h6>所有项目</h6>
  <div class="not-found-img" v-if="projectStore.projectList.total === 0">
    <img src="../img/notfound.png">
  </div>
  <div class="my-project-all-project">
    <project-card v-for="pro in projectStore.projectList.list" :info="pro"></project-card>
  </div>
  <h6>回收站</h6>
  <div class="not-found-img">
    <img src="../img/notfound.png">
  </div>
</template>

<script lang="ts" setup>
import projectCard from '@/components/content/projectCard.vue'
import { useProjectStore } from '@/store';
const projectStore = useProjectStore()
</script>

<style lang="less" scoped>
  h6 {
    margin-bottom: 16px;
  }

  .not-found-img {
    width: 100%;
    text-align: center;

    > img {
      width: 100%;
      max-width: 300px;
    }
  }

  .my-project-lastest-project {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 16px;
  }

  .my-project-all-project {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 16px;
  }

  @media screen and (max-width: 700px){
  }
</style>
