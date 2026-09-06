import request from '@/utils/request'

// 查询招商项目列表
export function listProject(query) {
  return request({
    url: '/system/project/list',
    method: 'get',
    params: query
  })
}

// 招商项目统计（总数/在谈/已签约/已落地）
export function statisticsProject() {
  return request({
    url: '/system/project/statistics',
    method: 'get'
  })
}

// 查询招商项目详细
export function getProject(projectId) {
  return request({
    url: '/system/project/' + projectId,
    method: 'get'
  })
}

// 新增招商项目
export function addProject(data) {
  return request({
    url: '/system/project',
    method: 'post',
    data: data
  })
}

// 修改招商项目
export function updateProject(data) {
  return request({
    url: '/system/project',
    method: 'put',
    data: data
  })
}

// 招商项目状态推进（洽谈中→已签约→已落地）
export function changeProjectStatus(data) {
  return request({
    url: '/system/project/status',
    method: 'put',
    data: data
  })
}

// 删除招商项目
export function delProject(projectId) {
  return request({
    url: '/system/project/' + projectId,
    method: 'delete'
  })
}
