import { defineStore } from 'pinia'

export const useAccountOfStaff = defineStore('setAccountOfStaff', () => {
  const state = {
    staff: {}  
  }

  const mutations = {
    async setStaff(staff) {
      state.staff = await staff;
      // console.log('Setting staff in store:', state.staff);
    }
  }

  const getters = {
    getStaff() {
      return state.staff;
    }
  }

  return { ...state, ...mutations, ...getters }
})
