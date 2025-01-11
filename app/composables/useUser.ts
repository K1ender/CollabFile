export default function useUser() {
  const user = useState<null | {
    id: number;
    username: string;
    isAuthenticated: boolean;
  }>("user", () => null);
  const isLoading = ref(false);

  const fetchUserProfile = async () => {
    if (user.value !== null && user.value.isAuthenticated) {
      return;
    }
    try {
      isLoading.value = true;
      const response = await useRequestFetch()("/api/user");
      user.value = {
        id: response.id,
        username: response.username,
        isAuthenticated: true,
      };
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
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

  const register = async (username: string, password: string) => {
    try {
      await $fetch("/api/auth/register", {
        method: "POST",
        body: { username, password },
      });
      await fetchUserProfile();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await $fetch("/api/auth/logout", { method: "POST" });
      user.value = null;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    user,
    fetchUserProfile,
    logout,
    login,
    register,
    isLoading,
  };
}
