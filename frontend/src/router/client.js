
const routesClient = [

  {
    path: '/',
    redirect: '/home', 
    name: 'Layout',
    component: () => import('@/views/client/layout/Layout.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { requiresAuth: false },
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


export default routesClient

