<template>
  <Title :title="this.title" v-if="permissions.includes('View Cake')" />
  <div class="cakes container-fluid" v-if="permissions.includes('View Cake')">
    <Filter v-model:changeStatus="this.condition.status" v-model:search="this.condition.name"
      v-model:changeProducts="this.condition.flavor" v-model:changeMultiple="this.condition.multiple"
      @changeMultiple="getProducts" :checkedProducts="checkItem" />
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

      <ProductsList v-if="isShow" />
      <div v-else class="table__row row" v-for="product, index in this.products">

        <div class="col-1 table__cell--cakes">
          <input v-model="checkedProducts[index].checked" type="checkbox" class="checkItem" :name="product.slug"
            :value="product.slug" @click="handlerCheckItem(index)">
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
        <div class="col-2 table__cell--flavor table__cell--item">
          {{ product.position }}
        </div>
        <div class="col-1 table__cell--quantity table__cell--item">
          {{ product.quantity }}
        </div>
        <div class="col-1 table__cell--price table__cell--item">
          {{ product.price }}
        </div>
        <div class="col-1 table__cell--status table__cell--item" v-if="permissions.includes('Edit Cake')">
          <ActiveButton :available="product.available" :id="product._id" @changedStatus="isChangedStatus" />
        </div>
        <div class="col-2 table__cell--action table__cell--item" v-if="permissions.includes('Edit Cake')">
          <Options :product="product" @changeLiked="isChangedLike" @changeDeleted="isChangedDeleted" />
        </div>
      </div>

      <Pagination v-model:pagination="this.condition.currentPage" :totalPage="this.totalPage" />
    </div>
  </div>
  <div v-else>
    <ErrorVue />
  </div>
</template>
  
<script>

import Title from '@/views/admin/patials/Title.vue';
import ProductsServices from '@/services/admin/products.services'

import Filter from '@/views/admin/patials/Filter.vue';
import Options from '@/components/admin/products/Options.vue';
import ButtonCustom from '@/views/admin/patials/ButtonCustom.vue';
import ActiveButton from '@/components/admin/products/Active.Button.vue';
import Pagination from '@/components/admin/ui/pagination/Pagination.vue'
import { permissions } from '@/helpers/admin/get-staff.helpers'
import ErrorVue from '@/views/admin/error/Error.vue'
import { useQuasar } from 'quasar'
import ProductsList from '@/components/admin/ui/skeletons/Products-list.vue'

export default {
  name: 'Products',
  setup() {
    const $q = useQuasar()
    let timer

    // onUnmounted(() => {
    //   if (timer !== void 0) {
    //     clearTimeout(timer)
    //     $q.loading.hide()
    //   }
    // })

    return {
      showLoading() {
        $q.loading.show({
          message: 'Some important process  is in progress. Hang on...'
        })
        // hiding in 3s
        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 1000)
      }
    }
  },
  components: {
    Title,
    Filter,
    Options,
    ButtonCustom,
    ActiveButton,
    Pagination,
    ErrorVue,
    ProductsList

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
      checkedProducts: [],
      currentPage: 1,
      totalPage: 0,
      permissions: [],
      isShow: true,


    }
  }
  ,
  props: {

  },

  methods: {
    async getProducts(page) {
      try {
        // this.isShow = true
        const payload = await ProductsServices.getAllProducts(this.condition)
        this.isShow = false
        this.products = payload.products
        this.totalPage = payload.totalPage

        this.checkAll = false
        this.checkedProducts = this.products.map(item => {
          let data = {
            slug: item.slug,
            checked: false
          }
          return data
        })


        // console.log(this.$cookies.get("PayloadAccessToken"));
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

    handlerCheckItem(index) {
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
    this.permissions = permissions()
    console.log(this.permissions);
    this.showLoading()
  },

  watch: {
    $route: 'getProducts',

    condition: {
      handler() {
        this.getProducts()
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
    height: 109%;
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
      .table__cell--item {
        display: flex;
        align-items: center;
        justify-content: center;
      }
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
        display: flex;
        justify-content: space-around;
        align-items: center;

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

        .cakes-name {
          width: 30%;
        }
      }


      // &--action {

      // }

    }

  }
}
</style>


