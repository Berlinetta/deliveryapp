import moment from "../../packages/moment/moment.min.js";
import WxValidate from "../../packages/wx-validate/WxValidate.js";

Page({
  data: {
    currentDate: moment().format('YYYY-MM-DD hh:mm:ss'),
    cargoTypes: ["货物1", "货物2", "货物3"],
    cargoTypeIndex: 2,
    cargoModels: ["型号1", "型号2", "型号3"],
    cargoModelIndex: 1,
    cargoCounts: ["10", "20", "30"],
    cargoCountIndex: 0,
    date: "2018-3-13",
    time: "09:30",
    tel: {
      countryCodeIndex: 0,
      number: ""
    }
  },
  onLoad(options) {
    this.initValidate();
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false
    })
  },
  formSubmit(e) {
    if (!this.wxValidate.checkForm(e)) {
      const error = this.wxValidate.errorList[0];
      this.showModal(error);
      return false;
    }
    this.showModal({
      msg: "提交成功"
    });
  },
  cancelSubmit(event) {
    wx.navigateBack();
  },
  initValidate() {
    const rules = {
      id: {
        required: true,
      },
      arrivalDate: {
        required: true
      },
      arrivalTime: {
        required: true//tel: true,
      },
      constructionSiteName: {
        required: true
      },
      cargoType: {
        required: true
      },
      cargoModel: {
        required: true
      },
      cargoCount: {
        required: true
      },
      consigneeTelephone: {
        telephoneRequired: true,
        telephone: true
      }
    };
    const messages = {
      id: {
        required: "请输入编号"
      },
      arrivalDate: {
        required: "请输入到货日"
      },
      arrivalTime: {
        required: "请输入到货时间"
      },
      constructionSiteName: {
        required: "请输入工地名称"
      },
      cargoType: {
        required: "请输入货物种类"
      },
      cargoModel: {
        required: "请输入货物型号"
      },
      cargoCount: {
        required: "请输入货物数量"
      },
      consigneeTelephone: {
        telephoneRequired: "请输入收货人电话",
        telephone: "请输入正确的收货人电话"
      }
    };
    this.wxValidate = new WxValidate(rules, messages);
    this.wxValidate.addMethod("telephoneRequired", (value, param) => {
      return value.number !== "";
    }, "请输入号码");
    this.wxValidate.addMethod("telephone", (value, param) => {
      return value && this.wxValidate.methods.tel(value.number);
    }, "请输入正确的号码");
  }
});