import { isNull, isUndefined } from 'lodash-es';

/**
 * 设置普通KV
 * @param key
 * @param value
 */
export function setValue(key, value) {
  if (isNull(value) || isUndefined(value)) {
    localStorage.setItem(key, '');
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * 获取普通KV
 */
export function getValue(key) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
}

/**
 * 获取 存活的 key对应value
 */
export function getAliveValue(key) {
  if (!isExpire(key)) {
    return getValue(key);
  }
}

/**
 * 设置具有有效期的KV，默认有效期为1周
 * @param key
 * @param value
 * @param expire
 */
export function setAliveValue(key, value, expire = 7 * 24 * 60 * 60 * 1000) {
  setValue(key, {
    value,
    start: Date.now().valueOf(),
    expire,
  });
}

/**
 * token 是否有效
 * @returns {boolean}
 */
export function isExpire(key) {
  let isExpire = true;
  const data = getValue(key);

  if (data && Date.now().valueOf() - data.start < data.expire) {
    isExpire = false;
  }
  return isExpire;
}

/**
 * 清除key
 */
export function removeValue(key) {
  localStorage.removeItem(key);
}

/**
 * 清除所有key
 */
export function clearValue() {
  localStorage.clear();
}
