<template>
  <section class="content position-relative">

    <div class="container" :style="{ backgroundImage: 'url(' + Cake.thumbnail + ')' }">
      <div class="overlay">
        <div class="items"></div>
        <div class="items head">
          <p> {{ Cake.name }} </p>
          <hr>
        </div>
        <div class="items price">
          <p class="old">${{ Cake.price }}</p>
          <p class="new">$345</p>
        </div>
        <div class="items cart" @click="addToCart(Cake)">
          <font-awesome-icon :icon="['fas', 'cart-shopping']" />
          <span>ADD TO CART</span>
        </div>
        <div class="items cart mb-2">
          <router-link :to="{ name: 'Details', params: { slug: `${Cake.slug}` } }" @click="">
            <font-awesome-icon :icon="['fas', 'circle-info']" />
            <span>More details</span>
          </router-link>
        </div>

      </div>
    </div>
  </section>
</template>



<script>

import { addToCart } from '@/helpers/client/carts.helpers.js'
import { useCart } from '@/store/pinia.store.js'

export default {
  name: 'Cakes',


  components: {

  },

  props: {
    Cake: {
      type: [Object, Array],
      default: {}
    }
  },
  data() {
    return {
      isFlipped: false,
      isDetails: false,
      // store: useCart()

    }
  },
  methods: {
    showDetails() {
      this.$router.push({ name: 'Details', params: { slug: 'your-slug-value' } });
    },

    addToCart(data) {

        const item = {}
        item._id = this.Cake._id
        item.slug = this.Cake.slug
        item.quantity = 1

        this.$swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });

        addToCart(data)
        const store = useCart()
        store.setCart()        
        console.log(store.getCart());

    },

  },
  created() {
    // this.store = useCart()

  }
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.cdnfonts.com/css/fathan');
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");
@import '@/assets//client//css/variables.scss';


.content {
  height: 65vh;
  // text-align: center;

}

a {
  color: white;
}

a:visited {
  color: white;
}

$bg: #FEF5DF;

.container {
  width: 15rem;
  height: 20rem;

  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;

  // background: url("https://i.pinimg.com/564x/6f/5a/b1/6f5ab1b470beeeeaf285bb451c63ac8f.jpg");
  background-color: black;
  background-size: cover;
  cursor: pointer;
  padding: 0;
  -webkit-box-shadow: 0 0 5px #000;
  box-shadow: 0 0 5px #000;
}

.overlay {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr 2fr 1fr;

  background: rgba(77, 77, 77, .9);
  color: $bg;
  opacity: 0;
  transition: all 0.5s;

  font-family: 'Playfair Display', serif;
}


.items {
  padding-left: 1rem;
  letter-spacing: 0.2rem;
}

.head {
  font-size: 1.2rem;
  line-height: 2rem;

  transform: translateY(2rem);
  transition: all 0.7s;

  hr {
    display: block;
    width: 0;

    border: none;
    border-bottom: solid 2px $bg;

    position: absolute;
    bottom: 0;
    left: 20px;

    transition: all .5s;
  }
}

.price {
  font-size: 1.2rem;
  line-height: 0.7rem;
  font-weight: bold;
  opacity: 0;
  transform: translateY(2rem);
  transition: all 0.7s;

  .old {
    text-decoration: line-through;
    color: lighten(rgb(77, 77, 77), 40%);
  }
}

.cart {
  font-size: 0.7rem;
  opacity: 0;
  letter-spacing: 1px;
  font-family: 'Lato', sans-serif;
  transform: translateY(40px);
  transition: all 0.7s;

  i {
    font-size: 16px;
  }

  span {
    margin-left: 10px;
  }
}

.container:hover .overlay {
  opacity: 1;

  & .head {
    transform: translateY(0px);
  }

  & hr {
    width: 75px;
    transition-delay: 0.4s;
  }

  & .price {
    transform: translateY(0px);
    transition-delay: 0.3s;
    opacity: 1;
  }

  & .cart {
    transform: translateY(0px);
    transition-delay: 0.6s;
    opacity: 1;
  }
}</style>

