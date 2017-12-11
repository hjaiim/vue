/**
 * Created by Administrator on 2017/12/11.
 */
export default class StaticRightPool {
	constructor()
	{

	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.parentId = 0;
	d.name = "";
	d.children = [];
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("id") && (this.id = $dObj.id)
}