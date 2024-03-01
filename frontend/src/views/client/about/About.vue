<template>

  <div class="container-fluid">
    <Content :content="'About'"/>
  </div>

  <div class="container-fluid about">
  
    <div class="row about__content">
      <div class="about__content--main">
        <div class="main-topic">
          <span>About us</span>
          <h1>Quality and  Tradition</h1>
          <p>Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, 
            content gfshere making look like readable English. Many desktop publishing packages.
          </p>
          
        </div>
        <div class="main-button">
          <ButtonCustom 
            :content="'More'"
            :color="'black'"
            :borderColor="'black'"
            :width="'50%'"

          />
        </div>
      </div>
      <div class="about__content--img">
        <img src="https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
        sdad
      </div>
      <div class="about__content--us">
        <div class="about-us__avatar">
          <div class="about-us__avatar--img">
            <!-- <img src="https://images.pexels.com/photos/5273717/pexels-photo-5273717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""> -->
          </div>
          <h1>
            Josefine <br>
            <span>
              CEO & Founder
            </span>
          </h1>
        </div>

        <div class="about-us__content">
          <span>Capitalize on low hanging fruit to identify a ballpark</span>
        </div>
        <div></div>
      </div>
    </div>
  
  </div>
</template>

<script>
import Content from '@/views/client/patials/Content.vue';
import ButtonCustom from '@/components/ButtonCustom.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';


export default {
  name: 'About',
  
  components: {
    Content,
    ButtonCustom
  }
}

</script>

<style lang="scss" scoped>

@import '@/assets/client/css/variables.scss';
@import url('https://fonts.cdnfonts.com/css/natural-precision');
@import url('https://fonts.cdnfonts.com/css/pathway-extreme');
@import url('https://fonts.cdnfonts.com/css/vintage-glory');
@import url('https://fonts.cdnfonts.com/css/smooch-sans');
@import url('https://fonts.cdnfonts.com/css/glory-2');


.about {
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://images.pexels.com/photos/3556225/pexels-photo-3556225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  position: relative;

  &__content {
   
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: start;
    flex-direction: column;
    vertical-align: middle;
    padding: 2rem;
    padding-top: 6rem;

    background-color: rgba($color: #ffff, $alpha: .9);
    width: 80%;
    height: 80%;

    &--main {
      width: 30%;
      padding: 1rem;

      span {
        font-family: 'Natural Precision', sans-serif;
        font-size: 1rem;
        border-top: 1px solid $logo-color;
        border-bottom: 1px solid $logo-color;
      }

      h1 {
        font-size: 4rem;
        width: 100%;
        padding-top: 0.7rem;   
        font-family: 'Vintage Glory', sans-serif;
                                                                 
      }
      
      p {
        font-size: 1.1rem;
        font-family: 'Pathway Extreme', sans-serif;
      }

      button {
        padding: 0.5rem;
        width: 9rem;
        background-color: rgba($color: #ffff, $alpha: .0);
        border:1px solid $logo-color;
        color: $logo-color;

        &:hover {
          background-color: white;
          color: black;
        }

      }
    }

    &--img {
      width: 30%;
      background-size: contain;
      height: 80%;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    &--us {
      position: absolute;
      background-color: rgba($color: #ffff, $alpha: 0.92);
      width: 20%;
      height: 15rem;
      bottom: 8rem;
      right: 31rem;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding: 3rem;
      
      .about-us__avatar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0.6rem;
        
        &--img {
          width: 4rem;
          border-radius: 100%;
          background-color: red;
          height: 4rem;
          background-size: cover;
          background-position: center;

          background-image: url('https://images.pexels.com/photos/5273717/pexels-photo-5273717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
        }
  
        h1 {
          padding: 1rem;
          font-size: 1rem;

          span {
            font-size: 1rem;
            font-family: 'Smooch Sans', sans-serif;
            font-weight: 600;
          }
        }
      }

      .about-us__content {
        font-family: 'Glory', sans-serif;
                                                
      }

    }
    
    
  }
  
}

</style>

