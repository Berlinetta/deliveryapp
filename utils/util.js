const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

const formatDate = n => {
	return "this is dtae";
}

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
	})
}

const formatUnicorn = function (thisStr, ...argus) {
	var str = thisStr.toString();
	if (argus.length) {
		var t = typeof argus[0];
		var key;
		var args = ("string" === t || "number" === t) ?
			Array.prototype.slice.call(argus)
			: argus[0];

		for (key in args) {
			str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
		}
	}
	return str;
};

module.exports = {
	formatTime,
	formatDate,
	formatUnicorn,
	showModal
}
