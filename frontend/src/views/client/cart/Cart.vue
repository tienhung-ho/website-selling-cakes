<template>
    <div class="content">
      <div class="p-5">
        <h2>
          Cart
        </h2>
        <span class="text-muted small">
          You can feeling confortable who will have well experience
        </span>
        <hr />
      </div>
    </div>

    <div class="pb-5" v-if="cart.length > 0">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 p-5 bg-white rounded shadow mb-5">

            <!-- Shopping cart table -->
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr class="">
                    <th scope="col" class="border-0 bg-light">
                      <div class="p-2 px-3 text-uppercase">Product</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                      <div class="py-2 text-uppercase  text-center">Price</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                      <div class="py-2 text-uppercase  text-center">Quantity</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                      <div class="py-2 text-uppercase  text-center">Total for product</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                      <div class="py-2 text-uppercase">Remove</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="" v-for="item in cart">
                    <th scope="row" class="border-0">
                      <div class="p-2">
                        <img :src="item.value.thumbnail" alt="" width="70" class="img-fluid rounded shadow-sm">
                        <div class="ms-3 d-inline-block align-middle">
                          <h5 class="mb-0">
                            <span href="#" class="text-dark d-inline-block align-middle"> {{ item.value.name }}
                              Originals
                            </span>
                          </h5>
                          <span class="text-muted font-weight-normal font-italic d-block">
                            Category: {{ item.value.flavor }}
                          </span>
                        </div>
                      </div>
                    </th>
                    <td class="border-0 align-middle text-center"><strong> {{ parseFloat(parseFloat(item.value.price) -
      (parseFloat(item.value.price) * parseFloat(item.value.discountPercentage / 100))) }} </strong>
                    </td>

                    <td class="border-0 align-middle text-center">
                      <button class="btn" @click="decreaseQuantity(item)">
                        <i class='bx bx-minus'></i>
                      </button>
                      <strong>
                        <input style="width: 1.4rem;" class="text-center" :value="item.quantity" disabled />
                      </strong>

                      <button class="btn" @click="increaseQuantity(item)">
                        <i class='bx bx-plus'></i>
                      </button>

                    </td>

                    <td class="border-0 align-middle text-center"><strong> {{
      parseFloat(parseFloat(parseFloat(item.value.price) -
        (parseFloat(item.value.price) * parseFloat(item.value.discountPercentage / 100))) *
        parseFloat(item.quantity)) }} </strong></td>

                    <td class="border-0 align-middle ps-4" @click="deleteItem(item.value._id)">
                      <a class="text-dark">
                        <i class='bx bx-x-circle'></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- End Shopping cart table -->
            <div class="row d-flex justify-content-end">
              <strong class="align-end w-25">Tổng tiền sản phẩm: {{ totalPrice() }}</strong>
            </div>
            <div class="row d-flex justify-content-end">
              <strong class="align-end w-25">Tax: {{ 10 }}%</strong>
            </div>
            <!-- <div class="row d-flex justify-content-end">
              <strong class="align-end w-25">Thành tiền: {{ totalPrice() + totalPrice() * 10 / 100 }}</strong>
            </div> -->
          </div>
        </div>

        <div class="row py-5 p-4 bg-white rounded shadow">
          <div class="col-lg-6">
            <div class="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Thông tin giao hàng</div>
            <div class="p-4">
              <p class="italic mb-4">Hãy điền thông tin địa chỉ nơi giao hàng</p>
              <div class="city-district-street row">
              
                <Multiselect id="citys" v-model="user.city" :selected="user.city" :track-by="'value'"
                  :close-on-select="false" :options="citysName" placeholder="Thành phố "
                  class="multiselect input-group ms-3 mb-4 border rounded-pill p-2 " @update:modelValue="getDistrict" />

                <Multiselect id="districts" v-model="user.district" :selected="user.district" :track-by="'value'"
                  :close-on-select="false" :options="districtsName" placeholder="Huyện/Phường " @update:modelValue="getWard"
                  class="multiselect input-group mb-4 border rounded-pill p-2 ms-3" />

                <Multiselect id="ward" v-model="user.ward" :selected="user.ward" :track-by="'value'"
                  :close-on-select="false" :options="wardsName" placeholder="Huyện/Phường "
                  class="multiselect input-group mb-4 border rounded-pill p-2 ms-3" />

                  <input v-model="user.street" id="street" type="text" placeholder="Tên đường" class="input-group mb-4 border rounded-pill p-2 ms-3">

              </div>
            </div>
            <div class="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Ghi chú thông tin dành cho người bán
            </div>
            <div class="p-4">
              <p class="italic mb-4">Nếu có thông tin cần ghi chú hãy điền thêm vào ô phía dưới!</p>
              <textarea v-model="order.description" name="" cols="30" rows="2" class="form-control"></textarea>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Thông tin cá nhân</div>
            <div class="p-4">
              <p class="italic mb-4">Thông tin để nhãn hàng có thể liên hệ!</p>
              <ul class="list-unstyled mb-4">
                <li class="d-flex justify-content-between py-3 border-bottom">
                  <input v-model="user.fullName" type="text" placeholder="Họ và Tên" aria-describedby="button-addon3"
                    class="form-control border-0">
                </li>
                <li class="d-flex justify-content-between py-3 border-bottom">
                  <input v-model="user.phone" type="number" placeholder="Số điên thoại" aria-describedby="button-addon3"
                    class="form-control border-0">
                </li>

              </ul>
              <!-- <a href="#" class="btn btn-dark rounded-pill py-2 d-block">Lưu thông tin</a> -->
            </div>
          </div>
        </div>

        <!-- PreOrder -->

        <div class="row py-5 mt-5 p-4 bg-white rounded shadow">
          <div class="col-lg-6">
            <div class="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Coupon code</div>
            <div class="p-4">
              <p class="italic mb-4">If you have a coupon code, please enter it in the box below</p>
              <div class="input-group mb-4 border rounded-pill p-2">
                <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3"
                  class="form-control border-0">
                <div class="input-group-append border-0">
                  <button id="button-addon3" type="button" class="btn btn-dark px-4 rounded-pill"><i
                      class="fa fa-gift me-2"></i>Apply coupon</button>
                </div>
              </div>
            </div>
            <div class="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Instructions for seller</div>
            <div class="p-4">
              <p class="italic mb-4">If you have some information for the seller you can leave them in the box below</p>
              <textarea name="" cols="30" rows="2" class="form-control"></textarea>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Order summary</div>
            <div class="p-4">
              <p class="italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
              <ul class="list-unstyled mb-4">
                <li class="d-flex justify-content-between py-3 border-bottom">
                  <strong class="text-muted">
                    Tiền sản phẩm
                  </strong>
                  <strong>
                    {{ totalPrice() }}
                  </strong>
                </li>
                <li class="d-flex justify-content-between py-3 border-bottom">
                  <strong class="text-muted">Chi Phí giao hàng và vận chuyển</strong>
                  <strong>$10.00</strong>
                </li>
                <li class="d-flex justify-content-between py-3 border-bottom"><strong
                    class="text-muted">Tax</strong><strong>$0.00</strong></li>
                <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                  <h5 class="fw-bold"> {{ totalPrice() }} </h5>
                </li>
              </ul>
              <button class="w-50 btn btn-dark rounded-pill py-2 d-block" @click="sendCart">Proceed to checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pb-5 text-center">
      Chưa có sản phẩm nào!
    </div>
</template>

<script>

import { useCart, useAccountOfUser } from '@/store/pinia.store.js'
import { ref, onMounted, watch } from 'vue'
import UsersServices from '@/services/client/users.services.js'
import { updateCart, clearCart, removeFromCart } from '@/helpers/client/carts.helpers.js'
import { useQuasar } from 'quasar'
import Multiselect from '@vueform/multiselect'
import ProvincesServices from '@/services/client/provinces.services.js'

export default {
  name: "Cart",
  data() {
    return {
      order: {},
      citys: [],
      districts: [],
      citysName: [],
      districtsName: [],
      wards: [],
      wardsName: [],
      // user: null


    }
  },
  components: {
    Multiselect
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
      ,
      totalPrice() {
        let totalPrice = cart.value.reduce((sum, item) => {
          const discountedPrice = parseFloat(item.value.price) * (1 - parseFloat(item.value.discountPercentage / 100))
          return sum + (discountedPrice * parseFloat(item.quantity))
        }, 0)
        return totalPrice
      }
    }
  },
  methods: {
    decreaseQuantity(item) {

      if (item.quantity > 1) {

        item.quantity--
        updateCart(this.cart)
      }
    },

    increaseQuantity(item) {

      item.quantity++
      updateCart(this.cart)
    },

    formatTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0
      const day = ('0' + date.getDate()).slice(-2);
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },

    async sendCart() {
      this.order.totalPrice = this.totalPrice()
      if (!this.user.phone) {
        this.showNotif('negative', 'Vui lòng kiểm tra, nhập số điện thoại!!')
        return
      }

      else if (!this.user.fullName) {
        this.showNotif('negative', 'Vui lòng điền đầy đủ thông tin cá nhân, họ tên!!')
        return
      }

      else if (!this.user.city || !this.user.district || !this.user.street || !this.user.ward) {
        this.showNotif('negative', 'Vui lòng điền đầy đủ địa chỉ chính xác!!')
        return
      }

      else {

        this.showNotif('primary', 'Chúc mừng bạn đã mua hàng thành công!! Xin cám ơn bạn về hành động này, mong chúng tôi sẽ lại được phục vụ bạn.')
        try {
          updateCart()
          clearCart()
          this.$router.push('/order/tracking');
          
          await UsersServices.setOrder(this.cart, this.user, this.order);

        } catch (error) {
          console.error('Error occurred:', error);
        }


        return
      }


    },

    async getDistrict() {
      let foundProvince = this.citys.find(province => province.province_name === this.user.city);
      this.districts = await ProvincesServices.getDistrict(foundProvince.province_id)
      this.districts = this.districts.results
      this.districtsName = this.districts.map(item => item.district_name)

    },

    async getWard() {
      let foundDistrict = this.districts.find(province => province.district_name === this.user.district);
      this.wards = await ProvincesServices.getWard(foundDistrict.district_id)
      this.wards = this.wards.results

      this.wardsName = this.wards.map(item => item.ward_name)

    },

    async getCity() {
      this.citys = await ProvincesServices.getCity()
      this.citys = this.citys.results
      this.citysName = this.citys.map(item => item.province_name)
    },

    deleteItem(id) {
      removeFromCart(id)
      updateCart()
    }

  },
  watch: {

  },
  created() {
    this.getCity()
    if (useAccountOfUser().getUser()._id) {
      this.user.user_id = useAccountOfUser().getUser()._id
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang='scss' scoped>
  #citys {
    width: 40%;
  }

  #districts {
    width: 40%;
  }

  #ward {
    width: 40%;
  }

  #street {
    width: 50%;
  }
</style>
