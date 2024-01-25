<template>
  <div class="container-fluid flavor">
    <div class="row flavor__content">
      <h1>Flavors available</h1>
    </div>

    <ul class="flavor__list row">
      <li class="flavor__list--item col-4" 
        v-for="item in this.flavor" :key="item"
        @click="filters(item.slug)"
        >
        <div class="item__img">
          <img :src="item.thumbnail" alt="">
        </div>
        <div class="item__content">
          <span>{{ item.flavor }}</span>
        </div>
      </li>
    </ul>
  </div>

  <div class="container-fluid products">
    <div class="row products__content">
      <h1 class="col">Our Cakes</h1>
    </div>
    <div class="row row-cols-4 cakes">
      <Cakes v-for="(item, index) in this.cakes" :key="index"
      :Cake="item" />
    </div>
    <div class="products__show" v-if="isShowLess">
      <ButtonCustom @click="showMore" :content="'Show More'" :color="'grey'" :borderColor="'#292E36'"/>
       <!-- <button @click="showMore">
        Show More
       </button> -->
    </div>
    <div class="products__show" v-else>
        <ButtonCustom @click="showLess" :content="'Show Less'" :color="'grey'" :borderColor="'#292E36'"/>
       <!-- <button @click="showLess">
        Show Less
       </button> -->
    </div>
  </div>

</template>

<script>
import CakesServices from '@/services/client/cakes.services';
import Cakes from './Cakes.vue';
import ButtonCustom from '@/components/ButtonCustom.vue'

export default {
  name: 'Flavor',

  data() {
    return {
      flavor: [],
      cakes: {
        type: [Array, Object],
        // default: {}
      },
      number: 0,
      isShowLess: true
    }
  },
  components: {
    Cakes, 
    ButtonCustom,
  },
  props: {
    numberOfCakes: {
      type: Number,
    },
    isShop: {
      type: Boolean,
    }
  },

  methods: {

    async getCakes() {
      try {
        this.cakes = await CakesServices.getAllCakes()

      }
      catch (err) {
        console.log(err);
      }
    },

    async getAllFlavor() {
      try {
        this.flavor = await CakesServices.getAllFlavor()
      }
      catch (err) {
        console.log(err);
      }
    },

    showMore () {
      this.number = this.cakes.length - 1 
      this.isShowLess = !this.isShowLess
    },

    showLess () {
      this.number = 8
      this.isShowLess = !this.isShowLess

    },
    async filters (slug) {
      this.cakes = await CakesServices.getByFlavor(slug)
      this.number = this.cakes.length + 1
      console.log(this.cakes, this.number);
    }

  },
  computed: {

  },
  mounted () {
    this.number = this.numberOfCakes

  },
  created() {
    this.getCakes()
    this.getAllFlavor()
    this.number = this.numberOfCakes
  }
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.cdnfonts.com/css/fathan');
@import url('https://fonts.cdnfonts.com/css/promises-gisttela-serif');
@import '@/assets//client//css/variables.scss';

.flavor {
  .products {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  padding: 4rem;
  // padding-top: 6rem;

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 3rem;

    h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-family: 'Fathan', sans-serif;
      font-size: 5rem;
    }

  }

  &__list {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    vertical-align: middle;

    &--item {
      cursor: pointer;
      width: 20%;
      height: 50vh;
      text-align: center;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      padding: 0;

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
        border-radius: 10px;
      }


      .item__img {
        width: 100%;
        height: 80%;
        background-size: cover;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          background-size: cover;
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }

      .item__content {
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        padding: 1rem;
        font-family: 'Promises Gisttela Serif', sans-serif;
        font-size: 2rem;
        font-weight: 400;

        span {
          text-align: center;
        }
      }
    }
  }

}

.products {
  margin-bottom: 4rem;

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    h1 {
      font-family: 'Fathan', sans-serif;
      font-size: 5rem;
    }
  }

  &__show {
    display: flex;
    justify-content: center;
    align-items: center;
    
    
    button {
      height: 3.5rem;
      width: 14rem;
      background-color: white;
      border: 1px solid $logo-color;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

      &:hover {
        background-color: $header-color;
        border: white;
        
        color: white;
      }
    }
  }


}
</style>

