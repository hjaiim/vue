/**
 * Created by billy on 2016/11/30.
 */
var WEB_CONFIG = {
	mode: ["debug"], //工作模式

	path: {
		domain: "{$host}/milky-tea/mobile",
		base: "{$domain}/{$ver}",
		assets: "{$base}/assets",
		data: "{$assets}/data",
		images: "{$assets}/images",
		template: "{$assets}/template"
	},

	url: {
		domain: "",
		server: "http://118.31.2.115:8001",
	},

	http: {
		method: "post",
		credentials: true,
		repeatReqTime: 2000,
		req: {
			result: {
				name: "code",
				type: "number",
				success: 0
			},
			data: {
				name: "data"
			},
			error: {
				name: "status",
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
		timeout: 50000
	},

	param: {
		defaultLang: "cn",
		loginExpires: 10 * 60,
		pageSize: 9
	}

}

try
{
	WEB_CONFIG.path.ver = ver;
}
catch (err)
{
	WEB_CONFIG.path.ver = "./";
}
var production = {};