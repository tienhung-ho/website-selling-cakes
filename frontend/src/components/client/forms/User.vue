<template>
  <div class="login container-fluid">
    {{  }}

  </div>
</template>

<script>
import userServices from '../../../services/user/users.services'


export default {
  name: 'LoginRegister',

  data() {
    return {
    }
  },

  methods: {
    async getAccount () {

    try {

      const response = await userServices.user()
      console.log(response);
      this.$store.dispatch('updateMyObject', response);
    }
    catch (err) {
      console.log(err);
    }
   }

  },
  mounted () {
    this.getAccount()
    this.$router.push('/home')
  }


}
</script>

<style lang="scss" scoped>

@import url('https://fonts.cdnfonts.com/css/lt-binary-neue');

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
