import FileAPI from '@/apis/file';
import { post } from '@/common/http';

export const useToolBarConfig = function () {
  const toolbarConfig = {
    excludeKeys: ['fullScreen', 'group-video', 'codeBlock', 'insertImage'],
  };

  return { toolbarConfig };
};

/**
 * 自定义复制粘贴功能
 * 第一，customPaste 处理 HTML ，转换为 wangEditor 能识别的 HTML 标签即可。wangEditor 能识别的 HTML 标签其实比较简单，你可以在编辑器中输入内容，然后通过 editor.getHtml() 查看 HTML 格式。
 *
 * 第二，单独复制图片，浏览器会把图片文件复制出来，因此可以粘贴到编辑器，这是浏览器夹持的功能。而你复制 HTML 粘贴，浏览器就会认为你复制的仅仅是一段 HTML 字符串，不会帮你复制图片文件，因此会产生跨域或者防盗链。
 * 解决方式：在 customPaste 中把图片 src 上传给服务端，让服务端下载并保存图片，再返回新的 src 。customPaste 支持异步操作的。
 */
export const useEditorConfig = function () {
  // 编辑器配置
  const editorConfig = {
    placeholder: '请输入内容...',
    autoFocus: false,
    MENU_CONF: {
      uploadImage: {
        server: FileAPI.uploadFile,
        // 自定义上传
        async customUpload(file, insertFn) {
          // TS 语法
          const { filePath } = await post(
            FileAPI.uploadFile,
            { file },
            {},
            { headers: { 'Content-Type': 'multipart/form-data' } },
          );
          insertFn(import.meta.env.VITE_OSS_SHOW + filePath, '', import.meta.env.VITE_OSS_SHOW + filePath);
        },
        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 5 * 1024 * 1024, // 1M
        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 10,
        // 超时时间，默认为 10 秒
        timeout: 5 * 1000,
        // 上传错误，或者触发 timeout 超时
        onError(file, err, res) {
          console.log(`${file.name} 上传出错`, err, res);
        },
      },
    },
  };
  return { editorConfig };
};
