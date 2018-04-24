
Component({
    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        items: {
            type: Array,
            value: [],
        },
        primaryUrl: {
            type: String,
            value: ""
        },
        showPrimaryAction: {
            type: Boolean,
            value: true,
        },
        primaryActionText: {
            type: String,
            value: "Primary Action"
        },
        secondaryUrl: {
            type: String,
            value: ""
        },
        showSecondaryAction: {
            type: Boolean,
            value: true,
        },
        secondaryActionText: {
            type: String,
            value: "Secondary Action"
        }
    },
    data: {
    },
    methods: {
        onPrimaryTap: function () {
            this.triggerEvent('onPrimaryTap');
        },
        onSecondaryTap: function () {
            this.triggerEvent('onSecondaryTap');
        }
    }
})
