/**
 * Created by Administrator on 2017/12/11.
 */
export default class AccountPool {
	constructor()
	{

	}

	update($dObj)
	{
		if (!$dObj)
		{
			return;
		}

	}

	add()
	{

	}

	remove()
	{

	}

	getDataById()
	{

	}

	get list()
	{

	}

	removeAll()
	{

	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.name = "";
	d.company = "";
	d.department = "";
	d.position = "";
	d.dutyName = "";
	d.dutyType = "";
	d.role = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("id") && (this.id = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.name = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.company = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.department = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.position = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.dutyName = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.dutyType = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.role = $dObj.id);
}