let memorySession: {
  accessToken?: string;
  refreshToken?: string;
  user?: any;
  expiresAt?: number;
} | null = null;

export const SessionManager = {
  setMemorySession(accessToken: string, refreshToken: string, user: any) {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    memorySession = {
      accessToken,
      refreshToken,
      user,
      expiresAt: payload.exp * 1000,
    };
    console.log("Sessão temporária criada em memória");
  },

  getMemoryToken(): string | null {
    if (!memorySession) return null;

    if (Date.now() >= (memorySession.expiresAt || 0)) {
      console.log("Token em memória expirado");
      this.clearMemorySession();
      return null;
    }

    return memorySession.accessToken || null;
  },

  getMemoryUser(): any | null {
    if (!memorySession) return null;

    if (Date.now() >= (memorySession.expiresAt || 0)) {
      this.clearMemorySession();
      return null;
    }

    return memorySession.user || null;
  },

  hasValidMemorySession(): boolean {
    if (!memorySession) return false;

    if (Date.now() >= (memorySession.expiresAt || 0)) {
      this.clearMemorySession();
      return false;
    }

    return true;
  },

  clearMemorySession() {
    memorySession = null;
    console.log("Sessão temporária removida da memória");
  },

  getMemoryRefreshToken(): string | null {
    if (!memorySession) return null;
    return memorySession.refreshToken || null;
  },
};
