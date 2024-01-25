<template>
  <Header/>
    <router-view></router-view>
  <Footer/>
</template>

<script>

import Header from '../patials/Header.vue';
import Footer from '../patials/Footer.vue';

export default {


  name:'Layout',

  components: {
    Header,
    Footer
  }
}

</script>
