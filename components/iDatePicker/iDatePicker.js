import validationBehavior from "../common/behaviors/validationBehavior.js";

Component({
  behaviors: [validationBehavior, "wx://form-field"],
  properties: {
    title: {
      type: String,
      value: ""
    },
    startDate: {
      type: String,
      value: ""
    },
    endDate: {
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
