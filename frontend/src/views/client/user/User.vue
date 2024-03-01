<template>
  <Login />
</template>

<script>

import Login from '@/components/client/forms/Login.vue';
import Content from '@/components/client/patials/Content.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';

export default {
  name: 'User',

  components: {
    Login,
    Content
  },

}

</script>

<style lang="scss" scoped></style>
