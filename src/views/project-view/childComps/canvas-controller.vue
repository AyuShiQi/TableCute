<template>
  <vi-collapse-group accordion>
    <vi-collapse title="画布大小">
      <div class="canvas-size-content">
        <vi-input type="button" v-model="option.width">
          <template v-slot:prefix>
            长
          </template>
          <template v-slot:suffix>
            px
          </template>
        </vi-input>
        X
        <vi-input type="button" v-model="option.height">
          <template v-slot:prefix>
            宽
          </template>
          <template v-slot:suffix>
            px
          </template>
        </vi-input>
      </div>
    </vi-collapse>
    <vi-collapse title="画布颜色">
      <vi-color-select v-model="option.background"></vi-color-select>
    </vi-collapse>
    <vi-collapse title="项目名称">
      <div class="canvas-title-content">
        <vi-input
        type="button"
        placeholder="未命名项目"
        v-model="option.projectTitle">
        </vi-input>
      </div>
    </vi-collapse>
    <vi-collapse title="项目属性"></vi-collapse>
    <vi-collapse title="修改列表"></vi-collapse>
  </vi-collapse-group>
</template>

<script lang="ts" setup>
defineProps([
  'option',
  'project'
])
</script>

<style lang="less" scoped>
  .vi-collapse-type-default {
    border-top: none;
  }

  .canvas-size-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    --vi-form-label-width: auto;
    --vi-input-width: 40%;
  }
</style>