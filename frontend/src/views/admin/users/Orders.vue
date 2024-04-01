<template>
  <Title title="Order" />
  <div class="q-pa-md" style="max-width: 300px">
    <div class="q-mb-md text-justify">Lựa chọn ngày để theo dõi đơn hàng</div>
    <q-input filled v-model="date">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date" @update:model-value="getAllOrders(date)" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
  <hr>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered v-for="order, index in orders">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Overline</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Đơn hàng số {{ order.position + 1 }}</div>
          <div class="text-caption text-grey">
            {{ order.description || 'Does not have description' }}
          </div>

        </q-card-section>
        <q-card-section class="col-5 flex flex-center">
          <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn class="w-25" label="Cancel"></q-btn>
        <q-btn class="w-25" label="Recall"></q-btn>

      </q-card-actions>

      <q-card-actions>
        <div class="q-pa-md" style="max-width: 300px">
          <q-input filled v-model="order.createdAt">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="order.createdAt" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="order.createdAt" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="q-mt-md">
            Total price: ${{ order.totalPrice }}
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import Title from '@/views/admin/patials/Title.vue';
import { ref, watchEffect } from 'vue'
import usersServices from '@/services/admin/users.services';

export default {
  name: 'Orders',
  components: {
    Title
  },
  setup() {

    const date = ref(formatTime());

    watchEffect(() => {
      const timer = setInterval(() => {
        date.value = formatTime()
      }, 60000)

      return () => clearInterval(timer);
    });

    function formatTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0
      const day = ('0' + date.getDate()).slice(-2);
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    return {
      date,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },

  data() {
    return {
      orderDate: ref(''),
      orders: []
    }
  },

  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${this.currentTime}`;
      return date;
    },
    
    formatIsoDateToQuasar(isoString) {
      const date = new Date(isoString);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm số 0 trước nếu cần
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
      return formattedDateTime
    },

    async getAllOrders(date) {
      let conditions = {}
      if (date) {
        conditions.date = date
      }
      console.log(conditions.date);
      this.orders = await usersServices.getAllOrders(conditions)
      console.log(this.orders);
      for (const item of this.orders) {
        item.createdAt = this.formatIsoDateToQuasar(item.createdAt)
      }
    },
  },

  created() {
    this.getAllOrders()

  }
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 350px
}
</style>
