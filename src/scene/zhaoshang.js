// 招商项目库 · 场景配置（页面唯一业务文案源）
// 配套后端模块：BizProject（sql/opc/scenes/zhaoshang）
export default {
  sceneKey: 'zhaoshang',
  pageTitle: '招商项目库',
  stats: [
    { key: 'total', label: '项目总数', icon: 'FolderOpened', color: '#409EFF' },
    { key: 'negotiating', label: '在谈项目', icon: 'ChatLineRound', color: '#E6A23C' },
    { key: 'signed', label: '已签约', icon: 'DocumentChecked', color: '#67C23A' },
    { key: 'landed', label: '已落地', icon: 'Position', color: '#909399' }
  ],
  search: [
    { prop: 'projectName', label: '项目名称', type: 'input', placeholder: '请输入项目名称' },
    { prop: 'projectCode', label: '项目编号', type: 'input', placeholder: '请输入项目编号' },
    { prop: 'industryType', label: '行业类型', type: 'select', dict: 'biz_industry', placeholder: '请选择行业类型' },
    { prop: 'projectStatus', label: '项目状态', type: 'select', dict: 'biz_project_status', placeholder: '请选择项目状态' }
  ],
  columns: [
    { prop: 'projectName', label: '项目名称', minWidth: 200, showOverflowTooltip: true },
    { prop: 'projectCode', label: '项目编号', width: 140 },
    { prop: 'industryType', label: '行业类型', width: 110, dict: 'biz_industry' },
    { prop: 'investAmount', label: '计划投资额(万元)', width: 150, align: 'right', type: 'amount' },
    { prop: 'projectStatus', label: '状态', width: 100, dict: 'biz_project_status' },
    { prop: 'signDate', label: '签约日期', width: 110, type: 'date' },
    { prop: 'landedDate', label: '落地日期', width: 110, type: 'date' },
    { prop: 'contactName', label: '联系人', width: 100 },
    { prop: 'owner', label: '招商负责人', width: 110 },
    { prop: 'createTime', label: '登记时间', width: 165, type: 'datetime' },
    { prop: 'remark', label: '备注', minWidth: 180, showOverflowTooltip: true }
  ],
  form: [
    { prop: 'projectName', label: '项目名称', type: 'input', required: true, maxlength: 100, placeholder: '请输入项目名称', span: 24 },
    { prop: 'projectCode', label: '项目编号', type: 'input', maxlength: 50, placeholder: '请输入项目编号', span: 12 },
    { prop: 'industryType', label: '行业类型', type: 'select', dict: 'biz_industry', placeholder: '请选择行业类型', span: 12 },
    { prop: 'investAmount', label: '计划投资额(万元)', type: 'inputNumber', min: 0, precision: 2, span: 12 },
    { prop: 'contactName', label: '联系人', type: 'input', maxlength: 50, placeholder: '请输入联系人', span: 12 },
    { prop: 'owner', label: '招商负责人', type: 'input', maxlength: 50, placeholder: '请输入招商负责人', span: 12 },
    { prop: 'remark', label: '备注', type: 'textarea', maxlength: 500, placeholder: '请输入备注', span: 24 }
  ],
  statusFlow: {
    '0': { next: '1', action: '签约' },
    '1': { next: '2', action: '落地' }
  }
}
