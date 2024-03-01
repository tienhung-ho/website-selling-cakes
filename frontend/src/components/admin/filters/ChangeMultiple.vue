<template>
    <div class="row d-flex justify-content-between filter-of-flavor">
      <div class="w-50 d-flex align-items-center flavor-content">
        <p class="">Tùy chỉnh</p>
      </div>
      <Form action="" @submit="" class="edit-form d-flex">

        <Multiselect v-model="option" :selected="option" :track-by="'value'" :close-on-select="true"
          :options="options" placeholder="Custom" class="multiselect" />

          <ButtonCustom class="ps-1" color="black" borderRadius="10px" content="Submit" borderColor="green" width="8rem" @click="handlerCustomer"/>
      </Form>

    </div>

</template>



<script>

import ButtonCustom from '@/components/ButtonCustom.vue';
import Multiselect from '@vueform/multiselect'
import { Form, Field, ErrorMessage } from "vee-validate"
import ProductsServices from '@/services/admin/products.services';

export default {
  name: 'Filter',

  components: {
    ButtonCustom,
    Multiselect,
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    changeStatus: {
      type: String,
      default: ''
    },
    search: {
      type: String,
      default: ''
    },
    changeProducts: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      content: 'Filter and Search',
      options: [
        'Delete',
        'Change Status'
      ],
      option: "",
    }
  },

  methods: {
    async handlerCustomer () {
      console.log(this.option);
    }
  
  },
  watch: {

  },
  emits: ['update:changeStatus', 'update:search', 'update:changeProducts'],

  async created() {

  }
}

</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>
a {
  list-style-type: none;
}

.filter {
  padding-bottom: 1rem;

  &__title {
    width: 45%;
  }

  &__ops {
    width: 25%;
  }
  
  
  
}

@import url('https://fonts.cdnfonts.com/css/noto-sans-bengali');

.flavor-content p{
  font-family: 'Noto Sans Bengali', sans-serif;
  margin: 0;
}

.flavor-content {
  width: 40%;
}

.edit-form {
  display: flex;
  // justify-content: space-around;
  //  align-items: start;
  padding: 1rem;
  width: 50%;

  .multiselect {
    width: 40%;
    height: 4rem;
    margin: 0;
  }

  &__submit {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;


  }

}
</style>
