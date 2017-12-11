/**
 * Created by Administrator on 2017/12/11.
 */
export default class BusinessPool {
	constructor()
	{

	}
}

class RecordData {
	constructor()
	{

	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.type = "";
	d.formData = "";
	d.attachList = [];
	d.createTime = "";
	d.recordList = [];
	d.isCurrAudit = "";
	d.currAuditType = "";

	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("id") && (this.id = $dObj.id)
}