export default function useUser() {
  const user = useState<null | {
    id: number;
    username: string;
    isAuthenticated: boolean;
  }>("user", () => null);

  const fetchUserProfile = async () => {
    if (user.value !== null && user.value.isAuthenticated) {
      return;
    }
    try {
      const response = await $fetch("/api/user");
      user.value = {
        id: response.id,
        username: response.username,
        isAuthenticated: true,
      };
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      await $fetch("/api/auth/login", {
        method: "POST",
        body: { username, password },
      });
      await fetchUserProfile();
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      await $fetch("/api/auth/register", {
        method: "POST",
        body: { username, password, confirmPassword },
      });
      await fetchUserProfile();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    user.value = null;
    await $fetch("/api/auth/logout", { method: "POST" });
  };

  return {
    user,
    fetchUserProfile,
    logout,
    login,
    register,
  };
}