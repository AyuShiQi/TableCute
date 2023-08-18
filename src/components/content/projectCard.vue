<template>
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
      <p class="project-card__title-ok">
        项目{{ info.id }}
      </p>
    </template>
  </div>
</template>

<script lang="ts" setup>
defineProps({
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
</script>

<style lang="less">
@import './css/project-card.less';
</style>