
<template>
  <!-- <FormProducts
    title="Create"
  /> -->

  <div class="create">
    <Form action="" @submit="isEdit ? onEdit() : onCreate($event)" class="create-form container-fluid">

      <Field v-model="staff.fullName" class="create-form__name" type="text" name="fullName" id="name"
        placeholder="Full Name..." />
      <ErrorMessage name="fullName" class="error-feedback" />

      <Field v-model="staff.email" class="create-form__email" type="email" name="email" id="email"
        placeholder="email..." />
      <!-- <ErrorMessage name="email" class="error-feedback" /> -->


      <Field v-model="staff.phone" class="create-form__phone" type="number" name="phone" id="phone"
        placeholder="Phone..." />

      <Field v-model="staff.password" v-if="!isEdit" class="create-form__password" type="password" name="password" id="password"
        placeholder="password..." />

      <div class="mb-3 w-100">
        <label for="formFile" class="form-label">Chọn ảnh</label>
        <input class="form-control h-100 p-3" type="file" id="avatar" name="avatar" accept="image/*"
          @change="handleImageUpload($event)">
      </div>

      <img :v-model="this.avatar" :src="this.image || defaultStaff.avatar" alt="" class="w-25 pb-4 rounded">
      <!-- <ErrorMessage name="thumbnail" class="error-feedback" /> -->
      <Multiselect v-model="this.staffRole" :selected="roleValue" :track-by="'value'" :close-on-select="false"
        :options="rolesArray" placeholder="Role......" class="multiselect mb-4" />
      <button type="submit" class="btn btn-outline-primary w-100 ">Submit</button>
    </Form>
  </div>
</template>

<script>

import Title from '@/views/admin/patials/Title.vue';
import ButtonCustom from '@/views/admin/patials/ButtonCustom.vue';
import StaffsServices from '@/services/admin/staffs.services'
import Editor from '@tinymce/tinymce-vue'
import Multiselect from '@vueform/multiselect'

import RolesServices from '@/services/admin/roles.services';
import * as yup from "yup"
import { Form, Field, ErrorMessage } from "vee-validate"
import { Thumbs } from 'swiper/modules';



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
    // const staffFormSchema = yup.object().shape({
    //   name: yup
    //     .string()
    //     .required("Name is required.")
    //     .min(2, "Name must be at least 2 characters.")
    //     .max(50, "Name can be at most 50 characters."),
    //   email: yup
    //     .string()
    //     .required("email is required.")
    //     .positive("email must be a positive email."),
    //   phone: yup
    //     .number()
    //     .required("phone is required.")
    //     .positive("phone must be a positive number."),
    // })
    return {
      // staffFormSchema,
      roleValue: '',
      rolesArray: [

      ],
      rolesArrayId: [],
      staff: {
        fullName: '',
        email: '',
        phone: 0,
        password: '',
        avatar: '',
        role_id: ''
      },
      avatar: '',
      image: '',
      slug: '',
      staffRole: '',


    }
  },
  props: {
    defaultStaff: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: ''
    },
  },
  methods: {

    getRoleId (staffName) {
      return this.rolesArrayId[this.rolesArray.indexOf(staffName)]
    },

    handleImageUpload($event) {
      const file = $event.target.files[0];
      if (file) {
        this.avatar = file;
        const reader = new FileReader();
        reader.onloadend = () => {
          this.image = reader.result;
        }
        reader.readAsDataURL(file);
      }
    },

    async onCreate(e) {

      try {
        if (this.avatar != undefined) {
          this.staff.avatar = this.avatar
        }

        const allValuesEmpty = Object.values(this.staff).every(value => value !== '')
        this.staff.role_id = this.getRoleId(this.staffRole)
        

          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });


          const data = new FormData()
          Object.entries(this.staff).forEach(([key, value]) => {
            data.append(key, value)

          })


          // Log thông tin từ FormData
          // for (const entry of data) {
          //   console.log(entry);
          // }
          // console.log(this.staff);

          await StaffsServices.createStaff(data)

          this.$router.push('/admin/staff')
        
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
        if (this.avatar != undefined) {
          this.staff.avatar = this.avatar
        }

        
        this.staff.role_id = this.getRoleId(this.staffRole)
        
        const data = new FormData()
        Object.entries(this.staff).forEach(([key, value]) => {
          data.append(key, value)

        })


        // Log thông tin từ FormData
        // for (const entry of data) {
        //   console.log(entry);
        // }
        // console.log(this.staff);

        await StaffsServices.editStaff(data, this.staff.slug)
        
        this.$router.push('/admin/staff')
      }

      catch (err) {
        console.log(err);
      }

    },

    async getRoles() {
      const roles = await RolesServices.getAllRoles()

      this.rolesArray = roles.map(item => item.title)
      this.rolesArrayId = roles.map(item => item._id)

    }


  },
  created() {
    this.getRoles()
  },

  watch: {
    defaultStaff: {
      handler: function (newVal, oldVal) {
        this.staff = { ...newVal };
        
      },
      deep: true
    },

    role: {
      handler: function (newVal, oldVal) {
        this.staffRole = newVal
      },
      deep: true
    },
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


