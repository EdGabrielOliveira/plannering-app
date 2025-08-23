import { fetchWithoutAuth } from "../secure/fetch";
import { SessionManager } from "./sessionManager";
import { AuthStorage } from "./storage";

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const currentRefreshToken = await AuthStorage.getRefreshToken();

  if (!currentRefreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const data: RefreshTokenResponse = await fetchWithoutAuth("/refresh", {
      method: "POST",
      data: {
        refresh_token: currentRefreshToken,
      },
    });

    await AuthStorage.setTokens(data.access_token, data.refresh_token);

    return data;
  } catch (error: any) {
    await AuthStorage.clear();
    throw new Error(`Refresh failed: ${error.response?.status || "unknown error"}`);
  }
};

export const ensureValidToken = async (): Promise<string> => {
  if (await AuthStorage.isTokenValid()) {
    const token = await AuthStorage.getToken();
    if (token) return token;
  }

  const memoryToken = SessionManager.getMemoryToken();
  if (memoryToken) {
    return memoryToken;
  }

  if (await AuthStorage.isRefreshTokenValid()) {
    try {
      const refreshResponse = await refreshToken();
      return refreshResponse.access_token;
    } catch {
      await AuthStorage.clear();
      throw new Error("Authentication expired. Please login again.");
    }
  }

  const memoryRefreshToken = SessionManager.getMemoryRefreshToken();
  if (memoryRefreshToken) {
    try {
      const refreshResponse = await refreshToken();
      return refreshResponse.access_token;
    } catch {
      SessionManager.clearMemorySession();
      throw new Error("Authentication expired. Please login again.");
    }
  }

  await AuthStorage.clear();
  SessionManager.clearMemorySession();
  throw new Error("No valid authentication. Please login.");
};
