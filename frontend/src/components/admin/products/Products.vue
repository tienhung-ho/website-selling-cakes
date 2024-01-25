<template>
  <Title :title="this.title" />
  <div class="cakes container-fluid">
    <Filter 
      v-if="isFilter"
      v-model:searchProducts="this.condition.name"
      v-model:onChangedStatus="this.condition.status"
    />
    <div class="cakes__table">
      <div class="table__title row">
        <div class="col-1 table__title--no">
          STT
        </div>
        <div class="col-3 table__title--cakes">
          Products
        </div>
        <div class="col-2 table__title--flavor">
          Flavor
        </div>
        <div class="col-1 table__title--quantity">
          Quantity
        </div>
        <div class="col-2 table__title--price">
          Price
        </div>
        <div class="col-1 table__title--status">
          Status
        </div>
        <div class="col-2 table__title--action" v-if="!isSave">
          Action
        </div>

      </div>

      <!-- Sample row -->
      <div class="table__row row" v-for="product, index in this.products">
        <div class="col-1 table__cell--cakes">
          {{ index + 1 }}
        </div>
        <div class="col-3 ps-5 table__cell--cakes d-flex 
          justify-content-start align-items-center">
          <div class="cakes-img">
            <img :src="product.thumbnail" alt="">
          </div>
          <div class="cakes-name ps-4">

            {{ product.name }}
          </div>

        </div>
        <div class="col-2 table__cell--flavor">
          {{ product.flavor }}
        </div>
        <div class="col-1 table__cell--quantity">
          {{ product.quantity }}
        </div>
        <div class="col-2 table__cell--price">
          {{ product.price }}
        </div>
        <div class="col-1 table__cell--status">
          <ActiveButton :available="product.available" :id="product._id" 
            @changedStatus="isChangedStatus"
          />
        </div>
        <div class="col-2 table__cell--action" v-if="!isSave">
          <Options :product="product"
            @changeLiked="isChangedLike"
          />
        </div>
        <!-- iv> -->
      </div>
    </div>
  </div>
</template>
  
<script>

import Title from '@/components/admin/patials/Title.vue';
import ProductsServices from '@/services/admin/products.services'
import Filter from '@/components/admin/patials/Filter.vue';
import Options from './Options.vue';
import ButtonCustom from '../patials/ButtonCustom.vue';
import ActiveButton from './Active.Button.vue';

export default {
  name: 'Products',

  components: {
    Title,
    Filter,
    Options,
    ButtonCustom,
    ActiveButton
  },

  data() {
    return {
      products: [],
      isLike: false,
      condition: {},
      status: '',


    }
  },

  props: {
    title: {
      type: String,
      default: 'Products'
    },
    isFilter: {
      type: Boolean,
      default: true
    },
    isSave: {
      type: Boolean,
      default: false
      
    }
  },

  methods: {
    async getProducts() {
      try {

        // if (this.$route.query) {
        //   const queryParams = this.$route.query;
        //   console.log(queryParams);
        //   this.products = await ProductsServices.getAllProducts(queryParams)
        // }
        if (this.isSave) {
          this.products = await ProductsServices.getAllLikeProducts(this.condition)
        }
        else {
          this.products = await ProductsServices.getAllProducts(this.condition)
        }


      }
      catch (err) {
        console.log(err);
      }
    },
    
    
    isChangedLike() {
      this.getProducts()
    },
    
    isChangedStatus () {
      this.getProducts()
    }


  },

  computed: {

    isEventChanged() {
      // console.log(this.$store.getters.getEventChanged);
      // return this.$store.getters.getEventChanged
    }

  },

  created() {
    this.getProducts()
  },

  watch: {
    $route: 'getProducts',

    condition: {
      handler () {
        this.getProducts()
      },

      deep: true
    }

  },


}

</script>



<style lang="scss" scoped>
@import '@/assets/admin/scss/variables.scss';

.cakes {
  width: 100%;
  height: 100vh;
  padding: 1rem;
  padding-left: 0;

  &__table {
    background-color: rgba($color: grey, $alpha: .1);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    // display: flex;
    text-align: center;

    .table__title,
    .table__row {
      padding: 1rem;
      width: 100%;
      display: flex;

      // .col-2 {
      //   // Adjust spacing or styles for the empty column
      // }
    }

    .table__title {
      font-weight: bold;
      border-bottom: 2px solid #fff;
      width: 100%;
    }

    .table__row {
      border-bottom: 2px solid #fff;
    }

    .table__cell {

      &--cakes {
        .cakes-img {
          height: 5rem;
          width: 5rem;

          img {
            height: 100%;
            width: 100%;
            background-size: cover;
            object-fit: cover;
            aspect-ratio: 16/9;
            border-radius: 10px;

          }
        }
      }


      // &--action {

      // }

    }

  }
}
</style>



