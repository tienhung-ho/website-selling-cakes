
<template>
  <Title title="Detail" />
  <div class="container-fluid details d-flex">

    <div class="details__element" v-if="product">
      <div class="details__element--img">
        <img :src="`${product.thumbnail}`" alt="">
      </div>

      <div class="details__element--content">
        <h1 class="title">
          {{ product.name }}
        </h1>

        <button class="status btn btn-outline-success mb-2">
          {{ product.available ? "Bánh vẫn còn" : "Không có sẵn" }}
        </button>

        <p class="price">
          <span class="fs-4">Price</span>
          <br>
          ${{ this.price }}
        </p>

        <div class="details__element--action">
          <div class="action-quantity">
            <label for="quantity">Số lượng</label>
            <div class="input-quantity">
              {{ product.quantity }}
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
              the premier online product shop where we bring
              you the finest cakes crafted by talented and passionate bakers.
            </p>
          </div>
        </div>
      </div>


    </div>

    <div class="detail__description pt-5 ">
      <h1>Mô tả</h1>
      {{ product.description }}
    </div>

  </div>
</template>

<script>

import ProductsServices from '@/services/admin/products.services'
import Title from '@/views/admin/patials/Title.vue';
import { calPrice } from '@/helpers/admin/prices.helpers.js';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'popper.js';
// import 'bootstrap/dist/js/bootstrap';


export default {
  name: 'Detail',

  components: {
    Title,
  },
  data() {
    return {
      slug: '',
      product: {},
      flavorArray: [],
      price: 0
    }
  },

  props: {

  },
  methods: {
    async getProduct(slug) {
      try {
        if (slug) {
          const response = await ProductsServices.getBySlug(slug);

          // Kiểm tra xem phản hồi có dữ liệu hay không
          if (response) {
            this.product = { ...response };
            // Nếu là mảng, truy cập phần tử đầu tiên
            // console.log(this.product);
            // this.setValue()
            console.log(this.product.price, this.product.discountPercentage);
            this.price = calPrice(this.product.price, this.product.discountPercentage)
          } else {
            console.error("Empty response from API");
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    async getAllFlavor(slug) {
      try {
        // if (slug === '') {
        if (slug) {
          let fl = await ProductsServices.getFlavorByProductSlug(this.slug)
          fl.forEach(item => {
            this.flavorArray.push(item.flavor)
          })
        }
      }
      catch (err) {
        console.log(err);
      }
    },


  },
  created() {
    this.slug = this.$route.params.slug
    this.getAllFlavor(this.slug)
    this.getProduct(this.slug)
  }
}


</script>

<style lang="scss" scoped>
@import url('https://fonts.cdnfonts.com/css/qarinthen');
@import url('https://fonts.cdnfonts.com/css/inclusive-sans-2');
@import url('https://fonts.cdnfonts.com/css/lt-binary-neue');

// @import '@/assets/admin/scss/variables.scss';

/* Import JavaScript */
@import url('https://link-to-your-javascript.js');

.details {
  position: relative;
  width: 100%;
  height: 90vh;
  padding: 4rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

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

