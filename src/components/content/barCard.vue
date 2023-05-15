<template>
  <typeCard class="bar-card" title="条形图" en="bar chart">
    <svg viewBox="0 0 358 452" fill="none" xmlns="http://www.w3.org/2000/svg" class="bar">
      <path d="M0 137 C0 131.477 4.47715 127 10 127 H92 C97.5228 127 102 131.477 102 137V452H0V137Z" fill="#E0FFD9"/>
      <path d="M128 9.99999C128 4.47714 132.477 0 138 0H220C225.523 0 230 4.47715 230 10V452H128V9.99999Z" fill="#E0FFD9"/>
      <path d="M256 203C256 197.477 260.477 193 266 193H348C353.523 193 358 197.477 358 203V452H256V203Z" fill="#E0FFD9"/>
    </svg>
  </typeCard>
</template>

<script lang="ts" setup>
import typeCard from './typeCard.vue';
</script>

<style lang="less">
@import './css/bar-card.less';
</style>
