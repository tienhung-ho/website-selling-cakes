// store.js
import { createStore } from 'vuex';
import ProductsServices from '@/services/admin/products.services';
import UsersService from '@/services/user/users.services'

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

    addToCart(state, item) {
      if (state.user && state.user.cart) {
        const existingItemIndex = state.user.cart.findIndex(existingItem => existingItem._id === item._id);
        if (existingItemIndex !== -1) {
          // If item already exists, update quantity
          state.user.cart[existingItemIndex].quantity += item.quantity;
        } else {
          // If item doesn't exist, add it to the cart
          state.user.cart.push(item);
          state.cart = [...state.cart, item]
        }
      }
      else {
        state.user.cart.push(item)
        console.log(3);
        state.cart = [...state.cart, item]
      }

    },

    // Mutation to remove an item from the cart
    removeFromCart(state, itemId) {
      state.user.cart = state.user.cart.filter(item => item._id !== itemId);
      console.log(state.user.cart);
      state.cart = state.cart.filter(item => item._id !== itemId);
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

    // Action to add an item to the cart
    async addItemToCart({ commit, state }, item) {
      let data = {}
      data.user = state.user._id
      data.item = { ...item }
      await UsersService.findAndUpdate(data)
      commit('addToCart', item)
    },
    // Action to remove an item from the cart
    async removeItemFromCart({ commit }, itemId) {
      console.log(itemId);
      commit('removeFromCart', itemId);
    },

  },

  getters: {
    getUser: state => state.user,
    getCartItems: state => state.user.cart,
  },

});
