import WxValidate from "./WxValidate.js";

const validationMethods = {
  telephoneRequired: {
    validate: (value, param) => {
      return value.number !== "";
    },
    defaultMessage: "请输入号码"
  },
  telephone: {
    validate: (value, param) => {
      return value && new WxValidate().methods.tel(value.number);
    },
    defaultMessage: "请输入正确的号码"
  }
};

const addValidationMethods = (wxValidate, methods = validationMethods) => {
  Object.keys(methods).forEach((k) => {
    wxValidate.addMethod(k, methods[k].validate, methods[k].defaultMessage);
  });
};

export { addValidationMethods, validationMethods };