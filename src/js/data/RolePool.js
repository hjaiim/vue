/**
 * Created by Administrator on 2017/12/11.
 */
export default class RolePool {
	constructor()
	{

	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.name = "";
	d.desc = "";
	d.setter = "";
	d.distribute = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("id") && (this.id = $dObj.id)
}