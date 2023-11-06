import { LOCAL_STORAGE_USER_REF } from "@/utils/constants";
import httpClient from "./httpClient";

class UsersApi {
  async getCurrentUserFavouriteBook() {
    const username = localStorage.getItem(LOCAL_STORAGE_USER_REF);

    return httpClient
      .get(`/users/${username}/favorites`)
      .then((response) => response.data.data.favorites.book as string);
  }

  async addFavourite(username: string, favouriteBookId: string) {
    httpClient.post(`/users/${username}/favorites`, {
      book: favouriteBookId,
    });
  }
}

const usersApi = new UsersApi();

export default usersApi;
