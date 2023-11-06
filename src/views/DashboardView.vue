<template>
  <div class="pb-4">
    <nav class="py-4">
      <div
        class="container flex items-center justify-between mx-auto pt-3 border-b border-gray-600 pb-2"
      >
        <h1 class="text-xl text-gray-800 font-bold" href="#">
          Book Management System
        </h1>

        <button
          @click="attemptLogout"
          class="h-12 px-6 mt-6 bg-blue-600 rounded font-semibold text-sm text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-black disabled:pointer-events-none"
        >
          Logout
        </button>
      </div>
    </nav>
    <div class="container mx-auto my-[20px]">
      <div class="border-b border-gray-300 pt-4 mt-2">
        <h1 class="text-xl text-gray-600 font-bold pb-[10px]">Favourites</h1>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3"
      >
        <BookCard
          v-for="book in favoriteBooks"
          :key="book.id"
          :book="book"
          :userFavoriteBookId="userFavoriteBookId"
        />
      </div>
    </div>

    <div class="container mx-auto mt-[20px]">
      <div class="border-b border-gray-300 pt-4 mt-2">
        <h1 class="text-xl text-gray-600 font-bold pb-3">All Books</h1>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3"
      >
        <BookCard
          v-for="book in allBooks"
          :key="book.id"
          :book="book"
          :userFavoriteBookId="userFavoriteBookId"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import booksApi from "@/services/booksApi";
import usersApi from "@/services/usersApi";
import BookCard from "@/components/BookCard.vue";

import type { Book } from "@/types/Book";
import { LOCAL_STORAGE_USER_REF } from "@/utils/constants";

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userFavoriteBookId = ref("");
const booksList = ref<Book[]>([]);
const favoriteBooks = ref<Book[]>([]);
const allBooks = ref<Book[]>([]);

onMounted(async () => {
  userFavoriteBookId.value = await usersApi.getCurrentUserFavouriteBook();
  booksList.value = await booksApi.getAllBooks();

  // Separate the favorite book from the list of all books
  const favoriteBook = booksList.value.find(
    (book) => book.id === userFavoriteBookId.value
  );

  if (favoriteBook) {
    favoriteBooks.value = [favoriteBook]; // Store the user's favorite book in a separate array
  }

  // Remove the favorite book from the list of all books
  allBooks.value = booksList.value.filter(
    (book) => book.id !== userFavoriteBookId.value
  );
});

function attemptLogout() {
  localStorage.removeItem(LOCAL_STORAGE_USER_REF);
  router.push("/login");
}
</script>
