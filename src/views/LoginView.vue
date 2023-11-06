<template>
  <div
    class="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700"
  >
    <h1 class="font-bold text-2xl">Welcome Back :)</h1>
    <form
      class="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
      @submit.prevent="attemptLogin"
    >
      <label class="font-semibold text-xs" for="usernameField">Username</label>
      <input
        v-model="username"
        class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
        type="text"
        required
        id="usernameField"
      />

      <label class="font-semibold text-xs mt-3" for="passwordField"
        >Password</label
      >
      <input
        v-model="password"
        class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
        type="password"
        required
        id="passwordField"
      />

      <button
        type="submit"
        :disabled="!username || !password"
        class="flex items-center justify-center h-12 px-6 mt-6 w-64 bg-blue-600 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-black disabled:pointer-events-none"
      >
        Login
      </button>
      <div class="flex mt-6 justify-center text-xs">
        <span class="mx-2 text-gray-300"></span>
        <RouterLink to="/signup" class="text-blue-400 hover:text-blue-500">
          Sign Up Instead
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import authApi from "@/services/authApi";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { LOCAL_STORAGE_USER_REF } from "@/utils/constants";
import { useToast } from "vue-toastification";

const router = useRouter();

const username = ref("");
const password = ref("");

async function attemptLogin() {
  try {
    await authApi.login({
      username: username.value,
      password: password.value,
    });

    localStorage.setItem(LOCAL_STORAGE_USER_REF, username.value);

    router.push({ name: "dashboard" });
  } catch (error) {
    const toast = useToast();
    toast.error("Failed to login! Please try again.");
  }
}
</script>
