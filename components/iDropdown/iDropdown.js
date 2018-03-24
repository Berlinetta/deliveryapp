Component({
  behaviors: ['wx://form-field'],
  properties: {
    title: {
      type: String,
      value: "",
    },
    values: {
      type: Array,
      value: [],
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
