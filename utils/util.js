const showModal = (obj, confirmCallback, cancelCallback) => {
    wx.showModal({
        content: obj.msg,
        showCancel: false,
        success: function (res) {
            if (res.confirm && confirmCallback) {
                confirmCallback();
            }
            if (res.cancel && cancelCallback) {
                cancelCallback();
            }
        }
    });
};

const formatUnicorn = function (thisStr, ...argus) {
    var str = thisStr.toString();
    if (argus.length) {
        var t = typeof argus[0];
        var key;
        var args = ("string" === t || "number" === t) ? Array.prototype.slice.call(argus) : argus[0];
        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }
    return str;
};

module.exports = {
    formatUnicorn,
    showModal
};
