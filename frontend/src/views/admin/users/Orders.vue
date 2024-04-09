<template>
  <Title title="Order" />
  <div class="q-pa-md" style="max-width: 300px">
    <div class="q-mb-md text-justify">Lựa chọn ngày để theo dõi đơn hàng</div>
    <q-input filled v-model="date">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date color="info" v-model="date" @update:model-value="getAllOrders(date)" mask="YYYY-MM-DD HH:mm">
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
            <q-time color="info" v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
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
          <div class="text-h5 q-mt-sm q-mb-xs">Đơn hàng số {{ order.position }}</div>
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
        Status:
        <q-btn style="width: 100%;"  disabled :label="order.status"></q-btn>
        <q-linear-progress dark rounded indeterminate color="positive" class="q-mt-sm" />
      </q-card-actions>


      <q-card-actions>
        <q-btn class="w-25" label="Cancel" @click="changeStatus(order._id, { status: 'cancel' })"></q-btn>
        <q-btn class="w-25" label="Recall" @click="changeStatus(order._id, { status: 'recall' })"></q-btn>
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

      <div class="over" v-if="order.status == 'cancel'">
        {{ order.status.toUpperCase() }}
      </div>
    </q-card>
  </div>
</template>

<script>
import Title from '@/views/admin/patials/Title.vue';
import { ref, watchEffect } from 'vue'
import OrdersServices from '@/services/admin/orders.services'
import { useQuasar } from 'quasar'

export default {
  name: 'Orders',
  components: {
    Title
  },
  setup() {
    const $q = useQuasar()

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
      triggerPositive (name) {
        $q.notify({
          type: 'positive',
          message: `${name} successfully!`
        })
      },
    }
  },

  data() {
    return {
      orderDate: ref(''),
      orders: [],
      status: ['comfirmed', 'picked', 'transport', 'ready']
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
      this.orders = await OrdersServices.getAllOrders(conditions)
      console.log(this.orders);
      for (const item of this.orders) {
        item.createdAt = this.formatIsoDateToQuasar(item.createdAt)
      }
    },

    async changeStatus(query, conditions) {
      const data = {
        _id: query,
        conditions
      }
      
      await OrdersServices.changeStatusOrder(data)
      this.triggerPositive(data.conditions.status)
      this.getAllOrders()

    }
  },

  created() {
    this.getAllOrders()

  }
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 350px;
  position: relative;
}

.over {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(239, 242, 244, 0.7);
  top: 0;
  bottom: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  font-size: 1.5rem;
  color: red;
}
</style>
