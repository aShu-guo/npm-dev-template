import { reactive, ref, unref, watch } from 'vue';

export default function usePagination(totalRef, initialPageNo = 1, initialPageSize = 10) {
  const pageNo = ref(initialPageNo);

  const pageSize = ref(initialPageSize);
  const total = ref(0);

  const reset = () => {
    pageNo.value = initialPageNo;
    pageSize.value = initialPageSize;
  };

  watch(
    () => unref(totalRef).total,
    (newVal) => {
      total.value = newVal;
    },
  );
  return {
    reset,
    pageNo,
    pageSize,
    total,
    config: reactive({
      showSizeChanger: true,
      showQuickJumper: true,
      total: total,
      current: pageNo,
      pageSize: pageSize,
      showTotal: (total, range) =>
        `共${total}条记录 第${Math.ceil(range[1] / unref(pageSize))}/${Math.ceil(total / unref(pageSize))}页`,
    }),
  };
}
