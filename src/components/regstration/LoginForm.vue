<script setup lang="ts">
  import { Field, ErrorMessage, Form } from 'vee-validate'
  import type { UserData } from '@/domain/User'
  import { computed, reactive } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth.store'
  import { useLoadingState } from '@/stores/loading.store'
  import { ID, account } from '@/lib/appwrite'

  const route = useRoute()
  const router = useRouter()

  const loadingStore = useLoadingState()
  const authStrore = useAuthStore()

  const userData = reactive<UserData>({
    email: '',
    password: '',
    name: '',
  })

  const buttonDisabled = computed(() => {
    return !userData.email || !userData.password || rules.email(userData.email) !== true || rules.password(userData.password) !== true
  })

  const confirm = () => {
    const confirmActions = {
      login: login,
      registration: registration,
      someWrong: () => console.warn('something went wrong')
    }
    confirmActions[(router.currentRoute.value.name || 'someWrong') as keyof typeof confirmActions]()
  }

  const login = async () => {
    loadingStore.loading()
    try {
      await account.createEmailSession(userData.email, userData.password)
      const currentSession = await account.get()
      authStrore.set(currentSession ? currentSession : null)
      await router.push('/')
      userDataReset()
    } catch (error) {
      console.warn('something went wrong')
    }
    loadingStore.loaded()
  }

  const registration = async () => {
    loadingStore.loading()
    await account.create(ID.unique(), userData.email, userData.password, userData.name || 'empty name')
    await login()
  }

  const userDataReset = () => {
    userData.email = ''
    userData.password = ''
    userData.name = ''
  }


  const isLogin = computed(() => {
    return route.name === 'login'
  })
  const isSignup = computed(() => {
    return route.name === 'registration'
  })
  const btnText = computed(() => {
    return isLogin.value ? 'LOGIN' : 'Create account'
  })
  const headerText = computed(() => {
    return isLogin.value ? 'Welcome' : 'Registration'
  })

  const validation = computed(() => {
    return {
      login: true,
      password: true,
    }
  })

  const patternEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const rules = {
    email: (v: string) => v ? patternEmail.test(v) || 'Wrong email' : 'Required field',
    password: (v: string) => v ? v.length >= 8 || 'At least 8 chars' : 'Required field'
  }
</script>

<template>
  <main class="login-form">
    <div class="header">
      {{headerText}}
    </div>
    <div class="inputs">
      <Form :validation-schema="rules">
      <Field name="email" type="email" v-model="userData.email" placeholder="Email"/>
      <ErrorMessage name="email" class="error"/>
      <Field name="password" type="password" v-model="userData.password" placeholder="Password"/>
      <ErrorMessage name="password" class="error"/>
      <button
        @click="confirm"
        :disabled="buttonDisabled"
        class="login-btn"
      >
        {{btnText}}
      </button>
      </Form>
      
      <div class="routes">
        <div v-if="!isLogin">
          Back to <RouterLink to="/login">login</RouterLink>
        </div>
        <div v-if="!isSignup">
          Don’t have an account? <RouterLink  to="/registration">Sign up</RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>


<style lang="scss" scoped>
  .login-form {
    width: 390px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding: 77px 55px 33px;

    box-shadow: 0 5px 10px 0 rgba(0,0,0,.1);
    .header {
      color: #333;
      @apply flex justify-center p-4 text-4xl font-bold self-center
    }
    .inputs {
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;

        .error {
          @apply text-red-400
        }
      }
      input {
        font-size: 15px;
        color: #555;
        line-height: 1.2;
        display: block;
        width: 100%;
        height: 45px;
        padding: 0 5px;
        outline: none;
        border-bottom: solid 1px #cdcdcd;
        overflow: visible;
        padding-block: 1px;
        padding-inline: 2px;
      }
      .login-btn {
        @apply bg-gradient-to-r from-violet-500 to-fuchsia-500;
        color: #fff;
        font-size: 15px;
        line-height: 1.2;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
        width: 100%;
        height: 50px;
        border-radius: 25%/125%;
        &:disabled {
          background: #555
        }
      }
    }
    .routes {
      @apply pt-10 flex flex-col gap-4;
      justify-content: space-around;
      a {
        @apply text-blue-400
      }
    }
  }
</style>