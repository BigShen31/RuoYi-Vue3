<template>
  <div class="app-container">
    <div class="scene-header">
      <h2 class="scene-title">{{ sceneConfig.pageTitle }}</h2>
      <el-tag type="warning" effect="plain" size="small">演示版 · 前端样例数据</el-tag>
    </div>

    <!-- 统计卡片 -->
    <el-row :gutter="16" class="mb16 stat-row">
      <el-col v-for="card in sceneConfig.stats" :key="card.key" :xs="12" :sm="8" :lg="6">
        <div class="stat-card" :style="{ borderLeftColor: card.color }">
          <div class="stat-icon" :style="{ color: card.color }">
            <el-icon :size="28"><component :is="card.icon" /></el-icon>
          </div>
          <div class="stat-body">
            <div class="stat-value">{{ statistics[card.key] ?? 0 }}</div>
            <div class="stat-label">{{ card.label }}</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 搜索区 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" class="mb8">
      <el-form-item label="企业名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入企业名称"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产业链" prop="chainId">
        <el-select v-model="queryParams.chainId" placeholder="请选择产业链" clearable style="width: 170px" @change="handleChainChange">
          <el-option v-for="chain in chainOptions" :key="chain.chainId" :label="chain.chainName" :value="chain.chainId" />
        </el-select>
      </el-form-item>
      <el-form-item label="链环节" prop="nodeId">
        <el-select v-model="queryParams.nodeId" placeholder="请选择环节" clearable style="width: 170px" :disabled="!queryParams.chainId">
          <el-option v-for="node in nodeOptions" :key="node.nodeId" :label="node.nodeName" :value="node.nodeId" />
        </el-select>
      </el-form-item>
      <el-form-item label="等级" prop="grade">
        <el-select v-model="queryParams.grade" placeholder="请选择等级" clearable style="width: 150px">
          <el-option v-for="(meta, grade) in sceneConfig.gradeMeta" :key="grade" :label="meta.label" :value="grade" />
        </el-select>
      </el-form-item>
      <el-form-item label="归属方式" prop="linkType">
        <el-select v-model="queryParams.linkType" placeholder="请选择归属方式" clearable style="width: 150px">
          <el-option v-for="(label, value) in sceneConfig.dicts.linkType" :key="value" :label="label" :value="value" />
        </el-select>
      </el-form-item>
      <el-form-item label="得分区间">
        <el-input-number v-model="queryParams.minScore" :min="0" :max="100" placeholder="最低" style="width: 110px" controls-position="right" />
        <span style="margin: 0 6px">至</span>
        <el-input-number v-model="queryParams.maxScore" :min="0" :max="100" placeholder="最高" style="width: 110px" controls-position="right" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="rows">
      <el-table-column label="企业名称" min-width="180" align="left" show-overflow-tooltip>
        <template #default="scope">
          <el-link type="primary" :underline="false" @click="handleDetail(scope.row)">{{ scope.row.companyName }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="creditCode" label="统一社会信用代码" width="165" align="center" />
      <el-table-column prop="chainName" label="所属产业链" width="120" align="center">
        <template #default="scope">{{ scope.row.chainName || '—' }}</template>
      </el-table-column>
      <el-table-column prop="nodeName" label="所在环节" width="130" align="center">
        <template #default="scope">{{ scope.row.nodeName || '—' }}</template>
      </el-table-column>
      <el-table-column label="环节定位" width="150" align="center">
        <template #default="scope">
          <template v-if="scope.row.nodeName">
            <el-tag size="small" type="warning" effect="plain">{{ dictOf('gap', scope.row.gapType) }}</el-tag>
            <el-tag size="small" type="danger" effect="plain" style="margin-left: 4px">{{ dictOf('importance', scope.row.importanceLevel) }}</el-tag>
          </template>
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column label="归属方式" width="115" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.linkType" size="small" :type="scope.row.linkType === '2' ? 'warning' : 'success'" effect="plain">
            {{ dictOf('linkType', scope.row.linkType) }}
          </el-tag>
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column label="链价值角色" width="105" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.linkRole" size="small" type="primary" effect="plain">{{ dictOf('linkRole', scope.row.linkRole) }}</el-tag>
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column label="综合评分" width="90" align="center" sortable :sort-method="sortScore">
        <template #default="scope">
          <span v-if="scope.row.totalScore != null" class="score-text">{{ scope.row.totalScore }}</span>
          <el-tag v-else size="small" type="info">未归链</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="等级" width="140" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.grade" :type="sceneConfig.gradeMeta[scope.row.grade].tag" effect="dark">
            {{ sceneConfig.gradeMeta[scope.row.grade].label }}
          </el-tag>
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column label="行动建议" min-width="220" align="left" show-overflow-tooltip>
        <template #default="scope">{{ scope.row.suggest }}</template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center" fixed="right">
        <template #default="scope">
          <el-button link type="primary" icon="View" @click="handleDetail(scope.row)">研判</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 研判详情抽屉 -->
    <AssessDetail v-model:visible="detailVisible" :company-id="detailCompanyId" />
  </div>
</template>

<script setup name="Assess">
import sceneConfig from '@/scene/assess'
import { listAssess, statisticsAssess, listAssessChains } from '@/scene/assessMock'
import AssessDetail from './components/AssessDetail.vue'

const loading = ref(true)
const showSearch = ref(true)
const rows = ref([])
const total = ref(0)
const statistics = ref({})
const chainOptions = ref([])
const detailVisible = ref(false)
const detailCompanyId = ref(null)

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    companyName: '',
    chainId: undefined,
    nodeId: undefined,
    grade: '',
    linkType: '',
    minScore: null,
    maxScore: null
  }
})
const { queryParams } = toRefs(data)

const nodeOptions = computed(() => {
  const chain = chainOptions.value.find(item => item.chainId === queryParams.value.chainId)
  return chain ? chain.nodes : []
})

function dictOf(mapKey, value) {
  if (value == null || value === '') return '—'
  return sceneConfig.dicts[mapKey][value] || value
}

function sortScore(a, b) {
  const av = a.totalScore == null ? -1 : a.totalScore
  const bv = b.totalScore == null ? -1 : b.totalScore
  return av - bv
}

function getList() {
  loading.value = true
  listAssess(queryParams.value).then(response => {
    rows.value = response.rows
    total.value = response.total
    loading.value = false
  })
  loadStatistics()
}

function loadStatistics() {
  statisticsAssess().then(res => {
    statistics.value = res || {}
  })
}

function loadChains() {
  listAssessChains().then(res => {
    chainOptions.value = res || []
  })
}

function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}

function resetQuery() {
  queryParams.value.companyName = ''
  queryParams.value.chainId = undefined
  queryParams.value.nodeId = undefined
  queryParams.value.grade = ''
  queryParams.value.linkType = ''
  queryParams.value.minScore = null
  queryParams.value.maxScore = null
  handleQuery()
}

function handleChainChange() {
  queryParams.value.nodeId = undefined
  handleQuery()
}

function handleDetail(row) {
  detailCompanyId.value = row.companyId
  detailVisible.value = true
}

loadChains()
getList()
</script>

<style scoped>
.scene-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.scene-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}
.mb8 {
  margin-bottom: 8px;
}
.mb16 {
  margin-bottom: 16px;
}
.stat-row {
  margin-bottom: 16px;
}
.stat-card {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  background: #fff;
  border-left: 4px solid #409eff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 8px;
}
.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.03);
  margin-right: 12px;
}
.stat-body {
  flex: 1;
}
.stat-value {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  color: #303133;
}
.stat-label {
  margin-top: 2px;
  font-size: 13px;
  color: #909399;
}
.score-text {
  font-weight: 700;
  font-size: 16px;
  color: #303133;
}
</style>
