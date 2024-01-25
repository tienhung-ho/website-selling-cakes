<template>
  <section class="h-100 h-custom" style="background-color: #eee;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card">
            <div class="card-body p-4">

              <div class="row">

                <div class="col-lg-7">
                  <h5 class="mb-3"><a href="#!" class="text-body"><i class="fas fa-long-arrow-alt-left me-2"></i>Continue
                      shopping</a></h5>
                  <hr>

                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <p class="mb-1">Shopping cart</p>
                      <!-- <p class="mb-0">You have 4 items in your cart</p> -->
                    </div>
                    <div>
                      <p class="mb-0"><span class="text-muted">Sort by:</span> <a href="#!" class="text-body">price <i
                            class="fas fa-angle-down mt-1"></i></a></p>
                    </div>
                  </div>

                  <div class="card mb-3" v-for="item, index in cart">
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                          <div>
                            <img :src="item.thumbnail" class="img-fluid rounded-3" alt="Shopping item"
                              style="width: 65px;">
                          </div>
                          <div class="ms-3">
                            <h5>{{ item.name }}</h5>
                            <p class="small mb-0">Cakes</p>
                          </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                          <div style="width: 50px;">
                            <h5 class="fw-normal mb-0">{{ cartItems[index].quantity }}</h5>
                          </div>
                          <div style="width: 80px;">
                            <h5 class="mb-0">${{ item.price }}
                            </h5>
                          </div>
                          <div class="delete" @click="deleteCart(item)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                              <path
                                d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
                              </path>
                            </svg>
                          </div>
                          <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">

                  </div>
                </div>
                <div class="col-lg-5">

                  <div class="card bg-primary text-white rounded-3">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 class="mb-0">Card details</h5>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" class="img-fluid rounded-3"
                          style="width: 45px;" alt="Avatar">
                      </div>

                      <p class="small mb-2">Card type</p>
                      <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-mastercard fa-2x me-2"></i></a>
                      <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-visa fa-2x me-2"></i></a>
                      <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-amex fa-2x me-2"></i></a>
                      <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-paypal fa-2x"></i></a>

                      <form class="mt-4">
                        <div class="form-outline form-white mb-4">
                          <input type="text" id="typeName" class="form-control form-control-lg" siez="17"
                            :placeholder="user.username" />
                          <label class="form-label" for="typeName">Cardholder's Name</label>
                        </div>

                        <div class="form-outline form-white mb-4">
                          <input type="text" id="typeText" class="form-control form-control-lg" siez="17"
                            :placeholder="user.phone" minlength="19" maxlength="19" />
                          <label class="form-label" for="typeText">Card Number</label>
                        </div>

                        <div class="row mb-4">
                          <div class="col-md-6">
                            <div class="form-outline form-white">
                              <input type="text" id="typeExp" class="form-control form-control-lg" placeholder="MM/YYYY"
                                size="7" minlength="7" maxlength="7" />
                              <label class="form-label" for="typeExp">Expiration</label>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-outline form-white">
                              <input type="password" id="typeText2" class="form-control form-control-lg"
                                placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                              <label class="form-label" for="typeText2">Cvv</label>
                            </div>
                          </div>
                        </div>
                        <div class="">

                        </div>

                      </form>

                      <hr class="my-4">
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import CakesServices from '../../../services/client/cakes.services'
import usersServices from '../../../services/user/users.services';

export default {
  name: 'Cart',

  components: {
  },


  data() {
    return {
      cart: [],
      total: 0,
      cartItems: [],
    }
  },

  methods: {
    getCartItems() {
      try {
        if (this.$store.getters.getUser) {
          this.cartItems = this.$store.getters.getUser.cart;
          console.log(this.cartItems);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getCake(slug) {
      try {
        if (slug) {
          const response = await CakesServices.getBySlug(slug);
          if (response) {
            this.cart.push(response);
            this.$forceUpdate();
          } else {
            console.error("Empty response from API");
          }
        }
      } catch (err) {
        console.error(err);
      }
    },

    async getAccount() {

      try {
        const response = await usersServices.user()
        console.log(response);
        await this.$store.dispatch('updateMyObject', response);
        await this.$store.dispatch('setAuth', true)
      }
      catch (err) {
        await this.$store.dispatch('setAuth', false)
      }
    },



    // Cart.vue
    async deleteCart(item) {
      let data = {
        userId: this.user._id,
        id: item._id
      };


      try {
        const result = await this.$swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
          // User clicked 'Yes', proceed with the deletion
          // Do vội quá nên phải reload 
          location.reload();
          await usersServices.deleteCart(data);
          const response = await usersServices.user();
          await this.$store.dispatch('updateMyObject', response);
          this.getAccount()
          this.getCartItems(); // This method already fetches the cakes


          // Show a success message
          this.$swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else {
          // User clicked 'Cancel' or closed the confirmation dialog
          this.$swal.fire("Cancelled", "Your file is safe :)", "info");
        }
      } catch (error) {
        console.error("Error deleting cart item:", error);
        // Handle error if needed
        this.$swal.fire({
          title: "Error",
          text: "An error occurred while deleting the item.",
          icon: "error"
        });
      }
    },

   



  },

  computed: {

    user() {
      try {
        return this.$store.getters.getUser || { username: '', phone: '' };
      } catch (err) {
        console.log(err);
      }
    }


  },

  mounted() {
  },

  beforeMount() {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!this.$store.getters.getUser) {
      this.$swal.fire({
        position: "center",
        icon: "error",
        title: "Please login!",
        showConfirmButton: false,
        timer: 1500
      });

      // Nếu chưa đăng nhập, bạn có thể thực hiện các hành động khác, chẳng hạn chuyển hướng đến trang đăng nhập
      setTimeout(() => {

        this.$router.push('/home');
      }, 1500)
      console.log('User not logged in. Redirecting to login page...');
      // Ví dụ chuyển hướng đến trang đăng nhập
    } else {
      // Nếu đã đăng nhập, tiếp tục tải giỏ hàng và tính tổng giá trị
      this.getCartItems()
      if (this.cartItems !== undefined) {
        this.cartItems.forEach(element => {
          this.getCake(element.slug);
        });
      }
    }
  },

}

</script>

<style lang="scss" scoped>
.delete {
  cursor: pointer;

}
</style>
