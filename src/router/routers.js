import Main from '@/view/main'
import parentView from '@/components/parent-view'
import {
  getRoleList
} from "@/api/data";

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () =>
      import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        hideInMenu: true,
        title: '首页',
        notCache: true
      },
      component: () =>
        import('@/view/single-page/home')
    }]
  },
  // {
  //   path: '',
  //   name: 'doc',
  //   meta: {
  //     title: '文档',
  //     href: 'https://lison16.github.io/iview-admin-doc/#/',
  //     icon: 'ios-book'
  //   }
  // },
  {
    path: '/customer',
    name: 'customer',
    component: Main,
    meta: {
      icon: '_qq',
      title: '客户管理',
    },
    children: [{
      path: 'customer_page',
      name: 'customer_page',
      meta: {
        icon: '_qq',
        title: '客户管理'
      },
      component: () =>
        import('@/view/customer/customer.vue')
    }]
  },
  {
    path: '/product',
    name: 'product',
    component: Main,
    meta: {
      icon: '_qq',
      title: '产品管理',
    },
    children: [{
        path: 'product_page',
        name: 'product_page',
        meta: {
          icon: '_qq',
          title: '产品管理'
        },
        component: () =>
          import('@/view/product/product.vue')
      },
      {
        path: 'productClassification_page',
        name: 'productClassification_page',
        meta: {
          icon: '_qq',
          title: '分类管理',
        },
        component: () =>
          import('@/view/productClassification/productClassification.vue')
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    component: Main,
    meta: {
      icon: '_qq',
      title: '系统管理',
      access: ['admin']
    },
    children: [{
      path: 'user_page',
      name: 'user_page',
      meta: {
        icon: '_qq',
        title: '用户管理'
      },
      component: () =>
        import('@/view/user/user.vue')
    }, {
      path: 'role_page',
      name: 'role_page',
      meta: {
        icon: '_qq',
        title: '角色管理',
      },
      component: () =>
        import('@/view/role/role.vue')
    }, {
      path: 'dictionary_page',
      name: 'dictionary_page',
      meta: {
        icon: '_qq',
        title: '字典管理',
      },
      component: () =>
        import('@/view/dictionary/dictionary.vue')
    }, {
      path: 'systemMenu_page',
      name: 'systemMenu_page',
      meta: {
        icon: '_qq',
        title: '菜单管理',
      },
      component: () =>
        import('@/view/systemMenu/systemMenu.vue')
    }]


  },
  {
    path: '/userCenter',
    name: 'userCenter',
    component: Main,
    meta: {
      hideInMenu: true,
      title: '个人中心',
    },
    children: [{
      path: 'userCenter_page',
      name: 'userCenter_page',
      meta: {
        icon: '_qq',
        title: '个人中心'
      },
      component: () =>
        import('@/view/userCenter/userCenter.vue')
    }]
  },

  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import('@/view/error-page/404.vue')
  }
]