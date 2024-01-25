<template>
  <div class="filter container-fluid d-flex justify-content-between">
    <div class="row filter__title d-flex ps-4 justify-content-around">
      <input  
        type="text" placeholder="Search...."
        v-model="this.nameValue"
        @input="onSearch"
        >
    </div>
      <div class="filter__ops d-flex justify-content-between">
        <div class="filter__ops--button active" v-for="item, index in filters"
        
        >
          <ButtonCustom 
            :content="item.name" 
            width="6rem" 
            borderColor="black" 
            borderRadius="10px"
            color="black"
            :backgroundColor="item.isActive ? '#98E695' : ''"
            @click="onChoseOps(index)"
          />
        </div>
        
      </div>
      <div>
        <router-link :to="{ name: 'Create' }">
          
          <ButtonCustom 
          content="Create New +" 
          width="12rem" 
          height="3.2rem"
          borderColor="black" 
          borderRadius="10px"
          color="black"
          backgroundColor=""
          />
        </router-link>

      </div>
  </div>
</template>

<script>

import ButtonCustom from './ButtonCustom.vue';

export default {
  name: 'Filter',

  components: {
    ButtonCustom
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
      nameValue: ''
    }
  },

  methods: {
    onChoseOps (index) {
      for (const filter of this.filters) {
        filter.isActive = false
      }

      this.filters[index].isActive = true

      this.$emit('changeStatus', this.filters[index].status)

      // if (this.filters[index].name == 'All') {
      //   this.$router.push({ query: {} }); 
      // }
      // else {
      //   this.$router.push(
      //     { query: { status: this.filters[index].status } }
      //   );
      // }
    },

    onSearch () {
      this.$emit('search', this.nameValue)      
    }
  },
  watch: {

  },
  emits: ['update:changeStatus', 'update:search']
}

</script>

<style lang="scss" scoped>

a {
  list-style-type: none;
}

.filter {
  padding-bottom: 1rem;

  &__title {
    width: 45%;
  }

  &__ops {
    width: 25%;
  }

}

</style>
