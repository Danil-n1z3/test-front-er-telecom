import _ from 'lodash'
import { defineStore } from 'pinia'

type AuthStore = {
  email: String,
  name: String,
  status: Boolean,
}

const defaultUserState: AuthStore = {
  email: '',
  name: '',
  status: false,
}

const userState = _.cloneDeep(defaultUserState)

export const useAuthStore = defineStore('authStore', {
  state: () => userState,
  getters: {
    isAuth: state => state.status,
  },
  actions: {
    clearUserState() {
      this.$patch(defaultUserState)
    },
    set(input: AuthStore | null) {
      this.$patch(input ? input : defaultUserState)
    }
  }
})