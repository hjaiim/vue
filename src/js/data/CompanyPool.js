/**
 * Created by Administrator on 2017/12/11.
 */

export default class CompanyPool {
	constructor()
	{
		this.listData = [];
		this.hash = {};
		this.total = 0;
		this.totalPage = 1;
	}

	update($dObj)
	{
		if (!$dObj)
		{
			return;
		}
		$dObj.hasOwnProperty("total") && (this.total = $dObj.total);
		$dObj.hasOwnProperty("totalPage") && (this.totalPage = $dObj.totalPage);
		for (var item of $dObj.data)
		{
			this.add(item);
		}

	}

	add($item)
	{
		var itemData = createData($item);
		if (!this.hash[itemData.id])
		{
			this.hash[itemData.id] = itemData;
			this.listData.push(itemData);
		}

	}

	remove($id)
	{
		if (this.hash[$id])
		{
			var index = this.listData.indexOf(this.hash[$id]);
			if (index >= 0)
			{
				this.listData.splice(index, 1);
			}
		}
	}

	addDepartment($id, $department)
	{
		if (this.hash[$id])
		{
			if (this.hash[$id].children.indexOf($department) < 0)
			{
				this.hash[$id].children.push($department);
			}
		}
	}

	removeDepartment($id, $department)
	{
		if (this.hash[$id])
		{
			var index = this.hash[$id].children.indexOf($department);
			if (index >= 0)
			{
				this.hash[$id].children.splice(index, 1);
			}
		}
	}

	getDataById($id)
	{
		return this.hash[$id]
	}

	hasDetail($id)
	{
		return this.hash[$id] && this.hash[$id].leader;
	}

	get list()
	{
		return this.listData;
	}

	removeAll()
	{
		this.listData = [];
		this.hash = {};
		this.total = 0;
		this.totalPage = 1;
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.name = "";
	d.children = [];
	d.parentId = 0;
	d.leader = "";
	d.creatorId = 0;
	d.phone = "";
	d.contact = "";
	d.departCount = 0;
	d.dutyCount = 0;
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("comId") && (this.id = $dObj.comId);
	$dObj.hasOwnProperty("comName") && (this.name = $dObj.comName);
	$dObj.hasOwnProperty("creatorId") && (this.creatorId = $dObj.creatorId);
	$dObj.hasOwnProperty("comLinkMan") && (this.leader = $dObj.comLinkMan);
	$dObj.hasOwnProperty("comLinkManTel") && (this.phone = $dObj.comLinkManTel);
	$dObj.hasOwnProperty("comLinkTel") && (this.contact = $dObj.comLinkTel);
	$dObj.hasOwnProperty("departmentCount") && (this.departCount = $dObj.departmentCount);
	$dObj.hasOwnProperty("dutyCount") && (this.dutyCount = $dObj.dutyCount);
	if ($dObj.hasOwnProperty("departmentResultList"))
	{
		g.data.departmentPool.update($dObj.departmentResultList);
	}

}
