// 企业产业链研判 · 演示样例数据与前端计算（单一 mock 源）
// 口径与 docs/opc/企业产业链研判/02-设计.md 一致；后端就绪后替换为 src/api/system/assess.js

const chains = [
  {
    chainId: 1,
    chainName: '新能源汽车',
    nodes: [
      { nodeId: 1, nodeName: '上游原材料', gapType: '3', importanceLevel: '2', keywords: '锂矿,正极材料,负极材料,隔膜,电解液,电池材料' },
      { nodeId: 2, nodeName: '动力电池', gapType: '1', importanceLevel: '1', keywords: '动力电池,锂电池,电芯,电池包,储能电池,电池系统' },
      { nodeId: 3, nodeName: '关键零部件', gapType: '2', importanceLevel: '1', keywords: '电机,电控,电驱,电驱动,IGBT,汽车电子' },
      { nodeId: 4, nodeName: '整车制造', gapType: '3', importanceLevel: '2', keywords: '整车,乘用车,商用车,新能源汽车整车' },
      { nodeId: 5, nodeName: '充换电运营', gapType: '1', importanceLevel: '3', keywords: '充电桩,换电站,充电运营,超充' },
      { nodeId: 6, nodeName: '回收利用', gapType: '2', importanceLevel: '3', keywords: '电池回收,梯次利用,再生利用,拆解' }
    ]
  },
  {
    chainId: 2,
    chainName: '生物医药',
    nodes: [
      { nodeId: 7, nodeName: '原料药/中间体', gapType: '3', importanceLevel: '2', keywords: '原料药,中间体,医药化工,合成' },
      { nodeId: 8, nodeName: 'CXO研发服务', gapType: '2', importanceLevel: '2', keywords: 'CRO,CDMO,临床前研究,药物研发外包,药学研究' },
      { nodeId: 9, nodeName: '创新药', gapType: '1', importanceLevel: '1', keywords: '创新药,生物药,单抗,双抗,细胞治疗,基因治疗' },
      { nodeId: 10, nodeName: '医疗器械', gapType: '2', importanceLevel: '2', keywords: '医疗器械,医学影像,体外诊断,IVD,植介入' },
      { nodeId: 11, nodeName: '智慧医疗', gapType: '3', importanceLevel: '3', keywords: '互联网医疗,数字医疗,医疗信息化,慢病管理' },
      { nodeId: 12, nodeName: '流通与终端', gapType: '3', importanceLevel: '3', keywords: '医药流通,连锁药店,医药物流' }
    ]
  }
]

const rawCompanies = [
  {
    companyId: 1, companyName: '青藤动力能源科技', creditCode: '91320000DEMO000001',
    region: '市高新区', industry: 'new_energy', companyScale: '2', estDate: '2016-05-18', regCapital: 50000,
    mainProduct: '动力电池系统', businessKeywords: '动力电池,电芯,电池包',
    metric: { dataDate: '2026-06-30', revenueYoy: 45, profitYoy: 60, patentCount: 128, rdRatio: 9.8, highTechFlag: '1', lastFinanceRound: 'series_c', lastFinanceAmount: 80000, lastFinanceDate: '2026-03-15', riskLevel: '0', lawsuitCount: 0, abnormalCount: 0, riskNote: '' },
    link: { chainId: 1, nodeId: 2, linkType: '1', linkRole: '1', evidence: '上游图谱人工挂接：动力电池为本地缺链关键环节' }
  },
  {
    companyId: 2, companyName: '康泽生物医药', creditCode: '91320000DEMO000002',
    region: '生物医药产业园', industry: 'biopharma', companyScale: '2', estDate: '2015-03-02', regCapital: 30000,
    mainProduct: '单抗创新药', businessKeywords: '创新药,单抗,生物药',
    metric: { dataDate: '2026-06-30', revenueYoy: 38, profitYoy: 45, patentCount: 96, rdRatio: 11.2, highTechFlag: '1', lastFinanceRound: 'series_b', lastFinanceAmount: 30000, lastFinanceDate: '2026-05-06', riskLevel: '0', lawsuitCount: 0, abnormalCount: 0, riskNote: '' },
    link: { chainId: 2, nodeId: 9, linkType: '1', linkRole: '1', evidence: '上游图谱人工挂接：创新药为本地缺链关键环节' }
  },
  {
    companyId: 3, companyName: '星原电池材料', creditCode: '91320000DEMO000003',
    region: '新材料园区', industry: 'new_energy', companyScale: '2', estDate: '2018-07-12', regCapital: 15000,
    mainProduct: '高镍正极材料', businessKeywords: '正极材料,电池材料',
    metric: { dataDate: '2026-06-30', revenueYoy: 26, profitYoy: 20, patentCount: 41, rdRatio: 6.4, highTechFlag: '1', lastFinanceRound: 'series_b', lastFinanceAmount: 25000, lastFinanceDate: '2026-04-20', riskLevel: '0', lawsuitCount: 0, abnormalCount: 0, riskNote: '' },
    link: { chainId: 1, nodeId: 1, linkType: '1', linkRole: '3', evidence: '上游图谱人工挂接：成熟环节，延链升级' }
  },
  {
    companyId: 4, companyName: '汉和电驱科技', creditCode: '91320000DEMO000004',
    region: '智能装备产业园', industry: 'new_energy', companyScale: '3', estDate: '2020-09-23', regCapital: 8000,
    mainProduct: '车用电驱动电机电控系统', businessKeywords: '电机控制器,电驱总成,IGBT模块',
    metric: { dataDate: '2026-06-30', revenueYoy: 24, profitYoy: 15, patentCount: 52, rdRatio: 6.8, highTechFlag: '1', lastFinanceRound: 'series_a', lastFinanceAmount: 8000, lastFinanceDate: '2025-08-15', riskLevel: '0', lawsuitCount: 0, abnormalCount: 0, riskNote: '' },
    link: null
  },
  {
    companyId: 5, companyName: '溯源生物CRO', creditCode: '91320000DEMO000005',
    region: '医药城', industry: 'biopharma', companyScale: '3', estDate: '2017-11-30', regCapital: 12000,
    mainProduct: '临床前 CRO 服务', businessKeywords: 'CRO,临床前研究,药物研发外包',
    metric: { dataDate: '2026-06-30', revenueYoy: 33, profitYoy: 28, patentCount: 18, rdRatio: 9.0, highTechFlag: '1', lastFinanceRound: 'series_b', lastFinanceAmount: 12000, lastFinanceDate: '2026-01-12', riskLevel: '0', lawsuitCount: 0, abnormalCount: 0, riskNote: '' },
    link: { chainId: 2, nodeId: 8, linkType: '1', linkRole: '2', evidence: '上游图谱人工挂接：CXO 弱链环节，强链服务' }
  },
  {
    companyId: 6, companyName: '明澈医疗影像', creditCode: '91320000DEMO000006',
    region: '医疗器械园', industry: 'biopharma', companyScale: '3', estDate: '2019-02-14', regCapital: 10000,
    mainProduct: '高端医学影像设备', businessKeywords: '医疗器械,医学影像,影像设备',
    metric: { dataDate: '2026-06-30', revenueYoy: 21, profitYoy: 12, patentCount: 66, rdRatio: 5.2, highTechFlag: '1', lastFinanceRound: 'series_a', lastFinanceAmount: 6000, lastFinanceDate: '2025-10-15', riskLevel: '0', lawsuitCount: 0, abnormalCount: 0, riskNote: '' },
    link: { chainId: 2, nodeId: 10, linkType: '1', linkRole: '2', evidence: '上游图谱人工挂接：医疗器械弱链环节' }
  },
  {
    companyId: 7, companyName: '蓝湾汽车智造', creditCode: '91320000DEMO000007',
    region: '汽车产业新城', industry: 'new_energy', companyScale: '1', estDate: '2012-06-08', regCapital: 200000,
    mainProduct: '新能源整车', businessKeywords: '整车,新能源汽车整车,乘用车',
    metric: { dataDate: '2026-06-30', revenueYoy: 12, profitYoy: 6, patentCount: 55, rdRatio: 3.2, highTechFlag: '1', lastFinanceRound: 'series_b', lastFinanceAmount: 50000, lastFinanceDate: '2025-06-20', riskLevel: '0', lawsuitCount: 0, abnormalCount: 0, riskNote: '' },
    link: { chainId: 1, nodeId: 4, linkType: '1', linkRole: '3', evidence: '上游图谱人工挂接：整车制造优势环节' }
  },
  {
    companyId: 8, companyName: '新域电池回收科技', creditCode: '91320000DEMO000008',
    region: '循环经济园', industry: 'new_energy', companyScale: '3', estDate: '2021-04-19', regCapital: 6000,
    mainProduct: '退役动力电池回收利用', businessKeywords: '电池回收,梯次利用,再生利用',
    metric: { dataDate: '2026-06-30', revenueYoy: 32, profitYoy: 18, patentCount: 26, rdRatio: 6.0, highTechFlag: '0', lastFinanceRound: 'series_a', lastFinanceAmount: 5000, lastFinanceDate: '2026-02-10', riskLevel: '0', lawsuitCount: 0, abnormalCount: 0, riskNote: '' },
    link: { chainId: 1, nodeId: 6, linkType: '1', linkRole: '2', evidence: '上游图谱人工挂接：回收利用弱链环节' }
  },
  {
    companyId: 9, companyName: '天辰医药原料', creditCode: '91320000DEMO000009',
    region: '化工园区', industry: 'biopharma', companyScale: '2', estDate: '2014-08-26', regCapital: 8000,
    mainProduct: '特色原料药', businessKeywords: '原料药,中间体,医药化工',
    metric: { dataDate: '2026-06-30', revenueYoy: 28, profitYoy: 18, patentCount: 42, rdRatio: 4.5, highTechFlag: '1', lastFinanceRound: 'angel', lastFinanceAmount: 3000, lastFinanceDate: '2025-12-08', riskLevel: '0', lawsuitCount: 0, abnormalCount: 0, riskNote: '' },
    link: { chainId: 2, nodeId: 7, linkType: '1', linkRole: '3', evidence: '上游图谱人工挂接：原料药成熟环节' }
  },
  {
    companyId: 10, companyName: '睿云数字医疗', creditCode: '91320000DEMO000010',
    region: '软件园', industry: 'biopharma', companyScale: '3', estDate: '2019-12-03', regCapital: 1000,
    mainProduct: '慢病数字化管理平台', businessKeywords: '数字医疗,互联网医疗,慢病管理',
    metric: { dataDate: '2026-06-30', revenueYoy: 30, profitYoy: 25, patentCount: 31, rdRatio: 8.0, highTechFlag: '1', lastFinanceRound: 'angel', lastFinanceAmount: 2000, lastFinanceDate: '2026-04-02', riskLevel: '0', lawsuitCount: 0, abnormalCount: 0, riskNote: '' },
    link: { chainId: 2, nodeId: 11, linkType: '1', linkRole: '3', evidence: '上游图谱人工挂接：智慧医疗延伸环节' }
  },
  {
    companyId: 11, companyName: '汇能锂电材料', creditCode: '91320000DEMO000011',
    region: '新材料园区', industry: 'new_energy', companyScale: '2', estDate: '2016-10-11', regCapital: 15000,
    mainProduct: '电解液添加剂', businessKeywords: '电解液,电池材料,添加剂',
    metric: { dataDate: '2026-06-30', revenueYoy: 35, profitYoy: 28, patentCount: 18, rdRatio: 4.5, highTechFlag: '1', lastFinanceRound: 'series_a', lastFinanceAmount: 12000, lastFinanceDate: '2026-01-20', riskLevel: '3', lawsuitCount: 6, abnormalCount: 3, riskNote: '近两年涉买卖合同纠纷 6 起，曾被列入经营异常名录' },
    link: { chainId: 1, nodeId: 1, linkType: '1', linkRole: '3', evidence: '上游图谱人工挂接：上游原材料环节' }
  },
  {
    companyId: 12, companyName: '远望制药', creditCode: '91320000DEMO000012',
    region: '医药化工园', industry: 'biopharma', companyScale: '2', estDate: '2009-01-15', regCapital: 2000,
    mainProduct: '原料药', businessKeywords: '原料药,医药化工',
    metric: { dataDate: '2026-06-30', revenueYoy: 5, profitYoy: -15, patentCount: 7, rdRatio: 2.0, highTechFlag: '0', lastFinanceRound: 'none', lastFinanceAmount: 0, lastFinanceDate: '', riskLevel: '4', lawsuitCount: 12, abnormalCount: 4, riskNote: '环保处罚与重大诉讼风险，经营异常记录较多' },
    link: { chainId: 2, nodeId: 7, linkType: '1', linkRole: '3', evidence: '上游图谱人工挂接：原料药成熟环节' }
  },
  {
    companyId: 13, companyName: '凌云精密部件', creditCode: '91320000DEMO000013',
    region: '高端制造园', industry: 'new_energy', companyScale: '3', estDate: '2018-05-21', regCapital: 4000,
    mainProduct: '精密金属结构件', businessKeywords: '钣金,冲压,五金结构件',
    metric: { dataDate: '2026-06-30', revenueYoy: 20, profitYoy: 12, patentCount: 30, rdRatio: 5.0, highTechFlag: '0', lastFinanceRound: 'series_a', lastFinanceAmount: 4000, lastFinanceDate: '2025-09-20', riskLevel: '0', lawsuitCount: 0, abnormalCount: 0, riskNote: '' },
    link: null
  }
]

/* ---------- 评分规则（与 02-设计 第 6 节一致，纯前端演示计算） ---------- */

const dict = {
  gap: { '1': '缺链', '2': '弱链', '3': '优势成熟' },
  importance: { '1': '关键核心', '2': '重要支撑', '3': '一般配套' },
  role: { '1': '补链', '2': '强链', '3': '延链' },
  risk: { '0': '无风险', '1': '低风险', '2': '中风险', '3': '高风险', '4': '重大风险' },
  round: { none: '未融资', angel: '天使轮', series_a: 'A轮', series_b: 'B轮', series_c: 'C轮', series_d: 'D+轮', ipo: '已上市' }
}

function roleOfGap(gapType) {
  return gapType === '1' ? '1' : gapType === '2' ? '2' : '3'
}

function findNode(chainId, nodeId) {
  const chain = chains.find(c => c.chainId === chainId)
  return chain ? chain.nodes.find(n => n.nodeId === nodeId) : null
}

function resolveLink(row) {
  if (row.link) {
    return { ...row.link }
  }
  const source = (row.mainProduct || '') + ',' + (row.businessKeywords || '')
  const hits = []
  chains.forEach(chain => {
    chain.nodes.forEach(node => {
      ;(node.keywords || '').split(/[,，]/).forEach(kw => {
        if (kw && source.indexOf(kw) >= 0) {
          hits.push({ chainId: chain.chainId, chainName: chain.chainName, node, keyword: kw })
        }
      })
    })
  })
  if (!hits.length) return null
  hits.sort((a, b) => {
    const ai = a.node.importanceLevel || '3'
    const bi = b.node.importanceLevel || '3'
    if (ai !== bi) return ai.localeCompare(bi)
    if (a.node.gapType !== b.node.gapType) return a.node.gapType.localeCompare(b.node.gapType)
    return a.node.nodeId - b.node.nodeId
  })
  const pick = hits[0]
  const role = roleOfGap(pick.node.gapType)
  const matched = hits.slice(0, 3).map(h => h.keyword).join('、')
  return {
    chainId: pick.chainId,
    nodeId: pick.node.nodeId,
    linkType: '2',
    linkRole: role,
    evidence: `关键词兜底命中：${matched}（环节「${pick.node.nodeName}」关键词）`
  }
}

function round1(v) {
  return Math.round(v * 10) / 10
}

function scoreImportance(node) {
  const base = node.importanceLevel === '1' ? 18 : node.importanceLevel === '2' ? 12 : 7
  const bonus = node.gapType === '1' ? 12 : node.gapType === '2' ? 7 : 3
  const note = node.gapType === '1' ? '本地缺链环节，补链价值高（+12）'
    : node.gapType === '2' ? '本地弱链环节，强链价值较高（+7）' : '成熟/优势环节（+3）'
  return {
    score: Math.min(30, base + bonus),
    items: [
      { label: '环节关键度', value: dict.importance[node.importanceLevel] || node.importanceLevel, note: '基础分 ' + base },
      { label: '环节缺口态', value: dict.gap[node.gapType] || node.gapType, note }
    ]
  }
}

function scoreGrowth(row) {
  const rev = Number(row.metric.revenueYoy) || 0
  const profit = Number(row.metric.profitYoy) || 0
  const reg = Number(row.regCapital) || 0
  const revScore = rev >= 40 ? 14 : rev >= 20 ? 11 : rev >= 0 ? 8 : rev >= -20 ? 4 : 0
  const profitScore = profit >= 30 ? 7 : profit >= 10 ? 5 : profit >= -10 ? 3 : 0
  const regScore = reg >= 10000 ? 4 : reg >= 5000 ? 3 : reg >= 1000 ? 2 : 1
  return {
    score: revScore + profitScore + regScore,
    items: [
      { label: '营收增速', value: rev + '%', note: '档位计 ' + revScore + ' 分' },
      { label: '利润增速', value: profit + '%', note: '档位计 ' + profitScore + ' 分' },
      { label: '注册资本', value: reg + ' 万元', note: '档位计 ' + regScore + ' 分' }
    ]
  }
}

function scoreInnovation(row) {
  const metric = row.metric
  const patents = Number(metric.patentCount) || 0
  const rd = metric.rdRatio == null ? null : Number(metric.rdRatio)
  const techScore = metric.highTechFlag === '1' ? 6 : 0
  const patentScore = patents >= 100 ? 9 : patents >= 30 ? 7 : patents >= 10 ? 5 : patents >= 1 ? 3 : 0
  const rdScore = rd == null ? 0 : rd >= 10 ? 10 : rd >= 5 ? 8 : rd >= 3 ? 6 : rd >= 1 ? 4 : 2
  return {
    score: Math.min(25, techScore + patentScore + rdScore),
    items: [
      { label: '高新技术企业', value: metric.highTechFlag === '1' ? '是' : '否', note: techScore ? '+6 分' : '未认定，+0 分' },
      { label: '有效专利', value: patents + ' 件', note: '档位计 ' + patentScore + ' 分' },
      { label: '研发投入强度', value: rd == null ? '缺失' : rd + '%', note: rd == null ? '数据缺失按 0 分' : '档位计 ' + rdScore + ' 分' }
    ]
  }
}

function monthsBetween(fromStr) {
  if (!fromStr) return null
  const from = new Date(fromStr)
  const now = new Date()
  return Math.max(0, (now.getFullYear() - from.getFullYear()) * 12 + (now.getMonth() - from.getMonth()))
}

function scoreFinance(row) {
  const metric = row.metric
  const roundScore = { none: 0, angel: 5, series_a: 7, series_b: 9, series_c: 12, series_d: 15, ipo: 15 }[metric.lastFinanceRound] || 0
  const months = monthsBetween(metric.lastFinanceDate)
  const recencyScore = roundScore > 0 && months != null
    ? (months <= 6 ? 5 : months <= 12 ? 4 : months <= 24 ? 2 : 0)
    : 0
  return {
    score: Math.min(20, roundScore + recencyScore),
    items: [
      { label: '最新融资轮次', value: dict.round[metric.lastFinanceRound] || '未融资', note: '+' + roundScore + ' 分' },
      { label: '融资新鲜度', value: metric.lastFinanceDate || '—', note: months == null || roundScore === 0 ? '无近期融资记录，+0 分' : recencyScore ? '距今 ' + months + ' 个月，+' + recencyScore + ' 分' : '距今超过 24 个月，+0 分' }
    ]
  }
}

function riskDeduct(riskLevel) {
  return { '1': 4, '2': 8, '3': 14, '4': 20 }[riskLevel] || 0
}

function computeScore(row, link) {
  const node = findNode(link.chainId, link.nodeId)
  if (!node) return null
  const dims = [
    { code: 'importance', name: '环节关键度', max: 30, ...scoreImportance(node) },
    { code: 'growth', name: '经营成长', max: 25, ...scoreGrowth(row) },
    { code: 'innovation', name: '创新实力', max: 25, ...scoreInnovation(row) },
    { code: 'finance', name: '融资热度', max: 20, ...scoreFinance(row) }
  ]
  const pos = dims.reduce((sum, d) => sum + d.score, 0)
  const deduct = riskDeduct(row.metric.riskLevel)
  const total = round1(Math.max(0, pos - deduct))
  const grade = total >= 85 ? 'A' : total >= 70 ? 'B' : total >= 55 ? 'C' : 'D'
  let weak = null
  dims.forEach(d => {
    if (d.score / d.max < 0.5) weak = d.name
  })
  const gap = dict.gap[node.gapType]
  const role = dict.role[link.linkRole]
  const chain = chains.find(c => c.chainId === link.chainId)
  let suggest = ''
  if (grade === 'A') {
    suggest = '建议重点招商/优先对接：' + row.companyName + '处于「' + chain.chainName + '-' + node.nodeName + '」（' + gap + '，' + role + '链价值高），建议纳入区级重点招商名单，优先匹配载体与产业政策。'
  } else if (grade === 'B') {
    suggest = '建议重点合作/培育跟踪：' + row.companyName + '整体经营与创新良好，纳入重点走访名单' + (weak ? '；短板维度为「' + weak + '」，补齐后可升级评估。' : '，综合表现均衡，持续跟踪。')
  } else if (grade === 'C') {
    suggest = '建议一般跟踪：' + row.companyName + '基础一般' + (weak ? '，短板维度为「' + weak + '」，择机接触并持续观察指标变化。' : '，择机接触并持续观察。')
  } else if (deduct > 0) {
    suggest = '建议暂缓/观察：' + row.companyName + '风险项突出（' + (row.metric.riskNote || dict.risk[row.metric.riskLevel]) + '），暂缓招商资源投入，优先完成风险核实。'
  } else {
    suggest = '建议暂缓/观察：' + row.companyName + '综合得分偏低，短板维度为「' + (weak || '经营与创新') + '」，观察指标改善后再评估。'
  }
  return {
    totalScore: total,
    grade,
    riskDeduct: deduct,
    suggest,
    weakDim: weak,
    dimensions: dims,
    riskLevel: row.metric.riskLevel || '0',
    riskLevelName: dict.risk[row.metric.riskLevel] || '无风险',
    riskNote: row.metric.riskNote || '',
    lawsuitCount: Number(row.metric.lawsuitCount) || 0,
    abnormalCount: Number(row.metric.abnormalCount) || 0
  }
}

function buildDetail(raw) {
  const link = resolveLink(raw)
  const company = {
    companyId: raw.companyId,
    companyName: raw.companyName,
    creditCode: raw.creditCode,
    region: raw.region,
    industry: raw.industry,
    companyScale: raw.companyScale,
    estDate: raw.estDate,
    regCapital: raw.regCapital,
    mainProduct: raw.mainProduct,
    businessKeywords: raw.businessKeywords
  }
  const node = link ? findNode(link.chainId, link.nodeId) : null
  const chain = link ? chains.find(c => c.chainId === link.chainId) : null
  const position = link && node ? {
    chainId: link.chainId,
    chainName: chain.chainName,
    nodeId: link.nodeId,
    nodeName: node.nodeName,
    gapType: node.gapType,
    importanceLevel: node.importanceLevel,
    linkType: link.linkType,
    linkRole: link.linkRole,
    evidence: link.evidence
  } : null
  return {
    company,
    metric: { ...raw.metric },
    position,
    score: position ? computeScore(raw, link) : null,
    dataSource: '演示快照口径（mock 数据）',
    message: position ? '' : '暂未归链：未匹配到产业链环节，建议补充挂接或完善业务关键词后重新研判。'
  }
}

function listRows() {
  return rawCompanies.map(raw => {
    const link = resolveLink(raw)
    const node = link ? findNode(link.chainId, link.nodeId) : null
    const chain = link ? chains.find(c => c.chainId === link.chainId) : null
    const score = node ? computeScore(raw, link) : null
    return {
      companyId: raw.companyId,
      companyName: raw.companyName,
      creditCode: raw.creditCode,
      chainId: link ? link.chainId : null,
      chainName: chain ? chain.chainName : '',
      nodeId: link ? link.nodeId : null,
      nodeName: node ? node.nodeName : '',
      gapType: node ? node.gapType : null,
      importanceLevel: node ? node.importanceLevel : null,
      linkType: link ? link.linkType : null,
      linkRole: link ? link.linkRole : null,
      totalScore: score ? score.totalScore : null,
      grade: score ? score.grade : null,
      suggest: score ? score.suggest : '暂未归链：建议补充挂接或完善业务关键词后重新研判。',
      dataDate: raw.metric.dataDate
    }
  })
}

function delay() {
  return new Promise(resolve => setTimeout(resolve, 120))
}

/* ---------- 对外查询函数（形如 api，后端就绪后同构替换） ---------- */

export async function listAssess(query = {}) {
  await delay()
  let rows = listRows()
  const q = query || {}
  if (q.companyName) {
    rows = rows.filter(r => (r.companyName || '').indexOf(q.companyName) >= 0)
  }
  if (q.chainId != null && q.chainId !== '' && q.chainId !== undefined) {
    rows = rows.filter(r => r.chainId === Number(q.chainId))
  }
  if (q.nodeId != null && q.nodeId !== '' && q.nodeId !== undefined) {
    rows = rows.filter(r => r.nodeId === Number(q.nodeId))
  }
  if (q.linkType) {
    rows = rows.filter(r => r.linkType === String(q.linkType))
  }
  if (q.grade) {
    rows = rows.filter(r => r.grade === String(q.grade))
  }
  if (q.minScore != null && q.minScore !== '') {
    rows = rows.filter(r => r.totalScore != null && r.totalScore >= Number(q.minScore))
  }
  if (q.maxScore != null && q.maxScore !== '') {
    rows = rows.filter(r => r.totalScore != null && r.totalScore <= Number(q.maxScore))
  }
  rows = rows.slice().sort((a, b) => {
    if (a.totalScore == null && b.totalScore == null) return a.companyId - b.companyId
    if (a.totalScore == null) return 1
    if (b.totalScore == null) return -1
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore
    return a.companyId - b.companyId
  })
  const pageNum = Math.max(1, Number(q.pageNum) || 1)
  const pageSize = Math.max(1, Number(q.pageSize) || 10)
  const start = (pageNum - 1) * pageSize
  return { rows: rows.slice(start, start + pageSize), total: rows.length }
}

export async function statisticsAssess() {
  await delay()
  const rows = listRows()
  const stat = { total: rows.length, mapped: 0, gradeA: 0, gradeB: 0, gradeC: 0, gradeD: 0 }
  rows.forEach(r => {
    if (!r.grade) return
    stat.mapped += 1
    if (r.grade === 'A') stat.gradeA += 1
    if (r.grade === 'B') stat.gradeB += 1
    if (r.grade === 'C') stat.gradeC += 1
    if (r.grade === 'D') stat.gradeD += 1
  })
  return stat
}

export async function getAssessDetail(companyId) {
  await delay()
  const raw = rawCompanies.find(c => c.companyId === Number(companyId))
  return raw ? buildDetail(raw) : null
}

export async function listAssessChains() {
  await delay()
  return chains.map(chain => ({ ...chain, nodes: chain.nodes.map(n => ({ ...n })) }))
}
