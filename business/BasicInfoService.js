import ApiSdk from "../sdk/ApiSdk";
import Promise from "../packages/bluebird/index";

class BasicInfoService {
    constructor() {
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
        }).catch((e) => {
            console.log("getWechatId error: " + e.toString());
            return "";
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
        }).catch((e) => {
            console.log("getMyUserInfo error: " + e.toString());
            return {};
        });
    }
}

const instance = new BasicInfoService();

export default instance;