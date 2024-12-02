import { toggleLoading } from '../../app/loadingSlice';
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import { ApiRequestModel } from '../../model/ApiRequestModel';
import { toast } from 'react-toastify';
import { getItemInLocalStorage, removeItemInLocalStorage } from '../../utils/localStorage';
import { store } from "../../app/store";
import { DOMAIN_ADMIN, LOCAL_STORAGE } from '../../const/const';
import { ROUTER_URL } from '../../const/router.const';
import { HttpException } from '../../app/toastException';

export const axiosInstance = axios.create({
    baseURL: DOMAIN_ADMIN,
    headers: {
        'content-type': 'application/json; charset=UTF-8'
    },
    timeout: 300000,
    timeoutErrorMessage: `Connection is timeout exceeded`
});

export const getState = (store: any) => {
    return store.getState();
}

export const BaseService = {
    get<T = any>({ url, isLoading = true, payload, headers }: Partial<ApiRequestModel>): Promise<PromiseState<T>> {
        const params = { ...payload }
        for (const key in params) {
            if ((params as any)[key] === '' && (params as any)[key] !== 0) {
                delete (params as any)[key]
            }
        }
        checkLoading(isLoading);
        return axiosInstance.get<T, PromiseState<T>>(
            `${url}`, {
            params: params,
            headers: headers || {}
        })
    },
    post<T = any>({ url, isLoading = true, payload, headers }: Partial<ApiRequestModel>): Promise<PromiseState<T>> {
        checkLoading(isLoading);
        return axiosInstance.post<T, PromiseState<T>>(
            `${url}`, payload, {
            headers: headers || {}
        })
    },
    put<T = any>({ url, isLoading = true, payload, headers }: Partial<ApiRequestModel>): Promise<PromiseState<T>> {
        checkLoading(isLoading);
        return axiosInstance.put(
            `${url}`, payload, {
            headers: headers || {}
        })
    },
    remove<T = any>({ url, isLoading = true, payload, headers }: Partial<ApiRequestModel>): Promise<PromiseState<T>> {
        checkLoading(isLoading);
        return axiosInstance.delete(
            `${url}`, {
            params: payload,
            headers: headers || {}
        })
    },
    getById<T = any>({ url, isLoading = true, payload, headers }: Partial<ApiRequestModel>): Promise<PromiseState<T>> {
        checkLoading(isLoading);
        return axiosInstance.get<T, PromiseState<T>>(
            `${url}`, {
            params: payload,
            headers: headers || {}
        })
    },
    uploadMedia(
        url: string,
        file?: any,
        isMultiple: boolean = false,
        isLoading: boolean = true
    ) {
        const formData = new FormData();
        if (isMultiple) {
            for (let i = 0 ; i < file.length ; i++) {
                formData.append("files[]", file[i]);
            }
        } else {
            formData.append("file", file);
        }
        const user: any = getItemInLocalStorage(LOCAL_STORAGE.ACCOUNT_ADMIN);
        checkLoading(isLoading);
        return axios({
            method: "post",
            url: `${DOMAIN_ADMIN}${url}`,
            data: formData,
            params: {},
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": `Bearer ${user.access_token}`,
            }
        }).then((res) => {
            store.dispatch(toggleLoading(false));
            return res.data;
        }).catch(error => {
            handleErrorByToast(error);
            return null;
        })
    }
}

const checkLoading = (isLoading: boolean = false) => {
    if (isLoading) store.dispatch(toggleLoading(true));
}

export interface PromiseState<T = unknown> extends AxiosResponse<T> {
    totalItem: number;
}


axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (!config.headers) {
            config.headers = {}; // Ensure headers is defined
        }
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Corrected header
        }
        return config as InternalAxiosRequestConfig;
    },
    (err) => {
        return handleErrorByToast(err);
    }
);

axiosInstance.interceptors.response.use(
    (config) => {
        store.dispatch(toggleLoading(false));
        return Promise.resolve(config);
    },
    (err) => {
        setTimeout(() => store.dispatch(toggleLoading(false)), 2000);
        const { response } = err;
        if (response) {
      switch (response.status) {
        case 401:
          localStorage.clear();
          setTimeout(() => {
            window.location.href = ROUTER_URL.LOGIN;
          }, 10000);
          break;
        case 403:
          handleErrorByToast(err);
          localStorage.clear();
          setTimeout(() => {
            window.location.href = ROUTER_URL.LOGIN;
          }, 2000);
          break;
        case 404:
          handleErrorByToast(err);
          // setTimeout(() => {
          //   window.location.href = ROUTER_URL.LOGIN;
          // }, 2000);
          break;
        case 500:
          handleErrorByToast(err);
          break;
        default:
          handleErrorByToast(response.data?.message || "An error occurred. Please try again.");
      }
    } else {
      handleErrorByToast(err || "An error occurred. Please try again.");
    }
    return Promise.reject(new HttpException(err, response?.status || 500));
    }
);

const handleErrorByToast = (error: any) => {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    store.dispatch(toggleLoading(false));
    return null;

};


