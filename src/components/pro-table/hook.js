import { unref } from 'vue';

export const useReset = (formRef, tableRef) => {
  const table = unref(tableRef);
  const form = unref(formRef);
  if (table && form) {
    form.resetFields();
    table.reset();
  } else {
    throw new Error('table ref or form ref is undefined');
  }
};
