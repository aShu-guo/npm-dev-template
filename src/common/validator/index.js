// 内置的校验器
/**
 * 自定义校验器wrapper，用于传入自定义错误信息
 * @param func
 * @param error
 * @return {function(*, *): *}
 * @constructor
 */
export const ValidatorWrapper = (func, error = '') => {
  return (rule, value) => {
    return func(rule, value, error);
  };
};
/**
 *
 * @param _rule
 * @param value 字段对应的值
 * @param error 自定义error文案
 * @return {Promise<void>}
 */
export const isNotEmpty = (_rule, value, error = '') => {
  if (value === '' || value === undefined) {
    return Promise.reject(new Error(error));
  } else {
    return Promise.resolve();
  }
};

/**
 * 判断富文本编辑器是否为空
 */
export const isRichTextEmpty = (_rule, value) => {
  if (value === '' || value === '<p><br></p>') {
    return Promise.reject(new Error('内容不能为空'));
  } else {
    return Promise.resolve();
  }
};

export const isEmptyFile = (_rule, value, error = '') => {
  if (value.length === 0) {
    return Promise.reject(new Error(error));
  } else {
    return Promise.resolve();
  }
};

/**
 * 是否为合法电话号码
 * @param _rule
 * @param value
 */
export const isValidPhone = (_rule, value) => {
  if (value === '') {
    return Promise.reject('电话号码不能为空');
  } else {
    const regExp = /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/;
    if (!regExp.test(value)) {
      return Promise.reject('请输入正确的电话号码格式');
    }
    return Promise.resolve();
  }
};
/**
 * 是否为合法电子邮箱
 * @param _rule
 * @param value
 */
export const isValidEmail = (_rule, value) => {
  if (value === '') {
    return Promise.reject('电子邮箱不能为空');
  } else {
    const regExp =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!regExp.test(value)) {
      return Promise.reject('请输入正确的电子邮箱格式');
    }
    return Promise.resolve();
  }
};
/**
 * 是否为合法身份证
 * @param _rule
 * @param value
 */
export const isValidIdCard = (_rule, value) => {
  const regExp = /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/;
  if (regExp.test(value) || !value) {
    return Promise.resolve();
  }
  return Promise.reject('请输入正确的身份证格式');
};

/**
 * 是否为合法统一社会信用代码
 * @param _rule
 * @param value
 */
export const isValidSocialCode = (_rule, value) => {
  const regExp = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
  if (regExp.test(value) || !value) {
    return Promise.resolve();
  }
  return Promise.reject('请输入正确的统一社会信用代码格式');
};

export const isValidCertificate = (_rule, value) => {
  const regExp = /^[0-9A-Z]{18}$/;
  if (regExp.test(value) || !value) {
    return Promise.resolve();
  }
  return Promise.reject('请输入正确的证件代码');
};

/**
 * 是否为合法的密码格式
 * @param _rule
 * @param value
 */
export const isValidPwd = (_rule, value) => {
  if (value === '') {
    return Promise.reject('密码不能为空');
  } else if (value.length < 8) {
    return Promise.reject('密码长度过短');
  } else if (value.length > 16) {
    return Promise.reject('密码长度过长');
  }
  return Promise.resolve();
};
