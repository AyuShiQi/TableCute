<template>
  <div class="type-card">
    <div class="type-card__mask"></div>
    <div class="type-card__content">
      <div class="type-card__content__animate">
        <slot></slot>
      </div>
      <div class="type-card__content__text">
        <h6>{{ title }}</h6>
        <p>{{ en }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps({
  title: String,
  en: String
})
</script>

<style lang="less">
@import './css/type-card.less';
</style>