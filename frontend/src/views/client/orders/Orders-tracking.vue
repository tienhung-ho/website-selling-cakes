<template>
  <div class="container">
    <article class="card mb-5" v-for="order, i in orders">
      <header class="card-header"> My Orders / Tracking </header>
      <div class="card-body">
        <h6>Order ID: {{ order._id }}</h6>
        <article class="card">
          <div class="card-body row">
            <div class="col"> <strong>Estimated Delivery time:</strong> <br>29 nov 2019 </div>
            <div class="col"> <strong>Shipping BY:</strong> <br> BLUEDART, | <i class="fa fa-phone"></i> +1598675986
            </div>
            <div class="col"> <strong>Status:</strong> <br> {{ order.status }} </div>
            <div class="col"> <strong>Tracking #:</strong> <br> BD045903594059 </div>
          </div>
        </article>
        <div class="track">
          <div class="step" :class="{ active: order.status == 'comfirmed' ? true : false }"> <span class="icon"> <i
                class='bx bx-check'></i> </span> <span class="text">Order
              confirmed</span> </div>
          <div class="step"> <span class="icon"> <i class='bx bxs-user-check'></i></span> <span class="text">
              Picked by
              courier</span> </div>
          <div class="step"> <span class="icon"> <i class='bx bxs-truck'></i> </span> <span class="text"> On the
              way
            </span> </div>
          <div class="step"> <span class="icon"> <i class='bx bxs-gift'></i> </span> <span class="text">Ready for
              pickup</span> </div>
        </div>
        <hr>
        <ul class="row">
          <li class="col-md-4" v-for="item, index in order.products">
            <figure class="itemside mb-3" v-if="products[i]">
              <div class="aside"><img :src="products[i][index].thumbnail" class="img-sm border"></div>
              <figcaption class="info align-self-center">
                <p class="title">{{ products[i][index].name }}<br>Quantity: {{ item.quantity }}</p>
                <span class="text-muted">$
                  <strong>
                    {{
                      parseFloat(parseFloat(parseFloat(item.price) -
                        (parseFloat(item.price) * parseFloat(item.discountPercentage / 100))) *
                        parseFloat(item.quantity))
                    }}
                  </strong>
                </span>
              </figcaption>
            </figure>
          </li>
        </ul>
        <div>
          Total:
          <strong>
            ${{ totalPrice(order) }}
          </strong>
        </div>
        <hr>
        <a href="#" class="btn btn-warning" data-abc="true"> <i class="fa fa-chevron-left"></i> Back to orders</a>
      </div>
    </article>
  </div>
</template>

<script>

import { useCart, useAccountOfUser } from '@/store/pinia.store.js'
import { ref, onMounted, watch } from 'vue'
import { calPrice } from '@/helpers/client/prices.helpers.js'
import UsersServices from '@/services/client/users.services.js'
import CakesServices from '@/services/client/cakes.services.js'
import { updateCart } from '@/helpers/client/carts.helpers.js'
import { useQuasar } from 'quasar'

export default {
  name: "OrdersTracking",
  data() {
    return {
      orders: [],
      products: [],
      user: null
    }
  },
  setup() {
    const $q = useQuasar()
    const store = useCart()
    const cart = ref([])
    const user = ref({})


    // Thiết lập giỏ hàng ban đầu từ store
    onMounted(() => {
      cart.value = store.getCart()

    })

    // Watcher để theo dõi thay đổi của giỏ hàng trong store
    watch(() => store.getCart(), (newCart, oldCart) => {
      cart.value = newCart
      console.log(cart.value);
    })


    return {
      cart,
      store,
      user,
      showNotif(clr, message) {
        $q.notify({
          message: `Trang web này cho biết: ${message}`,
          color: clr,
          multiLine: true,
          // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          actions: [
            { label: 'Close', color: 'yellow', handler: () => { /* ... */ } }
          ]
        })
      }
    }
  },
  methods: {
    totalPrice(order) {
      if (order.products) {
        let totalPrice = order.products.reduce((sum, item) => {
          const discountedPrice = parseFloat(item.price) * (1 - parseFloat(item.discountPercentage / 100))
          return sum + (discountedPrice * parseFloat(item.quantity))
        }, 0)
        return totalPrice
      }
    },

    async getOrder() {
      const data = await UsersServices.getOrderTracking(this.user._id)
      this.orders = data.data
      await Promise.all(this.orders.map(async order => {
        let result = [];
        await Promise.all(order.products.map(async item => {
          let product = await CakesServices.getBySlug(item.slug);
          result.push(product);
        }));
        this.products.push(result);
      }));
    },
  },

  watch: {

  },

  created() {
    this.user = useAccountOfUser().getUser()
    this.getOrder()
  }

}
</script>

<style scoped>
.container {
  margin-top: 50px;
  margin-bottom: 50px
}

.card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.10rem
}

.card-header:first-child {
  border-radius: calc(0.37rem - 1px) calc(0.37rem - 1px) 0 0
}

.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1)
}

.track {
  position: relative;
  background-color: #ddd;
  height: 7px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 60px;
  margin-top: 50px
}

.track .step {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  width: 25%;
  margin-top: -18px;
  text-align: center;
  position: relative
}

.track .step.active:before {
  background: #03dd0e;
}

.track .step::before {
  height: 7px;
  position: absolute;
  content: "";
  width: 100%;
  left: 0;
  top: 18px
}

.track .step.active .icon {
  background: #03dd0e;
  color: #fff;
}


.track .icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: relative;
  border-radius: 100%;
  background: #ddd
}

.track .step.active .text {
  font-weight: 400;
  color: #000
}

.track .text {
  display: block;
  margin-top: 7px
}

.itemside {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%
}

.itemside .aside {
  position: relative;
  -ms-flex-negative: 0;
  flex-shrink: 0
}

.img-sm {
  width: 80px;
  height: 80px;
  padding: 7px
}

ul.row,
ul.row-sm {
  list-style: none;
  padding: 0
}

.itemside .info {
  padding-left: 15px;
  padding-right: 7px
}

.itemside .title {
  display: block;
  margin-bottom: 5px;
  color: #212529
}

p {
  margin-top: 0;
  margin-bottom: 1rem
}

.btn-warning {
  color: #ffffff;
  background-color: #ee5435;
  border-color: #ee5435;
  border-radius: 1px
}

.btn-warning:hover {
  color: #ffffff;
  background-color: #ff2b00;
  border-color: #ff2b00;
  border-radius: 1px
}
</style>
