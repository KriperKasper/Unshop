import {AppDispatch} from "../store";
import axios from "axios";
import {AuthResponse} from "../../models/response/AuthResponse";
import {IUser} from "../../models/IUser";
import {userSlice} from "./UserSlice";


export const API_URL = "http://localhost:5000/api"

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return api.request(originalRequest);
        } catch (e) {
            console.log('not authorized')
        }
    }
    throw error;
})

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.setLoading(true));
        const response = await api.get<IUser[]>('/users');
        dispatch(userSlice.actions.setUsers(response.data));
        dispatch(userSlice.actions.setLoading(false));
    } catch (e:any) {
        console.log(e.response?.data?.message);
    }
}
export const fetchProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.setLoading(true));
        const response = await api.get<string>('/products');
        dispatch(userSlice.actions.setProducts(response.data));
        dispatch(userSlice.actions.setLoading(false));
    } catch (e:any) {
        console.log(e.response?.data?.message);
    }
}
export const login = (email:string, password:string) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.post<AuthResponse>('/login', {email, password});
        localStorage.setItem('token', response.data.accessToken);
        dispatch(userSlice.actions.setAuth(true));
        dispatch(userSlice.actions.setUser(response.data.user));
    } catch (e:any) {
        console.log(e.response?.data?.message);
    }
}

export const registration = (email:string, password:string) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.post<AuthResponse>('/registration', {email, password})
        localStorage.setItem('token', response.data.accessToken);
        dispatch(userSlice.actions.setAuth(true))
        dispatch(userSlice.actions.setUser(response.data.user))
    } catch (e:any) {
        console.log(e.response?.data?.message);
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        const response = await api.post<AuthResponse>('/logout')
        localStorage.removeItem('token');
        dispatch(userSlice.actions.setAuth(false))
        dispatch(userSlice.actions.setUser({} as IUser))
    } catch (e:any) {
        console.log(e.response?.data?.message);
    }
}


export const checkAuth = () => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.setLoading(true));
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
        localStorage.setItem('token', response.data.accessToken);
        dispatch(userSlice.actions.setAuth(true))
        dispatch(userSlice.actions.setUser(response.data.user))
    } catch (e:any) {
        console.log(e.response?.data?.message);
    }
    finally {
        dispatch(userSlice.actions.setLoading(false));
    }
}
