<template>
  <Header/>
    <router-view></router-view>
  <Footer/>
</template>

<script>

import Header from '@/views/client/patials/Header.vue';
import Footer from '@/views/client/patials/Footer.vue';

export default {


  name:'Layout',

  components: {
    Header,
    Footer
  }
}

</script>
