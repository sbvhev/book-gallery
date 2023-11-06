<template>
  <div
    class="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700"
  >
    <h1 class="font-bold text-2xl">Create an Account :)</h1>

    <div class="flex flex-col bg-white rounded shadow-lg p-12 mt-12">
      <div class="flex gap-2 max-w-[264px] overflow-hidden pl-1 pb-1">
        <div
          class="transition-all duration-150"
          :class="!onFirstPage ? 'translate-x-[-264px]' : 'translate-x-0'"
        >
          <label class="font-semibold text-xs" for="usernameField"
            >Username</label
          >
          <input
            v-model="signUpFormData.username"
            class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
            required
            id="usernameField"
          />

          <label class="font-semibold text-xs mt-3" for="passwordField"
            >Password</label
          >
          <input
            v-model="confirmPassword"
            class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="password"
            required
            id="passwordField"
          />
          <label class="font-semibold text-xs mt-3" for="passwordField"
            >Confirm-Password</label
          >
          <input
            v-model="signUpFormData.password"
            class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="password"
            required
            id="confirmPasswordField"
          />
        </div>

        <!-- Select input for favorite book -->
        <div
          class="transition-all duration-150"
          :class="!onFirstPage ? 'translate-x-[-264px]' : 'translate-x-0'"
        >
          <label class="font-semibold text-xs mt-3" for="bookSelect"
            >Favorite Book</label
          >
          <select
            v-model="favoriteBook"
            id="bookSelect"
            required
            class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          >
            <option value="" disabled>Select a Book</option>
            <option v-for="book in booksList" :key="book.id" :value="book.id">
              {{ book.title }}
            </option>
          </select>
        </div>
      </div>

      <button
        @click="attemptSignup"
        :disabled="
          !signUpFormData.password ||
          !signUpFormData.username ||
          (!onFirstPage && !favoriteBook)
        "
        class="flex items-center justify-center h-12 px-6 ml-1 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-black disabled:pointer-events-none"
      >
        {{ onFirstPage ? "Next" : "Sign Up" }}
      </button>
      <div class="flex mt-6 justify-center text-xs">
        <RouterLink to="/login" class="text-blue-400 hover:text-blue-500"
          >Already have an account? Login</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import authApi from "@/services/authApi";
import booksApi from "@/services/booksApi";

import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import type { Book } from "@/types/Book";
import { useToast } from "vue-toastification";

const router = useRouter();

const favoriteBook = ref("");
const signUpFormData = reactive({
  username: "",
  password: "",
});
const confirmPassword = ref();
const booksList = ref<Book[]>([]);

async function loadBooksList() {
  booksList.value = await booksApi.getAllBooks();
  onFirstPage.value = false;
}
const onFirstPage = ref(true);

onMounted(() => {
  const toast = useToast();
});

async function attemptSignup() {
  try {
    if (onFirstPage.value) {
      if (signUpFormData.password !== confirmPassword.value) {
        const toast = useToast();
        toast.error("Password not matched");
        return toast;
      }
      return loadBooksList();
    }

    await authApi.signUp(signUpFormData, favoriteBook.value);

    router.push({ name: "dashboard" });
  } catch (error) {
    const toast = useToast();
    toast.error("Failed to signUp! Please try again.");
  }
}
</script>
