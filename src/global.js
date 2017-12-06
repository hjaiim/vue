/**
 * Created by billy on 2016/11/29.
 */
import * as g from "./jslib/global";
import * as data from "./js/data/DataPool";
import * as func from "./js/func";

merge(g.data, data);
merge(g.func ? g.func : g.func = {}, func);

export default g;

function merge(d, b)
{
	for (var k in b)
	{
		d[k] = b[k];
	}
}