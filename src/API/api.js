import * as axios from "axios";

const instance = axios.create({
  baseURL: "https://",
  withCredentials: true,
  headers: {
    "": "",
  },
});

export const authAPI = {
  getAuth() {
    return instance.get(`auth/me`);
  },
  login(login, password, rememberMe = false, captcha = null) {
    return instance.post(
      `auth/login`,
      // {},
      {
        email: login,
        password: password,
        rememberMe: rememberMe,
        captcha: captcha,
      }
    );
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};
