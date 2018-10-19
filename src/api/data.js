import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}
//获取角色列表
export const getRoleList = (payload) => {
  return axios.request({
    url: '/role',
    method: 'get',
    params: payload,
  })
}
