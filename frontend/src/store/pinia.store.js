import { defineStore } from 'pinia'

export const useAccountOfStaff = defineStore('setAccountOfStaff', () => {
  const state = {
    staff: {},
    permissions: []
  }

  const mutations = {
    async setStaff(staff) {
      state.staff = await staff;
      // console.log('Setting staff in store:', state.staff);
    },
    async setPermissions(permissions) {
      state.permissions = await permissions;
      // console.log('Setting staff in store:', state.staff);
    }


  }

  const getters = {
    getStaff() {
      return state.staff;
    },
    getPermissions() {
      return state.permissions;
    }
  }

  return { ...state, ...mutations, ...getters }
})
