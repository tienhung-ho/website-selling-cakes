
import { createWebHistory, createRouter } from "vue-router"


const routesClient = [

  {
    path: '/',
    redirect: '/home', 
    name: 'Layout',
    component: () => import('@/views/client/layout/Layout.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/client/home/Home.vue')
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/client/contact/Contact.vue')
      },
      {
        path: '/shop',
        name: 'Shop',
        component: () => import('@/views/client/shop/Shop.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/client/about/About.vue')
      },
      {
        path: '/details/:slug',
        name: 'Details',
        component: () => import('@/views/client/detail/Details.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/client/forms/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/components/client/forms/Register.vue')
      },
      {
        path: '/infor',
        name: 'User',
        component: () => import('@/components/client/forms/User.vue')

      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/client/cart/Cart.vue')
      }
    ]
  }

]


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
        component: () => import('@/views/admin/product/Products.vue') 
      },

      {
        path: '/admin/liked',
        name: 'Like',
        component: () => import('@/views/admin/product/Like.vue')
      },

      {
        path: 'products/create',
        name: 'Create',
        component: () => import('@/views/admin/product/Create.vue')
      },

      {
        path: 'products/edit/:slug',
        name: 'Edit',
        component: () => import('@/views/admin/product/Edit.vue')
      },

      {
        path: 'products/detail/:slug',
        name: 'Detail',
        component: () => import('@/views/admin/product/Detail.vue')
      },

      {
        path: 'staff',
        name: 'Staff',
        component: () => import('@/views/admin/staffs/Staff.vue'),
        children: [
        ]
      },

      {
        path: 'staff/create',
        name: 'CreateStaff',
        component: () => import('@/views/admin/staffs/Create.vue')
      },

      {
        path: 'staff/edit/:slug',
        name: 'EditStaff',
        component: () => import('@/views/admin/staffs/Edit.vue')
      },

      {
        path: 'permissions',
        name: 'Permissions',
        component: () => import('@/views/admin/roles/Permissions.vue')
      },

      {
        path: 'roles',
        name: 'Roles',
        component: () => import('@/views/admin/roles/Roles.vue')
      },

      {
        path: 'roles/create',
        name: 'CreateRoles',
        component: () => import('@/views/admin/roles/Create.vue')
      },
      
    ]
  }

]

const routes = [
  ...routesAdmin, ...routesClient
]


const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router
