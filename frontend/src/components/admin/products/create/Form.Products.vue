<template>
  <div class="edit">
    <Title :title="title" />
    <Form action="" @submit="handleSubmit" class="edit-form container-fluid" :validation-schema="productFormSchema">

      <Field v-model="product.name" class="edit-form__name" type="text" name="name" id="name" placeholder="Name..." />
      <ErrorMessage name="name" class="error-feedback" />
<!-- 
      <Field v-model="product.flavor" class="edit-form__flavor" type="text" name="flavor" id="flavor"
        placeholder="Flavor..." /> -->
      <Multiselect v-model="product.flavor" :selected="flavorValue" :track-by="'value'"  mode="multiple"  :close-on-select="false"
        :options="flavorArray" placeholder="Flavor" class="multiselect" />
      <ErrorMessage name="flavor" class="error-feedback" />

      <label for="description">Description:</label>
      <textarea v-model="product.description" class="edit-form__description" name="description" id="description" cols="30"
        rows="10"></textarea>


      <Field v-model="product.price" class="edit-form__price" type="number" name="price" id="price"
        placeholder="Price..." />
      <ErrorMessage name="price" class="error-feedback" />

      <Multiselect v-model="product.ingredients" :selected="value" :track-by="'value'" mode="multiple"
        :close-on-select="false" :options="options" placeholder="Choose ingredients" class="multiselect" />

      <Field v-model="product.quantity" class="edit-form__quantity" type="number" name="quantity" id="quantity"
        placeholder="Quantity..." />
      <ErrorMessage name="quantity" class="error-feedback" />

      <Field v-model="product.thumbnail" class="edit-form__thumbnail" type="text" name="thumbnail" id="thumbnail"
        placeholder="Thumbnail..." />
      <ErrorMessage name="thumbnail" class="error-feedback" />


      <div class="edit-form__submit">
        <ButtonCustom v-if="isEdit" color="black" content="Submit" borderColor="green" width="30rem" @click="onEdit"/>
        <ButtonCustom v-else color="black" content="Submit" borderColor="green" width="30rem" @click="onCreate" />
      </div>

    </Form>
  </div>
</template>

<script>

import Multiselect from '@vueform/multiselect'
import Title from '../../patials/Title.vue';
import ButtonCustom from '@/components/admin/patials/ButtonCustom.vue';
import ProductsServices from '@/services/admin/products.services'
import Editor from '@tinymce/tinymce-vue'
import CakesServices from '@/services/client/cakes.services';


import * as yup from "yup"
import { Form, Field, ErrorMessage } from "vee-validate"



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
      flavor: yup
        .string()
        .required("Flavor is required."),
      description: yup
        .string()
        .required("Description is required."),
      price: yup
        .number()
        .required("Price is required.")
        .positive("Price must be a positive number."),
      quantity: yup
        .number()
        .required("Quantity is required.")
        .positive("Quantity must be a positive number."),
      thumbnail: yup
        .string()
        .required("Thumbnail is required."),
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
      success: false
    }
  },
  props: {
    slug: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }

  },
  methods: {



    async onCreate() {
      // await this.getValue()

      try {
        this.$swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        await ProductsServices.createProduct(this.product)
        window.history.back()
      }

      catch (err) {
        console.log(err);
      }

    },


    async onEdit() {
      try {
        this.$swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        await ProductsServices.findAndEdit(this.product, this.slug)
        // this.setValue()
      }

      catch (err) {
        console.log(err);
      }
    },

    async getProoduct(slug) {
      try {
        if (slug) {
          const response = await ProductsServices.getBySlug(slug);
          // Kiểm tra xem phản hồi có dữ liệu hay không
          if (response) {
            this.product = {...response};
            // Nếu là mảng, truy cập phần tử đầu tiên
            console.log(this.product);
            this.setValue()
          } else {
            console.error("Empty response from API");
          }
        }
      } catch (err) {
        console.error(err);
      }
    },

    setValue() {
      this.name = this.editProduct.name
      this.flavor = this.editProduct.flavor
      this.description = this.editProduct.description
      this.price = parseInt(this.editProduct.price)
      this.quantity = parseInt(this.editProduct.quantity)
      this.thumbnail = this.editProduct.thumbnail
      this.value = this.editProduct.ingredients
    },

    handleSubmit() {

    },
    async getAllFlavor() {
      try {
        let fl = await CakesServices.getAllFlavor()
        fl.forEach(item => {
          this.flavorArray.push(item.flavor)

        })
        console.log(this.flavorArray);
      }
      catch (err) {
        console.log(err);
      }
    },
  },

  async created() {
    this.getProoduct(this.slug)
    this.getAllFlavor()
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped> .edit {


   .edit-form {
     display: flex;
     justify-content: space-around;
     align-items: start;
     flex-direction: column;
     padding: 2rem;

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

   }

 }</style>
