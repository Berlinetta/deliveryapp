const getButtonStatus = function (data) {
    return {
        isPrevButtonDisabled: data.pageIndex < 1,
        isNextButtonDisabled: data.pageIndex >= data.totalPages - 1
    };
};

const getTotalPages = function (totalRecords, pageSize) {
    const mo = totalRecords % pageSize;
    return mo == 0 ? totalRecords / pageSize : (totalRecords - mo) / pageSize + 1;
};

Component({
    properties: {
        pageIndex: {
            type: Number,
            value: 0
        },
        pageSize: {
            type: Number,
            value: 0
        },
        totalRecords: {
            type: Number,
            value: 0
        }
    },
    data: {
        isPrevButtonDisabled: false,
        isNextButtonDisabled: false,
        totalPages: 0
    },
    ready: function () {
        const {totalRecords, pageSize} = this.data;
        this.setData({totalPages: getTotalPages(totalRecords, pageSize)});
        this.setData(getButtonStatus(this.data));
    },
    methods: {
        goToPrev: function () {
            const currIndex = this.data.pageIndex;
            if (currIndex >= 1) {
                this.setData({pageIndex: currIndex - 1});
                this.setData(getButtonStatus(this.data));
                this.triggerEvent('onchange', this.data);
            }
        },
        goToNext: function () {
            const currIndex = this.data.pageIndex;
            if (currIndex <= this.data.totalPages - 2) {
                this.setData({pageIndex: currIndex + 1});
                this.setData(getButtonStatus(this.data));
                this.triggerEvent('onchange', this.data);
            }
        }
    }
});
