<template>
  <Title title="Permissions"/>
  <div id="q-app " class="q-ml-x" style="min-height: 100vh;">
    <div class="q-pa-md row">
      <div class="q-gutter-sm col" v-for="role in roles" :key="role">
        <!-- <br> -->
        <div class="q-ml-x text-weight-bold text-h6 q-pa-md" style="position: sticky; top: 0; height: 4rem; background-color: rgb(246, 241, 241);" > {{ role }} </div>

        <q-list>
          <br>
          <hr>
          <br>
          <div class="q-ml-x text-weight-bold text-h8"> Quản lý bánh </div>
          <q-item tag="label" v-for="option, index in options" :key="option" v-ripple>
            <q-item-section avatar>
              <q-checkbox v-model="selectedOptions" :val="`${role + '-' + option + ' Cake'}`"
                :color="colors[index]"></q-checkbox>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ option }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list>
          <br>
          <hr>
          <br>
          <div class="q-ml-x text-weight-bold text-h8"> Quản lý nhân viên </div>
          <q-item tag="label" v-for="option, index in options" :key="option" v-ripple>
            <q-item-section avatar>
              <q-checkbox v-model="selectedOptions" :val="`${role + '-' + option + ' Staff'}`"
                :color="colors[index]"></q-checkbox>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ option }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list>
          <br>
          <hr>
          <br>
          <div class="q-ml-x text-weight-bold text-h8"> Quản lý quyền </div>
          <q-item tag="label" v-for="option, index in options" :key="option" v-ripple>
            <q-item-section avatar>
              <q-checkbox v-model="selectedOptions" :val="`${role + '-' + option + ' Role'}`"
                :color="colors[index]"></q-checkbox>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ option }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

      </div>
    </div>
    <div class="q-pa-md q-gutter-sm w-50">
      <q-btn :loading="loading" color="secondary" style="width: 30%;" @click="simulateProgress()" label="Xác nhận"></q-btn>
    </div>
  </div>
</template>

<script>
import Title from '@/views/admin/patials/Title.vue';
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import RolesServices from '@/services/admin/roles.services'
import { Thumbs } from 'swiper/modules';

export default {
  name: 'Staff',
  components: {
    Title,
  },
  setup() {
    const $q = useQuasar()

    const options = ['View', 'Edit', 'Delete', 'Create']; // Mảng các lựa chọn

    const colors = ['teal', 'orange', 'red', 'cyan'] // Mảng màu

    const selectedOptions = ref([]); // Mảng lưu trữ dữ liệu
    
    const progress = ref(false)

    return {
      options,
      selectedOptions,
      colors,
      progress
    }
  },

  data() {

    return {
      roles: [],
      loading: false,

    }
  },

  methods: {
    async getRoles() {
      const data = await RolesServices.getAllRoles()
      this.roles = data.map(item => {
        if (item.title) {
          return item.title
        }
      })
    },

    async sendData() {
      if (this.selectedOptions.length > 0) {
        const title =[]
        for (const item of this.selectedOptions) {
          title.push(item.split('-')[0])
        }

        const difference = this.roles.filter(item => !title.includes(item));

        difference.forEach(item => {
          this.selectedOptions.push(`${item}-`)
        })

        console.log(this.selectedOptions);
        await RolesServices.permisson(this.selectedOptions)
      }
      else {

      }
    },

    simulateProgress () {
      // we set loading state
      this.loading = true

      // simulate a delay
      this.sendData()

      setTimeout(() => {
        // we're done, we reset loading state
        this.loading = false
      }, 2000)
    },

    async setPermission () {
     const res = await RolesServices.getPermission()

     if (res.code === 200) {
      const data = res.data
      this.selectedOptions = data
     }
     else {
      throw Error('Error: 404, Could not found permissons')
     }
     
    }
  },

  created() {
    this.getRoles()
    this.setPermission()
  }

}
</script>

<style lang="scss" scoped></style> 
