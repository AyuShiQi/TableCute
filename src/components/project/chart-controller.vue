<template>
  <vi-collapse-group>
    <!-- 标题 -->
    <vi-collapse title="标题">
      <vi-form>
        <vi-form-item label="标题">
          <vi-input v-model="option.title.content" placeholder="在此设置标题" type="button"></vi-input>
        </vi-form-item>
        <vi-form-item label="字体颜色">
          <vi-color-select v-model="option.title.color"></vi-color-select>
        </vi-form-item>
        <vi-form-item label="字体大小">
          <vi-input v-model="option.title.size" placeholder="字体大小" type="button" number>
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
        <vi-form-item label="对齐">
          <vi-select v-model="option.title.align" type="button">
            <vi-option value="top-left">左上</vi-option>
            <vi-option value="top-center">中上</vi-option>
            <vi-option value="top-right">右上</vi-option>
            <vi-option value="bottom-left">左下</vi-option>
            <vi-option value="bottom-center">中下</vi-option>
            <vi-option value="bottom-right">右下</vi-option>
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
          <vi-color-select v-model="option.axis.x.color"></vi-color-select>
        </vi-form-item>
        <vi-form-item label="x轴标签">
          <vi-switch v-model="option.axis.x.label"></vi-switch>
        </vi-form-item>
        <vi-form-item label="标签大小">
          <vi-input v-model="option.axis.x.labelSize" placeholder="字体大小" type="button" number>
            <template v-slot:suffix>
              px
            </template>
          </vi-input>
        </vi-form-item>
        <vi-form-item label="标签颜色">
          <vi-color-select v-model="option.axis.x.labelColor"></vi-color-select>
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
          <vi-color-select v-model="option.axis.y.color"></vi-color-select>
        </vi-form-item>
        <vi-form-item label="y轴标签">
          <vi-switch v-model="option.axis.y.label"></vi-switch>
        </vi-form-item>
        <vi-form-item label="标签大小">
          <vi-input v-model="option.axis.y.labelSize" placeholder="字体大小" type="button" number>
            <template v-slot:suffix>
              px
            </template>
          </vi-input>
        </vi-form-item>
        <vi-form-item label="标签颜色">
          <vi-color-select v-model="option.axis.y.labelColor"></vi-color-select>
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
    <!-- 提示数据 -->
    <vi-collapse title="提示数据">
      <vi-form-item label="数据显示">
        <vi-switch v-model="option.attention.open"></vi-switch>
      </vi-form-item>
      <vi-form-item label="字体大小">
        <vi-input v-model="option.attention.size" type="button" placeholder="在此填写数据字体尺寸" number>
          <template v-slot:suffix>
            px
          </template>
        </vi-input>
      </vi-form-item>
      <vi-form-item label="字体样式">
        <vi-select v-model="option.attention.font" type="button">
          <vi-option value="serif"></vi-option>
        </vi-select>
      </vi-form-item>
      <vi-form-item label="x轴颜色">
        <vi-color-select v-model="option.attention.color"></vi-color-select>
      </vi-form-item>
    </vi-collapse>
    <!-- 标签 -->
    <vi-collapse title="标签">
      <vi-form>
        <vi-form-item label="显示标签">
          <vi-switch v-model="option.label.open"></vi-switch>
        </vi-form-item>
        <vi-form-item label="标签颜色">
          <vi-color-select v-model="option.label.color"></vi-color-select>
        </vi-form-item>
        <vi-form-item label="标签大小">
          <vi-input v-model="option.label.size" placeholder="字体大小" type="button" number>
            <template v-slot:suffix>
              px
            </template>
          </vi-input>
        </vi-form-item>
        <vi-form-item label="字体样式">
          <vi-select v-model="option.label.font" type="button">
            <vi-option value="serif"></vi-option>
          </vi-select>
        </vi-form-item>
        <vi-form-item label="对齐">
          <vi-select v-model="option.label.align" type="button">
            <vi-option value="top">靠上</vi-option>
            <vi-option value="bottom">靠下</vi-option>
          </vi-select>
        </vi-form-item>
      </vi-form>
    </vi-collapse>
    <!-- 附加信息 -->
    <vi-collapse title="附加信息">
      <vi-form>
        <vi-form-item label="单位">
          <vi-input v-model="option.info.unit" type="button"></vi-input>
        </vi-form-item>
        <vi-form-item label="单位颜色">
          <vi-color-select v-model="option.info.unitColor"></vi-color-select>
        </vi-form-item>
        <vi-form-item label="单位对齐">
          <vi-select v-model="option.info.unitAlign" type="button">
            <vi-option value="left">靠左</vi-option>
            <vi-option value="right">靠右</vi-option>
          </vi-select>
        </vi-form-item>
        <vi-form-item label="来源">
          <vi-input v-model="option.info.source" type="button"></vi-input>
        </vi-form-item>
        <vi-form-item label="来源颜色">
          <vi-color-select v-model="option.info.soureColor"></vi-color-select>
        </vi-form-item>
        <vi-form-item label="来源对齐">
          <vi-select v-model="option.info.sourceAlign" type="button">
            <vi-option value="left">靠左</vi-option>
            <vi-option value="right">靠右</vi-option>
          </vi-select>
        </vi-form-item>
      </vi-form>
    </vi-collapse>
  </vi-collapse-group>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const props = defineProps([
  'option',
  'project'
])
</script>

<style lang="less" scoped>
  .vi-collapse-type-default {
    border-top: none;
  }
</style>