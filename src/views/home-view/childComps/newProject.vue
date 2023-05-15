<template>
  <h4>图表类型</h4>
  <div class="new-project-content">
    <barCard></barCard>
    <pieCard></pieCard>
    <lineCard></lineCard>
  </div>
</template>

<script lang="ts" setup>
import { } from 'vue';
import barCard from '../../../components/content/barCard.vue'
import pieCard from '../../../components/content/pieCard.vue';
import lineCard from '../../../components/content/lineCard.vue';

</script>

<style lang="less">
@import './css/new-project.less';
</style>
