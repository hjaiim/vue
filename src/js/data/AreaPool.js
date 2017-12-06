var _followBrandHash = {};
import g from './../../global';
export default class FollowBrandPool {
	constructor()
	{

	}

	update($list, $page)
	{
		if ($list)
		{
			if(!_followBrandHash[$page]){
				_followBrandHash[$page] = [];
				for (var item of $list)
				{
					this.add(item, $page);
				}
			}

		}

	}

	add($item, $page)
	{

		_followBrandHash[$page].push($item.brandId);
		g.data.brandPool.removeAll();
		g.data.brandPool.update($item)
	}

	getBrandPageList($page)
	{
		return _followBrandHash[$page];
	}


	removeAll()
	{
		_followBrandHash = {}
	}
}

