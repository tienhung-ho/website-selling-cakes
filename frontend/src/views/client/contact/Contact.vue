<template>
  <div class="contact">
    <div class="contact__img">
      <img src="https://images.pexels.com/photos/14270532/pexels-photo-14270532.jpeg" alt="">
    </div>

    <div class="contact__us">
      <form action="" class="contact__us--form">
        <div class="contact__us--title">
          <p>Reservation</p>
          <h1>Contact us</h1>
        </div>
        <div class="user-timer">
          <div class="user row">
            <input class="col-4" type="text" name="userName" id="username" placeholder="User Name">
            <input class="col-4" type="email" name="email" id="email" placeholder="Email">
          </div>
  
          <div class="row timer">
            <input class="col-3" type="password" name="userPassword" id="userpassword" placeholder="Person">
            <input class="col-3" type="text" name="timer" id="timer" placeholder="Timer">
            <input class="col-3" type="text" name="date" id="date" placeholder="Date">
          </div>
        </div>

        <div class="form-submit">
          <ButtonCustom :content="'Book a Table'" :color="'white'" :borderColor:="'white'"/>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import ButtonCustom from '@/components/ButtonCustom.vue'; 

import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';

export default {
  name: 'Contact',

  components: {
    ButtonCustom
  }


}

</script>

<style lang="scss" scoped>

@import '@/assets/client/css/variables.scss';
@import url('https://fonts.cdnfonts.com/css/share-techmono-2');

.contact {
  font-family: 'Share-TechMono', sans-serif;
                                                
  width: 100%;
  position: relative;

  &__img {

    background-size: cover;
    height: 100vh;

    img {
      background-size: cover;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__us {
    background-color: rgba($color: $header-color, $alpha: .9);
    width: 60%;
    height: 70%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 18%;
    left: 20%;

    &--title {
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      margin-bottom: 2rem;

      p {
        color: white;
        border-bottom: 2px solid $logo-color;
        padding: 5px;
      }

      h1 {
        color: white;
      }
    }

    &--form {
      padding: 2rem;
      // background-color: rgba($color: $header-color, $alpha: .6);
      // box-shadow: rgba(113, 113, 202, 0.25) 0px 2px 5px -1px, rgba(244, 242, 242, 0.3) 0px 1px 3px -1px;
      width: 80%;
      height: 70%;

      .user-timer {
        width: 100%;
      }
      .user {
        padding: 2rem;
        padding-bottom: 0.5rem;
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;

        input {
          display: inline-block;
          padding: 0.5rem;
          width: 48%;
          background-color: rgba(0, 0, 0, 0);
          outline: none;
          border: 1px solid $email-input-color;
          color: white;

          &::placeholder {
            color: white;
          }
        }

      }

      .timer {
        padding: 2rem;
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;

        input {
          // display: inline-block;
          padding: 0.5rem;
          width: 30%;
          background-color: rgba(0, 0, 0, 0);
          outline: none;
          border: 1px solid $email-input-color;
          color: white;

          &::placeholder {
            color: white;
          }

        }
      }
      
      .form-submit {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        button {
          padding: 1rem;
          width: 15rem;
          border: 1px solid $logo-color;

          &:hover {
            background-color: $button-hover;
          }
        }
      }
    }

  }

}
</style>
