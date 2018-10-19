import { login, logout, getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    realName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setRealName (state, name) {
      state.realName = name
    },

    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, formModel) {
      formModel.userName = formModel.userName.trim()
      return new Promise((resolve, reject) => {
        login(formModel).then(res => {
          commit('setToken', res.data.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(res => {
          commit('setAvator', res.data.avatar)
          commit('setUserName', res.data.userName)
          commit('setRealName', res.data.realName)
          commit('setUserId', res.data.id)
          commit('setAccess', res.data.access || [])
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
