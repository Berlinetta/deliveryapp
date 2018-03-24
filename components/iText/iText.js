Component({
  behaviors: ['wx://form-field'],
  properties: {
    title: {
      type: String,
      value: "",
    },
    placeholder: {
      type: String,
      value: "",
    }
  },
  data: {

  },
  methods: {
    updateValue: function (e) {
      this.setData({
        value: e.detail.value
      })
    }
  }
})
