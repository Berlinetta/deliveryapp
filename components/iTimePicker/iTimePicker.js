Component({
  behaviors: ['wx://form-field'],
  properties: {
    title: {
      type: String,
      value: ""
    },
    startTime: {
      type: String,
      value: ""
    },
    endTime: {
      type: String,
      value: ""
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
