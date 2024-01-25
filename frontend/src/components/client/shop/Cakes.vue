<template>
  <!-- <section class="content position-relative">
    <div class="cards">
      <div class="card">
        <div class="card__side card__side--front card__side--front-1">
          <div class="card__description">
            <div class="card__description--img">
              <img :src="Cake.thumbnail" alt="cakeimg">
            </div>

            <div class="card__description--title">
              <h3> {{ Cake.name }}</h3>
              <h5> {{ Cake.flavor }}</h5>
              <h6> ${{ Cake.price }}</h6>
            </div>

          </div>
        </div>
        <div class="card__side card__side--back card__side--back-1"
          :style="{ backgroundImage: 'url(' + Cake.thumbnail + ')' }">
          <div class="card__overlay">

          </div>
          <div class="card__description card__description-back">
            <div class="card__description--button" @click="addToCart">
              <button class="btn">Add to Cart</button>
            </div>
            <div class="card__description-social">
              <div class="card__description--share card__description--ops">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12 10.6667C11.4747 10.6667 11 10.8733 10.644 11.2047L5.94 8.46667C5.97333 8.31334 6 8.16 6 8C6 7.84 5.97333 7.68667 5.94 7.53334L10.64 4.79334C11 5.12667 11.4733 5.33334 12 5.33334C13.1067 5.33334 14 4.44 14 3.33334C14 2.22667 13.1067 1.33334 12 1.33334C10.8933 1.33334 10 2.22667 10 3.33334C10 3.49334 10.0267 3.64667 10.06 3.8L5.36 6.54C5 6.20667 4.52667 6 4 6C2.89333 6 2 6.89334 2 8C2 9.10667 2.89333 10 4 10C4.52667 10 5 9.79333 5.36 9.46L10.0587 12.2053C10.0211 12.3563 10.0014 12.5111 10 12.6667C10 13.0622 10.1173 13.4489 10.3371 13.7778C10.5568 14.1067 10.8692 14.3631 11.2346 14.5144C11.6001 14.6658 12.0022 14.7054 12.3902 14.6282C12.7781 14.5511 13.1345 14.3606 13.4142 14.0809C13.6939 13.8012 13.8844 13.4448 13.9616 13.0568C14.0387 12.6689 13.9991 12.2668 13.8478 11.9013C13.6964 11.5358 13.44 11.2235 13.1111 11.0037C12.7822 10.784 12.3956 10.6667 12 10.6667Z"
                      fill="white" />
                  </svg>
                </span>
                <span>
                  Share
                </span>
              </div>

              <div class="card__description--compare card__description--ops">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M10.08 7L11.08 8L14.52 4.55L11 1L10 2L11.8 3.8H2.00001V5.2H11.82L10.08 7ZM5.86001 9L4.86001 8L1.42001 11.5L4.91001 15L5.91001 14L4.10001 12.2H14V10.8H4.10001L5.86001 9Z"
                      fill="white" />
                  </svg>
                </span>
                <router-link :to="{ name: 'Details', params: { slug: `${Cake.slug}` } }" @click="">
                  Views
                </router-link>
              </div>

              <div class="card__description--like card__description--ops">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M7.99973 14.0361C-5.33333 6.66667 3.99999 -1.33333 7.99973 3.72537C12 -1.33334 21.3333 6.66667 7.99973 14.0361Z"
                      stroke="white" stroke-width="1.8" />
                  </svg>
                </span>
                <span>
                  Like
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>


  </section> -->

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
        <div class="items cart" @click="addToCart">
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

    }
  },
  methods: {
    showDetails() {
      this.$router.push({ name: 'Details', params: { slug: 'your-slug-value' } });
    },

    addToCart() {

      if (!this.$store.getters.getUser) {
        this.$swal.fire({
          position: "center",
          icon: "error",
          title: "Please login",
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(() => {
          this.$router.push('/login');
        }, 1600)
        // If the user is not logged in, redirect to the login page
      } else {
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

        this.$store.dispatch('addItemToCart', item);
      }
    },

  },
  created() {

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

