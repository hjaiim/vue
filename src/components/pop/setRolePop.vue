<template>
    <view-popup @close="onClose_pop"
                :isShowPopView="isShowPopView">
        <div class="setRole-wrap">
            <p class="note-tit">角色设置</p>
            <div class="set-content">
                <div class="role-list clear">
                    <p class="left">姓名</p>
                    <div class="left menu-item">{{accountData.name}}</div>
                </div>
                <div class="role-list clear">
                    <p class="left">所属公司</p>
                    <div class="left menu-item">{{accountData.companyName}}</div>
                </div>
                <div class="role-list clear">
                    <p class="left">职务名称</p>
                    <div class="left menu-item">{{accountData.dutyName}}</div>
                </div>
                <div class="role-list radio-show clear">
                    <p class="left">角色选择</p>
                    <div class="left menu-item">
                        <span v-show="roleList.length==0">暂无角色</span>
                        <ul class="role-list clear">
                            <li class="left" v-for="(item,index) in roleList">
								<span class="action-box role-item pointer" @click="onClick_roleItem(item.id)">
									<i class="draw-round pointer" :class="roleId == item.id?'action':''"></i>
									<span class="pointer">{{item.name}}</span>
								</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="action-wrap clear ">
                <span class="cancel-btn pointer right ani-time" @click="onClick_cancelBtn">取消</span>
                <span class="action-btn  pointer right ani-time" @click="onClick_confirmBtn">确认</span>
            </div>
        </div>
    </view-popup>
</template>
<script type="text/ecmascript-6">
    import g from "../../global";
    import ViewPopup from "../viewPop.vue";
    var _params = null;
    export default{
        data(){
            return {
                g: g,
                accountData: {},
                roleList: [],
                roleId: 0
            }
        },
        components: {
            ViewPopup
        },
        props: {
            isShowPopView: {
                type: Boolean,
                default: false
            },
            currOrderId: {
                default: 0
            },
            currRoleId: {
                default: 0
            }
        },
        watch: {
            isShowPopView()
            {
                this.init();
            }
        },
        methods: {
            init()
            {
                if (this.currOrderId) {
                    this.accountData = g.data.searchAccountPool.getDataById(this.currOrderId);
                    this.roleList = g.data.searchRolePool.list;
                    this.roleId = this.currRoleId !=3? this.currRoleId : this.roleList[0].id;
                }
            },
            onClose_pop()
            {
                this.$emit('close');
            },
            onClick_roleItem($id)
            {
                if (this.roleId != $id) {
                    this.roleId = $id;
                }
            },
            onClick_cancelBtn()
            {
                this.$emit('close', false);
            },
            onClick_confirmBtn()
            {
                _params = {
                    userId: this.currOrderId,
                    roleId: this.roleId
                };
                g.ui.showLoading()
                g.net.call('user/editUserRole', _params).then(($data) => {
                    g.ui.hideLoading();
                    var roleData = g.data.searchRolePool.getDataById(_params.roleId);
                    _params.roleName = roleData.name;
                    g.data.searchAccountPool.getDataById(_params.userId).update(_params);
                    g.ui.toast("角色设置成功");
                    this.$emit('close', true);
                }, (err) => {
                    g.func.dealErr(err);
                })
            }
        }
    }
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
    .setRole-wrap {
        min-height: 386px;
        .set-content {
            padding-top: 20px;
            .role-list {
                font-size: 14px;
                margin-bottom: 15px;
                color: #666666;
                p {
                    width: 130px;
                    height: 40px;
                    line-height: 40px;
                    text-align:right;
            }
                .menu-item {
                    padding-left: 24px;
                    max-width: 440px;
                    line-height: 40px;
            }
        }
            .radio-show {
                color: #101010;
                .role-list {
                    .role-item {
                        height: 40px;
                        line-height: 40px;
                        margin: 0;
                        vertical-align:middle;
                        span {
                            height: 40px;
                            line-height: 40px;
                            vertical-align:middle;
                            padding: 0 18px;
                    }
                }
            }
        }
    }
        .action-wrap {
            padding: 10px 34px 40px 0;
            span {
                width: 88px;
                line-height: 36px;
                height: 36px;
                text-align:center;
                margin-left: 34px;
        }
    } }
</style>
