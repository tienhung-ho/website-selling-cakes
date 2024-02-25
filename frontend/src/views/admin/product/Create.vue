
<template>
  <div class="create">
    <FormProducts
      title="Create"
      :flavorArrayEdit="flavorArray" :defaultFlavorEdit="defaultFlavor"
    />
  </div>
</template>

<script>
import ProductsServices from '@/services/admin/products.services'
import FormProducts from '@/components/admin/products/create/Form.Products.vue';

export default {
  name: 'Create',

  components: {
    FormProducts
  },
  data () {
    return {
      flavorArray: [],
      defaultFlavor: []
    }
  },

  methods: {
    async getAllFlavor(slug) {
      try {
        console.log(slug);
        // if (slug === '') {
        let fl = await ProductsServices.getAllFlavor()
        fl.forEach(item => {
          this.flavorArray.push(item.flavor)
        })

        console.log(this.flavorArray);
        if (slug) {
          let fl = await ProductsServices.getFlavorByProductSlug(this.slug)
          fl.forEach(item => {
            this.defaultFlavor.push(item.flavor)
          })
          console.log(this.defaultFlavor);
        }
      }
      catch (err) {
        console.log(err);
      }
    },

  },
  created() {
    this.slug = this.$route.params.slug 
    this.getAllFlavor(this.slug)
  }
}


</script>

<style lang="scss" scoped>


</style>

