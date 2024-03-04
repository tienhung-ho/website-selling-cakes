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
              <div class="text-grey-8">Don't have an account yet?
                <a href="#" class="text-dark text-weight-bold" style="text-decoration: none">Sign
                  up.</a>
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
import { ref } from 'vue'
import { useAccountOfStaff } from '@/store/pinia.store'
import AuthService from '@/services/admin/auth.services'

export default {
  name: 'FormAuth',

  setup() {


    return {

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
        email: this.email,
        password: this.password
      }


      const staff = await AuthService.login(data)

      console.log(staff.data.accessToken);

      if (staff.data.accessToken) {
        this.store.setStaff(staff.data.accessToken) // Call the mutation to set accessToken in store
      }
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
