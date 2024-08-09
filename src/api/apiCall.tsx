import IUser from "../interfaces/IUser";
import apiClient from "../http-common";
import { CATEGORY, LOGIN, LOGOUT, PRODUCT, PRODUCTID, PRODUCTPIC, USER } from "./endpoints.tsx";
import IProduct from "../interfaces/IProduct";
import ILogout from "../interfaces/ILogout";

// Authentication
export const logIn = (postData: IUser) => {
    return apiClient.post(LOGIN, postData);
}
export const logOut = (postData: ILogout) => {
    return apiClient.post(LOGOUT, postData);
}

// User
export const createUser = (postData: IUser) => {
    return apiClient.post(USER, postData);
}
export const getUserInfo = (token: string) => {
    return apiClient.get(USER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
}

// Product
export const createProduct = (postData: IProduct) => {
    return apiClient.post(PRODUCT, postData);
}
export const getProductByPage = (page: number, pageSize: number) => {
    return apiClient.get(PRODUCT, {
        params: {
            page: page,
            offset: pageSize,
        }
    });
}
export const getProductByName = (name: string | null, page: number, pageSize:number) => {
    return apiClient.get(PRODUCT, {
        params: {
            productName: name,
            page: page,
            offset: pageSize,
        }
    });
}
export const getProductById = (id: string | null | undefined) => {
    return apiClient.get(PRODUCTID + id);
}
export const getProductByUrlName = (urlName: string) => {
    return apiClient.get(PRODUCT + urlName);
}
export const updateImage = (id: string | null, formData: FormData) => {
    return apiClient.patch(PRODUCTPIC + id, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}
export const updateProduct = (id: string | undefined, patchData: IProduct) => {
    return apiClient.patch(PRODUCT + id, patchData);
}
export const deleteProduct = (id: string | null) => {
    return apiClient.delete(PRODUCT + id);
}

// Category
export const getCategory = () => {
    return apiClient.get(CATEGORY);
}