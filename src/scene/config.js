// ============================================================
// OPC 机试套件 · 场景配置（唯一业务文案源）
// 换场景时同步替换：本文件 + 后端场景 SQL + 后端模块代码(模板/AI代笔)
// 菜单名/按钮权限仍以数据库 sys_menu 为准，本文件不覆盖路由层
// ============================================================
export default {
  // 场景标识（与 sql/opc/scenes/ 目录对应）
  sceneKey: 'zhaoshang',
  // 页面主标题（页面内展示；侧边栏菜单名来自 sys_menu）
  pageTitle: '招商项目库',
  // 统计卡片
  stats: [
    { key: 'total', label: '项目总数', icon: 'FolderOpened', color: '#409EFF' },
    { key: 'negotiating', label: '在谈项目', icon: 'ChatLineRound', color: '#E6A23C' },
    { key: 'signed', label: '已签约', icon: 'DocumentChecked', color: '#67C23A' },
    { key: 'landed', label: '已落地', icon: 'Position', color: '#909399' }
  ],
  // 搜索区（type: input/select；dict 为字典类型）
  search: [
    { prop: 'projectName', label: '项目名称', type: 'input', placeholder: '请输入项目名称' },
    { prop: 'projectCode', label: '项目编号', type: 'input', placeholder: '请输入项目编号' },
    { prop: 'industryType', label: '行业类型', type: 'select', dict: 'biz_industry', placeholder: '请选择行业类型' },
    { prop: 'projectStatus', label: '项目状态', type: 'select', dict: 'biz_project_status', placeholder: '请选择项目状态' }
  ],
  // 表格列（dict 渲染字典标签；type: amount/date/datetime）
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
  // 新增/编辑表单（type: input/select/inputNumber/textarea）
  form: [
    { prop: 'projectName', label: '项目名称', type: 'input', required: true, maxlength: 100, placeholder: '请输入项目名称', span: 24 },
    { prop: 'projectCode', label: '项目编号', type: 'input', maxlength: 50, placeholder: '请输入项目编号', span: 12 },
    { prop: 'industryType', label: '行业类型', type: 'select', dict: 'biz_industry', placeholder: '请选择行业类型', span: 12 },
    { prop: 'investAmount', label: '计划投资额(万元)', type: 'inputNumber', min: 0, precision: 2, span: 12 },
    { prop: 'contactName', label: '联系人', type: 'input', maxlength: 50, placeholder: '请输入联系人', span: 12 },
    { prop: 'owner', label: '招商负责人', type: 'input', maxlength: 50, placeholder: '请输入招商负责人', span: 12 },
    { prop: 'remark', label: '备注', type: 'textarea', maxlength: 500, placeholder: '请输入备注', span: 24 }
  ],
  // 状态推进：当前状态值 → { next: 目标状态值, action: 操作文案 }
  statusFlow: {
    '0': { next: '1', action: '签约' },
    '1': { next: '2', action: '落地' }
  }
}
