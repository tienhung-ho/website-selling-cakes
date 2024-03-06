<template>
  <Title title="Staff" />
  <div class="cakes container-fluid">
    <div class="mb-3 ms-5">
        <router-link :to="{ name: 'CreateRoles' }">
          <ButtonCustom content="Create New +" width="12rem" height="3.2rem" borderColor="black" borderRadius="10px"
            color="black" backgroundColor="" />
          
        </router-link>

      </div>
    <div class="cakes__table">
      <div class="table__title row">
        <div class="col-1 table__title--no">
          STT
        </div>
        <div class="col-2 table__title--cakes">
          Nhóm quyền
        </div>
        <div class="col-4 table__title--flavor">
          Mô tả ngắn
        </div>
        <div class="col-5 table__title--action">
          Action
        </div>

      </div>

      <div class="table__row row" v-for="(role, index) in this.roles">
        <div class=" col-1 table__cell--cakes">
          {{  index + 1}}
        </div>
    
        <div class="col-2 ps-4">
          {{ role.title }}
        </div>
        <div class="col-4 ">
          {{ role.description }}
        </div>

        <div class="col-5 ">
          <Options
            slug="test"
          />
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
import RolesServices from '@/services/admin/roles.services'
import ActiveButton from '@/components/admin/staffs/Active.Button.vue';


export default {
  name: 'Staff',
  components: {
    Title,
    Filter,
    ButtonCustom,
    Options,
    ActiveButton
  },

  data () {
    return {
      roles: [

      ]
    }
  },

  methods: {
    test() {

    },
   async getRoles () {
    try {
      this.roles = await RolesServices.getAllRoles()
    }
    catch(err) {

    }
   }

  },

  created () {
    this.getRoles()
  },

  watch: {
  }
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


    }

  }
}
</style>  
