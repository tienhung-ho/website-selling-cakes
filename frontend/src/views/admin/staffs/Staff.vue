<template>
  <Title title="Staff" />
  <div class="cakes container-fluid">
    <div class="row d-flex flex-end">
      <div class="mb-3 ms-5">
        <router-link :to="{ name: 'CreateStaff' }">
          <ButtonCustom content="Create New +" width="12rem" height="3.2rem" borderColor="black" borderRadius="10px"
            color="black" backgroundColor="" />

        </router-link>

      </div>

    </div>

    <div class="cakes__table">
      <div class="table__title row">
        <div class="col-1 table__title--no">
          STT
        </div>
        <div class="col-2 table__title--cakes">
          Avatar
        </div>
        <div class="col-2 table__title--flavor">
          Staff Name
        </div>
        <div class="col-2 table__title--quantity">
          Permissions
        </div>

        <div class="col-1 table__title--status">
          Status
        </div>
        <div class="col-3 table__title--action">
          Action
        </div>

      </div>
      <ProductsList v-if="isShow" />
      <!-- Sample row -->
      <div v-else class="table__row row" v-for="staff, index in this.staffs">

        <div class=" col-1 table__cell--cakes">
          {{ index + 1 }}
        </div>
        <div class="col-2 ps-5 table__cell--cakes d-flex justify-content-start align-items-center">
          <div class="cakes-img">
            <img :src="staff.avatar" alt="">
          </div>

        </div>
        <div class="col-2 cakes-name ps-4">
          {{ staff.fullName }}
        </div>
        <div class="col-2 table__cell--flavor">
          {{ staff.role }}
        </div>
        <div class="col-1 table__cell--status">
          <ActiveButton :status="staff.status" v-model:changeStatus="conditions.status" :fullName="staff.fullName" />
        </div>
        <div class="col-3 table__cell--action">
          <Options :slug="staff.slug" @changeDeleted="getStaff" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Title from '@/views/admin/patials/Title.vue';
import Options from '@/components/admin/staffs/Options.vue';
import Filter from '@/views/admin/patials/Filter.vue';
import ButtonCustom from '@/views/admin/patials/ButtonCustom.vue';
import StaffsServices from '@/services/admin/staffs.services'
import ActiveButton from '@/components/admin/staffs/Active.Button.vue';
import { useQuasar } from 'quasar'
import ProductsList from '@/components/admin/ui/skeletons/Products-list.vue'

export default {
  name: 'Staff',
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
    ButtonCustom,
    Options,
    ActiveButton,
    ProductsList,
  },

  data() {
    return {
      staffs: [],
      conditions: {},
      isShow: true,
    }
  },


  methods: {
    timeOut() {
      setTimeout(() => {
        this.isShow = false
      }, 3000)
    },
    async getStaff() {
      this.staffs = await StaffsServices.getAllStaff()
      // this.isShow = true

      // this.timeOut()
      // this.showLoading()

    }
  },

  created() {
    this.getStaff()
    this.showLoading()
    setTimeout(() => {
      this.isShow = false
    }, 5000)
  },

  watch: {
    $route: 'getStaff',

    conditions: {
      handler() {
        this.getStaff()
        // console.log(this.conditions.currentPage);
      },
      deep: true
    },
    isShow: {
      handler() {

      }
    }
  }
}

</script>


<style lang="scss" scoped>
@import '@/assets/admin/scss/variables.scss';

/* Import JavaScript */


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
