<template>
  <el-drawer
    :model-value="visible"
    title="企业研判详情"
    size="720px"
    append-to-body
    destroy-on-close
    @update:model-value="val => emit('update:visible', val)"
  >
    <div v-loading="loading">
      <template v-if="detail">
        <!-- 未归链提示 -->
        <el-alert
          v-if="!detail.position"
          :title="detail.message"
          type="warning"
          :closable="false"
          show-icon
          class="mb16"
        />

        <!-- 一、企业画像 -->
        <el-divider content-position="left">企业画像</el-divider>
        <el-descriptions :column="2" border size="small">
          <el-descriptions-item label="企业名称">{{ detail.company.companyName }}</el-descriptions-item>
          <el-descriptions-item label="统一社会信用代码">{{ detail.company.creditCode }}</el-descriptions-item>
          <el-descriptions-item label="所在地区">{{ detail.company.region }}</el-descriptions-item>
          <el-descriptions-item label="行业">{{ dictOf('industry', detail.company.industry) }}</el-descriptions-item>
          <el-descriptions-item label="规模">{{ dictOf('companyScale', detail.company.companyScale) }}</el-descriptions-item>
          <el-descriptions-item label="成立日期">{{ detail.company.estDate }}</el-descriptions-item>
          <el-descriptions-item label="注册资本">{{ detail.company.regCapital }} 万元</el-descriptions-item>
          <el-descriptions-item label="主营产品">{{ detail.company.mainProduct }}</el-descriptions-item>
          <el-descriptions-item label="业务关键词" :span="2">{{ detail.company.businessKeywords }}</el-descriptions-item>
        </el-descriptions>

        <el-descriptions :column="3" border size="small" class="mt12">
          <el-descriptions-item label="指标快照日">{{ detail.metric.dataDate }}</el-descriptions-item>
          <el-descriptions-item label="营收增速">{{ detail.metric.revenueYoy }}%</el-descriptions-item>
          <el-descriptions-item label="利润增速">{{ detail.metric.profitYoy }}%</el-descriptions-item>
          <el-descriptions-item label="有效专利">{{ detail.metric.patentCount }} 件</el-descriptions-item>
          <el-descriptions-item label="研发强度">{{ detail.metric.rdRatio }}%</el-descriptions-item>
          <el-descriptions-item label="高企">{{ detail.metric.highTechFlag === '1' ? '是' : '否' }}</el-descriptions-item>
          <el-descriptions-item label="最新融资轮次">{{ dictOf('financeRound', detail.metric.lastFinanceRound) }}</el-descriptions-item>
          <el-descriptions-item label="融资额">{{ detail.metric.lastFinanceAmount }} 万元</el-descriptions-item>
          <el-descriptions-item label="融资日期">{{ detail.metric.lastFinanceDate || '—' }}</el-descriptions-item>
        </el-descriptions>

        <!-- 二、链环节定位 -->
        <template v-if="detail.position">
          <el-divider content-position="left">链环节定位</el-divider>
          <div class="position-line">
            <el-tag type="primary" effect="dark" size="large">{{ detail.position.chainName }}</el-tag>
            <el-icon class="arrow"><ArrowRight /></el-icon>
            <el-tag type="success" effect="dark" size="large">{{ detail.position.nodeName }}</el-tag>
            <el-tag type="warning" effect="plain">{{ dictOf('gap', detail.position.gapType) }}</el-tag>
            <el-tag type="danger" effect="plain">{{ dictOf('importance', detail.position.importanceLevel) }}</el-tag>
            <el-tag v-if="detail.position.linkRole" type="primary" effect="plain">{{ dictOf('linkRole', detail.position.linkRole) }}链</el-tag>
          </div>
          <el-alert
            class="mt12"
            :title="'归属依据：' + detail.position.evidence"
            :type="detail.position.linkType === '2' ? 'warning' : 'success'"
            :closable="false"
            show-icon
          />

          <!-- 三、综合评分 -->
          <el-divider content-position="left">综合研判</el-divider>
          <div v-if="detail.score" class="score-box">
            <div class="score-main">
              <div class="score-num">{{ detail.score.totalScore }}</div>
              <el-tag :type="gradeMetaOf(detail.score.grade).tag" effect="dark" size="large">{{ gradeMetaOf(detail.score.grade).label }}</el-tag>
            </div>
            <el-alert
              class="mt12"
              :title="'行动建议：' + detail.score.suggest"
              type="success"
              :closable="false"
              show-icon
            />
          </div>

          <!-- 四、分维打分卡 -->
          <el-divider content-position="left">分维得分与依据</el-divider>
          <div v-for="dim in detail.score.dimensions" :key="dim.code" class="dim-card">
            <div class="dim-head">
              <span class="dim-name">{{ dim.name }}</span>
              <el-progress
                :percentage="pctOf(dim)"
                :stroke-width="14"
                :color="progressColor(dim)"
                style="flex: 1; margin: 0 12px"
              />
              <span class="dim-score">{{ dim.score }} / {{ dim.max }}</span>
            </div>
            <ul class="evidence-list">
              <li v-for="(item, index) in dim.items" :key="index">
                {{ item.label }}：<b>{{ item.value }}</b>（{{ item.note }}）
              </li>
            </ul>
          </div>

          <!-- 五、风险提示 -->
          <template v-if="detail.score.riskDeduct > 0">
            <el-divider content-position="left">风险提示</el-divider>
            <el-alert
              type="error"
              :closable="false"
              show-icon
              :title="'风险档：' + dictOf('riskLevel', detail.score.riskLevel) + '（扣 ' + detail.score.riskDeduct + ' 分）'"
              :description="'涉诉 ' + detail.score.lawsuitCount + ' 次、经营异常 ' + detail.score.abnormalCount + ' 次；' + (detail.score.riskNote || '')"
            />
          </template>
        </template>

        <div class="source-tip">{{ detail.dataSource }}｜{{ sceneConfig.dicts.dataSourceTip }}</div>
      </template>
    </div>
  </el-drawer>
</template>

<script setup name="AssessDetail">
import sceneConfig from '@/scene/assess'
import { getAssessDetail } from '@/scene/assessMock'

const props = defineProps({
  visible: { type: Boolean, default: false },
  companyId: { type: Number, default: null }
})
const emit = defineEmits(['update:visible'])

const loading = ref(false)
const detail = ref(null)

function dictOf(mapKey, value) {
  if (value == null || value === '') return '—'
  return sceneConfig.dicts[mapKey][value] || value
}

function gradeMetaOf(grade) {
  return sceneConfig.gradeMeta[grade] || { label: grade, tag: 'info' }
}

function pctOf(dim) {
  return Math.round((dim.score / dim.max) * 100)
}

function progressColor(dim) {
  const ratio = dim.score / dim.max
  return ratio >= 0.7 ? '#67C23A' : ratio >= 0.5 ? '#409EFF' : '#E6A23C'
}

watch(
  () => [props.visible, props.companyId],
  ([visible, companyId]) => {
    if (!visible || companyId == null) {
      if (!visible) detail.value = null
      return
    }
    loading.value = true
    getAssessDetail(companyId).then(res => {
      detail.value = res
      loading.value = false
    })
  },
  { immediate: true }
)
</script>

<style scoped>
.mb16 {
  margin-bottom: 16px;
}
.mt12 {
  margin-top: 12px;
}
.position-line {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.arrow {
  color: #909399;
}
.score-box {
  padding: 12px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  background: #fafafa;
}
.score-main {
  display: flex;
  align-items: center;
  gap: 16px;
}
.score-num {
  font-size: 34px;
  font-weight: 700;
  color: #303133;
  line-height: 1;
}
.dim-card {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
}
.dim-head {
  display: flex;
  align-items: center;
}
.dim-name {
  width: 88px;
  font-weight: 600;
  color: #303133;
}
.dim-score {
  color: #606266;
  white-space: nowrap;
}
.evidence-list {
  margin: 10px 0 0;
  padding-left: 18px;
  color: #606266;
  font-size: 13px;
  line-height: 1.9;
}
.source-tip {
  margin-top: 20px;
  padding: 8px 12px;
  border-radius: 4px;
  background: #f4f4f5;
  color: #909399;
  font-size: 12px;
  line-height: 1.6;
}
</style>
