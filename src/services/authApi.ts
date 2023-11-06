import httpClient from "./httpClient";
import usersApi from "./usersApi";

class AuthApi {
  async signUp(
    params: { username: string; password: string },
    favouriteBookId: string
  ) {
    await httpClient.post("/users/new", params);

    await usersApi.addFavourite(params.username, favouriteBookId);
    localStorage.setItem("current_user_name", params.username);
  }

  async login(params: { username: string; password: string }) {
    return httpClient.post("/login", params);
  }
}

const authApi = new AuthApi();

export default authApi;
