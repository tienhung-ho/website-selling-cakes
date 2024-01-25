<template>
  <div class="container-fluid details">

    <div class="details__element" v-if="cake">
      <div class="details__element--img">
        <img :src="`${cake.thumbnail}`" alt="">
      </div>

      <div class="details__element--content">
        <h1 class="title">
          {{ cake.name }}
        </h1>

        <p class="description">
          {{ cake.description }}
        </p>

        <p class="price">
          <span>Price</span>
          <br>
          ${{ cake.price }}
        </p>

        <div class="details__element--action">
          <div class="action-quantity">
            <label for="quantity">Quantity</label>
            <div class="input-quantity">
              <button-custom @click="reduceQuantity" :height="'3rem'" :content="'-'" :borderColor="'#292E36'"
                :color="'#292E36'" />

              <input v-model="quantity" id="qunatity" type="text" min="0" :max="`${cake.quantity}`" disabled>

              <button-custom @click="increaseQuantity" :height="'3rem'" :content="'+'" :borderColor="'#292E36'"
                :color="'#292E36'" />
            </div>
            <div class="action-select">
              <button-custom @click="addToCart" :content="'Add to Cart'" :width="'20rem'" :borderColor="'#292E36'"
                :color="'#292E36'" />
            </div>
          </div>
          <div class="action-sale">
            <div class="action-sale__element">



            </div>
          </div>
          <div class="action-sale__ads">

            <p>
              <span>
                Welcome to "Sweet Delights" - Where Flavors Soar!
              </span>
              <br>
              Experience the delightful and enticing flavors at Sweet Delights,
              the premier online cake shop where we bring
              you the finest cakes crafted by talented and passionate bakers.
            </p>
          </div>
        </div>
      </div>

    </div>


  </div>
</template>

<script>

import CakesServices from "@/services/client/cakes.services"
import ButtonCustom from "@/components/admin/patials/ButtonCustom.vue";

export default {

  name: 'Detail',

  components: {
    ButtonCustom
  },

  data() {
    return {
      cake: {},
      quantity: 1,
      newPrice: 0,
    }
  },

  methods: {
    async getCake(slug) {
      try {
        if (slug) {
          const response = await CakesServices.getBySlug(slug);
          // Kiểm tra xem phản hồi có dữ liệu hay không
          if (response) {
            this.cake = response;
            // Nếu là mảng, truy cập phần tử đầu tiên
          } else {
            console.error("Empty response from API");
          }
        }
      } catch (err) {
        console.error(err);
      }
    },

    reduceQuantity() {
      if (this.quantity > 1) {
        this.quantity -= 1
        this.newPrice = this.quantity * parseInt(this.cake.price)
      }
    },

    increaseQuantity() {
      this.quantity += 1
      this.newPrice = this.quantity * parseInt(this.cake.price)
    },

    addToCart() {

      const item = {}
      item._id = this.cake._id
      item.slug = this.cake.slug
      item.quantity = this.quantity
      console.log(this.quantity);

      this.$swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      this.$store.dispatch('addItemToCart', item);
    },


  },
  created() {

    if (this.$route.params.slug) {
      const slug = this.$route.params.slug;
      this.getCake(slug)
    }
  },

  computed: {
  },

  beforeMount() {
  }

}

</script>

<style lang="scss" scoped>
@import url('https://fonts.cdnfonts.com/css/qarinthen');
@import url('https://fonts.cdnfonts.com/css/inclusive-sans-2');
@import url('https://fonts.cdnfonts.com/css/lt-binary-neue');

.details {
  position: relative;
  width: 100%;
  height: 90vh;
  padding: 4rem;
  display: flex;
  align-items: center;

  &__element {
    display: flex;
    justify-content: space-around;
    // align-items: center;
    height: 100%;
    text-align: center;

    &--img {
      width: 50%;
      height: 100%;
      background-size: cover;
      padding: 0;
      // padding: 3rem;
      border-radius: 30px;
      margin-right: 1rem;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

      img {
        width: 100%;
        object-fit: cover;
        height: 100%;
        aspect-ratio: 16/9;
        border-radius: 10px;
      }
    }

    &--content {
      padding: 1.5rem;

      margin-left: 1rem;
      width: 60%;
      text-align: start;
      // justify-content: center;

      .title {
        font-size: 3rem;
        font-family: 'LT Binary Neue Round', sans-serif;
        font-weight: bold;
        padding-bottom: 2rem;
      }

      .description {
        font-family: 'LT Binary Neue Round', sans-serif;
      }

    }

    &--action {

      // padding: 2rem;

      .action-sale {
        padding-bottom: 2rem;

        &__element {
          display: flex;
          justify-content: space-between;

        }
      }

      .action-sale__ads {

        p {

          font-family: 'LT Binary Neue Round', sans-serif;

          span {
            font-family: 'Inclusive Sans', sans-serif;
            font-size: 1.3rem;
            font-weight: bold;
          }

        }
      }

      .action-quantity {
        padding-bottom: 1rem;
        display: flex;
        flex-direction: column;
        align-items: start;

        .action-select {
          display: flex;
          align-items: center;

          button {
            width: 10rem;
            height: 3rem;

          }
        }

        label {
          font-family: 'LT Binary Neue Round', sans-serif;
          padding-bottom: 0.3rem;
        }

        .input-quantity {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;

          input {
            border: 1px solid black;
            height: 3rem;
            width: 6rem;
            text-align: center;
          }


          button {
            border: 2px solid black;
            width: 3rem;
            height: 3rem;
          }
        }

      }
    }

  }
}
</style>
