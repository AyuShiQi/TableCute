<template>
  <h6>快速创建</h6>
  <vi-scroll class="new-project-scroll" overlay hidden>
    <div class="new-project-content">
      <barCard @click="createBarProject"></barCard>
      <pieCard @click="createPieProject"></pieCard>
      <lineCard @click="createLineProject"></lineCard>
      <scatterCard @click="createScatterCard"></scatterCard>
      <tableCard @click="createTableCard"></tableCard>
    </div>
  </vi-scroll>
  <h6>模板搜索</h6>
  <div class="model-search-content">
    <div class="model-search-content__top">
      <vi-input type="button" round placeholder="在线搜索最新模板" showClear class="template-search-input">
        <template v-slot:prefix>
          <vi-icon type="sousuo"></vi-icon>
        </template>
      </vi-input>
      <vi-button radius="round" color="purple" mutate class="goto-template-btn">
        去往模板中心
        <vi-icon type="fasong"></vi-icon>
      </vi-button>
    </div>
    <div class="model-search-content__label">
      <vi-tag>全部</vi-tag>
      <vi-tag>折线图</vi-tag>
      <vi-tag>条形图</vi-tag>
      <vi-tag>饼状图</vi-tag>
      <vi-tag>散点图</vi-tag>
      <vi-tag>混合图</vi-tag>
    </div>
    <div class="model-search-content__view">
      <div class="model-search-content__view-img">
        <img src="./img/notfound.png" alt="未找到">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ViToast } from 'viog-ui'

import barCard from '../../../components/content/barCard.vue'
import pieCard from '../../../components/content/pieCard.vue'
import lineCard from '../../../components/content/lineCard.vue'
import scatterCard from '../../../components/content/scatterCard.vue'
import tableCard from '../../../components/content/tableCard.vue'
// import projectCard from '../../../components/content/projectCard.vue'

import { useRouter } from 'vue-router'
import { createProj } from '@/network/tab'
import { initProjectData, initProjectOption } from '@/global/project-option'

import { useProjectStore, useProfileStore } from '@/store'
import qs from 'qs'

const projectStore = useProjectStore()
const profileStore = useProfileStore()
const router = useRouter()

function createBarProject () {
  createProject(0)
}

function createPieProject () {
  createProject(2)
  // ViToast.open('暂未开放，敬请期待', 200)
}

function createLineProject () {
  createProject(1)
  // ViToast.open('暂未开放，敬请期待', 200)
}

function createScatterCard () {
  // createProject(3)
  ViToast.open('暂未开放，敬请期待', 200)
}

function createTableCard () {
  createProject(999)
}

function createProject (type: number, path: 'table' | 'project' = 'project') {
  createProj(initProjectData(), type === 999? null : initProjectOption(type), type, profileStore.token).then(val => {
    if (val.code === 200) {
      projectStore.updateProjectList(profileStore.token).then(() => {
        // 寻找当前
        for (const pro of projectStore.projectList.list) {
          if (val.data === pro.id) {
            router.push({
              name: path,
              path: `/${path}`,
              query: {
                'project_id': pro.id,
                info: qs.stringify(pro)
              }
            })
            break
          }
        }
      })
    } else {
      alert('创建失败！')
    }
  })
}
</script>

<style lang="less">
@import './css/new-project.less';
</style>
