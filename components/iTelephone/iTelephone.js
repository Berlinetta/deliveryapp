import validationBehavior from "../common/behaviors/validationBehavior.js";

Component({
  behaviors: [validationBehavior, "wx://form-field"],
  properties: {
    title: {
      type: String,
      value: "",
    },
    placeholder: {
      type: String,
      value: "",
    },
    value: {
      type: Object,
      value: {
        countryCodeIndex: 0,
        number: ""
      }
    }
  },
  data: {
    countryCodes: ["+86"]
  },
  methods: {
    handleCountryCodeUpdate: function (e) {
      this.setData({
        value: {
          countryCodeIndex: e.detail.value,
          number: this.data.value.number
        }
      })
    },
    handleTextUpdate: function (e) {
      this.setData({
        value: {
          countryCodeIndex: this.data.value.countryCodeIndex,
          number: e.detail.value
        }
      });
    },
    handleTextConfirm: function (e) {
      console.log(e.detail.value);
    }
  }
})
