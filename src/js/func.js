
export function dealErr($err)
{
	var msgInfo = g.data.langPool.getDataById("error" + $err.error.code);
	g.ui.toast(msgInfo.content);
	g.ui.hideLoading();
	if ($err.error.code == 1000)
	{
		logout();
	}
}