
<template>
  <Title title="Create" />
  <div class="create">
   <FormRoles/>
  </div>
</template>

<script>
import FormRoles from '@/components/admin/roles/Form.Roles.vue';
import Title from '@/views/admin/patials/Title.vue';



export default {
  name: 'Create',

  components: {
    Title,
    FormRoles
  }
}


</script>

<style lang="scss" scoped>


</style>

