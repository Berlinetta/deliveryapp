const getButtonStatus = function (data) {
  return {
    isPrevButtonDisabled: data.currentPageIndex < 1,
    isNextButtonDisabled: data.currentPageIndex >= data.totalCount - 1,
  };
};

Component({
  properties: {
    currentPageIndex: {
      type: Number,
      value: 0
    },
    totalCount: {
      type: Number,
      value: 0
    }
  },
  data: {
    isPrevButtonDisabled: false,
    isNextButtonDisabled: false
  },
  ready: function () {
    this.setData(getButtonStatus(this.data));
  },
  methods: {
    goToPrev: function () {
      const currIndex = this.data.currentPageIndex;
      if (currIndex >= 1) {
        const newData = {
          currentPageIndex: currIndex - 1,
          totalCount: this.data.totalCount
        };
        this.setData(newData);
        this.setData(getButtonStatus(this.data));
        this.triggerEvent('onchange', newData);
      }
    },
    goToNext: function (e) {
      const currIndex = this.data.currentPageIndex;
      if (currIndex <= this.data.totalCount - 2) {
        const newData = {
          currentPageIndex: currIndex + 1,
          totalCount: this.data.totalCount
        };
        this.setData(newData);
        this.setData(getButtonStatus(this.data));
        this.triggerEvent('onchange', newData);
      }
    }
  }
});
