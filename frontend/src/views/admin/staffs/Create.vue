
<template>
  <Title title="Create" />
  <div class="create">
   <FormStaff />
  </div>
</template>

<script>
import FormStaff from '@/components/admin/staffs/Form.Staff.vue';
import Title from '@/views/admin/patials/Title.vue';


// import 'bootstrap/dist/css/bootstrap.css';
// import 'popper.js';
// import 'bootstrap/dist/js/bootstrap';


export default {
  name: 'Create',

  components: {
    Title,
    FormStaff
  },
  data () {
    return {

    }

  },
  methods: {
    
  },

  created () {

  }
}


</script>

<style lang="scss" scoped>
@import '@/assets/admin/scss/variables.scss';

/* Import JavaScript */
@import url('https://link-to-your-javascript.js');

</style>

