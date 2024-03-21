<template>
  <Header/>
    <router-view></router-view>
  <Footer/>
</template>

<script>

import Header from '@/views/client/patials/Header.vue';
import Footer from '@/views/client/patials/Footer.vue';



import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';
export default {


  name:'Layout',

  components: {
    Header,
    Footer
  }
}

</script>

<style scoped lang="scss">
  ul {
    list-style-type: none;
  }

</style>
