import { $wuxGallery } from '../../packages/wux/wux.js';

const app = getApp();

Page({
  data: {
    manageActions: [
      { url: '../../resources/icons/manage/sales.png', text: "销售人员" },
      { url: '../../resources/icons/manage/dispacthers.png', text: "调度人员" },
      { url: '../../resources/icons/manage/drivers.png', text: "物流人员" },
      { url: '../../resources/icons/manage/goods.png', text: "产品" },
      { url: '../../resources/icons/manage/car.png', text: "车辆" },
      { url: '../../resources/icons/manage/money.png', text: "运费" }
    ],
    urls: [],
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    this.setData({ urls: this.data.manageActions.map(a => a.url) });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      };
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo
          })
        }
      });
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo
    });
  },
  showGallery(e) {
    const dataset = e.currentTarget.dataset
    const current = dataset.current
    const urls = this.data.urls

    // $wuxGallery.show({
    //   current: current,
    //   urls: urls,
    //   [`delete`](current, urls) {
    //     urls.splice(current, 1)
    //     this.setData({
    //       urls: urls,
    //     })
    //     return !0
    //   },
    //   cancel: () => console.log('Close gallery')
    // })
  },
  previewImage(e) {
    const dataset = e.currentTarget.dataset
    const current = dataset.current
    const urls = this.data.urls

    // wx.previewImage({
    //   current: current,
    //   urls: urls,
    // })
  },
  handleImageClick(e){

    //e.stopPropagation();
  }
});
