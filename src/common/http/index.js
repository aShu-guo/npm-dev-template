import axios from 'axios';
import { handleGeneralError, handleNetworkError } from './status';
import { getAliveValue } from '@/common/cache';
import { CacheKey } from '@/common/cache/key';

axios.defaults.timeout = 30000;
axios.defaults.withCredentials = false;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config) => {
    const entity = getAliveValue(CacheKey.ACCESS_TOKEN);
    if (entity && entity.value) {
      config.headers['Authorization'] = entity.value;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data);
    const { message, code } = response.data;
    if (code !== 200) {
      handleGeneralError(code, message);
      return Promise.reject(response.data);
    }
    return response;
  },
  // 请求失败
  (err) => {
    handleNetworkError(err.response.status);
    return Promise.reject(err.response);
  },
);

const get = (url, params, resHandler, config) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, { params, ...config })
      .then((res) => {
        const {
          data: { data },
        } = res;
        resolve(resHandler ? resHandler(data) : data);
      })
      .catch((error) => {
        // message.error('服务器错误');
        reject(error);
      });
  });
};

const post = (url, data, params, config, resHandler) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data, { params, ...config })
      .then((res) => {
        const {
          data: { data },
        } = res;
        if (resHandler) {
          resolve(resHandler(data));
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        // message.error('服务器错误');
        reject(error);
      });
  });
};

export { get, post };
