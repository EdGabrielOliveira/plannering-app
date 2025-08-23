import * as SecureStore from "expo-secure-store";

export const AuthStorage = {
  async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync("authToken", token);
  },

  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync("authToken");
  },

  async setRefreshToken(refreshToken: string): Promise<void> {
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  },
  async getRefreshToken(): Promise<string | null> {
    return await SecureStore.getItemAsync("refreshToken");
  },

  async removeRefreshToken(): Promise<void> {
    await SecureStore.deleteItemAsync("refreshToken");
  },

  async setUser(user: any): Promise<void> {
    await SecureStore.setItemAsync("userData", JSON.stringify(user));
  },

  async getUser(): Promise<any | null> {
    const userData = await SecureStore.getItemAsync("userData");
    return userData ? JSON.parse(userData) : null;
  },

  async isTokenValid(): Promise<boolean> {
    const token = await this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Date.now() / 1000;
      return payload.exp > now;
    } catch {
      return false;
    }
  },

  async isRefreshTokenValid(): Promise<boolean> {
    const refreshToken = await this.getRefreshToken();
    if (!refreshToken) return false;

    try {
      if (refreshToken.includes(".")) {
        const payload = JSON.parse(atob(refreshToken.split(".")[1]));
        const now = Date.now() / 1000;
        return payload.exp > now;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },

  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("userData");
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    if (!token) return false;

    if (await this.isTokenValid()) {
      return true;
    }

    const refreshToken = await this.getRefreshToken();
    if (refreshToken && (await this.isRefreshTokenValid())) {
      return true;
    }

    return false;
  },
  async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    await this.setToken(accessToken);
    await this.setRefreshToken(refreshToken);
  },
};
