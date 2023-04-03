<template>
  <a-upload
    v-model:file-list="photos"
    :before-upload="beforeUpload"
    :custom-request="handleUpload"
    accept="image/*"
    list-type="picture-card"
    @preview="usePhotoViewer(photos)"
    @remove="handleRemove"
    @change="handleChange"
    v-bind="$attrs"
  >
    <div v-if="photos.length < $attrs['max-count']">
      <plus-outlined />
      <div class="upload-tips">点击上传</div>
    </div>
  </a-upload>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { Form, message, Upload } from 'ant-design-vue';
import FileAPI from '@/apis/file';
import { PlusOutlined } from '@ant-design/icons-vue';
import { post } from '@/common/http';
import usePhotoViewer from '@/hooks/viewer';
const emit = defineEmits(['update:photo-list']);
// 其他props参考：https://www.antdv.com/components/upload-cn
const props = defineProps({
  photoList: { type: Array, default: () => [] },
  maxSize: { type: Number, default: 1024 * 1024 * 5 },
});
const formItemContext = Form.useInjectFormItemContext();
const triggerChange = (changedValue) => {
  emit('update:photo-list', changedValue);
  formItemContext.onFieldChange();
};
const photos = ref([]);

watchEffect(() => {
  photos.value = props.photoList;
});
const beforeUpload = (e) => {
  if (e.size >= props.maxSize) {
    message.error('图片大小最大为' + props.maxSize / (1024 * 1024) + 'M');
    return Upload.LIST_IGNORE;
  }
  return true;
};
const handleUpload = async (params) => {
  // 暂时支持单个文件上传
  const { file } = params;
  const { filePath } = await post(
    FileAPI.uploadFile,
    { file },
    {},
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  const photo = photos.value.slice(-1)[0];
  photo.status = 'done';
  photo.url = import.meta.env.VITE_OSS_SHOW + filePath;
};

const handleChange = (params) => {
  // props.photoList.filter((photo) => !changedValue.some((value) => photo.url === value.url)).concat(changedValue)
  triggerChange(params.fileList);
};

const handleRemove = (file) => {
  photos.value = photos.value.filter((item) => item.uid !== file.uid);
  triggerChange(photos.value);
};
</script>

<style lang="less" scoped>
.tips {
  font-size: 14px;
  font-weight: 400;
  color: #848990;
}

:deep(.ant-upload) {
  &.ant-upload-select-picture-card {
    width: 130px;
    height: 84px;
    background: #fafafa;
    border-radius: 4px;
  }

  .upload-tips {
    .tips();
  }
}

:deep(.ant-upload-list-picture-card-container) {
  width: 130px;
  height: 84px;

  .ant-upload-list-item-thumbnail {
    .tips();
  }

  .ant-upload-list-item-progress {
    bottom: 17px;
  }
}
</style>
