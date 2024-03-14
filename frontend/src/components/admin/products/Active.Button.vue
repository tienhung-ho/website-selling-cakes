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
import { mapActions } from 'vuex';
import { useQuasar } from 'quasar'


export default {
  name: 'Active.Button',
  components: {
    ButtonCustom
  },
  setup() {
    const $q = useQuasar()

    const triggerPositive = () => {
      $q.notify({
        type: 'positive',
        message: 'Changed status successfully!!'
      })
    }
    return {
      triggerPositive
    }
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
        this.triggerPositive()
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

<style lang="scss" scoped></style>

