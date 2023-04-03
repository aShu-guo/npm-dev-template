import { ref } from 'vue';
export default function useLoading(initValue) {
  const loading = ref(initValue);
  const setLoading = (value) => {
    loading.value = value;
  };
  const toggle = () => {
    loading.value = !loading.value;
  };
  return {
    loading,
    setLoading,
    toggle,
  };
}
