import moment from "../../packages/moment/moment.min.js";
import WxValidate from "../../packages/wx-validate/WxValidate.js";
import ApiSdk from "../../sdk/ApiSdk.js";
import Util from "../../utils/util.js";
import $wuxLoading from '../../packages/wux/loading/loading.js'

const app = getApp();

Page({
    data: {
        cargoTypes: [],
        cargoTypeIndex: 0,
        cargoModels: [],
        cargoModelIndex: 0,
        cargoCounts: ["15000以下", "15000以上"],
        cargoPrice: 0,
        cargoCount: 0,
        payTypes: ["线上支付", "线下支付"],
        payTypeIndex: 0,
        ordAddresses: ["address 1", "address 2", "address 3"],
        date: moment().add(1, 'days').format('YYYY-MM-DD'),
        tel: {
            countryCodeIndex: 0,
            number: ""
        }
    },
    onLoad(options) {
        this.initValidate();
        const {products, models} = app.globalData;
        this.setData({cargoTypes: products.map((p) => p.proName), cargoModels: models.map(m => m.modelName)});
        this.selectProduct(this.data.cargoTypeIndex);
    },
    formSubmit(e) {
        if (!this.wxValidate.checkForm(e)) {
            const error = this.wxValidate.errorList[0];
            Util.showModal(error);
            return false;
        }
        const {arrivalDate, cargoCount, cargoModel, ordPhone, ordAddress, ordUser, payType}
            = e.detail.value;
        const selectedProduct = app.globalData.products[this.data.cargoTypeIndex];
        const selectedModel = app.globalData.models[parseInt(cargoModel)];
        const orderInfo = {
            wechatId: app.globalData.wechatId,
            ordAddress: this.data.ordAddresses[parseInt(ordAddress)],
            ordUser,
            ordPhone: ordPhone.number,
            payType: parseInt(payType) + 1,
            endOrderTime: arrivalDate,
            orderDetail: JSON.stringify([{
                productId: selectedProduct.id,
                productName: selectedProduct.proName,
                proNum: this.data.cargoCounts[parseInt(cargoCount)],
                proPrice: selectedProduct.proPrice,
                proModel: selectedModel.id
            }])
        };
        $wuxLoading.show({text: "订单生成中..."});
        ApiSdk.OrdersService.createOrder(orderInfo).then(() => {
            $wuxLoading.hide();
            Util.showModal({msg: "提交成功"}, () => {
                wx.navigateBack();
            });
        }).catch((res) => {
            $wuxLoading.hide();
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
            arrivalDate: {
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
            ordPhone: {
                telephoneRequired: true,
                telephone: true
            }
        };
        const messages = {
            arrivalDate: {
                required: "请输入到货日"
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
            ordPhone: {
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
        const {products} = app.globalData;
        const selectedProduct = products[productIndex];
        this.setData({
            cargoTypeIndex: productIndex,
            cargoPrice: selectedProduct.proPrice
        });
    },
    handleCargoTypeChange(e) {
        this.selectProduct(e.detail);
    }
});