<template>

  <Banner/>

  <Flavor :numberOfCakes="cakes" :isShop="true"/>

  <SlideShow/>

  <Blog/>
 
</template>

<script>

import Banner from '@/components/client/Banner.vue';
import Flavor from '@/components/client/shop/Flavor.vue';
import SlideShow from '@/components/client/SlideShow.vue';
import Blog from '@/components/client/home/Blog.vue';

export default {
  name: 'Home',

  components: {
    Banner,
    Flavor,
    SlideShow,
    Blog
  },
  data () {
    return {
      cakes: 8
    }
  }
}

</script>


<style lang="scss" scoped>

</style>
