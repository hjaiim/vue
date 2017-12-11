/**
 * Created by billy on 2016/12/19.
 */

var _id = "";
var _token = "";
var _username = "";
var _phone = "";
var _avatar = "";
var _rightList = "";
var _company = "";
var _department = "";
var _position = "";
var _contact = "";
var _email = "";
var _isVerifyed = "";
var _desc = "";

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
		$dObj.hasOwnProperty('username') && (_name = $dObj.username);
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
		_rights = [];
		_tel = "";
	}
}