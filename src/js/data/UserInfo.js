/**
 * Created by billy on 2016/12/19.
 */

var _id = 0;
var _username = "";
var _name = "";
var _phone = "";
var _roleId = 0;
var _contact = "";
var _email = "";
var _avatar = "";
var _rightList = [];
var _department = 0;
var _company = 0;
var _duty = 0;
var _isVerified = false;
var _remark = 0;
var _idCartFront = "";
var _idCartBack = "";
var _workCard = "";

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
		$dObj.hasOwnProperty('userId') && (_id = $dObj.userId);
		$dObj.hasOwnProperty('logon') && (_username = $dObj.logon);
		$dObj.hasOwnProperty('name') && (_name = $dObj.name);
		$dObj.hasOwnProperty('mobile') && (_phone = $dObj.mobile);
		$dObj.hasOwnProperty('roleId') && (_roleId = $dObj.roleId);
		$dObj.hasOwnProperty('telphone') && (_contact = $dObj.telphone);
		$dObj.hasOwnProperty('email') && (_email = $dObj.email);
		$dObj.hasOwnProperty('avatar') && (_avatar = $dObj.avatar);
		$dObj.hasOwnProperty('permissionList') && (_rightList = $dObj.permissionList);
		$dObj.hasOwnProperty('departmentId') && (_department = $dObj.departmentId);
		$dObj.hasOwnProperty('companyId') && (_company = $dObj.companyId);
		$dObj.hasOwnProperty('dutyId') && (_duty = $dObj.dutyId);
		$dObj.hasOwnProperty('authStatus') && (_isVerified = $dObj.authStatus);
		$dObj.hasOwnProperty('remark') && (_remark = $dObj.remark);
		$dObj.hasOwnProperty('idcardImagA') && (_idCartFront = $dObj.idcardImagA);
		$dObj.hasOwnProperty('idcardImagB') && (_idCartBack = $dObj.idcardImagB);
		$dObj.hasOwnProperty('workCardImag') && (_workCard = $dObj.workCardImag);
	}

	get id()
	{
		return _id;
	}

	get username()
	{
		return _username;
	}

	get name()
	{
		return _name;
	}

	get phone()
	{
		return _phone;
	}

	get roleId()
	{
		return _roleId;
	}

	get contact()
	{
		return _contact;
	}

	get email()
	{
		return _email;
	}

	get avatar()
	{
		return _avatar;
	}

	get rightList()
	{
		return _rightList;
	}

	get department()
	{
		return _department;
	}

	get company()
	{
		return _company;
	}

	get duty()
	{
		return _duty;
	}

	get isVerified()
	{
		return _isVerified;
	}

	get remark()
	{
		return _remark;
	}

	get idCardFront()
	{
		return _idCartFront;
	}

	get _idCartBack()
	{
		return _idCartBack;
	}

	get workCard()
	{
		return _workCard;
	}

	removeAll()
	{
		_id = 0;
		_username = "";
		_name = "";
		_phone = "";
		_roleId = 0;
		_contact = "";
		_email = "";
		_avatar = "";
		_rightList = [];
		_department = 0;
		_company = 0;
		_duty = 0;
		_isVerifyed = false;
		_remark = 0;
		_idCartFront = "";
		_idCartBack = "";
		_workCard = "";
	}
}