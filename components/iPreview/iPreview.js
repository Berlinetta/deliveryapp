
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
        showPrimaryAction: {
            type: Boolean,
            value: true,
        },
        primaryActionText: {
            type: String,
            value: "Primary Action"
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
    }
})
