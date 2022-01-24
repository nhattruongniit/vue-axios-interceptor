import { axiosInstance } from "./initRequest";

class HttpRequest {
  constructor() {
    this.api = axiosInstance;
  }

  async get(url, config = {}, headers = {}) {
    const params = {
      ...config,
      headers: {
        ...headers,
      },
    };
    return this.api.get(url, params);
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;
