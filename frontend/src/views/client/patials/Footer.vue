<template>
  <div class="container-fluid footer">
    <div class="row footer-row">
      <div class="footer__contacts footer-item col-3">
        <a href="">Instagram Feed</a>
      </div>

      <div class="footer__logo footer-item col-6">
        <img src="../../../assets/client/images/Logo.svg" alt="">
      </div>

      <div class="footer__ops col-3 footer-item">

        <div class="footer__ops--login">
          <button class="btn">Login/Register</button>
        </div>

      </div>

    </div>

    <div class="author row">
      <div class="col-4 author__contact">

        <div class="author__contact--title">
          <span>Contact</span>
        </div>

        <div class="author__contact--content">
          5 Rue Dalou, 75015 Paris
          <br>
          Call - +33 156 78 89 56
          <br>
          hungb2113311@student.ctu.edu.vn
        </div>

      </div>

      <div class="col-4 author__email">
        <input class='author__email--input' type="email" name="email" id="email-contact" placeholder="Email">
        <button class="author__email--sub">Subscribe</button>
      </div>

      <div class="col-4 author__times">
        <div class="author__times--title">
          <span>Time Open</span>
        </div>

        <div class="author__times--open">
          Mon - Fri: 7.00am - 6.00pm
          <br>
          Sat: 7.00am - 6.00pm
          <br>
          Sun: 8.00am - 6.00pm
        </div>

      </div>

    </div>

    <div class="row under">
      © Copyright - Cakes | Designed by hungb2113311
    </div>

  </div>
</template>

<script>

export default {
  name: 'Footer'
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.cdnfonts.com/css/mignone');
@import url('https://fonts.cdnfonts.com/css/double-pivot');
@import '@/assets//client//css/variables.scss';

a {
  text-decoration: none;
}

p {
  margin: 0;
  padding: 0;
}

.footer {
  width: 100%;
  font-family: 'Double Pivot', sans-serif;

  &-row {
    background-color: $header-color;
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding: auto;

  }

  &-item {
    display: flex;
    justify-content: center;
  }

  &__contacts {
    a {

      &:hover {
        color: greenyellow;
      }

      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      border-bottom: 2px solid $logo-color;
    }

  }

  &__ops {
    justify-content: space-around;
    align-items: center;

    &--cart {

      font-size: 2rem;
      cursor: pointer;

    }

    &--login {
      height: 100%;

      button {

        &:hover {
          background-color: white;
          color: black;
        }

        display: flex;
        padding: 1rem 2rem;
        justify-content: center;
        align-items: center;
        // color: white;
        border: 2px solid $logo-color;
        background-color: $logo-color;
      }
    }
  }

  .author {
    background-color: $header-color;
    height: 26vh;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 4rem;

    &__contact {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;

      &--title {
        width: 100%;
        margin: 1rem 0;

        span {
          padding: 0.2rem;
          border-bottom: 2px solid $logo-color;
          border-top: 2px solid $logo-color;


        }
      }

      &--content {
        width: 100%;

      }

    }

    &__email {
      display: flex;
      justify-content: center;
      align-items: center;

      &--input {
        background-color: rgba(0, 0, 0, 0);
        outline: none;
        width: 20rem;
        padding: 0.7rem;
        border: 1px solid $email-input-color;
        color: white;
      }

      &--sub {
        padding: 0.7rem;
        width: 10rem;
        

        &:hover {
          background-color: aquamarine;
        }
      }
    }

    &__times {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      text-align: right;

      &--title {
        width: 100%;
        margin: 1rem 0;

        span {
          padding: 0.2rem;
          border-bottom: 2px solid $logo-color;
          border-top: 2px solid $logo-color;


        }
      }

      &--open {
        width: 100%;

      }
    }

  }

}

.under {
  width: 100%;
  background-color: $header-color;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}
</style>
