
import { createWebHistory, createRouter } from "vue-router"

// import StaffServices from '@/services/admin/staffs.services'
import staffsServices from "@/services/admin/staffs.services"
import usersServices from "@/services/client/users.services"
import RolesServices from '@/services/admin/roles.services'

import routesAdmin from "./admin"
import routesClient from "./client"

import { useAccountOfStaff, useAccountOfUser } from '@/store/pinia.store'

// middlewares



// const routesClient = [

//   {
//     path: '/',
//     redirect: '/home', 
//     name: 'Layout',
//     component: () => import('@/views/client/layout/Layout.vue'),
//     children: [
//       {
//         path: '/home',
//         name: 'Home',
//         component: () => import('@/views/client/home/Home.vue')
//       },
//       {
//         path: '/contact',
//         name: 'Contact',
//         component: () => import('@/views/client/contact/Contact.vue')
//       },
//       {
//         path: '/shop',
//         name: 'Shop',
//         component: () => import('@/views/client/shop/Shop.vue')
//       },
//       {
//         path: '/about',
//         name: 'About',
//         component: () => import('@/views/client/about/About.vue')
//       },
//       {
//         path: '/details/:slug',
//         name: 'Details',
//         component: () => import('@/views/client/detail/Details.vue')
//       },
//       {
//         path: '/login',
//         name: 'Login',
//         component: () => import('@/components/client/forms/Login.vue')
//       },
//       {
//         path: '/register',
//         name: 'Register',
//         component: () => import('@/components/client/forms/Register.vue')
//       },
//       {
//         path: '/infor',
//         name: 'User',
//         component: () => import('@/components/client/forms/User.vue')

//       },
//       {
//         path: '/cart',
//         name: 'Cart',
//         component: () => import('@/views/client/cart/Cart.vue')
//       }
//     ]
//   }

// ]


// const routesAdmin = [
//   {
//     path: '/admin',
//     redirect: '/admin/products',
//     name: 'LayoutAd',
//     component: () => import('@/views/admin/layout/Layout.vue'),
//     children: [
//       {
//         path: '/admin/products',
//         name: 'Products',
//         component: () => import('@/views/admin/product/Products.vue') 
//       },

//       {
//         path: '/admin/liked',
//         name: 'Like',
//         component: () => import('@/views/admin/product/Like.vue')
//       },

//       {
//         path: 'products/create',
//         name: 'Create',
//         component: () => import('@/views/admin/product/Create.vue')
//       },

//       {
//         path: 'products/edit/:slug',
//         name: 'Edit',
//         component: () => import('@/views/admin/product/Edit.vue')
//       },

//       {
//         path: 'products/detail/:slug',
//         name: 'Detail',
//         component: () => import('@/views/admin/product/Detail.vue')
//       },

//       {
//         path: 'staff',
//         name: 'Staff',
//         component: () => import('@/views/admin/staffs/Staff.vue'),
//         children: [
//         ]
//       },

//       {
//         path: 'staff/create',
//         name: 'CreateStaff',
//         component: () => import('@/views/admin/staffs/Create.vue')
//       },

//       {
//         path: 'staff/edit/:slug',
//         name: 'EditStaff',
//         component: () => import('@/views/admin/staffs/Edit.vue')
//       },
//       {
//         path: 'permissions',
//         name: 'Permissions',
//         component: () => import('@/views/admin/roles/Permissions.vue')
//       },

//       {
//         path: 'roles',
//         name: 'Roles',
//         component: () => import('@/views/admin/roles/Roles.vue')
//       },

//       {
//         path: 'roles/create',
//         name: 'CreateRoles',
//         component: () => import('@/views/admin/roles/Create.vue')
//       },


//     ]
//   },
//   {
//     path: '/staff/auth/login',
//     name: 'LoginAdmin',
//     component: () => import('@/views/admin/auth/Login.vue')
//   },

// ]

const routes = [
  ...routesAdmin, ...routesClient
]


const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

// router.beforeEach(async (to, from, next) => {

//   try {

//     if (to.meta.requiresAuth) {
//       const record = await staffsServices.getStaffWithAccessToken()
//       await useAccountOfStaff().setStaff(record._doc)
//       if (to.name !== 'LoginAdmin' && !record._doc) {
//         next({ name: 'LoginAdmin' })
        
//       }
//       else {
//         const staff = record._doc
//         const permissions = await RolesServices.getRolesPermissionById(staff.role_id)
//         useAccountOfStaff().setPermissions(permissions)
//         next()
//       }

//     } else {
//       // Cho phép tiếp tục điều hướng đến các route không yêu cầu đăng nhập
//       next();
//     }
//   }
//   catch (err) {
//     // console.log(err.config.url);
//     console.log(err);
//       return next('/staff/auth/login')
//   }

//   try {
    
//     const record = await usersServices.getStaffWithAccessToken()
//     await useAccountOfUser().setUser(record._doc)
//     if (to.meta.requiresUserAuth) {
//       if (to.name !== 'Login' && !record._doc) {
//         next({ name: 'Login' })
//         return
//       }
//       else {
//         await useAccountOfUser().setUser(record._doc)
//         return next()
//       }

//     } else {
//       // Cho phép tiếp tục điều hướng đến các route không yêu cầu đăng nhập
//       return next();
//     }
//   }
//   catch (err) {
//     // console.log(err.config.url);
//     console.log(err);
//       // return next('/login')
//   }

// });

router.beforeEach(async (to, from, next) => {
  
  const record = await usersServices.getStaffWithAccessToken()
  await useAccountOfUser().setUser(record._doc)
  if (to.meta.requiresAuth) {
    // Check if it's admin login
    try {
      const record = await staffsServices.getStaffWithAccessToken()
      await useAccountOfStaff().setStaff(record._doc)
      if (to.name !== 'LoginAdmin' && !record._doc) {
        return next({ name: 'LoginAdmin' })
      } else {
        const staff = record._doc
        const permissions = await RolesServices.getRolesPermissionById(staff.role_id)
        useAccountOfStaff().setPermissions(permissions)
        return next()
      }
    } catch (err) {
      console.log(err)
      return next('/staff/auth/login')
    }
  } else if (to.meta.requiresUserAuth) {
    // Check if it's regular user login
    try {
      
      if (to.name !== 'Login' && !record._doc) {
        return next({ name: 'Login' })
      } else {
        await useAccountOfUser().setUser(record._doc)
        return next()
      }
    } catch (err) {
      console.log(err)
      return next('/login')
    }
  }

  // If route doesn't require authentication, allow access
  next()
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router
