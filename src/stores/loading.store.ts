import { defineStore } from 'pinia'

export type LoadingState = {
  isLoading: Boolean,
}

const defaultLoadingState: LoadingState = {
  isLoading: true,
}

export const useLoadingState = defineStore('LoadingState', {
  state: (): LoadingState => defaultLoadingState,
  getters: {
    value: state => state.isLoading,
  },
  actions: {
    resetLoading() {
      this.$patch(defaultLoadingState)
    },
    set(input: LoadingState) {
      this.$patch(input)
    },
    loading() {
      this.isLoading = true
    },
    loaded() {
      this.isLoading = false
    }
  }
})