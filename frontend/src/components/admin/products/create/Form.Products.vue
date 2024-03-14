
<template>
  <div class="edit">
    <Title :title="title" />
    <Form @submit="isEdit ? onEdit($event) : onCreate($event)" class="edit-form  q-container"
      :validation-schema="productFormSchema">

      <Field v-model="product.name" class="edit-form__name" type="text" name="name" id="name" placeholder="Name..." />
      <ErrorMessage name="name" class="error-feedback" />
      <!-- 
        <Field v-model="product.flavor" class="edit-form__flavor" type="text" name="flavor" id="flavor"
          placeholder="Flavor..." /> -->
      <Multiselect v-model="defaultFlavor" :selected="flavorValue" :track-by="'value'" mode="multiple"
        :close-on-select="false" :options="flavorArray" placeholder="Flavor" class="multiselect" />
      <ErrorMessage name="flavor" class="error-feedback" />

      <label for="description">Description:</label>
      <textarea v-model="product.description" class="edit-form__description" name="description" id="description" cols="30"
        rows="10"></textarea>


      <Field v-model="product.price" class="edit-form__price" type="number" name="price" id="price"
        placeholder="Price..." />
      <ErrorMessage name="price" class="error-feedback" />

      <Multiselect v-model="product.ingredients" :selected="value" :track-by="'value'" mode="multiple"
        :close-on-select="false" :options="options" placeholder="Choose ingredients" class="multiselect" />

      <div class="quantity-status justify-content-space-between w-100">

        <Field v-model="product.quantity" class="edit-form__quantity w-50 me-5" type="number" name="quantity"
          id="quantity" placeholder="Quantity..." />

        <div class="status q-flex row no-wrap justify-between  items-center content-center text-center">
          <input v-model="product.available" checked class="me-4 radio" type="radio" value="true" name="available"
            id="available">
          <label for="available" class="text-center">Available</label>

          <input v-model="product.available" class="ms-4 me-4 radio" type="radio" :value="false" name="available"
            id="unavailable">
          <label for="unavailable" class="text-center">Unavailable</label>
        </div>
      </div>
      <ErrorMessage name="quantity" class="error-feedback" />
      <div class="position-discount q-flex row wrap justify-between  items-center content-center text-center w-100">
        <Field v-model="product.discountPercentage" class="edit-form__discountPercentage flex-break" type="number"
          name="discountPercentage" id="discountPercentage" placeholder="Discount Percentage" />

        <Field v-model="product.position" class="edit-form__position" type="number" name="position" id="position"
          placeholder="Position..." />
      </div>

      <div class="mb-3 w-100">
        <label for="formFile" class="form-label">Chọn ảnh</label>
        <input :v-model="product.thumbnail" class="form-control h-100 p-3" type="file" id="thumbnail" name="thumbnail"
          accept="image/*" @change="handleImageUpload($event)">
      </div>

      <img v-if="this.image || this.product.thumbnail" :v-model="this.thumbnail"
        :src="this.image || this.product.thumbnail" :alt="product.slug" class="w-25 pb-4 rounded">
      <!-- <ErrorMessage name="thumbnail" class="error-feedback" /> -->
      <button type="submit" class="btn btn-outline-primary w-100">Submit</button>
    </Form>
  </div>
</template>
  
  
<script>

import Multiselect from '@vueform/multiselect'
import Title from '@/views/admin/patials/Title.vue';
import ButtonCustom from '@/views/admin/patials/ButtonCustom.vue';
import ProductsServices from '@/services/admin/products.services'
import Editor from '@tinymce/tinymce-vue'
import CakesServices from '@/services/client/cakes.services';


import * as yup from "yup"
import { Form, Field, ErrorMessage } from "vee-validate"


// import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';


export default {
  components: {
    Multiselect,
    Title,
    ButtonCustom,
    'editor': Editor,
    Form,
    Field,
    ErrorMessage,

  },
  data() {
    const productFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Name is required.")
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name can be at most 50 characters."),
      price: yup
        .number()
        .required("Price is required.")
        .positive("Price must be a positive number."),
      quantity: yup
        .number()
        .required("Quantity is required.")
        .positive("Quantity must be a positive number."),
    })
    return {
      value: [],  // Ensure value is initialized as an array
      options: [
        "Chocolate",
        "Flour",
        "Sugar",
        "Eggs",
        "Butter",
        "Milk",
        "Vanilla Extract",
        "Strawberries",
        "Gelatin",
        "Heavy Cream",
        "Cherries",
        "Chocolate Shavings",
        "Kirsch (Cherry Brandy)",
        "Cream Cheese",
        "Graham Cracker Crust",
        "Matcha Green Tea Powder",
      ],
      flavorArray: [],
      flavorValue: [],
      name: '',
      flavor: '',
      description: '',
      price: '',
      quantity: '',
      thumbnail: '',
      product: {},
      productFormSchema,
      editProduct: {},
      success: false,
      defaultFlavor: [],
      image: '',
      thumbnail: '',
      slug: '',
      available: true
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    defaultFlavorEdit: {
      type: Array,
      default: []
    },
    flavorArrayEdit: {
      type: Array,
      default: []
    },
    productEdit: {
      type: Object,
      default: {}
    }

  },
  methods: {

    handleImageUpload($event) {
      const file = $event.target.files[0];
      if (file) {
        this.thumbnail = file;
        const reader = new FileReader();
        reader.onloadend = () => {
          this.image = reader.result;
        }
        reader.readAsDataURL(file);
      }
    },

    async onCreate(e) {

      try {
        this.$swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        if (this.thumbnail != undefined) {

          this.product.thumbnail = this.thumbnail
        }

        if (this.defaultFlavor != undefined) {

          this.product.flavor = this.defaultFlavor
        }
        if (this.product.available == undefined) {
          this.product.available = true
        }
        const data = new FormData()
        Object.entries(this.product).forEach(([key, value]) => {
          data.append(key, value)

        })
        await ProductsServices.createProduct(data)
        this.$router.push('/admin/products')
      }

      catch (err) {
        console.log(err);
      }

    },

    async onEdit($event) {
      try {
        this.$swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });

        if ('deleted' in this.product) {
          // Sử dụng toán tử delete để xóa thuộc tính 'deleted'
          delete this.product.deleted;
        }

        if ('liked' in this.product) {
          // Sử dụng toán tử delete để xóa thuộc tính 'deleted'
          delete this.product.liked;
        }

        if (this.thumbnail != undefined && this.thumbnail != '' && this.thumbnail != null) {
          this.product.thumbnail = this.thumbnail
        }

        if (this.defaultFlavor != undefined) {
          this.product.flavor = this.defaultFlavor
        }

        console.log(this.product.available);
        if (this.product.available == undefined) {
          console.log(123123123123);
        }

        const data = new FormData()
        Object.entries(this.product).forEach(([key, value]) => {
          data.append(key, value)

        })

        await ProductsServices.findAndEdit(data, this.slug)
        this.$router.push('/admin/products');
      }

      catch (err) {
        console.log(err);
      }
    },


  },

  async created() {
    this.slug = this.$route.params.slug
    // this.getProoduct(this.slug)
    // this.getAllFlavor(this.slug)
  },
  watch: {
    productEdit: {
      handler: function (newVal, oldVal) {
        this.product = { ...newVal };
        console.log(this.product);
      },
      deep: true
    },

    flavorArrayEdit: {
      handler: function (newVal, oldVal) {
        this.flavorArray = newVal
      },
      deep: true
    },

    defaultFlavorEdit: {
      handler: function (newVal, oldVal) {
        this.defaultFlavor = newVal;
      },
      deep: true
    }

  }
}
</script>
  
<style src="@vueform/multiselect/themes/default.css"></style>
  
  
<style lang="scss" scoped> .edit {



   .edit-form {
     display: flex;
     justify-content: space-around;
     align-items: flex-start;
     flex-direction: column;
     padding: 2rem;

    img {
      width: 30%;
    }


     input {
       width: 90%;
       height: 4rem;
       margin: 1rem 0;
       padding: 2rem;
     }

     textarea {
       width: 90%;
       padding: 2rem;
     }

     .multiselect {
       width: 90%;
       height: 4rem;
       margin: 0;
     }

     &__submit {
       width: 90%;
       display: flex;
       align-items: center;
       justify-content: center;




     }

     .position-discount {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 90%;

      .edit-form__discountPercentage, .edit-form__position {
        width: 45%;
      }

     }

     .quantity-status {
       display: flex;
       justify-content: space-between;
       align-items: center;
       width: 90%;

       .edit-form__quantity {
         width: 60%;
       }

       .status {
        width: 30%;
       }
     }

   }

   .radio {
     width: 2rem !important;
   }

 }
</style>
  