<template>

  <Products title="Save"
    :isFilter="false"
    :isSave="true"
  />
  
</template>

<script>

import Products from '@/components/admin/products/Products.vue';

export default {
  name: 'Like',

  components: {
    Products
  },
  
  methods: {

  },
}

</script>

<style lang="scss" scoped>

</style>
