<template>
  <div class="active"
  >
    <ButtonCustom v-model="this.status" :content="this.status"
      :backgroundColor="this.status == 'active' ? '#98E695' : 'red'" height="3rem" width="6rem" color="white"
      borderRadius="10px" 
      @click="changeStatus"
      />
  </div>
</template>

<script>

import ButtonCustom from '@/views/admin/patials/ButtonCustom.vue';
import StaffsServices from '@/services/admin/staffs.services';


export default {
  name: 'Active.Button',
  components: {
    ButtonCustom
  },
  props: {
    status: {
      type: String,
      default: ''
    },
    fullName: {
      type: String,
      default: ''
    }
  },
  emits: ['update:changeStatus'],
  methods: {

    async changeStatus () {
      try {

        const record = {
          fullName: this.fullName,
          status: this.status == 'active' ? 'inactive' : 'active'
        }

        await StaffsServices.changeStatus(record)

        console.log(record);

        this.$emit('update:changeStatus', record)
        

      }
      catch(err) {
        console.log(err);
      }

    }
  },

  watch () {
    
  }

}


</script>

<style lang="scss" scoped>

</style>

