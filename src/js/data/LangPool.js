/**
 * Created by billy on 2016/12/20.
 */
var _currLang;
var _list;
var _hash
export default class LangPool {
	constructor()
	{
		_list = []; // {name:string; lang:string}[]
		_hash = Object.create(null);
	}

	init($langList)
	{
		_list = $langList;
		for (var item of _list)
		{
			_hash[item.lang] = item;
		}
	}

	setLang(langKey)
	{
		if (_hash[langKey])
		{
			_currLang = langKey;
		}
	}

	getDataBy(langKey)
	{
		return _hash[langKey];
	}

	get currLang()
	{
		return _currLang;
	}

	get list()
	{
		return _list.concat();
	}
}

