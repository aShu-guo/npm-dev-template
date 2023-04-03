import { onMounted, onUnmounted, ref } from 'vue';
import { debounce } from 'lodash-es';
export default function useWindowResize(widthOnDesign, heightOnDesign) {
  const widthRef = ref(0);
  const heightRef = ref(0);

  const listener = (event) => {
    const w = event.target.innerWidth / 1920;
    const h = event.target.innerHeight / 1080;
    const scale = w < h ? w : h;

    widthRef.value = widthOnDesign * scale;
    heightRef.value = heightOnDesign * scale;
  };

  onMounted(() => {
    window.addEventListener('resize', debounce(listener, 1000));
  });

  onUnmounted(() => {
    window.removeEventListener('resize', listener);
  });
  return {
    width: widthRef,
    height: heightRef,
  };
}
