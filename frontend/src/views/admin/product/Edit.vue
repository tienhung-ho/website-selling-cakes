
<template>
  <div class="create">
    <FormProducts :slug="slug" :isEdit="true" title="Edit" :productEdit="this.product" :flavorArrayEdit="flavorArray" :defaultFlavorEdit="defaultFlavor"/>
  </div>
</template>

<script>

import FormProducts from '@/components/admin/products/create/Form.Products.vue';
import ProductsServices from '@/services/admin/products.services'

export default {
  name: 'Create',

  components: {
    FormProducts
  },

  data() {
    return {
      product: {},
      slug: '',
      defaultFlavor: [  ],
      flavorArray: []
    }
  },
  methods: {
    async getProduct(slug) {
      try {
        if (slug) {
          const response = await ProductsServices.getBySlug(slug);
          console.log('test');
          // Kiểm tra xem phản hồi có dữ liệu hay không
          if (response) {
            this.product = { ...response };
            // Nếu là mảng, truy cập phần tử đầu tiên
            // console.log(this.product);
            // this.setValue()
          } else {
            console.error("Empty response from API");
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    async getAllFlavor(slug) {
      try {
        // if (slug === '') {
        let fl = await ProductsServices.getAllFlavor()
        fl.forEach(item => {
          this.flavorArray.push(item.flavor)
        })
        if (slug) {
          let fl = await ProductsServices.getFlavorByProductSlug(this.slug)
          fl.forEach(item => {
            this.defaultFlavor.push(item.flavor)
          })
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
    this.getProduct(this.slug)
  },
}


</script>

<style lang="scss" scoped></style>

