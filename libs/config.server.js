/**
 * Created by billy on 2016/11/30.
 */
var WEB_CONFIG = {
	mode: ["release","debug"], //工作模式

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
		server: "http://47.96.176.167:8101/",
	},
	http: {
		method: "post",
		credentials: true,
		repeatReqTime: 2000,
		req: {
			result: {
				name: "status",
				type: "number",
				success: 1
			},
			data: {
				name: "data"
			},
			error: {
				name: "error",
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
		pageSize: 9,
		accountRegExp: /^1(3|4|5|7|8)\d{9}$/,
		passwordRegExp: /^\w{6,20}$/,
		hotMapMax:1000,
		hotMapOptions: {
			gradient: {
				.25: '#3242fc',
				.50: '#3ce058',
				.75: '#ffcc00',
				.90: '#fc0000'
			},
			opacity: 0.7
		},
		radiusRatio: 50,
		hotMapLevel: 15,
		level:5,
		hotMapMinZoom:15,
		hotMapMaxZoom:19
	}
}

WEB_CONFIG.path.ver = ver || "./";
var production = {};