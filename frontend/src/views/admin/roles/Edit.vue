
<template>
  <Title title="Edit" />
  <div class="create">
   <FormRoles :isEdit="true" :initalRole="this.role"/>
  </div>
</template>

<script>
import FormRoles from '@/components/admin/roles/Form.Roles.vue';
import Title from '@/views/admin/patials/Title.vue';
import RolesServices from '@/services/admin/roles.services'



export default {
  name: 'Create',

  components: {
    Title,
    FormRoles
  },
  data () {

    return {
      slug: '',
      role: {}
    }
  },
  methods: {
    async getRoleBySlug () {
      this.role = await RolesServices.getRolebySlug(this.slug) 
      return
    }

  },
  created () {
    this.slug = this.$route.params.slug 
    
    this.getRoleBySlug()
  },
  
}


</script>

<style lang="scss" scoped>


</style>

