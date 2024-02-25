
<template>
  <Title title="Create" />
  <div class="create">
   <FormStaff/>
  </div>
</template>

<script>
import FormStaff from '@/components/admin/staffs/Form.Staff.vue';
import Title from '@/views/admin/patials/Title.vue';


export default {
  name: 'Create',

  components: {
    Title,
    FormStaff
  }
}


</script>

<style lang="scss" scoped>


</style>

