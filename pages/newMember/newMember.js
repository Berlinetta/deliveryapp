import WxValidate from "../../packages/wx-validate/WxValidate.js";
import {addValidationMethods} from "../../packages/wx-validate/ValidationMethods.js";
import ApiSdk from "../../sdk/ApiSdk";
import Util from "../../utils/util.js";

const app = getApp();

Page({
    data: {
        userTypes: ["销售", "调度", "司机"],
        userTypeIndex: 0,
        tel: {
            countryCodeIndex: 0,
            number: ""
        }
    },
    onLoad(options) {
        this.initValidate();
    },
    formSubmit(e) {
        if (!this.wxValidate.checkForm(e)) {
            const error = this.wxValidate.errorList[0];
            Util.showModal(error);
            return false;
        }
        var {name, telephone, userType} = e.detail.value;
        userType = parseFloat(userType) + 1;
        ApiSdk.MembersService.createMember(app.globalData.wechatId, name, telephone.number, userType).then(res => {
            Util.showModal({
                msg: "提交成功"
            }, () => {
                wx.switchTab({
                    url: '../index/index'
                });
            });
        }).catch(res => {
            Util.showModal({
                msg: "提交失败！错误详情：" + res.toString()
            });
        });
    },
    cancelSubmit(event) {
        wx.navigateBack();
    },
    initValidate() {
        const rules = {
            name: {
                required: true,
            },
            telephone: {
                telephoneRequired: "请输入手机号",
                telephone: "请输入正确的手机号"
            },
            userType: {
                required: true
            }
        };
        const messages = {
            name: {
                required: "请输入姓名"
            },
            telephone: {
                telephoneRequired: "请输入手机号",
                telephone: "请输入正确的手机号"
            },
            userType: {
                required: "请填写用户角色"
            }
        };
        this.wxValidate = new WxValidate(rules, messages);
        addValidationMethods(this.wxValidate);
    }
});