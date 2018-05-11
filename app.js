import ApiSdk from "./sdk/ApiSdk";
import BasicInfoService from "./business/BasicInfoService";
import Promise from "./packages/bluebird/index";

const updateUserForTest = (app) => {
    app.basicInfoPromise.then(() => {
        app.globalData.wechatId = "2001";//2001:销售 2002:调度 2003:司机
        app.globalData.myUserInfo.wechatId = "2001";
        app.globalData.myUserInfo.type = "1";
    });
};

App({
    onLaunch: function () {
        const that = this;
        const obj = {
            wechatId: BasicInfoService.getWechatId(),
            myUserInfo: BasicInfoService.getMyUserInfo(),
            products: ApiSdk.ProductsService.getProducts(),
            models: ApiSdk.ProductsService.getModels(),
            authorized: BasicInfoService.authorized()
        };
        that.basicInfoPromise = Promise.props(obj).then((res) => {
            const {wechatId, myUserInfo, products, models} = res;
            const basicInfo = {wechatId, myUserInfo, products, models};
            Object.assign(that.globalData, basicInfo);
            return basicInfo;
        }).catch((e) => {
            console.log(e);
        });
        //updateUserForTest(that);
    },
    globalData: {
        wechatId: "",
        products: [],
        models: [],
        wxUserInfo: null,
        myUserInfo: null,
        authorized: false
    },
    basicInfoPromise: Promise.reject()
});