import BasicInfoService from "../../business/BasicInfoService";

const app = getApp();

Page({
    data: {},
    onLoad: function () {
    },
    authorizeMe: function () {
        BasicInfoService.authorize().then(() => {
            app.globalData.authorized = true;
            BasicInfoService.getWxUserInfo().then((res) => {
                app.globalData.wxUserInfo = res;
                wx.navigateBack();
            }).catch((err) => {
                console.log(err);
            });
        }).catch((e) => {
            app.globalData.authorized = false;
        });
    }
});
