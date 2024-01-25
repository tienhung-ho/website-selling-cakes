<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Layout from './components/client/layout/Layout.vue';
import Header from './components/client/patials/Header.vue'
import userServices from './services/user/users.services';

export default {
  name: 'App',
  components: {
    Header,
    Layout
  },
  methods: {
    async getAccount() {

      try {

        const response = await userServices.user()
        console.log(response);
        await this.$store.dispatch('updateMyObject', response);
        await this.$store.dispatch('setAuth', true)
      }
      catch (err) {
        await this.$store.dispatch('setAuth', false)
      }
    }

  },
  mounted() {
    this.getAccount()
  }

}

</script>

<style lang="scss" scoped></style>
