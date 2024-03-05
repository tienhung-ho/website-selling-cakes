const routesAdmin = [
  {
    path: '/admin',
    redirect: '/admin/products',
    name: 'LayoutAd',
    component: () => import('@/views/admin/layout/Layout.vue'),
    children: [
      {
        path: '/admin/products',
        name: 'Products',
        component: () => import('@/views/admin/product/Products.vue'),
        meta: { requiresAuth: true }
      },

      {
        path: '/admin/liked',
        name: 'Like',
        component: () => import('@/views/admin/product/Like.vue'),
        meta: { requiresAuth: true }
      },

      {
        path: 'products/create',
        name: 'Create',
        component: () => import('@/views/admin/product/Create.vue'),
        meta: { requiresAuth: true }
      },

      {
        path: 'products/edit/:slug',
        name: 'Edit',
        component: () => import('@/views/admin/product/Edit.vue'),
        meta: { requiresAuth: true }
      },

      {
        path: 'products/detail/:slug',
        name: 'Detail',
        component: () => import('@/views/admin/product/Detail.vue'),
        meta: { requiresAuth: true }
      },

      {
        path: 'staff',
        name: 'Staff',
        component: () => import('@/views/admin/staffs/Staff.vue'),
        meta: { requiresAuth: true },
        children: [
        ]
      },

      {
        path: 'staff/create',
        name: 'CreateStaff',
        component: () => import('@/views/admin/staffs/Create.vue'),
        meta: { requiresAuth: true }
      },

      {
        path: 'staff/edit/:slug',
        name: 'EditStaff',
        component: () => import('@/views/admin/staffs/Edit.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'permissions',
        name: 'Permissions',
        component: () => import('@/views/admin/roles/Permissions.vue'),
        meta: { requiresAuth: true }
      },

      {
        path: 'roles',
        name: 'Roles',
        component: () => import('@/views/admin/roles/Roles.vue'),
        meta: { requiresAuth: true }
      },

      {
        path: 'roles/create',
        name: 'CreateRoles',
        component: () => import('@/views/admin/roles/Create.vue'),
        meta: { requiresAuth: true }
      },

      
    ]
  },
  {
    path: '/staff/auth/login',
    name: 'LoginAdmin',
    component: () => import('@/views/admin/auth/Login.vue'),
    // meta: { requiresAuth: false }
  },

]


export default routesAdmin
