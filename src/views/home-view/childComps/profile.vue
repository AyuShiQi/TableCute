<template>
  <div class="home-profile-view">
    <h5>账户信息</h5>
    <h6>账号密码</h6>
    <div class="profile-base">
      <div class="profile-base__username">
        <p>
          <span class="profile__title">
            账号: 
          </span>{{ profileStore.userName }}
        </p>
      </div>
      <div class="profile__password">
        <p class="profile__title">密码</p>
        <div class="password-change">
          <!-- 密码修改区 -->
          <vi-form v-if="needPassword" @submit="changPasswordSubmit">
            <template v-slot="{ submit }">
              <vi-form-item>
                <vi-input placeholder="请输入旧密码" v-model="oldPassword" :maxlength="16" name="oldpassword"></vi-input>
              </vi-form-item>
              <vi-form-item :rules="passwordRegisterRules">
                <vi-input placeholder="请输入新密码" v-model="newPassword" :maxlength="16" name="newpassword"></vi-input>
              </vi-form-item>
              <vi-button
              class="password-change-btn"
              color="green"
              @click="submit">保存</vi-button>
            </template>
          </vi-form>
          <p v-else class="password-change__default">您可以在此修改密码</p>
          <vi-button
          @click="needPassword = !needPassword">
            {{ needPassword ? '取消' : '修改密码'}}
          </vi-button>
        </div>
      </div>
    </div>
    <vi-divider></vi-divider>
    <h6>用户名</h6>
    <!-- 用户名修改区 -->
    <div class="profile-nickname">
      <vi-form v-if="needNickname" @submit="changeNicknameSubmit">
            <template v-slot="{ submit }">
              <vi-form-item :rules="[
                {
                  rule: /./,
                  info: '昵称应由1~20位字符组成'
                }
              ]">
                <vi-input placeholder="请输入新的昵称" v-model="nickname" :maxlength="20" name="nickname"></vi-input>
              </vi-form-item>
              <vi-button
              class="nickname-change-btn"
              color="green"
              @click="submit">保存</vi-button>
            </template>
          </vi-form>
      <p v-else>{{ profileStore.nickName ?? '暂无昵称' }}</p>
      <vi-button @click="needNickname = !needNickname">
        {{ needNickname ? '取消' : '修改昵称'}}
      </vi-button>
    </div>
    <vi-divider></vi-divider>
    <h6>用户头像</h6>
    <vi-upload class="profile-avater">
      <vi-upload-choose photo imgsrc="/src/assets/imgs/default-img.png"></vi-upload-choose>
    </vi-upload>
    <vi-divider></vi-divider>
    <h6>手机号码</h6>
    <div class="profile-mobile">
    </div>
    <vi-divider></vi-divider>
    <h6>电子邮箱</h6>
    <div class="profile-nickname">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ViMessage } from 'viog-ui'
// 全局状态仓库
import { useProfileStore } from '@/store'
// 表单匹配规则
import { passwordRegisterRules } from '@/regs/user';
// 网络接口
import { changePassword, updateInfo } from '@/network/user'
const profileStore = useProfileStore()

// 密码修改区
const needPassword = ref(false)
const oldPassword = ref('')
const newPassword = ref('')

function changPasswordSubmit (formMap: any, res: boolean, option: any) {
  if (!res) return
  console.log(res, profileStore.token)
  changePassword(oldPassword.value, newPassword.value, profileStore.token).then(val => {
    console.log(val)
    if (val.code === 200) {
      ViMessage.append('密码修改成功！', 2000)
      needPassword.value = false
      oldPassword.value = ''
      newPassword.value = ''
    } else {
      const feedbackMap = new Map<string, string>()
      if (val.message === '旧密码输入错误') {
        feedbackMap.set('oldpassword', val.message)
      }
      option.getSubmitFeedback(feedbackMap)
    }
  }).catch(err => {
    ViMessage.append('响应超时，请重试！', 2000)
  })
}

// 昵称修改区
const needNickname = ref(false)
const nickname = ref('')

function changeNicknameSubmit (formMap: any, res: boolean, option: any) {
  updateInfo(profileStore.token, {
    'nickname': nickname.value
  }).then(val => {
    console.log(val)
    if (val.code === 200) {
      profileStore.nickName = nickname.value
      nickname.value = ''
      ViMessage.append('昵称修改成功！', 2000)
      needNickname.value = false
    } else {
      const feedbackMap = new Map<string, string>()
      feedbackMap.set('nickname', '非法昵称')
      option.getSubmitFeedback(feedbackMap)
    }
  }).catch(err => {
    ViMessage.append('响应超时，请重试！', 2000)
  })
}

// 头像修改区

</script>

<style lang="less">
@import './css/profile.less';
</style>