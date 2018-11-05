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
    local: '',
    dictionaries: {}
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
    //字典处理成键值对
    dictionariesGetters(state) {
      let obj = {};
      for (let attr in state.dictionaries) {
        obj[attr] = {}
        const dict = state.dictionaries[attr]
        //循环key构建空obj，每组只循环一次
        dict.forEach((t, i) => {
          if (i > 0) {
            return false
          }
          for (let k in t) {
            obj[attr][k] = {};
          }
        })
        //赋值obj对应的key值。
        dict.forEach((t) => {
          for (let k in t) {
            obj[attr][k][t.value] = t[k]
          }
        })
        //删除叫value的obj
        dict.forEach((t) => {
          delete obj[attr].value
        })
      }
      return obj
    }
  },
  mutations: {
    setDictionaries(state, list) {
      state.dictionaries = list;
    },
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
          let obj = {}
          res.data.forEach((t) => {
            obj[t.typeCode] = [];
          })
          res.data.forEach((t) => {
            obj[t.typeCode].push({
              label: t.name,
              value: t.code
            })
          })
          commit('setDictionaries', obj)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}