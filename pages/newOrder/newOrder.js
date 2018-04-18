import moment from "../../packages/moment/moment.min.js";
import WxValidate from "../../packages/wx-validate/WxValidate.js";
import ApiSdk from "../../sdk/ApiSdk.js";

const app = getApp();

Page({
  data: {
    currentDate: moment().format('YYYY-MM-DD hh:mm:ss'),
    cargoTypes: [],
    cargoTypeIndex: 0,
    cargoModels: [],
    cargoModelIndex: 0,
    cargoUnit: "",
    cargoPrice: 0,
    payTypes: ["线上支付", "线下支付"],
    payTypeIndex: 0,
    date: moment().add(1, 'days').format('YYYY-MM-DD'),
    time: moment().format("hh:mm"),
    tel: {
      countryCodeIndex: 0,
      number: ""
    }
  },
  onLoad(options) {
    this.initValidate();
    const { products } = app.globalData;
    this.setData({ cargoTypes: products.map((p) => p.proName) });
    this.selectProduct(this.data.cargoTypeIndex);
  },
  showModal(obj) {
    wx.showModal({
      content: obj.msg,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack();
        }
      }
    })
  },
  formSubmit(e) {
    if (!this.wxValidate.checkForm(e)) {
      const error = this.wxValidate.errorList[0];
      this.showModal(error);
      return false;
    }
    //all fields in UI: arrivalDate, arrivalTime, cargoCount, cargoModel, cargoPrice, cargoUnit, consigneeTelephone, 
    //constructionSiteAddress, constructionSiteName, constructorCompanyName, payType, submissionDateTime

    const { arrivalDate, arrivalTime, cargoCount, cargoModel, cargoPrice, cargoUnit, consigneeTelephone, constructionSiteAddress, constructionSiteName, constructorCompanyName, payType, submissionDateTime } = e.detail.value;
    const selectedProduct = app.globalData.products[this.data.cargoTypeIndex];
    const totalPrice = parseFloat(cargoPrice) * parseFloat(cargoCount);
    const orderInfo = {
      ordAddress: constructionSiteAddress,
      ordMoney: totalPrice,
      payType: parseInt(payType) + 1,
      productId: selectedProduct.id,
      productName: selectedProduct.proName,
      proNum: cargoCount,
      proPrice: selectedProduct.proPrice,
      proSumPrice: totalPrice,
      proModel: selectedProduct.proModel
    };
    ApiSdk.OrdersService.createOrder(orderInfo).then(() => {
      this.showModal({
        msg: "提交成功"
      });
    }).catch((res) => {
      this.showModal({
        msg: "提交失败！错误详情：" + res.toString()
      });
    });
  },
  cancelSubmit(event) {
    wx.navigateBack();
  },
  initValidate() {
    const rules = {
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
  },
  selectProduct(productIndex) {
    const { products } = app.globalData;
    const selectedProduct = products[productIndex];
    this.setData({ cargoTypeIndex: productIndex, cargoModels: [selectedProduct.proModel], cargoUnit: selectedProduct.proUnit, cargoPrice: selectedProduct.proPrice });
  },
  handleCargoTypeChange(e) {
    this.selectProduct(e.detail);
  }
});