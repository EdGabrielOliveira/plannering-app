import axios, { AxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import { ensureValidToken } from "../auth/refresh";
import { AuthStorage } from "../auth/storage";

const APIKEY = process.env.EXPO_PUBLIC_API_KEY;
const BASEURL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

export const fetchWithAuth = async (url: string, options: AxiosRequestConfig = {}) => {
  try {
    const token = await ensureValidToken();

    const headers = {
      ...options.headers,
      "Content-Type": "application/json",
      "X-API-Key": APIKEY,
      Authorization: `Bearer ${token}`,
    };

    const response = await axios({
      url: `${BASEURL}${url}`,
      ...options,
      headers,
    });

    return response.data;
  } catch (error: any) {
    if (error.message?.includes("Authentication expired") || error.message?.includes("No valid authentication")) {
      await AuthStorage.clear();
      throw new Error("Session expired. Please login again.");
    }
    throw error;
  }
};

export const fetchWithoutAuth = async (url: string, options: AxiosRequestConfig = {}) => {
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    "X-API-Key": APIKEY,
  };

  const response = await axios({
    url: `${BASEURL}${url}`,
    ...options,
    headers,
  });

  return response.data;
};
