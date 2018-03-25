import WxResource from "../../../packages/wx-resource/index.js";

Page({
  data: {
    items: []
  },
  onLoad: function (options) {
    this.WxResource = new WxResource('https://api.github.com/users/:id/repos', {
      id: '@id'
    });
    this.interceptors();
    this.getRepos("Berlinetta");
  },
  interceptors() {
    this.WxResource.interceptors.use({
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
  getRepos(id) {
    const params = {
      id
    };
    this.WxResource.getAsync(params)
      .then(res => {
        this.setData({
          items: res.data.sort((a, b) => b.stargazers_count - a.stargazers_count)
        });
      });
  }
})