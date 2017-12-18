/**
 * Created by billy on 2016/11/30.
 */


var WEB_CONFIG = {
	mode: ["debug", "testData"], //工作模式

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
		pageSize: 20,
		accountRegExp: /^1(3|4|5|7|8)\d{9}$/,
		passwordRegExp: /^\w{6,20}$/,
		hotMapMax: 1000,
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
		level: 5,
		hotMapMinZoom: 15,
		hotMapMaxZoom: 19
	}
};

WEB_CONFIG.path.ver = ver || "./";
var production = {};