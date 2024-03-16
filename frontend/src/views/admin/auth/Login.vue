<template>
  
    <FormAuth/>
  
</template>

<script>

import FormAuth from '@/components/admin/auth/Form.Auth.vue';

export default {
  name: 'Login',

  components: {
    FormAuth,
  }
  

}

</script>

<style lang="scss" scoped>

body {
  padding-left: 0 !important;
}

</style>
