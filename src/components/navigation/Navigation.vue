<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { account } from '@/lib/appwrite'
  import { useLoadingState } from '@/stores/loading.store'
  import router from '@/router'
  import { useAuthStore } from '@/stores/auth.store'

  const userStore = useAuthStore()

  const loadingState = useLoadingState()
  const logout = async () => {
    loadingState.loading()
    await account.deleteSession('current')
    userStore.clearUserState()
    await router.push('/login')
    loadingState.loaded()
  }

</script>

<template>
  <div class="navigation">
    <!-- <Icon icon="mingcute:hotkey-fill" height="2rem"/> -->
    <Icon icon="material-symbols:logout-rounded" height="2rem" @click="logout"/>
  </div>
</template>

<style scoped>
  .navigation {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    top: 0;
    left: 0;
    padding: 1rem;
    position: absolute;
  }
</style>