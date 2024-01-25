<template>
  <Login />
</template>

<script>

import Login from '@/components/client/forms/Login.vue';
import Content from '@/components/client/patials/Content.vue';

export default {
  name: 'User',

  components: {
    Login,
    Content
  },

}

</script>

<style lang="scss" scoped></style>
