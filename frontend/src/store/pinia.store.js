import { defineStore } from 'pinia'



export const useAccountOfStaff = defineStore('setAccountOfStaff', () => {
  const state = {
    staff: {
      accessToken: '' // Khởi tạo accessToken trong state của store
    }
  }

  const mutations = {
    setStaff(accessToken) {
      state.staff.accessToken = accessToken
    }
  }

  const actions = {
    getStaff() {
      if (staff.accessToken !== '') {

      }
      
    }
  }

  return { ...state, ...mutations, ...actions }
})
