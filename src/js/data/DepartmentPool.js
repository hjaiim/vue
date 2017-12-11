/**
 * Created by Administrator on 2017/12/11.
 */
/**
 * Created by Administrator on 2017/12/11.
 */
export default class DepartmentPool {
	constructor()
	{

	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.name = "";
	d.parentId = 0;
	d.companyId = 0;
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("id") && (this.id = $dObj.id)
}