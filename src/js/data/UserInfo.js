/**
 * Created by billy on 2016/12/19.
 */

var _id = 0;
var _username = "";
var _name = "";
var _phone = "";
var _roleId = 0;
var _roleName = "";
var _telphone = "";
var _email = "";
var _avatar = "";
var _rightList = [];
var _departmentId = 0;
var _departmentName = "";
var _companyId = 0;
var _companyName = 0;
var _dutyId = 0;
var _dutyName = "";
var _positionId = 0;
var _positionName = "";
var _authStatus = 0;
var _remark = 0;
var _idCartFront = "";
var _idCardBack = "";
var _workCard = "";
var _msgCount = 0;
var _msgSwitch = 0;
var _positionType = -1;
import g from './../../global';
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
		$dObj.hasOwnProperty('authStatus') && (_authStatus = $dObj.authStatus);
		$dObj.hasOwnProperty('msgCount') && (_msgCount = $dObj.msgCount);
		$dObj.hasOwnProperty('mobile') && (_phone = $dObj.mobile);
		$dObj.hasOwnProperty('roleId') && (_roleId = $dObj.roleId);
		$dObj.hasOwnProperty('roleName') && (_roleName = $dObj.roleName);
		$dObj.hasOwnProperty('telphone') && (_telphone = $dObj.telphone);
		$dObj.hasOwnProperty('email') && (_email = $dObj.email);
		$dObj.hasOwnProperty('avatar') && (_avatar = $dObj.avatar);
		$dObj.hasOwnProperty('permissionList') && (_rightList = $dObj.permissionList);
		$dObj.hasOwnProperty('departmentId') && (_departmentId = $dObj.departmentId);
		$dObj.hasOwnProperty('departmentName') && (_departmentName = $dObj.departmentName);
		$dObj.hasOwnProperty('companyId') && (_companyId = $dObj.companyId);
		$dObj.hasOwnProperty('companyName') && (_companyName = $dObj.companyName);
		$dObj.hasOwnProperty('dutyId') && (_dutyId = $dObj.dutyId);
		$dObj.hasOwnProperty('dutyName') && (_dutyName = $dObj.dutyName);
		$dObj.hasOwnProperty('stationId') && (_positionId = $dObj.stationId);
		$dObj.hasOwnProperty('stationName') && (_positionName = $dObj.stationName);
		$dObj.hasOwnProperty('authStatus') && (_authStatus = $dObj.authStatus);
		$dObj.hasOwnProperty('remark') && (_remark = $dObj.remark);
		$dObj.hasOwnProperty('idcardImgA') && (_idCartFront = $dObj.idcardImgA);
		$dObj.hasOwnProperty('idcardImgB') && (_idCardBack = $dObj.idcardImgB);
		$dObj.hasOwnProperty('workCardImg') && (_workCard = $dObj.workCardImg);
		$dObj.hasOwnProperty('msgSwitch') && (_msgSwitch = $dObj.msgSwitch);
		$dObj.hasOwnProperty('stationType') && (_positionType = $dObj.stationType);
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

	get roleName()
	{
		return _roleName;
	}

	get telphone()
	{
		return _telphone;
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

	get departmentId()
	{
		return _departmentId;
	}

	get departmentName()
	{
		return _departmentName;
	}

	get companyId()
	{
		return _companyId;
	}

	get companyName()
	{
		return _companyName;
	}

	get dutyId()
	{
		return _dutyId;
	}

	get dutyName()
	{
		return _dutyName;
	}

	get positionId()
	{
		return _positionId;
	}

	get positionName()
	{
		return _positionName;
	}

	get positionType()
	{
		return _positionType;
	}

	get authStatus()
	{
		return _authStatus;
	}

	get remark()
	{
		return _remark;
	}

	get idCardFront()
	{
		return _idCartFront;
	}

	get idCardBack()
	{
		return _idCardBack;
	}

	get workCard()
	{
		return _workCard;
	}

	get msgCount()
	{
		return _msgCount;
	}

	get msgSwitch()
	{
		return _msgSwitch;
	}

	removeAll()
	{
		_id = 0;
		_username = "";
		_name = "";
		_phone = "";
		_roleId = 0;
		_roleName = "";
		_telphone = "";
		_email = "";
		_avatar = "";
		_rightList = [];
		_departmentId = 0;
		_departmentName = "";
		_companyId = 0;
		_companyName = 0;
		_dutyId = 0;
		_dutyName = "";
		_positionId = 0;
		_positionName = "";
		_authStatus = 0;
		_remark = 0;
		_idCartFront = "";
		_idCardBack = "";
		_workCard = "";
		_msgSwitch = 0;
	}
}