<template>
  <div class="editor-box">
    <!-- 工具栏 -->
    <Toolbar :editor="editorRef" :default-config="toolbarConfig" style="border-bottom: 1px solid #ccc" />
    <!-- 编辑器 -->
    <Editor
      v-model="valueHtml"
      :default-config="editorConfig"
      :style="style"
      @on-created="handleCreated"
      @on-change="handleChange"
      @custom-paste="customPaste"
    />
  </div>
</template>

<script setup name="Editor">
import { onBeforeUnmount, ref, shallowRef, watchEffect } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { Form } from 'ant-design-vue';
import { useEditorConfig, useToolBarConfig } from '@/components/editor/hook';

const customPaste = (_editor, _event) => {
  /*const images = event.clipboardData.getData('image/*'); // 获取粘贴的 html
  console.log(images);

  const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
  console.log(html);*/
  return true;
};
const emit = defineEmits(['update:value']);
const props = defineProps({
  style: { type: [String, Object], default: 'height: 310px; overflow-y: hidden' },
  value: { type: String, default: '' },
});
const editorRef = shallowRef();

const valueHtml = ref('');
const formItemContext = Form.useInjectFormItemContext();

watchEffect(() => {
  valueHtml.value = props.value;
});
const triggerChange = (changedValue) => {
  emit('update:value', changedValue);
  formItemContext.onFieldChange();
};

const { toolbarConfig } = useToolBarConfig();
// 编辑器配置
const { editorConfig } = useEditorConfig();
const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  // console.log(editorRef.value.getAllMenuKeys());
  // console.log(editor.getMenuConfig('uploadImage'));
};

setTimeout(() => {
  /*const toolbar = DomEditor.getToolbar(editorRef.value);
  const curToolbarConfig = toolbar.getConfig();
  console.log(curToolbarConfig.toolbarKeys);
  console.log(editorRef.value.getAllMenuKeys());*/
}, 3000);
const handleChange = (editor) => {
  // console.log('content', editor.children);
  triggerChange(editor.getHtml());
};

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  editorRef.value.destroy();
});
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="less" scoped>
.editor-box {
  border: 1px solid #dddfe1;
  border-radius: 4px;
  width: 790px;

  :deep(.w-e-toolbar) {
    border-radius: 4px;
  }

  :deep(.w-e-text-container) {
    border-radius: 4px;
  }
}
</style>
