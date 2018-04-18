import ApiSdk from "./sdk/ApiSdk";

App({
  onLaunch: function () {
    wx.getUserInfo({
      success: res => {
        this.globalData.wxUserInfo = res.userInfo;
      }
    });
    ApiSdk.MembersService.getMember(this.globalData.wechatId).then(res => {
      if (res.data && res.data.success == "1") {
        this.globalData.myUserInfo = res.data.member;
      }
    });
    global.globalData = this.globalData;
  },
  globalData: {
    wechatId: "123",
    wxUserInfo: null,
    myUserInfo: null
  }
})