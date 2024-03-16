
<template>
  <div class="create">
    <Form action="" @submit="isEdit ? onEdit() : onCreate($event)" class="create-form container-fluid">

      <Field v-model="role.title" class="create-form__name" type="text" name="title" id="title"
        placeholder="Title...." />

      <Field v-model="role.description" class="create-form__email" type="text" name="description" id="description"
        placeholder="Description..." />

      <q-btn :loading="loading" color="secondary" @click="isEdit ? onEdit($event) : onCreate($event)" class="submit q-mt-md" label="Submit"/>
    </Form>
  </div>

</template>


<script>

import Title from '@/views/admin/patials/Title.vue';
import ButtonCustom from '@/views/admin/patials/ButtonCustom.vue';
import RolesServices from '@/services/admin/roles.services'
import Editor from '@tinymce/tinymce-vue'
import Multiselect from '@vueform/multiselect'


import * as yup from "yup"
import { Form, Field, ErrorMessage } from "vee-validate"



export default {
  components: {
    Title,
    ButtonCustom,
    'editor': Editor,
    Form,
    Field,
    ErrorMessage,
    Multiselect

  },
  data() {
   
    return {
      // staffFormSchema,
      role: {},
      loading: false

    }
  },
  props: {
    initalRole: {
      type: Object || Array,
      default: {} || []
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  methods: {

    async onCreate(e) {

      try {
        if (this.role.title) {
          
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
  
          this.loading = true
          await RolesServices.createRole(this.role)
          this.loading = false
        }

        this.$router.push('/admin/roles')
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
          // timer: 1500
        });
      
        this.loading = true
        await RolesServices.editRole(this.role)
        this.loading = false
        this.$router.push('/admin/roles')
      }

      catch (err) {
        console.log(err);
      }

    }


  },
  created() {
    // this.onEdit()
  },

  watch: {
    defaultStaff: {
      handler: function(newVal, oldVal) {
        this.role = { ...newVal };
        console.log(this.role);
      },
      deep: true
    },
    initalRole: {
      handler: function(newVal, oldVal) {
        this.role = { ...this.initalRole }
      }
    }
  }

}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>


<style lang="scss" scoped> .create {



   .create-form {
     display: flex;
     justify-content: space-around;
     align-items: flex-start;
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

 }
</style>


