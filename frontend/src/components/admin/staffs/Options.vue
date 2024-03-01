<template>
  <div class="action">
    <router-link :to="{ name: 'EditStaff', params: { slug: slug } }">
      <span class="action__edit" title="Edit" @click="onEdit">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
          <path
            d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z">
          </path>
        </svg>
      </span>
    </router-link>

    <span class="action__detail" title="Detail">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
        <path
          d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z">
        </path>
        <path d="M7 9h10v2H7zm0 4h7v2H7z"></path>
      </svg>
    </span>

    <span class="action-delete" title="Delete" @click="onDelete">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
        <path
          d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
        </path>
      </svg>
    </span>
  </div>
</template>

<script>

import staffsServices from '@/services/admin/staffs.services';

export default {
  name: 'Options',
  data() {

    return {

    }
  },


  props: {
    slug: {
      type: String,
      default: ''
    }
  },

  methods: {
    async onDelete() {
      try {
        const result = await this.$swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          console.log('Deleted');
          
          await staffsServices.delete(this.slug)
          this.$emit('changeDeleted');
          this.$swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      } catch (err) {
        console.log(err);
      }

    }
  },
  emits: ['changeDeleted' ],
  created() {
  },
}

</script>

<style lang="scss" scoped>
.action {

  span {
    margin-right: .5rem;
    cursor: pointer;
  }

}
</style>
