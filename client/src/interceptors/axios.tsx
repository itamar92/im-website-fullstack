import axios from "axios";


axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(resp => resp,async error => {
  if(error.response.status === 401) {
    const response = await axios.post('token/refresh');

    if(response.status === 200) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Brearer ${response.data.token}`;

      return axios(error.config);
    }
  }

  return error;
})

