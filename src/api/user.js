import axios from '@/libs/api.request'

export const login = (formModel) => {
  return axios.request({
    url: '/user/access/login',
    data: formModel,
    method: 'post'
  })
}
export const register = (user) => {
  return axios.request({
    url: '/user',
    data: user,
    method: 'post'
  })
}
//根据http请求header里带的token去获取用户信息
export const getUserInfo = (token) => {
  return axios.request({
    url: '/user/access/current',
    // params: {
    //   token
    // },
    method: 'get'
  })
}
//修改用户基础信息
export const updateUserInfo = (user) => {
  return axios.request({
    url: '/user/access/resetSelf',
    data: user,
    method: 'put'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/user/access/logout',
    method: 'get'
  })
}
