Component({
  behaviors: ['wx://form-field'],
  properties: {
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
    countryCodes: ["+86", "+88"]
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
