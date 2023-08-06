<template>
  <vi-collapse-group>
    <!-- 标题 -->
    <vi-collapse title="标题">
      <vi-form class="">
        <vi-form-item label="标题">
          <vi-input v-model="option.title.content" placeholder="在此设置标题" type="button"></vi-input>
        </vi-form-item>
        <vi-form-item label="字体大小">
          <vi-input v-model="titleSize" placeholder="字体大小" type="button">
            <template v-slot:suffix>
              px
            </template>
          </vi-input>
        </vi-form-item>
        <vi-form-item label="字体样式">
          <vi-select v-model="option.title.font" type="button">
            <vi-option value="serif"></vi-option>
          </vi-select>
        </vi-form-item>
      </vi-form>
    </vi-collapse>
    <!-- 坐标系 -->
    <vi-collapse title="坐标系">
      <vi-form>
        <vi-form-item label="最小间距">
          <vi-input v-model="option.unitGap" placeholder="输入y轴单位最小间距" type="button">
            <template v-slot:suffix>
              px
            </template>
          </vi-input>
        </vi-form-item>
        <vi-divider style="margin-bottom: 16px;"/>
        <vi-form-item label="x轴样式">
          <vi-select v-model="option.axis.x.type" placeholder="" type="button">
            <vi-option value="none">无</vi-option>
            <vi-option value="line">实线</vi-option>
            <vi-option value="arrow">箭头线</vi-option>
          </vi-select>
        </vi-form-item>        
        <vi-form-item label="x轴颜色">
          <vi-select v-model="option.axis.x.color" type="button">
            <vi-option value="#000">黑色</vi-option>
            <vi-option value="#666">灰色</vi-option>
            <vi-option value="#aaa">浅灰色</vi-option>
            <vi-option value="blue">蓝色</vi-option>
            <vi-option value="pink">粉色</vi-option>
          </vi-select>
        </vi-form-item>
        <vi-form-item label="x轴标签">
          <vi-switch v-model="option.axis.x.label"></vi-switch>
        </vi-form-item>
        <vi-form-item label="标签大小">
          <vi-input v-model="xlabelSize" placeholder="字体大小" type="button">
            <template v-slot:suffix>
              px
            </template>
          </vi-input>
        </vi-form-item>
        <vi-form-item label="标签颜色">
          <vi-select v-model="option.axis.x.labelColor" type="button">
            <vi-option value="#000">黑色</vi-option>
            <vi-option value="#666">灰色</vi-option>
            <vi-option value="#aaa">浅灰色</vi-option>
            <vi-option value="blue">蓝色</vi-option>
            <vi-option value="pink">粉色</vi-option>
          </vi-select>
        </vi-form-item>
        <vi-form-item label="标签字样">
          <!-- 暂未添加字体样式 -->
          <vi-select type="button">
            <vi-option value="serif"></vi-option>
          </vi-select>
        </vi-form-item>
        <vi-form-item label="x轴标线">
          <vi-select v-model="option.axis.x.line" type="button">
            <vi-option value="none">无</vi-option>
            <vi-option value="line">实线</vi-option>
            <vi-option value="dashed">虚线</vi-option>
          </vi-select>
        </vi-form-item>
        <vi-divider style="margin-bottom: 16px;"/>
        <vi-form-item label="y轴样式">
          <vi-select v-model="option.axis.y.type" type="button">
            <vi-option value="none">无</vi-option>
            <vi-option value="line">实线</vi-option>
            <vi-option value="arrow">箭头线</vi-option>
          </vi-select>
        </vi-form-item>        
        <vi-form-item label="y轴颜色">
          <vi-select v-model="option.axis.y.color" type="button">
            <vi-option value="#000">黑色</vi-option>
            <vi-option value="#666">灰色</vi-option>
            <vi-option value="#aaa">浅灰色</vi-option>
            <vi-option value="blue">蓝色</vi-option>
            <vi-option value="pink">粉色</vi-option>
          </vi-select>
        </vi-form-item>
        <vi-form-item label="y轴标签">
          <vi-switch v-model="option.axis.y.label"></vi-switch>
        </vi-form-item>
        <vi-form-item label="标签大小">
          <vi-input v-model="ylabelSize" placeholder="字体大小" type="button">
            <template v-slot:suffix>
              px
            </template>
          </vi-input>
        </vi-form-item>
        <vi-form-item label="标签颜色">
          <vi-select v-model="option.axis.y.labelColor" type="button">
            <vi-option value="#000">黑色</vi-option>
            <vi-option value="#666">灰色</vi-option>
            <vi-option value="#aaa">浅灰色</vi-option>
            <vi-option value="blue">蓝色</vi-option>
            <vi-option value="pink">粉色</vi-option>
          </vi-select>
        </vi-form-item>
        <vi-form-item label="标签字样">
          <!-- 暂未添加字体样式 -->
          <vi-select type="button">
            <vi-option value="serif"></vi-option>
          </vi-select>
        </vi-form-item>
        <vi-form-item label="y轴标线">
          <vi-select v-model="option.axis.y.line" type="button">
            <vi-option value="none">无</vi-option>
            <vi-option value="line">实线</vi-option>
            <vi-option value="dashed">虚线</vi-option>
          </vi-select>
        </vi-form-item>
      </vi-form>
    </vi-collapse>
    <vi-collapse title="颜色"></vi-collapse>
    <vi-collapse title="标签"></vi-collapse>
    <vi-collapse title="附加信息"></vi-collapse>
    <vi-collapse title="边框"></vi-collapse>
  </vi-collapse-group>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const props = defineProps([
  'option',
  'project'
])

const titleSize = ref(props.option.title.size)
const xlabelSize = ref(props.option.axis.x.labelSize)
const ylabelSize = ref(props.option.axis.y.labelSize)

watch(titleSize, () => {
  props.option.title.size = Number(titleSize.value)
})

watch(xlabelSize, () => {
  props.option.axis.x.labelSize = Number(xlabelSize.value)
})

watch(ylabelSize, () => {
  props.option.axis.y.labelSize = Number(ylabelSize.value)
})
</script>

<style lang="less" scoped>
  .vi-collapse-type-default {
    border-top: none;
  }
</style>