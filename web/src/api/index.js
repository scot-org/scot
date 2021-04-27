import axios from 'axios';
import store from 'store';
import { addAsyncCountValue, minusAsyncCountValue } from 'store/spinner-store';
import toastHook from 'hooks/useToastHook';

const BASE_URL = process.env.REACT_APP_API;
const { dispatch } = store;

const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

// axios 함수 호출 전 실행되는 함수
Axios.interceptors.request.use(
  (config) => {
    dispatch(addAsyncCountValue());
    return config;
  },
  (error) => Promise.reject(error),
);

// api 실행 후 response를 감지하여 데이터를 return
Axios.interceptors.response.use(
  (response) => {
    // 로딩 창을 끔
    dispatch(minusAsyncCountValue());
    return response;
  },
  (error) => {
    const [showToast, hideToast] = toastHook({ type: '', content: '' });
    // 추후 403, 400, 500등 에러 발생시 에러처리
    // 토큰 재발급도 이곳에서
    dispatch(minusAsyncCountValue());
    const errorStatus = error.response.status;
    if (errorStatus === 401) {
      showToast({ type: 'error', content: '필수 입력 항목을 입력해주세요.' });
      window.location = '/';
    }

    return Promise.reject(error);
  },
);

export default Axios;
