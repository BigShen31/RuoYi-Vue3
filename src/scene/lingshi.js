// 灵活用工结算单 · 场景配置（换场景演练样例）
// 配套后端模块：BizSettlement（sql/opc/scenes/lingshi）
export default {
  sceneKey: 'lingshi',
  pageTitle: '灵活用工结算单',
  stats: [
    { key: 'total', label: '结算单总数', icon: 'Tickets', color: '#409EFF' },
    { key: 'pending', label: '待审核', icon: 'Clock', color: '#E6A23C' },
    { key: 'settled', label: '已结算', icon: 'CircleCheck', color: '#67C23A' },
    { key: 'paid', label: '已支付', icon: 'Wallet', color: '#909399' }
  ],
  search: [
    { prop: 'companyName', label: '用工企业', type: 'input', placeholder: '请输入用工企业名称' },
    { prop: 'settlementNo', label: '结算单号', type: 'input', placeholder: '请输入结算单号' },
    { prop: 'workType', label: '用工类型', type: 'select', dict: 'biz_work_type', placeholder: '请选择用工类型' },
    { prop: 'settleStatus', label: '结算状态', type: 'select', dict: 'biz_settle_status', placeholder: '请选择结算状态' },
    { prop: 'settleMonth', label: '结算月份', type: 'input', placeholder: '如 2026-08' }
  ],
  columns: [
    { prop: 'companyName', label: '用工企业', minWidth: 200, showOverflowTooltip: true },
    { prop: 'settlementNo', label: '结算单号', width: 140 },
    { prop: 'workType', label: '用工类型', width: 110, dict: 'biz_work_type' },
    { prop: 'workerCount', label: '结算人数', width: 90, align: 'right' },
    { prop: 'settleAmount', label: '结算金额(元)', width: 140, align: 'right', type: 'amount' },
    { prop: 'settleMonth', label: '结算月份', width: 110 },
    { prop: 'settleStatus', label: '状态', width: 100, dict: 'biz_settle_status' },
    { prop: 'auditDate', label: '审核日期', width: 110, type: 'date' },
    { prop: 'payDate', label: '支付日期', width: 110, type: 'date' },
    { prop: 'owner', label: '经办人', width: 100 },
    { prop: 'createTime', label: '登记时间', width: 165, type: 'datetime' },
    { prop: 'remark', label: '备注', minWidth: 150, showOverflowTooltip: true }
  ],
  form: [
    { prop: 'companyName', label: '用工企业', type: 'input', required: true, maxlength: 120, placeholder: '请输入用工企业名称', span: 24 },
    { prop: 'settlementNo', label: '结算单号', type: 'input', maxlength: 50, placeholder: '请输入结算单号', span: 12 },
    { prop: 'workType', label: '用工类型', type: 'select', dict: 'biz_work_type', placeholder: '请选择用工类型', span: 12 },
    { prop: 'workerCount', label: '结算人数', type: 'inputNumber', min: 0, precision: 0, span: 12 },
    { prop: 'settleAmount', label: '结算金额(元)', type: 'inputNumber', min: 0, precision: 2, span: 12 },
    { prop: 'settleMonth', label: '结算月份', type: 'input', maxlength: 7, placeholder: '如 2026-08', span: 12 },
    { prop: 'owner', label: '经办人', type: 'input', maxlength: 50, placeholder: '请输入经办人', span: 12 },
    { prop: 'remark', label: '备注', type: 'textarea', maxlength: 500, placeholder: '请输入备注', span: 24 }
  ],
  statusFlow: {
    '0': { next: '1', action: '审核结算' },
    '1': { next: '2', action: '确认支付' }
  }
}
