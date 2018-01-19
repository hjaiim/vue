var _list = [], _hash = {};
var _total = 0, _totalPage = 1;
var _recordHash = {};
import g from "./../../global";
export default class BusinessPool {
    constructor() {
    }

    update($dObj) {
        if (!$dObj) {
            return;
        }
        $dObj.hasOwnProperty("total") && (_total = $dObj.total);
        $dObj.hasOwnProperty("totalPage") && (_totalPage = $dObj.totalPage);
        for (var item of $dObj.data) {
            this.add(item);
        }

    }

    add($item) {
        var itemData = createData($item);
        if (!_hash[itemData.id]) {
            _hash[itemData.id] = itemData;
            _list.push(itemData);
        }

    }

    remove($id) {
        if (_hash[$id]) {
            var index = _list.indexOf(_hash[$id]);
            if (index >= 0) {
                _list.splice(index, 1);
            }
        }
    }

    getDataById($id) {
        return _hash[$id]
    }

    getRecordById($id) {
        return _recordHash[$id];
    }

    hasDetail($id) {
        return !!_hash[$id].formData;
    }

    get list() {
        return _list;
    }

    get total() {
        return _total;
    }

    get totalPage() {
        return _totalPage;
    }

    removeAll() {
        _list = [];
        _hash = {};
        _total = 0;
        _totalPage = 1;
    }
}

function createData($dObj) {
    var d = {};
    d.id = 0;
    d.type = "";
    d.typeName = "";
    d.orderNo = "";
    d.formData = "";
    d.attachList = [];
    d.createTime = "";
    d.recordList = [];
    d.flowId = "";
    d.flowName = "";
    d.auditStatus = "";
    d.auditStatusDesc = "";
    d.auditStage = "";
    d.creatorId = "";
    d.creatorName = "";
    d.customerId = "";
    d.customerCompName = "";
    d.departmentId = "";
    d.operation = 0;
    d.todoId = 0;
    d.mobile = "";
    d.taskProperties = {};
    d.hasApproved = false;
    d.hasRejected = false;
    d.hasOpinion = false;
    d.hasFinished = false;
    d.hasNext = false;
    d.mustFill = false;
    d.hasAttaches = false;
    d.update = updateData.bind(d);
    d.update($dObj);
    return d;

}

function updateData($dObj, $recordId) {
    $dObj.hasOwnProperty("orderId") && (this.id = $dObj.orderId);
    $dObj.hasOwnProperty("orderNo") && (this.orderNo = $dObj.orderNo);
    $dObj.hasOwnProperty("businessId") && (this.type = $dObj.businessId);
    $dObj.hasOwnProperty("businessName") && (this.typeName = $dObj.businessName);
    $dObj.hasOwnProperty("flowId") && (this.flowId = $dObj.flowId);
    $dObj.hasOwnProperty("flowName") && (this.flowName = $dObj.flowName);
    $dObj.hasOwnProperty("auditStatus") && (this.auditStatus = $dObj.auditStatus);
    $dObj.hasOwnProperty("auditStatusDesc") && $dObj.auditStatusDesc&& (this.auditStatusDesc = $dObj.auditStatusDesc);//点击详情会返回null
    $dObj.hasOwnProperty("boFormData") && (this.formData = JSON.parse($dObj.boFormData));
    $dObj.hasOwnProperty("auditStage") && (this.auditStage = $dObj.auditStage);
    $dObj.hasOwnProperty("attachs") && (this.attachList = JSON.parse($dObj.attachs));
    $dObj.hasOwnProperty("creatorId") && (this.creatorId = $dObj.creatorId);
    $dObj.hasOwnProperty("creatorName") && (this.creatorName = $dObj.creatorName);
    $dObj.hasOwnProperty("comId") && (this.customerId = $dObj.comId);
    $dObj.hasOwnProperty("comName") && (this.companyName = $dObj.comName);
    $dObj.hasOwnProperty("departmentId") && (this.departmentId = $dObj.departmentId);
    $dObj.hasOwnProperty("custComName") && (this.customerCompName = $dObj.custComName);
    $dObj.hasOwnProperty("createTime") && (this.createTime = g.timeTool.getFullDate($dObj.createTime, true));
    $dObj.hasOwnProperty("optType") && (this.operation = $dObj.optType);
    $dObj.hasOwnProperty("todoId") && (this.todoId = $dObj.todoId);
    $dObj.hasOwnProperty("mobile") && (this.mobile = $dObj.mobile);
    $dObj.hasOwnProperty("taskProperties") && (this.taskProperties = __merge({}, JSON.parse($dObj.taskProperties)));
    if (this.taskProperties.process_button) {
        var btnList = this.taskProperties.process_button.split(";");
        this.hasApproved = btnList.indexOf("approve") >= 0;
        this.hasRejected = btnList.indexOf("rollback") >= 0;
        this.hasFinished = btnList.indexOf("reject_finish") >= 0;
    }


    if (this.taskProperties) {
        this.hasOpinion = !!int(this.taskProperties.process_opinion);
        this.hasNext = !!int(this.taskProperties.process_candidate);
        this.mustFill = int(this.taskProperties.process_candidate) == 2;
        this.hasAttaches = !!int(this.taskProperties.process_attachment);
    }
    if ($dObj.hasOwnProperty("recordResult")) {
        var recordData = new RecordData();
        this.recordList = recordData.update($dObj.recordResult);
    }
}

var _recordList = [];
class RecordData {
    constructor() {
        _recordList = [];
        _recordHash = {};
    }

    update($list) {
        if (!Array.isArray($list)) {
            return;
        }

        for (var item of $list) {
            this.add(item);
        }
        return _recordList;
    }

    add($item) {
        var itemData = createRecord($item);
        if (!_recordHash[itemData.id]) {
            _recordHash[itemData.id] = itemData;
            _recordList.push(itemData);
        }
    }

}

function createRecord($dObj) {
    var d = {};
    d.id = 0;
    d.auditorId = 0;
    d.auditorName = "";
    d.positionName = "";
    d.auditorTime = "";
    d.opinion = "";
    d.result = "";
    d.attachList = [];
    d.createTime = g.timeTool.getNowStamp();
    d.orderId = 0;
    d.taskTodoId = "";
    d.update = updateRecord.bind(d);
    d.update($dObj);
    return d;
}

function updateRecord($dObj) {
    $dObj.hasOwnProperty("recordId") && (this.id = $dObj.recordId);
    $dObj.hasOwnProperty("auditorId") && (this.auditorId = $dObj.auditorId);
    $dObj.hasOwnProperty("auditorName") && (this.auditorName = $dObj.auditorName);
    $dObj.hasOwnProperty("stationName") && (this.positionName = $dObj.stationName);
    $dObj.hasOwnProperty("auditSuggest") && (this.opinion = $dObj.auditSuggest);
    if ($dObj.hasOwnProperty("auditResult")) {
        $dObj.auditResult == 1 && (this.result = "已通过" );
        $dObj.auditResult == 2 && (this.result = "已退回" );
        $dObj.auditResult == 3 && (this.result = "未通过" );
    }
    $dObj.hasOwnProperty("attachs") && !!$dObj.attachs && (this.attachList = JSON.parse($dObj.attachs));
    $dObj.hasOwnProperty("createTime") && (this.createTime = g.timeTool.getFullDate($dObj.createTime, true));
    $dObj.hasOwnProperty("orderId") && (this.orderId = $dObj.orderId);
    $dObj.hasOwnProperty("taskTodoId") && (this.taskTodoId = $dObj.taskTodoId);
}
