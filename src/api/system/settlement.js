import request from '@/utils/request'

// 查询灵活用工结算单列表
export function listSettlement(query) {
  return request({
    url: '/system/settlement/list',
    method: 'get',
    params: query
  })
}

// 灵活用工结算单统计
export function statisticsSettlement() {
  return request({
    url: '/system/settlement/statistics',
    method: 'get'
  })
}

// 查询灵活用工结算单详细
export function getSettlement(settlementId) {
  return request({
    url: '/system/settlement/' + settlementId,
    method: 'get'
  })
}

// 新增灵活用工结算单
export function addSettlement(data) {
  return request({
    url: '/system/settlement',
    method: 'post',
    data: data
  })
}

// 修改灵活用工结算单
export function updateSettlement(data) {
  return request({
    url: '/system/settlement',
    method: 'put',
    data: data
  })
}

// 结算状态推进（待审核→已结算→已支付）
export function changeSettlementStatus(data) {
  return request({
    url: '/system/settlement/status',
    method: 'put',
    data: data
  })
}

// 删除灵活用工结算单
export function delSettlement(settlementId) {
  return request({
    url: '/system/settlement/' + settlementId,
    method: 'delete'
  })
}
