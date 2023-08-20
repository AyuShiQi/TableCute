<template>
  <div class="project-header">
    <div class="project-header__project-name">
      <vi-input
      size="big"
      type="button"
      class="project-name__input"
      placeholder="未命名项目"
      v-model="option.projectTitle"></vi-input>
    </div>
    <div class="project-header__option">
      <vi-button class="project-header__option-item">
        <vi-icon type="fenxiang"/>
      </vi-button>
      <vi-button color="purple" @click="toSave">下载</vi-button>
      <vi-button color="green" @click="toUpdate">保存</vi-button>
      <p class="project-header__attention">{{ nowTime }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { time } from 'echarts';
import { computed } from 'vue'
  const emit = defineEmits(['update', 'save'])

  const props = defineProps([
    'option',
    'project'
  ])

  function toUpdate () {
    emit('update')
  }

  function toSave () {
    emit('save')
  }

  const nowTime = computed(() => {
    const { updateTime, createTime } = props.project
    console.log(props.project)
    const date = new Date(updateTime)
    const time = `${date.getHours()} : ${date.getMinutes()}`
    if (updateTime === createTime) {
      return `创建于 ${time}`
    } else {
      return `已保存 ${time}`
    }
  })
</script>

<style lang="less">
  .project-header {
    // --vi-green-color3: #cbffe6;
    display: flex;
    width: 100%;
    height: 64px;
    padding: 0 16px;
    background: linear-gradient(to right, #95e6bf, #849afe, #af85cb);
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    .project-header__project-name {
      width: 20%;
      .project-name__input {
        --vi-input-width: 100%;
        --vi-background-color: transparent;
        --vi-background-color-deep: #ffffff2d;

        .vi-input__origin {
          color: rgb(255, 255, 255);
          font-weight: 600;

          &::placeholder {
            color: #ffffffa4;
          }
        }
      }

      p {
        display: block;
        padding: var(--vi-card-padding);
        border-radius: var(--vi-card-radius);

        &:hover {
          background-color: #ffffff27;
        }
      }
    }

    .project-header__option {
      display: flex;
      align-items: center;
      gap: 8px;

      .project-header__option-item {
        background-color: transparent;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        border-radius: 5px;
        padding: .4em;
        .vi-icon {
          font-weight: 600;
          font-size: 24px;
        }

        &:hover {
          background-color: #ffffff2d;
        }
      }
    }

    .project-header__attention {
      font-size: 14px;
      color: #ffffff8f;
    }
  }


  @media screen and (max-width: 700px){
    .project-header {
      .project-header__project-name {
        width: 20%;
        .project-name__input {
          --vi-input-width: 100%;
          --vi-background-color: transparent;
          --vi-background-color-deep: #ffffff2d;

          .vi-input__origin {
            font-size: 16px;

            &::placeholder {
              font-size: 16px;
              color: #ffffffa4;
            }
          }
        }
      }

      .project-header__attention {
        font-size: 12px;
      }
    }
  }
</style>