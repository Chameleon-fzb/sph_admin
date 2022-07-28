import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  }
]
// 商品管理相关的路由
/**
    不是常量路由,
    根据用户信息进行注册
  */
//  异步(权限)路由
export const allAsyncRoutes = [
  //  用户权限管理路由
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock'
    },
    children: [
      {
        name: 'User',
        path: 'user/list',
        component: () => import('@/views/acl/user'),
        meta: {
          title: '用户管理'
        }
      },
      {
        name: 'Role',
        path: 'role/list',
        component: () => import('@/views/acl/role'),
        meta: {
          title: '角色管理'
        }
      },
      {
        name: 'RoleAuth',
        path: 'role/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权'
        },
        hidden: true
      },
      {
        name: 'Permission',
        path: 'permission/list',
        component: () => import('@/views/acl/permission'),
        meta: {
          title: '菜单管理'
        }
      }
    ]
  },
  //  商品权限管理路由
  {
    path: '/product',
    component: Layout, // 首先展示一级路由
    name: 'Product',
    meta: { title: '商品管理', icon: 'el-icon-s-shop' },
    children: [
      {
        path: 'trademark',
        component: () => import('@/views/product/trademark/List'),
        name: 'Trademark',
        meta: { title: '品牌管理' }
      },
      {
        path: 'attr',
        component: () => import('@/views/product/attr/List'),
        name: 'Attr',
        meta: { title: '属性管理' }
      },
      {
        path: 'sku',
        component: () => import('@/views/product/sku/List'),
        name: 'Sku',
        meta: { title: 'sku管理' }
      },
      {
        path: 'spu',
        component: () => import('@/views/product/spu/List'),
        name: 'Spu',
        meta: { title: 'spu管理' }
      }
    ]
  },
  // 测试权限管理路由
  {
    path: '/text',
    component: Layout, // 首先展示一级路由
    name: 'Text',
    meta: { title: '测试管理', icon: 'el-icon-magic-stick' },
    children: [
      {
        path: 'text1',
        component: () => import('@/views/text/text1'),
        name: 'Text1',
        meta: { title: '测试1管理' }
      },
      {
        path: 'text2',
        component: () => import('@/views/text/text2'),
        name: 'Text2',
        meta: { title: '测试2管理' }
      }
    ]
  }
]
// 任意路由 添加路由必须最后一个注册
// 404 page must be placed at the end !!!
export const anyRoutes = [{ path: '*', redirect: '/404', hidden: true }]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
