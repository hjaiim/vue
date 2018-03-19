import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next) {
    loginManager.checkLogin(to, next, () => {

        let requestArr = [];
        //存在ID 请求详情接口
        if (to.query.id) {
            requestArr.push(getBusinessDetail(to.query))
        }
        if (g.data.oppTypePool.list.length == 0) {
            requestArr.push(getOppTypeList())
        }
        if (requestArr.length > 0) {
            Promise.all(requestArr).then(()=> {
                next()
            })
        }
        else {
            next();
        }
    })
}

export function getOppTypeList() {

    return new Promise((resolved, rejected) => {

        g.net.call("config/businessAndTradeType").then(($data) => {

            g.data.oppTypePool.init($data)
            resolved()
        }, (err) => {
            g.func.dealErr(err);
            rejected();
        })
    });
}
export function getBusinessDetail($params) {
    _params = createData($params);
    var promise = new Promise((resolved, rejected) => {
        g.net.call("bo/viewOrderDetail", _params).then(($data) => {
            var data = g.data.searchBusinessPool.getDataById(_params.orderId);
            if (data) {
                data.update($data);
            }
            else {
                g.data.searchBusinessPool.add($data);
            }
            resolved();
        }, (err) => {
            g.func.dealErr(err);
            rejected();

        })
    });
    return promise;

}

function createData($dObj) {
    var d = {};
    $dObj = $dObj || {};
    d.orderId = $dObj.id || 0;
    return d;
}

