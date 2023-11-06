import type { Book } from "@/types/Book";
import httpClient from "./httpClient";

class BooksApi {
  private path = "/books";

  async getAllBooks() {
    return httpClient
      .get(this.path)
      .then((response) => response.data.data.books as Book[]);
  }
}

const booksApi = new BooksApi();

export default booksApi;
