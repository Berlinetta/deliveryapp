import Config from "../../config.js";
import WxRequest from "../../packages/wx-request/index.js";

class BaseService {
  constructor() {
    this.baseURL = Config.apiBaseURL;
    this.token = Config.apiToken;
    this.wxRequest = new WxRequest({ baseURL: this.baseURL });
  }

  getRequest(url, data) {
    const reqData = Object.assign({}, data ? data : {}, {
      token: this.token
    });
    return this.wxRequest.getRequest(url, { data: reqData });
  }

  postRequest(url, data) {
    const reqData = Object.assign({}, data ? data : {}, {
      token: this.token
    });
    return this.wxRequest.postRequest(url, { data: reqData });
  }
}

export default BaseService;