interface IAuth {
	status: boolean
	email: string
	name: string
}

const defaultValues: { user: IAuth } = {
	user: {
		status: false,
		email: '',
		name: '',
	},
}

export const useAuthStore = defineStore('auth', {
	state: () => defaultValues,

	getters: {
		isAuth: state => state.user.status,
	},

	actions: {
		set(input: IAuth) {
			this.$patch({ user: input })
		},

		clear() {
			this.$patch(defaultValues)
		},
	},
})

export const useIsLoading = defineStore('isLoading', {
	state: () => ({
		isLoading: false,
	}),

	actions: {
		set(data: boolean) {
			this.$patch({ isLoading: data })
		},
	},
})
