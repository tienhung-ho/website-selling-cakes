<template>
  <Sidebar/>
  <div class="layout container-fliud">

    <router-view></router-view>

  </div>

</template>

<script>

import Sidebar from '@/components/admin/patials/Sidebar.vue';

export default {
  name: 'Layout',

  components: {
    Sidebar,
  },
}

</script>

<style lang="scss" scoped>

.layout {
  height: 100%;
  width: 100%;
  
}

  
</style>
