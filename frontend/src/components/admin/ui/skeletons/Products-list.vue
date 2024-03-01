<template>
  <div id="q-app" style="min-height: 100vh;">
    <div class="q-pa-md">
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="pulse" type="text"></q-skeleton>
            </th>
            <th class="text-right">
              <q-skeleton animation="pulse" type="text"></q-skeleton>
            </th>
            <th class="text-right">
              <q-skeleton animation="pulse" type="text"></q-skeleton>
            </th>
            <th class="text-right">
              <q-skeleton animation="pulse" type="text"></q-skeleton>
            </th>
            <th class="text-right">
              <q-skeleton animation="pulse" type="text"></q-skeleton>
            </th>
            <th class="text-right">
              <q-skeleton animation="pulse" type="text"></q-skeleton>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 5" :key="n">
            <td class="text-left">
              <q-skeleton animation="pulse" type="text" width="85px"></q-skeleton>
            </td>
            <td class="text-right">
              <q-skeleton animation="pulse" type="text" width="50px"></q-skeleton>
            </td>
            <td class="text-right">
              <q-skeleton animation="pulse" type="text" width="35px"></q-skeleton>
            </td>
            <td class="text-right">
              <q-skeleton animation="pulse" type="text" width="65px"></q-skeleton>
            </td>
            <td class="text-right">
              <q-skeleton animation="pulse" type="text" width="25px"></q-skeleton>
            </td>
            <td class="text-right">
              <q-skeleton animation="pulse" type="text" width="85px"></q-skeleton>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'

export default {
  name: 'ProductsList',
  setup() {
    const $q = useQuasar()

    return {
      showLoading() {
        $q.loading.show({
        
        })
        // hiding in 3s
        setTimeout(async () => {
         await $q.loading.hide()
        }, 2000)
      }
    }
  },
  created() {
    this.showLoading()
  }
}
</script>

<style lang="scss" scoped>
/* Your custom styles go here */
</style>
