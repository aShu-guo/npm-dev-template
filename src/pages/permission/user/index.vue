<template>
  <PageContainer>
    <TableContainer layout="left-right">
      <template #params>
        <a-form layout="inline" :model="formState" ref="form">
          <a-row :gutter="24" style="width: 80%">
            <a-col :span="8">
              <a-form-item label="注册账号" name="username">
                <a-input v-model:value="formState.username" placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="所属行业" name="industryType">
                <a-select v-model:value="formState.industryType" placeholder="请输入">
                  <a-select-option value="" key="不限">不限</a-select-option>
                  <a-select-option v-for="item in getListByEnum(IndustryEnum)" :key="item.name" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="角色" name="roleId">
                <a-select v-model:value="formState.roleId" placeholder="请输入">
                  <a-select-option value="" key="不限">不限</a-select-option>
                  <a-select-option v-for="item in roleList" :key="item.roleId" :value="item.roleId">
                    {{ item.roleName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>

      <template #operations>
        <div class="opt-list">
          <a-space :size="24">
            <a-button shape="round" type="primary" size="large" class="ph-38" @click="table.submit(true)">
              查询
            </a-button>
            <a-button shape="round" size="large" class="ph-38" @click="useReset(form, table)">重置</a-button>
          </a-space>
        </div>
      </template>

      <template #table>
        <pro-table :api="initData" :columns="columns">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'userStatus'">
              <div
                class="account-normal"
                :class="record.userStatus === StatusEnum.Normal.value ? 'account-active' : 'account-inactive'"
              >
                {{ record.userStatus === StatusEnum.Normal.value ? '启用' : '停用' }}
              </div>
            </template>
            <template v-if="column.key === 'operations'">
              <a-popconfirm
                overlayClassName="popconfirm-normal"
                :title="`确定${record.userStatus !== StatusEnum.Normal.value ? '启用' : '停用'}该账号？`"
                placement="topRight"
                ok-text="确定"
                cancel-text="取消"
                @confirm="toggleAccount(record)"
              >
                <a href="javascript:void(0)">{{ record.userStatus !== StatusEnum.Normal.value ? '启用' : '停用' }}</a>
              </a-popconfirm>
              <a-divider type="vertical" />
              <a-popconfirm
                overlayClassName="popconfirm-normal"
                title="确定对该账号进行密码重置？"
                placement="topRight"
                ok-text="确定"
                cancel-text="取消"
                @confirm="resetPwd(record)"
              >
                <a href="javascript:void(0)">重置密码</a>
              </a-popconfirm>
              <a-divider type="vertical" />
            </template>
          </template>
        </pro-table>
      </template>
    </TableContainer>

    <a-modal
      v-model:visible="visible"
      title="新增账号"
      style="width: 600px"
      wrap-class-name="inner-modal"
      :footer="null"
      :destroy-on-close="true"
    >
      <span>新增账号</span>
    </a-modal>
  </PageContainer>
</template>

<script setup name="MsgCenterPending">
import { onMounted, reactive, ref } from 'vue';
import { columns, IndustryEnum, StatusEnum } from './columns';
import { PageContainer } from '@ant-design-vue/pro-layout';
import { getListByEnum } from '@/common/utils';
import { message } from 'ant-design-vue';
import { useReset } from '@/components/pro-table/hook';

const formState = reactive({
  username: '',
  industryType: '',
  roleId: '',
});
const form = ref(null);
const roleList = ref([]);
const visible = ref(false);
onMounted(() => {
  setTimeout(() => {
    roleList.value = [
      { roleId: 100, roleName: '超级管理员' },
      { roleId: 101, roleName: '管理员' },
    ];
  }, 1000);
});
const initData = async () => {
  const { rows, total } = await Promise.resolve({
    total: 3,
    rows: [
      {
        userId: '65a896b470c1',
        username: 'Wang123',
        industryType: '1,2',
        roleName: '用户',
        orgType: '1',
        createdTime: '2023-03-03T11:51:09',
        userStatus: '2',
      },
      {
        userId: 'e429d21d24b0',
        username: 'admin4',
        industryType: null,
        roleName: '管理员',
        orgType: null,
        createdTime: '2023-03-01T17:17:03',
        userStatus: '2',
      },
      {
        userId: '7a6eb92f8250',
        username: '浙江科尚有限公司',
        industryType: '1,2',
        roleName: '用户',
        orgType: '5',
        createdTime: '2023-03-01T16:06:11',
        userStatus: '2',
      },
    ],
  });
  return { rows, total };
};
const toggleAccount = async (record) => {
  // 传当前状态
  if (record.userStatus !== StatusEnum.Normal.value) {
    record.userStatus = StatusEnum.Normal.value;
  } else {
    record.userStatus = StatusEnum.Inactive.value;
  }
  message.success(record.userStatus !== StatusEnum.Normal.value ? '停用成功' : '启用成功');
};

const resetPwd = async (_record) => {
  message.success('重置成功');
};
</script>

<style lang="less" scoped></style>
