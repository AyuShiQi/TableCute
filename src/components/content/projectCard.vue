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
      <div class="project-card__img-ok">
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
              <li>编辑</li>
              <li @click="open = true">删除</li>
              <li>分享</li>
              <li>创建模板</li>
              <li>详情信息</li>
            </ul>
          </template>
        </vi-dropdown>
      <p class="project-card__title-ok">
        项目{{ info.id }}
      </p>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { deleteProj } from '@/network/tab'
import { useProfileStore, useProjectStore } from '@/store'
import { ViMessage } from 'viog-ui'

const profileStore = useProfileStore()
const projectStore = useProjectStore()

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
</script>

<style lang="less">
@import './css/project-card.less';
</style>