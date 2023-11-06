<template>
  <div class="shadow-xl p-3 relative">
    <img
      v-if="userFavoriteBookId === book.id"
      src="@/assets/images/favourite.png"
      alt=""
      class="absolute right-[-10px] top-[-10px]"
    />
    <img :src="book.cover_url" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="text-lg font-semibold my-4">{{ book.title }}</h5>
      <p class="text-sm">{{ book.description }}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Book } from "../types/Book";
const props = defineProps<{
  book: Book;
  userFavoriteBookId: string;
}>();
</script>
