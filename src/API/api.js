// import * as axios from "axios";

// const instance = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com",
//   // withCredentials: true,
//   // headers: {
//   //   "": "",
//   // },
// });

// export const usersAPI = {
//   getUsers() {
//     return instance.get(`users`).then((response) => {
//       console.log(response);
//       return response.data;
//     });
//   },

// getAuth() {
//   return instance.get(`auth/me`);
// },
// login(login, password, rememberMe = false, captcha = null) {
//   return instance.post(
//     `auth/login`,
//     // {},
//     {
//       email: login,
//       password: password,
//       rememberMe: rememberMe,
//       captcha: captcha,
//     }
//   );
// },
// logout() {
//   return instance.delete(`auth/login`);
// },
// };
