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

module.exports = {
	formatTime,
	formatDate,
	showModal
}
