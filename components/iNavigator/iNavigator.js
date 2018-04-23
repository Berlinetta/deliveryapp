Component({
    properties: {
        url: {
            type: String,
            value: "",
        },
        title: {
            type: String,
            value: "",
        },
        subtitle: {
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
        },
        ontap: function () {
            this.triggerEvent('ontap');
        }
    }
})
