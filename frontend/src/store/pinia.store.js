import { defineStore } from 'pinia'

export const useAccountOfStaff = defineStore('setAccountOfStaff', () => {
  const state = {
    staff: {},
    permissions: [],
    cart: JSON.parse(localStorage.getItem("cart")) || []
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
      state.cart = JSON.parse(localStorage.getItem("cart")) || []
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


export const useCart = defineStore('setCart', () => {
  const state = {
    cart: JSON.parse(localStorage.getItem("cart")) || []
  }
  const mutations = {
    setCart() {
      state.cart = JSON.parse(localStorage.getItem("cart")) || []
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
