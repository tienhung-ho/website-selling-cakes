<template>
  <div class="login container-fluid">
    <div class="row login-row">

      <div class="login__content col-7 row">

        <div class="login__content--topic">
          <h1>
            Thanks for came here!

          </h1>
          <p>
            "Expressing Profound Appreciation: A Warm Thank You for Your Presence and Support
            at THE TASTEAT. Your Participation Made the Occasion Truly Special!"
          </p>

          <ButtonCustom :content="'Feddback!'" :borderColor="'black'" :color="'black'" :width="'100%'" />
        </div>

        <div class="login__content--img col">
          <img src="@/assets/client/images/Banner.png" alt="">
        </div>
      </div>
      <form @submit.prevent="register" class="login-form col-5">
        <div class="login-form__title">
          <h2>
            Register
          </h2>
          <br>
          <span>
            Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.
          </span>
        </div>

        <div class="login-form__username input-user">
          <input v-model="acc.username" type="text" name="username" id="username" placeholder="Username">
        </div>

        <div class="login-form__password input-user">
          <input v-model="acc.password" type="password" name="password" id="password" placeholder="Password">
        </div>

        <div class="login-form__register input-user ">
          <input class="re-password" type="password" name="re-password" id="re-password" placeholder="Re-password">

          <div class="login-form__email input-user">
            <input v-model="acc.email" class="email" type="text" name="email" id="email" placeholder="email">
            <input v-model="acc.phone" class="phone" type="text" name="phone" id="phone" placeholder="Phone">
          </div>
        </div>

        <router-link :to="{ name: 'Login' }">
          <div class="login-form__ops">
            Login?
          </div>
        </router-link>

        <ButtonCustom :content="'Accompany Us'" :type="'submit'" :borderColor="'black'" :width="'90%'" :color="'black'" />

        <div class="login-contact">
          <div class="d-flex flex-column ">
            <p class="text-muted mb-2">Continue with...</p>
            <div class="d-flex align-items-center icon-contact">
              <span href="#" class="box me-2 selectio">
                <span class="mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M23.9629 12.0767C23.9629 5.79502 18.6406 0.70166 12.0766 0.70166C5.51269 0.70166 0.19043 5.79502 0.19043 12.0767C0.19043 17.754 4.53633 22.4599 10.2194 23.314V15.3658H7.20064V12.0767H10.2194V9.57061C10.2194 6.72025 11.9944 5.14451 14.7091 5.14451C16.0097 5.14451 17.3703 5.36693 17.3703 5.36693V8.1665H15.8707C14.395 8.1665 13.9333 9.04299 13.9333 9.94385V12.0767H17.2296L16.7032 15.3658H13.9339V23.3151C19.617 22.4614 23.9629 17.7555 23.9629 12.0767Z"
                      fill="black" />
                  </svg>
                </span>
                <!-- <p class="mb-0">Facebook</p> -->
              </span>
              <span href="#" class="box me-2">
                <span class="mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="34" viewBox="0 0 25 24" fill="none">
                    <path
                      d="M17.2566 2.52896C18.569 2.53272 19.8265 3.0333 20.7545 3.9214C21.6825 4.80949 22.2056 6.01293 22.2095 7.26889V16.7477C22.2056 18.0037 21.6825 19.2071 20.7545 20.0952C19.8265 20.9833 18.569 21.4839 17.2566 21.4876H7.35177C6.03937 21.4839 4.78185 20.9833 3.85384 20.0952C2.92583 19.2071 2.40275 18.0037 2.39883 16.7477V7.26889C2.40275 6.01293 2.92583 4.80949 3.85384 3.9214C4.78185 3.0333 6.03937 2.53272 7.35177 2.52896H17.2566ZM17.2566 0.633301H7.35177C3.5381 0.633301 0.417969 3.61924 0.417969 7.26889V16.7477C0.417969 20.3974 3.5381 23.3833 7.35177 23.3833H17.2566C21.0703 23.3833 24.1904 20.3974 24.1904 16.7477V7.26889C24.1904 3.61924 21.0703 0.633301 17.2566 0.633301Z"
                      fill="black" />
                    <path
                      d="M18.7426 7.26904C18.4488 7.26904 18.1615 7.18565 17.9172 7.02941C17.6728 6.87318 17.4824 6.65111 17.3699 6.3913C17.2575 6.13148 17.2281 5.84559 17.2854 5.56977C17.3427 5.29396 17.4842 5.0406 17.692 4.84175C17.8998 4.6429 18.1645 4.50748 18.4528 4.45261C18.741 4.39775 19.0397 4.42591 19.3112 4.53353C19.5827 4.64115 19.8147 4.82339 19.978 5.05722C20.1413 5.29104 20.2284 5.56595 20.2284 5.84717C20.2288 6.034 20.1907 6.21908 20.1162 6.39177C20.0416 6.56446 19.9322 6.72137 19.7942 6.85348C19.6561 6.9856 19.4922 7.09031 19.3117 7.16163C19.1312 7.23294 18.9379 7.26945 18.7426 7.26904ZM12.3044 8.21662C13.0881 8.21662 13.8542 8.43901 14.5057 8.85566C15.1573 9.27231 15.6652 9.86452 15.9651 10.5574C16.265 11.2503 16.3434 12.0127 16.1905 12.7482C16.0377 13.4838 15.6603 14.1594 15.1062 14.6897C14.552 15.22 13.846 15.5811 13.0774 15.7274C12.3088 15.8737 11.5122 15.7987 10.7881 15.5117C10.0641 15.2247 9.44533 14.7387 9.00995 14.1151C8.57457 13.4915 8.34219 12.7584 8.34219 12.0085C8.34331 11.0031 8.76112 10.0393 9.50394 9.32841C10.2468 8.61754 11.2539 8.2177 12.3044 8.21662ZM12.3044 6.32096C11.129 6.32096 9.97996 6.65452 9.00262 7.27947C8.02529 7.90442 7.26354 8.79269 6.81372 9.83195C6.3639 10.8712 6.24621 12.0148 6.47553 13.118C6.70484 14.2213 7.27087 15.2347 8.10203 16.0301C8.93318 16.8255 9.99214 17.3672 11.145 17.5867C12.2978 17.8061 13.4928 17.6935 14.5788 17.263C15.6647 16.8326 16.5929 16.1036 17.2459 15.1683C17.899 14.233 18.2475 13.1333 18.2475 12.0085C18.2475 10.5 17.6214 9.0534 16.5068 7.98679C15.3923 6.92018 13.8806 6.32096 12.3044 6.32096Z"
                      fill="black" />
                  </svg>
                </span>
                <!-- <p class="mb-0">Instagram</p> -->
              </span>
              <span href="#" class="box">
                <span class="mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="37" height="32" viewBox="0 0 27 22" fill="none">
                    <path
                      d="M26.4333 3.28272C25.4779 3.69529 24.467 3.9671 23.4326 4.08956C24.5197 3.45695 25.3372 2.45193 25.7318 1.263C24.7041 1.86026 23.5815 2.27933 22.4122 2.50225C21.9198 1.98943 21.3277 1.58146 20.6717 1.30315C20.0157 1.02484 19.3097 0.882 18.5964 0.88331C15.7087 0.88331 13.3718 3.17198 13.3718 5.99327C13.3697 6.3857 13.415 6.77696 13.5066 7.1587C11.4359 7.06223 9.40822 6.53727 7.55336 5.61741C5.69851 4.69755 4.05728 3.40304 2.73468 1.81671C2.27068 2.59408 2.02529 3.48103 2.02416 4.38487C2.02416 6.15675 2.95436 7.72296 4.35895 8.64053C3.52677 8.62091 2.71164 8.40202 1.98277 8.00245V8.06573C1.98277 10.5442 3.78693 12.6062 6.17478 13.0755C5.72575 13.1945 5.26303 13.2547 4.79832 13.2548C4.46857 13.2554 4.13957 13.2236 3.81611 13.1599C4.47994 15.1901 6.41198 16.6667 8.7006 16.7089C6.84093 18.1332 4.55774 18.903 2.20988 18.8974C1.79313 18.8968 1.37677 18.8721 0.962891 18.8235C3.35137 20.3392 6.12779 21.141 8.96168 21.1333C18.5853 21.1333 23.8428 13.3444 23.8428 6.58917C23.8428 6.36768 23.837 6.1462 23.8263 5.92999C24.8468 5.20861 25.7296 4.31216 26.4333 3.28272Z"
                      fill="black" />
                  </svg>
                </span>
                <!-- <p class="mb-0">X</p> -->
              </span>
            </div>

          </div>
        </div>
      </form>


    </div>

  </div>
</template>

<script>

import ButtonCustom from '@/components/ButtonCustom.vue'


export default {
  name: 'LoginRegister',

  data() {
    return {
      isRegister: false,
      content: 'Login',
      option: 'Do you have account ? Register?',
      acc: {}
    }
  },

  components: {
    ButtonCustom
  },

  methods: {

    async register() {
      try {
        this.$swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        this.$router.push('/login')

      } catch (error) {
        console.error('Registration failed', error);
      }
    },

  },


}
</script>

<style lang="scss" scoped>
@import url('https://fonts.cdnfonts.com/css/lt-binary-neue');

a {
  color: black;
  list-style-type: none;
  text-align: none;
}

.login {
  padding: 2rem;
  font-family: 'LT Binary Neue Round', sans-serif;


  &-row {
    display: flex;
    justify-content: space-around;
    // align-items: center;
    height: 90vh;
  }

  &__content {
    position: relative;
    height: 100%;
    // background-color: red;
    width: 60%;
    padding: 0;
    display: flex;
    align-items: center;


    &--topic {
      background-color: white;
      border: 2px solid grey;
      position: absolute;
      width: 40%;
      height: 100%;
      left: 6rem;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      background-color: rgba($color: #fff, $alpha: 0.9);

      h1 {
        width: 100%;
        margin: 6rem 0 3rem 0;
      }

      p {
        margin-bottom: 2rem;
      }

    }

    &--img {
      height: 85%;
      width: 100%;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

    }


  }

  &-form {



    padding: 2rem;

    &__title {

      h2 {
        font-size: 4rem;
        font-family: 'LT Binary Neue Round', sans-serif;
      }

      span {
        font-size: 1rem;
        font-family: 'LT Binary Neue Round', sans-serif;
        font-weight: lighter;
      }

      margin-bottom: 2rem;
    }

    &__email {
      width: 90%;
      display: flex;
      justify-content: space-between;

    }

    &__ops {
      padding: 0.4rem;
      cursor: pointer;
      text-align: justify;

      &:hover {
        color: rgb(6, 160, 6);
      }
    }

    .input-user {
      padding-bottom: 0.8rem;

      input {

        width: 90%;
        padding: 1rem;
      }

      .re-password {
        margin-bottom: 1rem;
      }

      .email {
        width: 55%;

      }

      .phone {
        width: 40%;
      }

    }

  }

  &-contact {

    .icon-contact {
      display: flex;
      justify-content: center;

      span {
        padding: 0 1rem;

        cursor: pointer;
      }
    }
  }


}
</style>
