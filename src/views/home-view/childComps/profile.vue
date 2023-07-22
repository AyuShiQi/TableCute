<template>
  <div class="home-profile-view">
    <h5>账户信息</h5>
    <h6>账号密码</h6>
    <div class="profile-base" v-if="profileStore.hasAccount">
      <div class="profile-base__username">
        <p class="profile__title">账号</p>
        <p class="profile-content">
          {{ profileStore.userName }}
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
    <!-- 账号绑定区 -->
    <div class="profile-account" v-else>
      <vi-form v-if="needAccount" @submit="bindAccountSubmit">
        <template v-slot="{ submit }">
          <vi-form-item :rules="usernameRegisterRules">
            <vi-input placeholder="请输入账号" v-model="username" :maxlength="10" name="username"></vi-input>
          </vi-form-item>
          <vi-form-item :rules="passwordRegisterRules">
            <vi-input placeholder="请输入密码" v-model="password" :maxlength="16" name="password"></vi-input>
          </vi-form-item>
          <vi-button
          class="account-change-btn"
          color="green"
          @click="submit">保存</vi-button>
        </template>
      </vi-form>
      <p v-else>您还没有绑定账号和密码</p>
      <vi-button
      class="password-change-btn"
      @click="needAccount = !needAccount">{{ needAccount ? '取消' : '添加绑定'}}</vi-button>
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
      <p v-else class="p-profile-default">{{ profileStore.nickName ?? '暂无昵称' }}</p>
      <vi-button @click="needNickname = !needNickname">
        {{ needNickname ? '取消' : '修改昵称'}}
      </vi-button>
    </div>
    <vi-divider></vi-divider>
    <h6>用户头像</h6>
    <vi-upload class="profile-avater" accept="image/*">
      <vi-upload-choose photo :imgsrc="profileStore.avater"></vi-upload-choose>
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
    <vi-button color="red" class="delete-account-btn" @click="dropAccount">注销账户</vi-button>
  </div>
</template>

<script lang="ts" setup>
// 表单匹配规则
import {
  usernameRegisterRules,
  passwordRegisterRules,
  smscodeRules,
  telephoneRules,
  emailRules
} from '@/regs/user';
import profileState from './hooks/profile-state'

const {
  profileStore,
  // 账号绑定区
  needAccount,
  username,
  password,
  bindAccountSubmit,
  // 账号密码修改区
  needPassword,
  oldPassword,
  newPassword,
  changPasswordSubmit,
  // 昵称修改区
  needNickname,
  nickname,
  changeNicknameSubmit,
  // 头像修改区
  // 手机号区
  needMobile,
  mobile,
  mobileSMSCode,
  changeMobileSubmit,
  getMobileSMSCode,
  // 电子邮箱区
  needEmail,
  email,
  emailSMSCode,
  changeEmailSubmit,
  getEmailSMSCode,
  // 账户注销
  dropAccount
} = profileState()
</script>

<style lang="less">
@import './css/profile.less';
</style>