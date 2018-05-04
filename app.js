import ApiSdk from "./sdk/ApiSdk";
import BasicInfoService from "./services/BasicInfoService";
import Promise from "./packages/bluebird/index";

App({
    onLaunch: function () {
        const that = this;
        const obj = {
            wechatId: BasicInfoService.getWechatId(),
            wxUserInfo: BasicInfoService.getWxUserInfo(),
            myUserInfo: BasicInfoService.getMyUserInfo(),
            products: ApiSdk.ProductsService.getProducts()
        };
        that.basicInfoPromise = Promise.props(obj).then((res) => {
            const {wechatId, wxUserInfo, myUserInfo, products} = res;
            const basicInfo = {wechatId, wxUserInfo, myUserInfo, products};
            Object.assign(that.globalData, basicInfo);
            return basicInfo;
        });
    },
    globalData: {
        wechatId: "2001",//2001:销售 2002:调度 2003:司机
        products: [],
        wxUserInfo: null,
        myUserInfo: null
    },
    basicInfoPromise: Promise.reject()
});