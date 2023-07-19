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
    <vi-upload class="profile-avater" accept="image/*">
      <vi-upload-choose photo imgsrc="https://s1.ax1x.com/2023/07/19/pC7Gi0s.png"></vi-upload-choose>
      <vi-upload-choose>
        <vi-button>修改头像</vi-button>
      </vi-upload-choose>
    </vi-upload>
    <vi-divider></vi-divider>
    <!-- 手机号码修改区 -->
    <h6>手机号码</h6>
    <div class="profile-mobile">
      <vi-form
      class="mobile-change"
      v-if="needMobile"
      @submit="changeMobileSubmit">
        <template v-slot="{ submit, getSubmitFeedback }">
          <vi-form-item :rules="telephoneRules">
            <vi-input
            placeholder="请输入新的电话号码"
            v-model="mobile"
            :maxlength="20"
            number
            name="mobile"></vi-input>
          </vi-form-item>
          <vi-form-item class="mobile-change__sms" :rules="smscodeRules">
            <vi-input
            class="mobile-change__sms__input"
            placeholder="请输入验证码"
            v-model="mobileSMSCode"
            :maxlength="6"
            number
            name="smscode"></vi-input>
            <vi-button type="transparent" @click="getMobileSMSCode(getSubmitFeedback)">获取验证码</vi-button>
          </vi-form-item>
          <vi-button
          class="mobile-change-btn"
          color="green"
          @click="submit">保存</vi-button>
        </template>
      </vi-form>      
      <p v-else>{{ profileStore.mobile ?? '暂未绑定手机号' }}</p>
      <vi-button @click="needMobile = !needMobile">{{ needMobile ? '取消' :profileStore.mobile ? '修改手机号' : '绑定手机号'}}</vi-button>
    </div>
    <vi-divider></vi-divider>
    <!-- 电子邮箱修改区 -->
    <h6>电子邮箱</h6>
    <div class="profile-email">
      <vi-form
      class="email-change"
      v-if="needEmail"
      @submit="changeEmailSubmit">
        <template v-slot="{ submit, getSubmitFeedback }">
          <vi-form-item :rules="emailRules">
            <vi-input
            placeholder="请输入邮箱"
            v-model="email"
            name="email"></vi-input>
          </vi-form-item>
          <vi-form-item class="email-change__sms" :rules="smscodeRules">
            <vi-input
            class="email-change__sms__input"
            placeholder="请输入验证码"
            v-model="emailSMSCode"
            :maxlength="6"
            number
            name="smscode"></vi-input>
            <vi-button type="transparent" @click="getEmailSMSCode(getSubmitFeedback)">获取验证码</vi-button>
          </vi-form-item>
          <vi-button
          class="email-change-btn"
          color="green"
          @click="submit">保存</vi-button>
        </template>
      </vi-form>      
      <p v-else>{{ profileStore.email ?? '暂未绑定邮箱' }}</p>
      <vi-button @click="needEmail = !needEmail">{{ needEmail ? '取消' :profileStore.email ? '修改邮箱' : '绑定邮箱'}}</vi-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ViMessage } from 'viog-ui'
// 全局状态仓库
import { useProfileStore } from '@/store'
// 表单匹配规则
import { passwordRegisterRules, telephoneReg, smscodeRules, telephoneRules, emailRules, emailReg } from '@/regs/user';
// 网络接口
import { changePassword, updateInfo, getLPhoneAddSMS, getLPhoneUpdateSMS, changeMobile, bindMobile, bindEmail, addEmail } from '@/network/user'
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
// 手机号区
const needMobile = ref(false)
const mobile = ref('')
const mobileSMSCode = ref('')
function changeMobileSubmit (formMap: any, res: boolean, option: any) {
  if (!res) return
  if (profileStore.mobile) {
    changeMobile(profileStore.token, profileStore.mobile, mobileSMSCode.value, mobile.value).then(val => {
      if (val.message === '验证码错误或者已经过期') {
        const feedbackMap = new Map<string, string>()
        feedbackMap.set('smscode', val.message)
        option.getSubmitFeedback(feedbackMap)
      } else {
        ViMessage.append('手机号绑定成功', 2000)
        profileStore.mobile = mobile.value
        mobile.value = ''
        mobileSMSCode.value = ''
        needMobile.value = false
      }
    })
  } else {
    bindMobile(profileStore.token, mobile.value, mobileSMSCode.value).then(val => {
      if (val.message === '验证码错误或过期') {
        const feedbackMap = new Map<string, string>()
        feedbackMap.set('smscode', val.message)
        option.getSubmitFeedback(feedbackMap)
      } else {
        ViMessage.append('手机号绑定成功', 2000)
        profileStore.mobile = mobile.value
        mobile.value = ''
        mobileSMSCode.value = ''
        needMobile.value = false
      }
    })
  }
}

function getMobileSMSCode (getSubmitFeedback: any) {
  const feedbackMap = new Map<string, string>()
  if (telephoneReg.test(mobile.value)) {
    getSubmitFeedback(feedbackMap)
    if (profileStore.mobile) {
      getLPhoneUpdateSMS(profileStore.token, mobile.value).then(val => {
        ViMessage.append('绑定手机验证码已发送', 2000)
      }).catch(err => {
        ViMessage.append('响应超时，请重试！', 2000)
      })
    } else {
      getLPhoneAddSMS(profileStore.token, mobile.value).then(val => {
        ViMessage.append('绑定手机验证码已发送', 2000)
      }).catch(err => {
        ViMessage.append('响应超时，请重试！', 2000)
      })
    }
  // 返回feedback
  } else {
    feedbackMap.set('mobile', '请输入有效的电话号码')
    getSubmitFeedback(feedbackMap)
  }
}

// 电子邮箱区
const needEmail = ref(false)
const email = ref('')
const emailSMSCode = ref('')
function changeEmailSubmit (formMap: any, res: boolean, option: any) {
  if (!res) return
  bindEmail(profileStore.token, email.value, emailSMSCode.value).then(val => {
    if (val.message === '验证码错误') {
      const feedbackMap = new Map<string, string>()
      feedbackMap.set('smscode', val.message)
      option.getSubmitFeedback(feedbackMap)
    } else {
      ViMessage.append('邮箱绑定成功', 2000)
      profileStore.email = email.value
      email.value = ''
      emailSMSCode.value = ''
      needEmail.value = false
    }
  })
}

function getEmailSMSCode (getSubmitFeedback: any) {
  const feedbackMap = new Map<string, string>()
  if (emailReg.test(email.value)) {
    getSubmitFeedback(feedbackMap)
    addEmail(profileStore.token, email.value).then(val => {
      ViMessage.append('绑定邮箱验证码已发送', 2000)
    }).catch(err => {
      ViMessage.append('响应超时，请重试！', 2000)
    })
  // 返回feedback
  } else {
    feedbackMap.set('email', '请输入有效的邮箱')
    getSubmitFeedback(feedbackMap)
  }
}
</script>

<style lang="less">
@import './css/profile.less';
</style>