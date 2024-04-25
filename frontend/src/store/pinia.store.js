import { defineStore } from 'pinia'

export const useAccountOfStaff = defineStore('setAccountOfStaff', () => {
  const state = {
    
    staff: {},
    permissions: [],
    cart: getValidCart()
  }

  const mutations = {
    async setStaff(staff) {
      state.staff = await staff;
      // console.log('Setting staff in store:', state.staff);
    },
    async setPermissions(permissions) {
      state.permissions = await permissions;
      // console.log('Setting staff in store:', state.staff);
    },

    setCart() {
      state.cart = getValidCart()
      return
    }


  }

  const getters = {
    getStaff() {
      return state.staff;
    },
    getPermissions() {
      return state.permissions;
    },
    getCart() {
      return state.cart
    }
  }

  return { ...state, ...mutations, ...getters }
})

export const useAccountOfUser = defineStore('setAccountOfUser', () => {
  const state = {
    user: {},
  }

  const mutations = {
    async setUser(user) {
      state.user = await user;
    },

  }

  const getters = {
    getUser() {
      return state.user;
    },
   
  }

  return { ...state, ...mutations, ...getters }
})

export const useCart = defineStore('setCart', () => {
  const state = {
    cart: getValidCart()
  }
  const mutations = {
    setCart() {
      state.cart = getValidCart()
      return
    },
    updateCart(data) {
      
    }


  }

  const getters = {
    getCart() {
      return state.cart
    }
  }

  return { ...state, ...mutations, ...getters }
})


function getValidCart() {
  const cartFromLocalStorage = localStorage.getItem("cart");
  let cart;

  try {
    cart = JSON.parse(cartFromLocalStorage);
  } catch (error) {
    console.error('Error parsing cart from localStorage:', error);
    // Nếu có lỗi, xóa cart khỏi localStorage và thiết lập cart mới là một mảng rỗng
    localStorage.removeItem("cart");
    cart = [];
  }

  return cart || []; // Trả về cart hoặc một mảng rỗng nếu không tồn tại cart
}
