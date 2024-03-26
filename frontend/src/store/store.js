// store.js
import { createStore } from 'vuex';
import ProductsServices from '@/services/admin/products.services';

export default createStore({
  state: {
    products: [],
    changeStatus: 'unavailable',
    liked: 'unliked',
    deleted: false,
    user: null,
    authenticated: false,
    cart: [],
  },
  mutations: {


    updateProductStatus(state, { productId, type }) {
      const productIndex = state.products.findIndex(product => product._id === productId);
      if (productIndex !== -1) {
        state.products[productIndex].available = type;
      }
    },

    async setMyObject(state, payload) {
      state.user = await payload;
    },

    updateProductLiked(state, { productId, liked }) {
      const productIndex = state.products.findIndex(product => product._id === productId);
      if (productIndex !== -1) {
        state.products[productIndex].liked = liked;
      }
    },

    deletedProducts(state, { productId, type }) {
      const productIndex = state.products.findIndex(product => product._id === productId);
      if (productIndex !== -1) {
        state.products[productIndex].deleted = type;
      }
    },

    setEventChanged(state, value) {
      state.changeStatus = value
    },

    SET_AUTH(state, auth) {
      state.authenticated = auth
    },
    
  },
  actions: {
    async updateProductStatus({ commit }, { productId, available }) {
      try {
        // Gọi API để cập nhật trạng thái trên server
        await ProductsServices.findAndUpdate({ filter: productId, available });
        // Nếu thành công, cập nhật trạng thái trong store
        commit('updateProductStatus', { productId, available });
      } catch (error) {
        console.error(error);
        // Xử lý lỗi nếu cần
      }
    },

    setAuth({ commit }, auth) {
      commit('SET_AUTH', auth)
    },

    async updateProductLiked({ commit }, { productId, liked }) {
      try {

        await ProductsServices.findAndUpdate({ filter: productId, liked })
        commit('updateProductLiked', { productId, liked })
      }
      catch (err) {
        console.log(err)
      }
    },
    async deletedProducts({ commit }, { productId, type }) {
      try {
        await ProductsServices.delete({ filter: productId, type })
        commit('deletedProducts', { productId, type })
      }
      catch (err) {
        console.log(err)
      }
    },
    async updateMyObject({ commit }, payload) {
      await commit('setMyObject', payload);
    },

  },

  getters: {
    getUser: state => state.user,
  },

});
