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

  <div class="pb-5">
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
                    <div class="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Quantity</div>
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
                  <td class="border-0 align-middle"><strong> {{ parseFloat(parseFloat(parseFloat(item.value.price) -
                    (parseFloat(item.value.price) * parseFloat(item.value.discountPercentage / 100))) *
                    parseFloat(item.quantity)) }} </strong></td>
                  <td class="border-0 align-middle"><strong> {{ item.quantity }} </strong></td>
                  <td class="border-0 align-middle ps-4">
                    <a href="#" class="text-dark text-center">
                      <i class='bx bx-x-circle'></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- End Shopping cart table -->
        </div>
      </div>

      <div class="row py-5 p-4 bg-white rounded shadow">
        <div class="col-lg-6">
          <div class="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Thông tin giao hàng</div>
          <div class="p-4">
            <p class="italic mb-4">Hãy điền thông tin địa chỉ nơi giao hàng</p>
            <div class="city-district-street row">
              <div class="input-group mb-4 border rounded-pill p-2 w-25">
                <input type="text" placeholder="Thành phố" aria-describedby="button-addon3" class="form-control border-0">
              </div>
              <div class="input-group mb-4 border rounded-pill p-2 w-25 ms-3">
                <input type="text" placeholder="Quận/Huyện" aria-describedby="button-addon3"
                  class="form-control border-0">
              </div>
              <div class="input-group mb-4 border rounded-pill p-2 ms-3">
                <input type="text" placeholder="Tên đường" aria-describedby="button-addon3" class="form-control border-0">

              </div>

            </div>
          </div>
          <div class="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Ghi chú thông tin dành cho người bán</div>
          <div class="p-4">
            <p class="italic mb-4">Nếu có thông tin cần ghi chú hãy điền thêm vào ô phía dưới!</p>
            <textarea name="" cols="30" rows="2" class="form-control"></textarea>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Thông tin cá nhân</div>
          <div class="p-4">
            <p class="italic mb-4">Thông tin để nhãn hàng có thể liên hệ!</p>
            <ul class="list-unstyled mb-4">
              <li class="d-flex justify-content-between py-3 border-bottom">
                <input type="text" placeholder="Họ và Tên" aria-describedby="button-addon3" class="form-control border-0">
              </li>
              <li class="d-flex justify-content-between py-3 border-bottom">
                <input type="number" placeholder="Số điên thoại" aria-describedby="button-addon3"
                  class="form-control border-0">
              </li>

            </ul>
            <a href="#" class="btn btn-dark rounded-pill py-2 d-block">Lưu thông tin</a>
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
            <a href="#" class="btn btn-dark rounded-pill py-2 d-block">Proceed to checkout</a>
          </div>
        </div>
      </div>



    </div>
    {{ cart.length }}
  </div>
</template>

<script>

import { useCart } from '@/store/pinia.store.js'
import { ref, onMounted, watch } from 'vue'
import { calPrice } from '@/helpers/client/prices.helpers.js'

export default {
  name: "Cart",
  data() {
    return {
    }
  },
  setup() {
    const store = useCart()
    const cart = ref([])


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
      totalPrice() {
        let totalPrice = cart.value.reduce((sum, item) => {
          const discountedPrice = parseFloat(item.value.price) * (1 - parseFloat(item.value.discountPercentage / 100))
          return sum + (discountedPrice * parseFloat(item.quantity))
        }, 0)
        return totalPrice
      }
    }
  },
  watch: {
  }
}
</script>

<style scoped></style>
