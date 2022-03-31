export const forEach = (arr, fn) => {
	if (!arr.length || !fn) return
	let i = -1
	let len = arr.length
	while (++i < len) {
		let item = arr[i]
		fn(item, i, arr)
	}
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
	let len = Math.min(arr1.length, arr2.length)
	let i = -1
	let res = []
	while (++i < len) {
		const item = arr2[i]
		if (arr1.indexOf(item) > -1) res.push(item)
	}
	return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
	return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
	return targetarr.some(_ => arr.indexOf(_) > -1)
}
/**
 * objToArray 对象转数组
 * @param objData 目标对象 { 10: '值'}
 * @returns {{label: any | string, value: string | string}[]}
 */
export const objToArray = (objData = {}) => {
	if(!!!objData) {
		console.error('参数有误');
		return [];
	};
	let arrayData = Object.entries(objData);
	let arr = arrayData.map(item => ({
		label: item[1] || '',
		value: item[0] || '',
	}));
	return arr;
};

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
	for (let i = 0; i < validList.length; i++) {
		if (value === validList[i]) {
			return true
		}
	}
	return false
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
	const timeStr = String(timeStamp)
	return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
	return timeStamp < currentTime
}
/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 金额千位分割处理
 */
export const amountSplit = num => {
	if((num*1) == NaN || num == 0){
		return '0.00';
	}else if(num*1 < 1000){
		return num;
	};
	let minNum = (num%1).toFixed(2)*100,intNumber = Math.floor(num) + '',number = '';
	intNumber.split('').reverse().forEach((res, index) =>{
		(index%3 !== 0 || index == 0) && (number += '' + res);
		index !== 0 && index%3 === 0 && (number += ',' + res);
	});
	let returnNumber = number.split('').reverse().join('');
	minNum*1 !== 0 && (returnNumber += '.' + Math.floor(minNum));
	return returnNumber;
};
/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 金额处理
 */
export const floorMoney = num => {
	if((num*1) == NaN || num == 0){
		return '0.00';
	}
	let number = (Math.floor(num * 10000) / 10000).toFixed(2);
	return number;
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
	return num < 10 ? '0' + num : num
}
/**
 * @param {Number} str 手机号码
 * @returns {String} 处理后的字符串
 * @description 手机号码加密处理
 */
export const encyMobile = mobile => {
	var mobileAfter = mobile.substring(0, 3);
	let i = 0;
	while ((mobile.length - 7) > i) {
		i++;
		mobileAfter += '*';
	}
	mobileAfter += mobile.substring(mobile.length - 4, mobile.length);
	return mobileAfter;
}
/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType) => {
	const d = new Date(timeStamp * 1000)
	const year = d.getFullYear()
	const month = getHandledValue(d.getMonth() + 1)
	const date = getHandledValue(d.getDate())
	const hours = getHandledValue(d.getHours())
	const minutes = getHandledValue(d.getMinutes())
	const second = getHandledValue(d.getSeconds())
	let resStr = ''
	if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
	else resStr = month + '-' + date + ' ' + hours + ':' + minutes
	return resStr
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
	// 判断当前传入的时间戳是秒格式还是毫秒
	const IS_MILLISECOND = isMillisecond(timeStamp)
	// 如果是毫秒格式则转为秒格式
	if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
	// 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
	timeStamp = Number(timeStamp)
	// 获取当前时间时间戳
	const currentTime = Math.floor(Date.parse(new Date()) / 1000)
	// 判断传入时间戳是否早于当前时间戳
	const IS_EARLY = isEarly(timeStamp, currentTime)
	// 获取两个时间戳差值
	let diff = currentTime - timeStamp
	// 如果IS_EARLY为false则差值取反
	if (!IS_EARLY) diff = -diff
	let resStr = ''
	const dirStr = IS_EARLY ? '前' : '后'
	// 少于等于59秒
	if (diff <= 59) resStr = diff + '秒' + dirStr
	// 多于59秒，少于等于59分钟59秒
	else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
	// 多于59分钟59秒，少于等于23小时59分钟59秒
	else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
	// 多于23小时59分钟59秒，少于等于29天59分钟59秒
	else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
	// 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
	else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
	else resStr = getDate(timeStamp, 'year')
	return resStr
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
	const ua = window.navigator.userAgent
	const isExplorer = (exp) => {
		return ua.indexOf(exp) > -1
	}
	if (isExplorer('MSIE')) return 'IE'
	else if (isExplorer('Firefox')) return 'Firefox'
	else if (isExplorer('Chrome')) return 'Chrome'
	else if (isExplorer('Opera')) return 'Opera'
	else if (isExplorer('Safari')) return 'Safari'
}
export const browser = {
	versions:function(){
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
			iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: u.match(/\sQQ/i) == " qq" //是否QQ
		};
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
};

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
	if (document.addEventListener) {
		return function (element, event, handler) {
			if (element && event && handler) {
				element.addEventListener(event, handler, false)
			}
		}
	} else {
		return function (element, event, handler) {
			if (element && event && handler) {
				element.attachEvent('on' + event, handler)
			}
		}
	}
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
	if (document.removeEventListener) {
		return function (element, event, handler) {
			if (element && event) {
				element.removeEventListener(event, handler, false)
			}
		}
	} else {
		return function (element, event, handler) {
			if (element && event) {
				element.detachEvent('on' + event, handler)
			}
		}
	}
})()

/**
 * 自动滚动弹窗的body置顶
 */
export const ModelScrollTop = () => {
	setTimeout(() => {
		var container = document.querySelector('.ivu-modal-body')
		let srollTop = container.scrollTop
		if (container.scrollTop > 0) {
			container.scrollTop = 0
		}
	}, 100)
}
/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
	const keysArr1 = Object.keys(obj1)
	const keysArr2 = Object.keys(obj2)
	if (keysArr1.length !== keysArr2.length) return false
	else if (keysArr1.length === 0 && keysArr2.length === 0) return true
	/* eslint-disable-next-line */
	else return !keysArr1.some(key => obj1[key] != obj2[key])
}
/**
 * @param { array } array 对象
 * @description 判断对象是否为数组
 */
export const isArray = function (array) {
	return Object.prototype.toString.call(array) == '[object Array]';
};
/**
 * @param { filePath } string 资源链接url
 * @description 截取链接的文件属性并返回
 */
export const isGetFileType = function (filePath) {
	var startIndex = filePath.lastIndexOf(".");
	if (startIndex != -1) {
		return filePath.substring(startIndex + 1, filePath.length).toLowerCase();
	} else {
		return "";
	}
};
/**
 * 银行简称截取
 * @param { obj } obj
 * @description new obj
 */
export const subBankName = function (bankName) {
	if(!!!bankName){
		return '-';
	}
	let bankNameLength = bankName.indexOf('银行')+2;
	return bankName.substring(0, bankNameLength);
};
/**
 * copyValue 复制功能
 * @param { val } val
 * @description blooean
 */
export const copyValue = function (val) {
	if (browser.versions.ios) {
		let input = document.createElement('input');
		input.setAttribute('readonly', 'readonly');
		input.setAttribute('value', val);
		input.setAttribute('id', 'copyInput');
		document.body.appendChild(input);
		window.getSelection().removeAllRanges();   //将页面所有的文本区域都从选区中移除
		var range = document.createRange();   //创建一个文本区域
		var test = window.document.getElementById('copyInput');  //获取所需要复制的节点
		range.selectNode(test);   //将我们的所选节点添加到文本区域中
		window.getSelection().addRange(range);  //将文本区域添加至选区中
		if (document.execCommand('copy')) {
			document.execCommand('copy');   //执行浏览器的复制命令
			setTimeout(() => {
				document.body.removeChild(input);
				window.getSelection().removeAllRanges();
			}, 500);
			return true;
		}else{
			return false;
		}

	}else{
		let value = val;
		let input = document.createElement('input');
		input.setAttribute('readonly', 'readonly');
		input.setAttribute('value', value);
		document.body.appendChild(input);
		input.select();
		if (document.execCommand('copy')) {
			document.execCommand('copy');
			setTimeout(() => {
				document.body.removeChild(input);
			}, 500);
			return true;
		}else{
			return false;
		}
	}


};
/**
 * 伪深拷贝(无法拷贝函数)
 * @param { obj } obj
 * @description new obj
 */
export const deepCopy = function (obj) {
	let objJson = JSON.parse(JSON.stringify(obj));
	return objJson;
};
/**
 * iframe 无跳转下载
 * @param { obj } obj
 * @description new obj
 */
export const downFileUrl = function (url) {
	let elem = document.createElement('iframe');
	elem.src = url;
	elem.style.display = 'none';
	document.body.appendChild(elem);
	if (elem.attachEvent) {
		elem.attachEvent("onload", function () {
			setTimeout(() => {
				document.body.removeChild(elem);
			}, 2000);
		});
	} else {
		elem.onload = () => {
			setTimeout(() => {
				document.body.removeChild(elem);
			}, 2000);
		};
	}
};
/**
 * @param { path } string 资源链接url
 * @description 微软文件打开链接
 */
export const openFile = function (path) {
	window.open('http://view.officeapps.live.com/op/view.aspx?src=' + path, "_blank");
};
/**
 * @param { path } string 资源链接url
 * @description 下载文件
 */
export const downLoadFile = function (path, name) {
	if (process.env.NODE_ENV === 'production') {
		window.location.assign('/common/down-load-files?file_path=' + path + '&file_name=' + name);
	} else {
		window.location.href = 'http://pre.apiunion.ysf.mobi/common/down-load-files?file_path=' + path + '&file_name=' + name;
	}
};
export const _tools = (function () {
	var transKeyName = function (type, json) {
		// 下划线字符串转小峰驼
		var toCamel = function (str) {
			var str2 = '';
			if (str.indexOf('_') < 0) {
				str2 = str;
			} else {
				var words = (str || '').split('_');
				for (var i = 1; i < words.length; i++) {
					words[i] = words[i].substr(0, 1).toUpperCase() + words[i].substr(1);
				}
				str2 = words.join('');
			}
			return str2;
		};
		//小峰驼字符串转下划线
		var toUnderline = function (str) {
			var str2 = '';
			if ((/[A-Z]/).test(str)) {
				str2 = str.replace(/([A-Z])/g, function ($1) {
					return '_' + $1.toLowerCase();
				});
			} else {
				str2 = str;
			}
			return str2;
		};
		var transform = function (json, json2) {
			for (var p in json) {
				if (json.hasOwnProperty(p)) {
					var key;
					//字符串进行键名转换
					if (!/^\d+$/.test(p)) {
						if (type == 'camel') {
							key = toCamel(p);
						} else if (type == 'underline') {
							key = toUnderline(p);
						}
					}
					//数值直接传递
					else {
						key = parseInt(p);
					}
					//属性为对象时，递归转换
					if (json[p] instanceof Object) {
						json2[key] = transform(json[p], isArray(json[p]) ? [] : {});
					}
					//属性非对象，为字符串但内容符合json格式，递归转换
					else if ((typeof json[p] == 'string') && /^[\{\[]+("([a-zA-Z][a-zA-Z0-9\-_]*?)"\:(.+?))+[\}\]]+$/.test(json[p])) {
						json2[key] = JSON.parse(json[p]);
						json2[key] = transform(json2[key], isArray(json2[key]) ? [] : {});
						json2[key] = JSON.stringify(json2[key]);
					}
					//属性非对象，非json字符串，直接传递
					else {
						json2[key] = json[p];
					}
				}
			}
			return json2;
		};
		return transform(json, isArray(json) ? [] : {});
	};

	var urlParams = null;
	var getUrlParams = function (forceGetAgain) {
		if (!urlParams || forceGetAgain) {
			var url = decodeURIComponent(location.search);
			urlParams = {};
			var arr = (url || '').split("?");
			if (arr.length > 1) {
				arr = (arr[1] || '').split("&");
				for (var i = 0, l = arr.length; i < l; i++) {
					var a = (arr[i] || '').split("=");
					urlParams[a[0]] = a[1];
				}
				urlParams = transKeyName('camel', urlParams);
			}
		}
		return urlParams;
	};

	return {
		transKeyName: transKeyName,
		getUrlParams: getUrlParams
	};
})();

/**
 * photoCompress 读取file图片调用canvas复制图片裁剪
 * canvasDataURL 绘制canvas图片
 */
export const photoCompress = function (file, w, callback) {
	var ready = new FileReader();
	/*
	开始读取指定的Blob对象或File对象中的内容.
	当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,
	则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.
	*/
	ready.readAsDataURL(file);
	ready.onload = function () {
		var re = this.result;
		canvasDataURL(re, w, callback)
	}
};
export const canvasDataURL = function (path, obj, callback) {
	var img = new Image();
	img.src = path;
	img.onload = function () {
		var that = this;
		// 默认按比例压缩
		var w = that.width,
			h = that.height,
			scale = w / h;
		w = obj.width || w;
		h = obj.height || (w / scale);
		var quality = 0.7;  // 默认图片质量为0.7
		//生成canvas
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		// 创建属性节点
		var anw = document.createAttribute("width");
		anw.nodeValue = w;
		var anh = document.createAttribute("height");
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		ctx.drawImage(that, 0, 0, w, h);
		// 图像质量
		if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
			quality = obj.quality;
		}
		// quality值越小，所绘制出的图像越模糊
		var base64 = canvas.toDataURL('image/jpeg', quality);
		// 回调函数返回base64的值
		callback(base64);
	}
};
