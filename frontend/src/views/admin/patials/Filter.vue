<template>
  <div class="q-ontainer">
    <div class="row">

      <div class="filter q-ontainer d-flex justify-content-between">
        <div class="row filter__title d-flex ps-4 justify-content-around">
          <input type="text" placeholder="Search...." v-model="this.nameValue" @input="onSearch">
        </div>
        <div class="filter__ops d-flex justify-content-between">
          <div class="filter__ops--button active" v-for="item, index in filters">
            <ButtonCustom :content="item.name" width="6rem" borderColor="black" borderRadius="10px" color="black"
              :backgroundColor="item.isActive ? '#98E695' : ''" @click="onChoseOps(index, item.name)" />
          </div>

        </div>
        <div>
          <router-link :to="{ name: 'Create' }">

            <ButtonCustom content="Create New +" width="12rem" height="3.2rem" borderColor="black" borderRadius="10px"
              color="black" backgroundColor="" />
          </router-link>

        </div>


      </div>
    </div>
    <div class="row d-flex justify-content-between filter-of-flavor">
      <Form action="" @submit="" class="edit-form d-flex">

        <Multiselect v-model="optionFlavor" :selected="optionFlavor" :track-by="'value'" :close-on-select="true"
          :options="flavorArray" placeholder="Flavor" class="multiselect" />

        <ButtonCustom class="ps-1" color="black" borderRadius="10px" content="Submit" borderColor="green" width="8rem"
          @click="onGetProductFocusFlavor" />
      </Form>

      <div class="w-50 d-flex align-items-center flavor-content">
        <p class="">Lọc bánh theo hương vị</p>
      </div>
    </div>

    <hr>

    <div class="row d-flex justify-content-between filter-of-flavor">
      <div class="w-50 d-flex align-items-center flavor-content">
        <p class="">Tùy chỉnh</p>
      </div>
      <Form action="" @submit="" class="edit-form d-flex">

        <Multiselect v-model="option" :selected="option" :track-by="'value'" :close-on-select="true" :options="options"
          placeholder="Custom" class="multiselect" />

        <ButtonCustom class="ps-1" color="black" borderRadius="10px" content="Submit" borderColor="green" width="8rem"
          @click="handlerCustomer" />
      </Form>

    </div>


  </div>
</template>



<script>

import ButtonCustom from './ButtonCustom.vue';
import Multiselect from '@vueform/multiselect'
import { Form, Field, ErrorMessage } from "vee-validate"
import ProductsServices from '@/services/admin/products.services';
import ChangeMultiple from '@/components/admin/filters/ChangeMultiple.vue'

import { useQuasar } from 'quasar'

export default {
  name: 'Filter',
  setup () {
    const $q = useQuasar()

    return {
      triggerPositive (name) {
        $q.notify({
          type: 'positive',
          message: `Filter focus ${name} status successfully!`
        })
      },
    }
  },

  components: {
    ButtonCustom,
    Multiselect,
    Form,
    Field,
    ErrorMessage,
    ChangeMultiple
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
      default: ''
    },

    checkedProducts: {
      type: Array,
      default: []
    },
    changeMultiple: {
      type: String,
      default: ''
    }

  },

  data() {
    return {
      content: 'Filter and Search',
      filters: [
        {
          name: 'All',
          status: 'all',
          isActive: true
        },

        {
          name: 'Available',
          status: 'available',
          isActive: false
        },

        {
          name: 'Unavailable',
          status: 'unavailable',
          isActive: false
        }
      ],
      nameValue: '',
      flavorArray: [],
      options: [],
      optionFlavor: '',
      products: [],
      options: [
        'Delete',
        'Available',
        'Unavailable'
      ],
      option: "",

    }
  },

  methods: {
    onChoseOps(index, name) {
      for (const filter of this.filters) {
        filter.isActive = false
      }

      this.filters[index].isActive = true

      this.$emit('update:changeStatus', this.filters[index].status)
      this.triggerPositive(name)
      return
    },

    onSearch() {
      this.$emit('update:search', this.nameValue)
    },

    async getAllFlavor() {
      try {
        let fl = await ProductsServices.getAllFlavor()
        fl.forEach(item => {
          this.flavorArray.push(item.flavor)

        })
        // console.log(this.flavorArray);
      }
      catch (err) {
        console.log(err);
      }
    },

    async onGetProductFocusFlavor() {
      if (this.optionFlavor != '') {

        // this.products = await ProductsServices.getByFlavor(this.optionFlavor)
        console.log(this.optionFlavor);
        this.$emit('update:changeProducts', this.optionFlavor)

      }
    },

    async handlerCustomer() {

      let slugs = this.checkedProducts.map(item => item.slug)

      let data = {
        type: this.option.toLowerCase(),
        data: slugs
      }

      this.$emit('update:changeMultiple', data.slug)
      this.$emit('changeMultiple')

      await ProductsServices.changeMultiple(data)

    }
  },
  watch: {

  },
  emits: ['update:changeStatus', 'update:search', 'update:changeProducts', 'update:changeMultiple', 'changeMultiple'],

  async created() {
    await this.getAllFlavor()

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
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  &__title {
    width: 45%;

    input {
      height: 3rem;
      padding: 0.2rem;
      width: 50%;
      border-radius: 4px;
    }
  }

  &__ops {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;

    // &--button {
    // }
  }



}

@import url('https://fonts.cdnfonts.com/css/noto-sans-bengali');

.flavor-content p {
  font-family: 'Noto Sans Bengali', sans-serif;
  margin: 0;
}

.flavor-content {
  width: 40%;
}

.filter-of-flavor {
  background-color: rgb(240, 246, 249);
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
