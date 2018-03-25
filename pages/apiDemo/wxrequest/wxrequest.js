import WxRequest from "../../../packages/wx-request/index.js";

Page({
  data: {
    items: []
  },
  onLoad: function (options) {
    this.wxRequest = new WxRequest({ baseURL: 'https://api.github.com/' });
    this.interceptors();
    this.getRepos();
  },
  interceptors() {
    this.wxRequest.interceptors.use({
      request(req) {
        wx.showLoading({
          title: '加载中...',
        });
        return req;
      },
      requestError(reqError) {
        wx.hideLoading();
        return Promise.reject(reqError);
      },
      response(res) {
        wx.hideLoading();
        return res;
      },
      responseError(resError) {
        wx.hideLoading();
        return Promise.reject(resError);
      }
    });
  },
  getRepos() {
    this.wxRequest.getRequest('/users/Berlinetta/repos')
      .then(res => {
        this.setData({
          items: res.data.sort((a, b) => b.stargazers_count - a.stargazers_count)
        });
      });
  }
})