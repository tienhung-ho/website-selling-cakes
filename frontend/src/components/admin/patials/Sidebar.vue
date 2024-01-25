<template>
  <div class="container-fliud">
      <VueSidebarMenuAkahon 
        :isUsedVueRouter="true"
        menuTitle="THE TASTEAT"
        menuIcon="bx-cake"
        :menuItems="this.menuItems"
        profileName="Jose fine"
        profileRole="CEO & FOUNDER"
        profileImg="https://images.pexels.com/photos/5273717/pexels-photo-5273717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
  </div>
</template>

<script>
  import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
  
  export default {
    name: 'Header.vue',
    components: {VueSidebarMenuAkahon},
    data() {
      return {
        menuItems: [
        // {
        //   link: "/admin",name: "Dashboard", tooltip: "Dashboard", icon: "bx-grid-alt" 
        // },
        // {
        //   link: "/admin",name: "User", tooltip: "User", icon: "bx-user-circle" 
        // },
        {
          link: { name: 'Products' },name: "Products", tooltip: "Products", icon: "bx-cabinet" 
        },
        {
          link: { name: 'Like' },name: "Save", tooltip: "Save", icon: "bx-heart-circle" 
        },
        {
          link: "/admin",name: "Setting", tooltip: "Setting", icon: "bx-cog" 
        },
      ]
      }
    }
  }
</script>

<style lang="scss" scoped>

ul {
  padding: 0;
  margin: 0;
}

</style>
