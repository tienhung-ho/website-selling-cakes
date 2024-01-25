<template>
  <div class="action">
    <span class="action__like" title="Like">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        :style="{ fill: product.liked ? 'red' : 'rgba(0, 0, 0, 1)' }" @click="onLike">
        <path
          d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z">
        </path>
      </svg>
    </span>

    <router-link :to="{ name: 'Edit', params: { slug: `${product.slug}` } }">
      

      <span class="action__edit" title="Edit">
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

    <span class="action-delete" title="Delete" @click="onDeleted">
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

import { mapActions } from 'vuex'

export default {
  name: 'Cakes',
  data() {

    return {

    }
  },


  props: {
    product: {
      type: [Array, Object],
      // default: {}
    }
  },

  methods: {
    ...mapActions(['updateProductLiked']),
    async onLike() {
      try {

        await this.updateProductLiked({ productId: this.product._id, liked: this.product.liked })

        this.$emit('changeLiked')
      }
      catch (err) {
        console.log(err);
      }
    },

    ...mapActions(['deletedProducts']),
    async onDeleted() {
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
          await this.deletedProducts({ productId: this.product._id, deleted: this.product.deleted })

          this.$emit('changeDeleted');
          this.$swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      } catch (err) {
        console.log(err);
      }
    },


  }
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
