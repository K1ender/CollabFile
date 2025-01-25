export default function useUser() {
	const user = useState<null | {
		id: number;
		username: string;
		isAuthenticated: boolean;
	}>("user", () => null);

	const fetchUserProfile = async () => {
		if (user.value?.isAuthenticated) {
			return;
		}
		try {
			const { data } = await useFetch("/api/user");
			if (!data.value) return;
			user.value = {
				id: data.value?.id,
				username: data.value?.username,
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
	};
}
