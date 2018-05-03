import ApiSdk from "../sdk/ApiSdk";
import Promise from "../packages/bluebird/index";

class BasicInfoService {
    constructor() {
        this.app = getApp();
    }

    getLoginCode() {
        return new Promise(function (resolve, reject) {
            wx.login({
                success: function (res) {
                    resolve(res.code);
                },
                fail: function () {
                    reject();
                }
            });
        });
    }

    getWechatId() {
        return this.getLoginCode().then((code) => {
            if (!code) {
                return "";
            }
            return ApiSdk.AuthenticationService.getOpenId(code).then((openid) => {
                console.log("wechatid:" + openid);
                return openid;
            });
        });
    }

    getWxUserInfo() {
        return new Promise(function (resolve, reject) {
            wx.getUserInfo({
                success: res => {
                    resolve(res.userInfo);
                },
                fail: () => {
                    reject({});
                }
            });
        });
    }

    getMyUserInfo() {
        return this.getWechatId().then(function (id) {
            return ApiSdk.MembersService.getMember(id).then(res => {
                if (res.data && res.data.success == "1") {
                    return res.data.member;
                }
                return {};
            });
        });
    }
}

const instance = new BasicInfoService();

export default instance;