<template>
  <div class="container-fliud">
    <VueSidebarMenuAkahon :isUsedVueRouter="true" menuTitle="THE TASTEAT" menuIcon="bx-cake" :menuItems="this.menuItems"
      :profileName="staff.fullName" profileRole=""
      :profileImg="staff.avatar" @button-exit-clicked="onLogOut"/>
  </div>
</template>

<script>
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
import { useQuasar } from 'quasar'
import AuthServices from '@/services/admin/auth.services'
import { staff, permissions } from '@/helpers/admin/get-staff.helpers'

export default {
  name: 'Header.vue',
  components: { VueSidebarMenuAkahon },
  setup() {
    const $q = useQuasar()

    return {
      showNotif(message, color) {
        $q.notify({
          message: "Trang web này cho biết: " + message,
          color: color,
          multiLine: true,
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          actions: [
            { label: 'Close', color: 'yellow', handler: () => { /* ... */ } }
          ]
        })
      }
    }
  },
  data() {
    return {
      menuItems: [
        {
          link: { name: 'Dashboards'} ,name: "Dashboard", tooltip: "Dashboard", icon: "bx-grid-alt" 
        },
        {
          link: { name: 'Products' }, name: "Products", tooltip: "Products", icon: "bx-cabinet"
        },
        {
          link: { name: 'Like' }, name: "Save", tooltip: "Save", icon: "bx-heart-circle"
        },
        {
          link: { name: 'Staff' }, name: "Staff", tooltip: "Staff", icon: "bx-user-circle"
        },
        {
          link: { name: 'Roles' }, name: "Roles", tooltip: "Roles", icon: "bx-shape-square"
        },
        {
          link: { name: 'Permissions' }, name: "Permissions", tooltip: "Permissons", icon: "bx-shield"
        },
        {
          link: { name: 'OrderAdmin' }, name: "Orders", tooltip: "Order", icon: "bx-cart"
        },
        {
          link: "/admin", name: "Setting", tooltip: "Setting", icon: "bx-cog"
        },
      ],


      staff: staff(),
      permission: permissions()
    }
  },
  methods: {
    async onLogOut () {
      const logout = await AuthServices.logout()
      if (logout.code == 200 && logout.message == 'Đăng xuất thành công!') {
        this.showNotif("Bạn đã đăng xuất thành công!!", 'positive')
        this.$router.push('/staff/auth/login')
      } 
    }

  },
  async created() {

  },
}
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  margin: 0;
}

</style>
