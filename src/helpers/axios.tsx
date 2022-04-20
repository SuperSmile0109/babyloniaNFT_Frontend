import axios from "axios";

const baseUrl = process.env.REACT_APP_BABY_BACKEND_URL;

console.log(baseUrl);
let headers = {};

// if (localStorage.token) {
//   //   headers.Authorization = `Bearer ${localStorage.token}`;
// }

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  // URL :{},
  headers,
  // proxy: {
  //   // protocol: 'https',
  //   host: "127.0.0.1",
  //   port: 8000,
  //   auth: {
  //     username: "mikeymike",
  //     password: "rapunz3l",
  //   },
  // },
});

// AxiosInstance.defaults.baseURL = baseUrl;
// AxiosInstance.defaults.url = baseUrl;
export default AxiosInstance;
