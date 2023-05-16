<template>
  <typeCard class="line-card" title="折线图" en="line chart">
    <svg viewBox="0 0 397 341" fill="none" xmlns="http://www.w3.org/2000/svg" class="line">
    <path d="M12 198 L105 328.5 L209.5 231.5 L278.5 278.5 L384.5 193.5" stroke="#FFE4F6" stroke-width="10" stroke-linecap="round"/>
    <circle cx="105.5" cy="328.5" r="12.5" fill="white"/>
    <circle cx="209.5" cy="231.5" r="12.5" fill="white"/>
    <circle cx="278.5" cy="278.5" r="12.5" fill="white"/>
    <circle cx="384.5" cy="193.5" r="12.5" fill="white"/>
    <path d="M12 140 L113.5 168.5 L209.5 143.5 L278.5 224.5 L363.5 12.5" stroke="#FFE4F6" stroke-width="10" stroke-linecap="round"/>
    <circle cx="113.5" cy="168.5" r="12.5" fill="white"/>
    <circle cx="209.5" cy="143.5" r="12.5" fill="white"/>
    <circle cx="278.5" cy="224.5" r="12.5" fill="white"/>
    <circle cx="363.5" cy="12.5" r="12.5" fill="white"/>
    </svg>
  </typeCard>
</template>

<script lang="ts" setup>
import typeCard from './typeCard.vue';
</script>

<style lang="less">
@import './css/line-card.less';
</style>
