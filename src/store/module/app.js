import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  routeHasExist
} from '@/libs/util'
import routers from '@/router/routers'
import {
  getDictionary
} from '@/api/data'
export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: getHomeRoute(routers),
    local: ''
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access)
  },
  mutations: {
    setBreadCrumb(state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
    },
    setTagNavList(state, list) {
      if (list) {
        state.tagNavList = [...list]
        setTagNavListInLocalstorage([...list])
      } else state.tagNavList = getTagNavListFromLocalstorage()
    },
    addTag(state, {
      route,
      type = 'unshift'
    }) {
      if (!routeHasExist(state.tagNavList, route)) {
        if (type === 'push') state.tagNavList.push(route)
        else {
          if (route.name === 'home') state.tagNavList.unshift(route)
          else state.tagNavList.splice(1, 0, route)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal(state, lang) {
      state.local = lang
    },
  },
  actions: {
    // 获取数据字典
    getDictionary({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        getDictionary().then(res => {
          // commit('setAvator', res.data.avatar)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}