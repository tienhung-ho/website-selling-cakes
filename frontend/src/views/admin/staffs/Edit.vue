
<template>
  <Title title="Edit" />
  <div class="edit">
   <FormStaff :isEdit="true" :defaultStaff="this.staff || {}" :role="role"/>
  </div>
</template>

<script>
import FormStaff from '@/components/admin/staffs/Form.Staff.vue';
import Title from '@/views/admin/patials/Title.vue';
import staffsServices from '@/services/admin/staffs.services';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'popper.js';
// import 'bootstrap/dist/js/bootstrap';

export default {
  name: 'Edit',

  components: {
    Title,
    FormStaff
  },
  data () {
    return {
      slug: '',
      staff: '',
      role: ''
    }
  },
  methods: {
    async getStaff(slug) {
      try {
        if (slug) {
          const response = await staffsServices.getStaffbySlug(slug)
          // Kiểm tra xem phản hồi có dữ liệu hay không
          if (response) {
            this.staff = { ...response.staff }
            this.role = response.role
            console.log(this.staff);
            
            // Nếu là mảng, truy cập phần tử đầu tiên
            // console.log(this.product);
            // this.setValue()
          } else {
            console.error("Empty response from API");
          }
        }
      } catch (err) {
        console.error(err);
      }
    },

  },

  created () {
    this.slug = this.$route.params.slug 
    this.getStaff(this.slug)
  },

}


</script>

<style lang="scss" scoped>

/* Import CSS */
@import url('https://link-to-your-stylesheet.css');


</style>

