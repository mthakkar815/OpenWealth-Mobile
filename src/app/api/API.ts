// React
import axios from "axios";

const timeout = 180;
const timeoutSeconds = 1000 * timeout;
const apiClient = axios.create();
apiClient.defaults.timeout = timeoutSeconds;

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
