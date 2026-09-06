<template>
  <div class="app-container">
    <!-- 页面标题与统计卡片 -->
    <div class="scene-header">
      <h2 class="scene-title">{{ sceneConfig.pageTitle }}</h2>
    </div>
    <el-row :gutter="16" class="mb16 stat-row">
      <el-col v-for="card in sceneConfig.stats" :key="card.key" :xs="12" :sm="6">
        <div class="stat-card" :style="{ borderLeftColor: card.color }">
          <div class="stat-icon" :style="{ color: card.color }">
            <el-icon :size="30"><component :is="card.icon" /></el-icon>
          </div>
          <div class="stat-body">
            <div class="stat-value">{{ statistics[card.key] ?? 0 }}</div>
            <div class="stat-label">{{ card.label }}</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 搜索区 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item v-for="item in sceneConfig.search" :key="item.prop" :label="item.label" :prop="item.prop">
        <el-input
          v-if="item.type === 'input'"
          v-model="queryParams[item.prop]"
          :placeholder="item.placeholder || '请输入' + item.label"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
        <el-select
          v-else-if="item.type === 'select'"
          v-model="queryParams[item.prop]"
          :placeholder="item.placeholder || '请选择' + item.label"
          clearable
          style="width: 200px"
        >
          <el-option
            v-for="dict in dictOptions(item.dict)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作按钮区 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:project:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate" v-hasPermi="['system:project:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:project:remove']">删除</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="projectList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        v-for="col in sceneConfig.columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :min-width="col.minWidth"
        :align="col.align || 'center'"
        :show-overflow-tooltip="col.showOverflowTooltip"
      >
        <template #default="scope">
          <dict-tag v-if="col.dict" :options="dictOptions(col.dict)" :value="scope.row[col.prop]" />
          <span v-else-if="col.type === 'date'">{{ parseTime(scope.row[col.prop], '{y}-{m}-{d}') }}</span>
          <span v-else-if="col.type === 'datetime'">{{ parseTime(scope.row[col.prop]) }}</span>
          <span v-else>{{ scope.row[col.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            v-if="nextStepOf(scope.row)"
            link
            type="success"
            icon="Right"
            @click="handleNext(scope.row)"
            v-hasPermi="['system:project:edit']"
          >{{ nextStepOf(scope.row).action }}</el-button>
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:project:edit']">修改</el-button>
          <el-button link type="danger" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:project:remove']">删除</el-button>
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

    <!-- 新增/修改对话框 -->
    <el-dialog :title="title" v-model="open" width="720px" append-to-body>
      <el-form ref="projectRef" :model="form" :rules="rules" label-width="130px">
        <el-row :gutter="20">
          <el-col v-for="item in sceneConfig.form" :key="item.prop" :span="item.span || 12">
            <el-form-item :label="item.label" :prop="item.prop">
              <el-input
                v-if="item.type === 'input'"
                v-model="form[item.prop]"
                :maxlength="item.maxlength"
                :placeholder="item.placeholder || '请输入' + item.label"
              />
              <el-select
                v-else-if="item.type === 'select'"
                v-model="form[item.prop]"
                :placeholder="item.placeholder || '请选择' + item.label"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="dict in dictOptions(item.dict)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
              <el-input-number
                v-else-if="item.type === 'inputNumber'"
                v-model="form[item.prop]"
                :min="item.min"
                :max="item.max"
                :precision="item.precision"
                controls-position="right"
                style="width: 100%"
              />
              <el-input
                v-else-if="item.type === 'textarea'"
                v-model="form[item.prop]"
                type="textarea"
                :rows="3"
                :maxlength="item.maxlength"
                :placeholder="item.placeholder || '请输入' + item.label"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Project">
import sceneConfig from '@/scene/config'
import { listProject, statisticsProject, getProject, addProject, updateProject, changeProjectStatus, delProject } from '@/api/system/project'

const { proxy } = getCurrentInstance()
const { biz_project_status, biz_industry } = useDict('biz_project_status', 'biz_industry')

const dictMap = {
  biz_project_status,
  biz_industry
}

function dictOptions(dictType) {
  return dictMap[dictType] || []
}

const projectList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const title = ref('')
const statistics = ref({})

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10
  },
  rules: {}
})

// 由场景配置生成校验规则
sceneConfig.form.forEach(item => {
  if (item.required) {
    data.rules[item.prop] = [{ required: true, message: item.label + '不能为空', trigger: item.type === 'select' ? 'change' : 'blur' }]
  }
})

const { queryParams, form, rules } = toRefs(data)

/** 查询列表与统计 */
function getList() {
  loading.value = true
  listProject(queryParams.value).then(response => {
    projectList.value = response.rows
    total.value = response.total
    loading.value = false
  })
  loadStatistics()
}

function loadStatistics() {
  statisticsProject().then(response => {
    statistics.value = response.data || {}
  })
}

/** 重置搜索 */
function resetQuery() {
  sceneConfig.search.forEach(item => {
    queryParams.value[item.prop] = undefined
  })
  proxy.resetForm('queryRef')
  handleQuery()
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}

/** 多选处理 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.projectId)
  single.value = selection.length !== 1
  multiple.value = !selection.length
}

/** 重置表单 */
function reset() {
  form.value = {}
  proxy.resetForm('projectRef')
}

/** 新增按钮 */
function handleAdd() {
  reset()
  open.value = true
  title.value = '新增' + sceneConfig.pageTitle
}

/** 修改按钮 */
function handleUpdate(row) {
  reset()
  const id = row.projectId || ids.value[0]
  getProject(id).then(response => {
    form.value = response.data
    open.value = true
    title.value = '修改' + sceneConfig.pageTitle
  })
}

/** 状态推进：当前行 → 下一状态 */
function nextStepOf(row) {
  return sceneConfig.statusFlow[row.projectStatus] || null
}

function statusLabel(value) {
  const found = biz_project_status.value.find(item => item.value === String(value))
  return found ? found.label : value
}

function handleNext(row) {
  const step = nextStepOf(row)
  if (!step) return
  const targetLabel = statusLabel(step.next)
  proxy.$modal.confirm('确认将项目「' + row.projectName + '」推进为「' + targetLabel + '」吗？').then(function () {
    return changeProjectStatus({ projectId: row.projectId, projectStatus: step.next })
  }).then(() => {
    proxy.$modal.msgSuccess('推进成功')
    getList()
  }).catch(() => {})
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs['projectRef'].validate(valid => {
    if (valid) {
      if (form.value.projectId != null) {
        updateProject(form.value).then(response => {
          proxy.$modal.msgSuccess('修改成功')
          open.value = false
          getList()
        })
      } else {
        addProject(form.value).then(response => {
          proxy.$modal.msgSuccess('新增成功')
          open.value = false
          getList()
        })
      }
    }
  })
}

/** 删除按钮 */
function handleDelete(row) {
  const projectIds = row.projectId || ids.value
  proxy.$modal.confirm('是否确认删除所选项目数据？').then(function () {
    return delProject(projectIds)
  }).then(() => {
    getList()
    proxy.$modal.msgSuccess('删除成功')
  }).catch(() => {})
}

/** 取消按钮 */
function cancel() {
  open.value = false
  reset()
}

getList()
</script>

<style scoped>
.scene-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.scene-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}
.mb16 {
  margin-bottom: 16px;
}
.stat-card {
  display: flex;
  align-items: center;
  padding: 16px 18px;
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
  width: 52px;
  height: 52px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.03);
  margin-right: 14px;
}
.stat-body {
  flex: 1;
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  color: #303133;
}
.stat-label {
  margin-top: 2px;
  font-size: 13px;
  color: #909399;
}
</style>
