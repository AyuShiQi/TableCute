<template>
  <vi-dialog v-model="open" title="删除提示" @sure="handleDelete">
    您确定要删除项目{{ info.id }}吗
  </vi-dialog>
  <div class="project-card">
    <template v-if="updating">
      <vi-skeleton class="project-card__img" animate></vi-skeleton>
      <vi-skeleton class="project-card__title" animate></vi-skeleton>
      <vi-skeleton class="project-card__desc" animate></vi-skeleton>
    </template>
    <template v-else>
      <div class="project-card__img-ok" @click="handleCardClick">
        <img src="./img/project-default.png" alt="项目图片">
      </div>
      <vi-dropdown class="project-card__img-ok__option">
          <svg viewBox="0 0 30 20">
            <circle cx="9" cy="10" r="2" fill="#fff"></circle>
            <circle cx="15" cy="10" r="2" fill="#fff"></circle>
            <circle cx="21" cy="10" r="2" fill="#fff"></circle>
          </svg>
          <template v-slot:content>
            <ul class="project-card__img-ok__option-list">
              <li @click="handleCardClick">编辑</li>
              <li @click="open = true">删除</li>
              <li>分享</li>
              <li>创建模板</li>
              <li>详情信息</li>
            </ul>
          </template>
        </vi-dropdown>
      <div class="project-card__title-ok">
        <vi-input v-model="info.json2.projectTitle" placeholder="未命名项目" @change="handleChange">
          <template v-slot:suffix>
            <svg xmlns="http://www.w3.org/2000/svg" class="project-card__title-ok__icon" viewBox="0 0 1024 1024" version="1.1">
              <path d="M503.466667 170.666667l243.2 243.2-328.533334 328.533333H174.933333v-243.2L503.466667 170.666667zM256 529.066667v128h128l234.666667-243.2-115.2-119.466667L256 529.066667z m-85.333333 256h128v85.333333H170.666667v-85.333333z m170.666666 0h213.333334v85.333333H341.333333v-85.333333z m256 0h256v85.333333h-256v-85.333333z"/>
            </svg>
          </template>
        </vi-input>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { deleteProj, updateProj } from '@/network/tab'
import { useProfileStore, useProjectStore } from '@/store'
import { ViMessage } from 'viog-ui'
import { useRouter } from 'vue-router'

const profileStore = useProfileStore()
const projectStore = useProjectStore()

const router = useRouter()

const props = defineProps({
  updating: {
    type: Boolean,
    default: false
  },
  info: {
    type: Object,
    default: {
      id: 0
    }
  }
})

const open = ref(false)


function handleDelete () {
  deleteProj(props.info.id, profileStore.token).then(val => {
    if (val.code === 200) {
      projectStore.updateProjectList(profileStore.token)
    } else {
      ViMessage.append('删除失败，请重试', 1000)
    }
  })
}

/**
 * 标题变化
 */
function handleChange () {
  updateProj(props.info.id, props.info.json1, props.info.json2, profileStore.token)
}

function handleCardClick () {
  router.push({
    path: '/project',
    query: {
      'project_id': props.info.id
    }
  })
}
</script>

<style lang="less">
@import './css/project-card.less';
</style>