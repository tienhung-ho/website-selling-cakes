<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-page class="flex flex-center bg-grey-2">
          <q-card class="q-pa-md shadow-2 my_card" bordered>
            <q-card-section class="text-center">
              <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
              <div class="text-grey-8">Sign in below to access your account</div>
            </q-card-section>
            <q-card-section>
              <q-input :v-model="this.email" dense outlined v-model="email" label="Email Address"></q-input>
              <q-input :v-model="this.password" dense outlined class="q-mt-md" v-model="password" type="password"
                label="Password"></q-input>
            </q-card-section>
            <q-card-section>
              <q-btn style="
  border-radius: 8px;" color="dark" rounded size="md" label="Sign in" type="submit" no-caps class="full-width"></q-btn>
            </q-card-section>
            <q-card-section class="text-center q-pt-none">
              <div class="text-grey-8">Don't have an account yet? Let contact with admin.
                <!-- <a href="#" class="text-dark text-weight-bold" style="text-decoration: none">Sign
                  up.</a> -->
              </div>
            </q-card-section>

          </q-card>
        </q-page>
      </q-form>
    </q-page-container>
  </q-layout>
</template>

<script>

import { useQuasar } from 'quasar'
import { useAccountOfStaff } from '@/store/pinia.store'
import AuthService from '@/services/admin/auth.services'



export default {
  name: 'FormAuth',

  setup() {
    const $q = useQuasar()


    let timer

    return {
      showLoading() {
        $q.loading.show({
          message: 'Some important process  is in progress. Hang on...'
        })
        // hiding in 3s
        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 1000)
      },
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
      email: '',
      password: '',
      store: useAccountOfStaff(),
    }

  },
  methods: {
    async onSubmit() {
      let data = {
        email: '',
        password: ''
      }

      if (this.email.length > 0) {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (emailRegex.test(this.email)) {
          data.email = this.email
        }
        else {
          this.showNotif('Bạn đã nhập sai định dạng email, vui lòng nhập lại!!!!', 'warning')
          return
        }
      }
      else {
        this.showNotif('Email không được để trống!!!!', 'warning')
        return
      }

      if (this.password.length <= 0) {
        this.showNotif('Mật khẩu không được để trống!!!!', 'warning')
        return
      }
      data.password = this.password

      const login = await AuthService.login(data)
      if (login.code == 404) {
        if (login.message == "Sai mật khẩu") {
          this.showNotif('Bạn đã nhập sai mật khẩu vui lòng kiểm tra lại mật khẩu!!!!', 'negative')
          return
        }
        else if (login.message == "Không tìm thấy email") {
          this.showNotif('Bạn đã nhập sai email hoặc email này chưa được đăng ký, hãy liên hệ với quản lý trang web để biết thêm thông tin!!!!', 'negative')
          return
        }
      }
      else {
        this.showLoading()
        this.showNotif('Chào mừng bạn đến trang web, Mong bạn sẽ có những trải nghiệm tốt!!!!', 'positive')
        this.$router.push('/admin/products')
      }

      return


    }
  },
  created() {
    this.store = useAccountOfStaff()
  }

}

</script>

<style lang="scss" scoped>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
