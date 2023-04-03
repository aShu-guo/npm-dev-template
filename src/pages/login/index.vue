<template>
  <a-form
    ref="form"
    style="width: 100%"
    :model="formState"
    :label-col="{ span: 0 }"
    :wrapper-col="{ span: 18, offset: 3 }"
  >
    <a-form-item name="username" :rules="[{ validator: ValidatorWrapper(isNotEmpty, '请输入账号'), required: true }]">
      <a-input v-model:value="formState.username" placeholder="账号">
        <template #prefix>
          <UserOutlined />
          <a-divider type="vertical" style="height: 18px; background: #dedfe4" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      name="password"
      :rules="[{ required: true, validator: ValidatorWrapper(isNotEmpty, '请输入密码'), trigger: 'change' }]"
    >
      <a-input v-model:value="formState.password" type="password" placeholder="密码">
        <template #prefix>
          <KeyOutlined />
          <a-divider type="vertical" style="height: 18px; background: #dedfe4" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      name="verifyCode"
      :wrapper-col="{ span: 18, offset: 3 }"
      class="verification-code-box"
      :rules="[{ required: true, validator: ValidatorWrapper(isNotEmpty, '请输入验证码'), trigger: 'change' }]"
    >
      <a-input v-model:value="formState.verifyCode" placeholder="验证码" />
    </a-form-item>

    <a-form-item class="login-btn" :wrapper-col="{ span: 18, offset: 3 }">
      <a-button type="primary" :loading="loading" @click="doLogin">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { UserOutlined, KeyOutlined } from '@ant-design/icons-vue';
import { v4 as uuidv4 } from 'uuid';
import useLoading from '@/hooks/loading';
import { useUserStore } from '@/stores';
import { isNotEmpty, ValidatorWrapper } from '@/common/validator';

const userStore = useUserStore();
const { loading, toggle } = useLoading(false);
const form = ref();
const formState = reactive({
  username: '',
  password: '',
  uuid: uuidv4().replace(/-/g, ''),
  verifyCode: '',
});
const requestVerification = () => {
  formState.uuid = uuidv4().replace(/-/g, '');
};

const doLogin = () => {
  form.value.validate().then(async (values) => {
    toggle();
    try {
      await userStore.login({ ...values, uuid: formState.uuid });
      toggle();
    } catch (e) {
      requestVerification();
      toggle();
    }
  });
};
</script>

<style lang="less" scoped></style>
