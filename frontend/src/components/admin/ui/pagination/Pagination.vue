<template>
  <!--
Forked from:
https://quasar.dev/vue-components/pagination#example--with-boundary-numbers
-->
  <div id="q-app" style="{}">
    <div class="q-pa-lg flex">
      <q-pagination size="20px" v-model="current" color="black" :max="totalPage" :max-pages="6" boundary-numbers></q-pagination>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'


export default {
  name: 'Pagination',
  setup() {
    
    const current = ref(1);


    return {
      current,

    }
  },
  props: {
    pagination: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: 0
    }
  },
  created() {

  },
  emit: ['update:pagination'],

  watch: {
    current: {
      handler() {
        this.$emit('update:pagination', this.current)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* Your custom styles go here */
</style>
