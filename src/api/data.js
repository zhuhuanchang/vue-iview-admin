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
//获取产品分类
export const getProductClassification = (payload) => {
  return axios.request({
    url: '/productClassification',
    method: 'get',
    params: payload,
  })
}
//获取系统菜单
export const getSystemMenu = (payload) => {
  return axios.request({
    url: '/systemMenu',
    method: 'get',
    params: payload,
  })
}
//获取数据字典
export const getDictionary = (payload) => {
  return axios.request({
    url: '/dictionaryItem',
    method: 'get',
    params: payload,
  })
}