<script setup lang="ts">
  import router from './router'
  import { RouterView } from 'vue-router'
  import { computed, onMounted, onUpdated }  from 'vue'
  import { account } from './lib/appwrite'
  import { useAuthStore } from './stores/auth.store'
  import { useLoadingState } from './stores/loading.store'
  import Navigation from './components/navigation/Navigation.vue'
  import GlobalLoaderVue from './views/GlobalLoader.vue'

  const userStore = useAuthStore()

  onMounted(async () => {
    try {
      const user = await account.get()
      userStore.set(user)
    } catch (error) {
      router.push('/login')
    }
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(500)
    useLoadingState().loaded()
  })

  const navigationCondition = computed(() => {
    return userStore.isAuth && !useLoadingState().value
  })

</script>

<template>
  <div class="app">
    <Navigation v-if="navigationCondition"/>
    <GlobalLoaderVue v-if="useLoadingState().value"/>
    <RouterView v-else/>
  </div>
</template>

<style scoped>
  .app {
    @apply w-screen h-screen bg-[#f2f2f2] flex items-center justify-center
  }

</style>
