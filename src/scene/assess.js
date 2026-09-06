// 企业产业链研判 · 场景配置（文案/字典/等级色板唯一来源）
// 配套：mock 数据 src/scene/assessMock.js（后端就绪后换 src/api/system/assess）
export default {
  sceneKey: 'assess',
  pageTitle: '企业产业链研判',
  stats: [
    { key: 'total', label: '画像企业总数', icon: 'OfficeBuilding', color: '#409EFF' },
    { key: 'mapped', label: '已归链企业', icon: 'Link', color: '#67C23A' },
    { key: 'gradeA', label: 'A 重点招商', icon: 'Star', color: '#F56C6C' },
    { key: 'gradeB', label: 'B 重点合作', icon: 'Pointer', color: '#409EFF' },
    { key: 'gradeC', label: 'C 一般跟踪', icon: 'Clock', color: '#E6A23C' },
    { key: 'gradeD', label: 'D 暂缓观察', icon: 'Warning', color: '#909399' }
  ],
  gradeMeta: {
    A: { label: 'A · 重点招商', tag: 'danger' },
    B: { label: 'B · 重点合作', tag: 'primary' },
    C: { label: 'C · 一般跟踪', tag: 'warning' },
    D: { label: 'D · 暂缓观察', tag: 'info' }
  },
  dims: [
    { code: 'importance', name: '环节关键度', max: 30 },
    { code: 'growth', name: '经营成长', max: 25 },
    { code: 'innovation', name: '创新实力', max: 25 },
    { code: 'finance', name: '融资热度', max: 20 }
  ],
  dicts: {
    gap: { '1': '缺链', '2': '弱链', '3': '优势成熟' },
    importance: { '1': '关键核心', '2': '重要支撑', '3': '一般配套' },
    linkType: { '1': '预挂接', '2': '关键词兜底' },
    linkRole: { '1': '补链', '2': '强链', '3': '延链' },
    riskLevel: { '0': '无', '1': '低', '2': '中', '3': '高', '4': '重大' },
    financeRound: { none: '未融资', angel: '天使轮', series_a: 'A轮', series_b: 'B轮', series_c: 'C轮', series_d: 'D+轮', ipo: '已上市' },
    companyScale: { '1': '大型', '2': '中型', '3': '小型', '4': '微型' },
    industry: { new_energy: '新能源', biopharma: '生物医药' },
    dataSourceTip: '画像/指标为演示快照口径（mock 数据），正式环境以企业画像与产业链图谱真实数据为准'
  }
}
