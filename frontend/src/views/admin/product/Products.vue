<template>
  <Title :title="this.title" />
  <div class="cakes container-fluid">
    <Filter 
      v-model:changeStatus="this.condition.status" 
      v-model:search="this.condition.name"
      v-model:changeProducts="this.condition.flavor"
      v-model:changeMultiple="this.condition.multiple"
      @changeMultiple="getProducts"
      :checkedProducts="checkItem"
      />
    <div class="cakes__table">
      <div class="table__title row">
        <div class="col-1 table__title--no">
          <input v-model="checkAll" type="checkbox" name="checkAll" id="Checkall" @click="handlerCheckAll">
        </div>
        <div class="col-1 table__title--no">
          STT
        </div>
        <div class="col-3 table__title--cakes">
          Products
        </div>
        <div class="col-2 table__title--position">
          Position
        </div>
        <div class="col-1 table__title--quantity">
          Quantity
        </div>
        <div class="col-1 table__title--price">
          Price
        </div>
        <div class="col-1 table__title--status">
          Status
        </div>
        <div class="col-2 table__title--action">
          Action
        </div>

      </div>

      <!-- Sample row -->
      <div class="table__row row" v-for="product, index in this.products">

        <div class="col-1 table__cell--cakes">
          <input v-model="checkedProducts[index].checked" type="checkbox" class="checkItem" :name="product.slug"
            :value="product.slug"
              @click="handlerCheckItem(index)"
            >
        </div>


        <div class=" col-1 table__cell--cakes">
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
          {{ product.position }}
        </div>
        <div class="col-1 table__cell--quantity">
          {{ product.quantity }}
        </div>
        <div class="col-1 table__cell--price">
          {{ product.price }}
        </div>
        <div class="col-1 table__cell--status">
          <ActiveButton :available="product.available" :id="product._id" @changedStatus="isChangedStatus" />
        </div>
        <div class="col-2 table__cell--action">
          <Options :product="product" @changeLiked="isChangedLike" @changeDeleted="isChangedDeleted" />
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="row d-flex align-items-center position-relative">
    <Pagination :value="this.pagination" 
      v-model:currentPage="this.condition.currentPage"
      :totalItem="10"
    />
  </div> -->
</template>
  
<script>

import Title from '@/views/admin/patials/Title.vue';
import ProductsServices from '@/services/admin/products.services'

import Filter from '@/views/admin/patials/Filter.vue';
import Options from '@/components/admin/products/Options.vue';
import ButtonCustom from '@/views/admin/patials/ButtonCustom.vue';
import ActiveButton from '@/components/admin/products/Active.Button.vue';
// import Pagination from '@/components/admin/products/Pagination.vue'

export default {
  name: 'Products',

  components: {
    Title,
    Filter,
    Options,
    ButtonCustom,
    ActiveButton,
    // Pagination

  },

  data() {
    return {
      title: 'Products',
      products: [],
      isLike: false,
      condition: {},
      status: '',
      pagination: [],
      checkAll: false,
      checkItem: [],
      checkedProducts: []


    }
  }
  ,
  props: {

  },

  methods: {
    async getProducts() {
      try {
        this.products = await ProductsServices.getAllProducts(this.condition)
        this.checkAll = false
        this.checkedProducts = this.products.map(item => {
          let data = {
            slug: item.slug,
            checked: false
          }
          return data
        })

        // console.log(this.checkedProducts);
      }
      catch (err) {
        console.log(err);
      }
    },

    isChangedLike() {
      this.getProducts()
    },

    isChangedStatus() {
      this.getProducts()
    },

    isChangedDeleted() {
      // console.log("call deleted");
      this.getProducts()
    },

    handlerCheckAll() {
      this.checkAll = !this.checkAll;

      // Duyệt qua tất cả các sản phẩm và cập nhật trạng thái checked của chúng
      this.checkedProducts.forEach((product, index) => {
        product.checked = this.checkAll;
      });

      this.checkItem = this.checkedProducts.filter(item => item !== true)

    },

    handlerCheckItem (index) {
      this.checkedProducts[index].checked = !this.checkedProducts[index].checked
      this.checkItem.push(this.checkedProducts[index])
      if (!this.checkedProducts[index].checked) {
        this.checkAll = false
      }

      this.checkItem = this.checkedProducts.filter(item => item.checked);
    },




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
      handler() {
        this.getProducts()
        // console.log(this.condition.currentPage);
      },
      deep: true
    },
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



