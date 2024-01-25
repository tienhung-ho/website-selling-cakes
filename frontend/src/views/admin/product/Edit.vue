
<template>
  <div class="create">
    <FormProducts :slug="slug"
      :isEdit="true"
      title="Edit"
    />
  </div>
</template>

<script>

import FormProducts from '../../components/admin/products/create/Form.Products.vue';
import ProductsServices from '@/services/admin/products.services'

export default {
  name: 'Create',
  
  components: {
    FormProducts
  },
  
  data () {
    return {
      product: {},
      slug: ''
    }
  },
  methods: {
  
  },
  
  created() {
    this.slug = this.$route.params.slug
  },
}


</script>

<style lang="scss" scoped>


</style>

