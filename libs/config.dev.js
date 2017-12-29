/**
 * Created by billy on 2016/11/30.
 */


var WEB_CONFIG = {
	mode: ["debug"], //工作模式

	path: {
		domain: "{$host}",
		base: "{$domain}/{$ver}",
		assets: "{$base}/assets",
		data: "{$assets}/data",
		images: "{$assets}/images",
		template: "{$assets}/template",
		libs: "{$base}/libs"
	},

	url: {
		domain: "",
// 		server: "http://192.168.12.4:8080/"
		server: "http://192.168.12.5:8080/"
	},
	http: {
		method: "post",
		credentials: true,
		repeatReqTime: 2000,
		req: {
			result: {
				name: "code",
				type: "number",
				success: 2000
			},
			data: {
				name: "data"
			},
			error: {
				name: "code",
				type: "number"
			},
			errorMsg: {
				name: "msg",
				type: "string"
			},
			mime: "json"
		}
	},

	file: {

		staticData: "{$data}/staticData.data",

	},

	net: {
		timeout: 5000
	},

	param: {
		defaultLang: "cn",
		loginExpires: 10 * 60,
		sendCodeTime: 5,
		phoneReg: /^1(3|4|5|7|8)\d{9}$/,
		accountReg: /^[a-z0-9]{6,16}$/,
		passwordReg: /^[a-z0-9]{6,16}$/,
		nameReg: /^[\u2E80-\u9FFF]{2,10}/,
		compNameReg: /^[\u2E80-\u9FFF]{2,40}/,
		telphoneReg: /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8}/,
		emailReg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
		codeReg: /\d{4}/,
		ossUrl: "http://test.boms.huanwuh5.com/boms/upload/",
		uploadAccess: "http://121.41.80.45:8001/file/upload",
		delPicAccess: "http://121.41.80.45:8001/file/del",
		timeoutClock:10,
		pageSize:10
	}
};

WEB_CONFIG.path.ver = ver || "./";
var production = {};