/**
 * Created by Administrator on 2017/12/11.
 */
export default class MessagePool {
	constructor()
	{

	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.title = "";
	d.source = "";
	d.createTime = "";
	d.desc = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("id") && (this.id = $dObj.id)
}