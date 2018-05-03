import ApiSdk from "./sdk/ApiSdk";
import BasicInfoService from "./services/BasicInfoService";
import Promise from "./packages/bluebird/index";

App({
    onLaunch: function () {
        const that = this;
        that.wechatIdP = BasicInfoService.getWechatId();
        that.wxUserInfoP = BasicInfoService.getWxUserInfo();
        that.myUserInfoP = BasicInfoService.getMyUserInfo();
        that.productsP = ApiSdk.ProductsService.getProducts();
        that.basicInfoP = Promise.props([that.wechatIdP, that.wxUserInfoP, that.myUserInfoP, that.productsP]).then(() => {
            that.globalData.wechatId = 1;
        });
    },
    globalData: {
        wechatId: "2001",//2001:销售 2002:调度 2003:司机
        products: [],
        wxUserInfo: null,
        myUserInfo: null
    },
    wechatIdP: null,
    productsP: null,
    wxUserInfoP: null,
    myUserInfoP: null
});