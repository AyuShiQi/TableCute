<template>
<div class="project-view__content__size-control">
  <svg
  class="size-control__delete"
  viewBox="0 0 20 20"
  stroke-width="2"
  @click="deleteSize">
    <path d="M0 10 L20 10"></path>
  </svg>
  <vi-dropdown>
    <div class="size-control__data">{{ modelValue }}%</div>
    <template v-slot:content>
      <ul class="size-control__data-list">
        <li v-for="item in sizeList" @click="handleClick(item)">
            {{ item }}%
        </li>
      </ul>
    </template>
  </vi-dropdown>
  <svg
  class="size-control__add"
  viewBox="0 0 20 20"
  stroke-width="2"
  @click="addSize">
    <path d="M0 10 L20 10 M10 0 L10 20"></path>
  </svg> 
</div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Number,
    default: 100
  }
})

const sizeList = [
  500,
  400,
  300,
  200,
  100,
  50
]

function handleClick (id: number) {
  emit('update:modelValue', id)
}

function addSize () {
  emit('update:modelValue', Math.min(500, props.modelValue + 10))
}

function deleteSize () {
  emit('update:modelValue', Math.max(30, props.modelValue - 10))
}
</script>

<style lang="less" scoped>
    .project-view__content__size-control {
      display: flex;
      position: absolute;
      top: 8px;
      left: 8px;
      background-color: #fff;
      width: 200px;
      height: 40px;
      border-radius: 5px;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      gap: 8px;

      .size-control__delete,
      .size-control__add {
        width: 20px;
        stroke: var(--vi-link-color);
        cursor: pointer;
      }

      .size-control__data {
        display: flex;
        width: 100px;
        height: 30px;
        background-color: var(--vi-background-color);
        border-radius: 5px;
        align-items: center;
        justify-content: center;
      }

      .size-control__data-list {
        width: 100%;
        padding: var(--vi-card-padding);
        background-color: var(--vi-background-color-solid);
        box-shadow: inset 0 0 0 1px var(--vi-background-color-deep);
        box-sizing: border-box;
        border-radius: 5px;
        
        >li {
          color: var(--vi-link-color);
          width: 100%;
          list-style: none;
          padding: 4px 0;
          text-align: center;

          &:hover {
            color: var(--vi-purple-color1)
          }
        }
      }
    }
</style>