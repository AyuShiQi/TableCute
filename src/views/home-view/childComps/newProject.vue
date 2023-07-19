<template>
  <h6>快速创建</h6>
  <vi-scroll class="new-project-scroll" overlay hidden>
    <div class="new-project-content">
      <barCard></barCard>
      <pieCard></pieCard>
      <lineCard></lineCard>
      <scatterCard></scatterCard>
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
      <projectCard></projectCard>
      <projectCard></projectCard>
      <projectCard></projectCard>
      <projectCard></projectCard>
      <projectCard></projectCard>
      <projectCard></projectCard>
      <projectCard></projectCard>
      <projectCard></projectCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import barCard from '../../../components/content/barCard.vue'
import pieCard from '../../../components/content/pieCard.vue';
import lineCard from '../../../components/content/lineCard.vue';
import scatterCard from '../../../components/content/scatterCard.vue';
import projectCard from '../../../components/content/projectCard.vue'

</script>

<style lang="less">
@import './css/new-project.less';
</style>
