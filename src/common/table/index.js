import dayjs from 'dayjs';
import { unref } from 'vue';

/**
 * 默认对应字段无数据时展示'-'
 */
const renderEmptyText = function ({ text }) {
  return text || '-';
};

/**
 * 格式化datetime格式的数据
 * @param time
 */
const renderDateTime = ({ text }) => {
  if (!text) return '';
  return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
};

/**
 * 格式化date格式的数据
 * @param time
 */
const renderDate = ({ text }) => {
  if (!text) return '';
  return dayjs(text).format('YYYY-MM-DD');
};

/**
 * 格式化money格式的数据
 */
const renderMoney = ({ text }) => {
  if (!text) return '';
  return `¥${text}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const defineUI = function (columns, extra) {
  const rawColumns = [];

  columns.map((item) => {
    const rawItem = { ...item };
    // 以用户自定义的render为准
    if (rawItem.customRender) {
      rawColumns.push(rawItem);
      return;
    }
    switch (item.valueType) {
      case 'money':
        rawItem.customRender = renderMoney;
        break;
      case 'date':
        rawItem.customRender = renderDate;
        break;
      case 'dateTime':
        rawItem.customRender = renderDateTime;
        break;
      case 'index':
        rawItem.customRender = ({ index }) => unref(extra.pageSize) * (unref(extra.pageNo) - 1) + index + 1;
        break;
      case 'operations':
        break;
      case 'text':
      default:
        rawItem.customRender = renderEmptyText;
        break;
    }
    if (rawItem.valueEnum) {
      rawItem.customRender = ({ text }) => (rawItem.valueEnum && rawItem.valueEnum[text]) || '-';
    }

    rawColumns.push(rawItem);
  });
  return rawColumns;
};

/**
 * 用于解析变量路径
 * @param path 入参格式要求： xxxx.xxx.xxx
 * @return {*}
 */
export const pathParser = (path) => path.split('.');
