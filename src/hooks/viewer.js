import { api as viewerApi } from 'v-viewer';
import { unref } from 'vue';

/**
 * 图片预览逻辑
 * @param images 结构为：[{url:'xxxx'}, {url:'xxxx'}]
 * @param initialIndex 从图片源中哪个位置开始预览
 */
export default function usePhotoViewer(images, initialIndex = 0) {
  viewerApi({
    options: { url: 'url', toolbar: true, initialViewIndex: initialIndex },
    images: unref(images),
  });
}
