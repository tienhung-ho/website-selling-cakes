<template>
  <div class="active"
    @click="onChangeStatus"
  >
    <ButtonCustom :content="this.available ? 'Available' : 'Unavailable'"
      :backgroundColor="this.available ? '#98E695' : 'red'" height="3rem" width="6rem" color="white"
      borderRadius="10px" />
  </div>
</template>

<script>

import ButtonCustom from '@/views/admin/patials/ButtonCustom.vue';
import ProductsServices from '@/services/admin/products.services.js'
import { mapActions } from 'vuex';

export default {
  name: 'Active.Button',
  components: {
    ButtonCustom
  },
  props: {
    available: {
      type: Boolean,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },

  methods: {
    ...mapActions(['updateProductStatus']),
    async onChangeStatus() {
      try {
        // Gọi action để cập nhật trạng thái trong store
        await this.updateProductStatus({ productId: this.id, available: !this.available });
        // await this.$store.dispatch('setEventChanged', this.available)
        this.$emit('changedStatus')
      } catch (err) {
        console.error(err);
      }
    },

  }
}

</script>

<style lang="scss" scoped>

</style>

