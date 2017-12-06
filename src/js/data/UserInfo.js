/**
 * Created by billy on 2016/12/19.
 */
var _id = "";  				// 用户Id
var _account = "";    		//账号
var _name = ""; 			//用户名
var _pass = "";    		    //密码
var _rights = [];    		//权限
var _tel = "";      		//手机号

export default class UserInfo {
	constructor()
	{
	}

	/**
	 * 更新用户信息
	 * @param $dObj 用户信息数据结构
	 */
	update($dObj)
	{
		$dObj.hasOwnProperty('id') && (_id = $dObj.id);
		$dObj.hasOwnProperty('name') && (_name = $dObj.name);
		$dObj.hasOwnProperty('account') && (_account = $dObj.account);
		$dObj.hasOwnProperty('pass') && (_pass = $dObj.pass);
		$dObj.hasOwnProperty('rights') && (_rights = JSON.parse($dObj.rights));
		$dObj.hasOwnProperty('tel') && (_tel = $dObj.tel);
	}

	get id()
	{
		return _id;
	}

	get name()
	{
		return _name;
	}

	get account()
	{
		return _account;
	}

	get pass()
	{
		return _pass;
	}

	set pass($data){
		_pass = $data
	}

	get rights()
	{
		return _rights;
	}

	get tel()
	{
		return _tel;
	}

	removeAll()
	{
		_id = "";
		_account = "";
		_name = "";
		_pass = "";
		_rights =[];
		_tel = "";
	}
}