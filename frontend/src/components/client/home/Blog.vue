<template>
  <div class="container-fluid offer">

    <div class="row offer__special">
      <h2>
        BLOG
      </h2>
      <h1>
        Be First Who Read News
      </h1>
      <h4>
        Information about delicious cakes will be displayed here.
      </h4>

      <div class="offer__special--img">

        <div class="offer-img__content">
          <div class="offer-img__content--img" @mouseover="isHoverOne = true" @mouseleave="isHoverOne = false">
            <img
              src="https://images.pexels.com/photos/18960135/pexels-photo-18960135/free-photo-of-bread-served-in-a-restaurant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="">

            <div v-if="isHoverOne" class="overlay"></div>
            <div v-if="isHoverOne" class="view">
              <ButtonCustom :content="'View More'" :color="'white'"/> 
            </div>
          </div>
          <div class="offer-img__content--off">
            <h3>THE TASTEAT</h3>
            <h1>
              Elegant Dessert: 10 Tips How to Make It at Home
            </h1>
            <h2>
              Capitalize on low-hanging fruit to identify a
              ballpark value added matrix economically and the creative activity to beta test override the food quality.
            </h2>
          </div>
        </div>
        <div class="offer-img__content">
          <div class="offer-img__content--img" @mouseover="isHoverTwo = true" @mouseleave="isHoverTwo = false">
            <img
              src="https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="">
            <div v-if="isHoverTwo" class="overlay"></div>
            <div v-if="isHoverTwo" class="view">
              <ButtonCustom :content="'View More'" :color="'white'"/>
            </div>
          </div>
          <div class="offer-img__content--off">
            <h3>THE TASTEAT</h3>
            <h1>
              The Most Popular Delicious Food Of Mediterranean Cuisine
            </h1>
            <h2>
              Capitalize on low-hanging fruit to identify a ballpark value added matrix
              economically and the creative activity to beta test override the food quality.
            </h2>
          </div>
        </div>

      </div>
    </div>

    <div class="row   offer__popular">

    </div>

  </div>
</template>

<script>

import ButtonCustom from '@/components/ButtonCustom.vue';

export default {
  name: "Offer",
  data() {
    return {
      isHoverOne: false,
      isHoverTwo: false,

    }

  },
  
  components: {
    ButtonCustom
  }

}

</script>

<style lang="scss" scoped>
@import '@/assets//client//css/variables.scss';
@import url('https://fonts.cdnfonts.com/css/lt-binary-neue');
@import url('https://fonts.cdnfonts.com/css/cutive-mono');


.offer {
  margin-top: 2rem;
  padding: 3rem;

  &__special {
    font-family: 'LT Binary Neue Round', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    vertical-align: middle;

    h2 {
      // border-top: 2px solid $logo-color;
      border-bottom: 2px solid $logo-color;
      width: 7rem;
    }

    h4 {
      font-size: 1rem;
    }

    &--img {
      padding: 4rem 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;

    }

    .offer-img__content {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      text-align: center;
      width: 38%;
      border: 1px solid #eee;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      // height: 100%;

      &--img {
        background-size: contain;
        width: 100%;
        position: relative;


        img {
          width: 100%;
          background-size: cover;
          aspect-ratio: 16/9;
          object-fit: cover;
          height: 18rem;
        }
      }

      &--off {
        height: 18rem;
        text-align: start;
        padding: 1.5rem 1rem;
        width: 100%;

        h3 {
          border-top: 2px solid $logo-color;
          border-bottom: 2px solid $logo-color;
          width: 25%;
          padding: 0.3rem;
          text-align: center;
          font-size: 0.7rem;
        }

        h1 {
          font-size: 1.7rem;
        }

        h2 {
          padding-top: 1rem;
          font-size: 1rem;
          width: 90%;
          border: none;
          font-weight: 10;
          font-family: 'Cutive Mono', sans-serif;
          font-size: 1rem;
        }
      }
    }

  }
}

.overlay {
  left: 0;
  right: 0;
  top: 0;

  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(100, 100, 111, 0.5);
}

.view {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 40%;
  right: 37%;

  button {
    width: 8rem;
    height: 3rem;
    border: 2px solid $logo-color;
    background-color: rgba(0, 0, 0, 0);
    color: white;

    &:hover {
      background-color: white;
      color: black;
    }

  }


}
</style>
