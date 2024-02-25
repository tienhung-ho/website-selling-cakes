<template>
  <div class="container-fluid header">
    <div class="row header-row">
      <div class="header__contacts header-item col-3">
        <button class="btn">Call - 981 782 129</button>
      </div>

      <div class="header__logo header-item col-6">
        <img src="../../../assets/client/images/Logo.svg" alt="">
      </div>

      <div class="header__ops col-3 header-item">

        <div class="header__ops--cart">
          <router-link :to="{ name: 'Cart' }">

            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 28 28" fill="none">
              <path
                d="M25.2355 19.1926H8.95234L9.76991 17.5273L23.3543 17.5027C23.8137 17.5027 24.2074 17.1746 24.2894 16.7207L26.1707 6.19062C26.2199 5.91445 26.1461 5.63008 25.9656 5.41406C25.8764 5.30775 25.7652 5.22211 25.6396 5.16309C25.514 5.10407 25.377 5.07308 25.2383 5.07227L7.95702 5.01484L7.80937 4.32031C7.7164 3.87734 7.31718 3.55469 6.86328 3.55469H2.63867C2.38267 3.55469 2.13716 3.65638 1.95614 3.8374C1.77513 4.01841 1.67343 4.26393 1.67343 4.51992C1.67343 4.77592 1.77513 5.02143 1.95614 5.20245C2.13716 5.38346 2.38267 5.48516 2.63867 5.48516H6.08124L6.72656 8.55312L8.31523 16.2449L6.26992 19.5836C6.1637 19.727 6.09972 19.8972 6.08523 20.075C6.07073 20.2528 6.10629 20.4312 6.18788 20.5898C6.35195 20.9152 6.68281 21.1203 7.04921 21.1203H8.7664C8.40032 21.6065 8.20258 22.1988 8.20312 22.8074C8.20312 24.3551 9.46093 25.6129 11.0086 25.6129C12.5562 25.6129 13.8141 24.3551 13.8141 22.8074C13.8141 22.1977 13.6117 21.6043 13.2508 21.1203H17.6559C17.2898 21.6065 17.092 22.1988 17.0926 22.8074C17.0926 24.3551 18.3504 25.6129 19.898 25.6129C21.4457 25.6129 22.7035 24.3551 22.7035 22.8074C22.7035 22.1977 22.5012 21.6043 22.1402 21.1203H25.2383C25.7687 21.1203 26.2035 20.6883 26.2035 20.1551C26.2019 19.8994 26.0993 19.6546 25.9179 19.4743C25.7366 19.294 25.4913 19.1927 25.2355 19.1926ZM8.35898 6.91797L24.1035 6.96992L22.5613 15.6051L10.1937 15.627L8.35898 6.91797ZM11.0086 23.6715C10.5328 23.6715 10.1445 23.2832 10.1445 22.8074C10.1445 22.3316 10.5328 21.9434 11.0086 21.9434C11.4844 21.9434 11.8726 22.3316 11.8726 22.8074C11.8726 23.0366 11.7816 23.2564 11.6196 23.4184C11.4575 23.5805 11.2378 23.6715 11.0086 23.6715ZM19.898 23.6715C19.4223 23.6715 19.034 23.2832 19.034 22.8074C19.034 22.3316 19.4223 21.9434 19.898 21.9434C20.3738 21.9434 20.7621 22.3316 20.7621 22.8074C20.7621 23.0366 20.6711 23.2564 20.509 23.4184C20.347 23.5805 20.1272 23.6715 19.898 23.6715Z"
                fill="white" />
            </svg>
          </router-link>
        </div>

        <div class="header__ops--user" v-if="user">
          <span>
            <font-awesome-icon :icon="['far', 'user']" style="color: #f7f7f7;" />
          </span>
          <span>
            {{ user.username }}
          </span>
          <span class="logout" v-if="user" @click="logout">
            Logout
          </span>
        </div>
        <div class="header__ops--login" v-else>
          <router-link :to="{ name: 'Login' }" class="btn">
            Login/Register
            {{ user }}
          </router-link>
        </div>


      </div>

    </div>

    <div class="nav row">

      <div class="nav__logo col-2">
        <div class="nav__logo--img">
          <img src="../../../assets/client/images/Meubel.png" alt="">
        </div>

        <div class="nav__logo--title">
          <p>THE TASTEAT</p>
        </div>
      </div>

      <div class="nav__ops col-6">
        <ul>
          <li>
            <router-link :to="{ name: 'Home' }">
              Home
            </router-link>

          </li>
          <li>
            <router-link :to="{ name: 'Shop' }">
              Shop
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'About' }">About</router-link>
          </li>

          <li>
            <router-link :to="{ name: 'Contact' }">Contact</router-link>
          </li>
        </ul>
      </div>

      <div class="nav__social col-4">
        <ul>
          <li>
            <font-awesome-icon :icon="['far', 'user']" style="color: #f7f7f7;" />
          </li>
          <li>
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </li>
          <li>
            <font-awesome-icon :icon="['far', 'heart']" />
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>

import usersServices from '@/services/user/users.services';

export default {
  name: 'Header',
  data() {

    return {
      isUser: false
    }
  },
  methods: {
    async logout() {
      try {
        // Reload the current page
        location.reload();

        return await usersServices.logout()

      }
      catch (err) {
        console.log(err);
      }
    }

  },

  computed: {
    user() {
      // Lấy dữ liệu user từ store
      return this.$store.getters.getUser;
    },
  }
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.cdnfonts.com/css/mignone');
@import url('https://fonts.cdnfonts.com/css/double-pivot');
@import '../../../assets//client//css/variables.scss';

a {
  text-decoration: none;
  color: white;
}

p {
  margin: 0;
  padding: 0;
}

.header {
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
    button {

      &:hover {
        background-color: white;
        color: black;
      }

      display: flex;
      padding: 1.2rem 2rem;
      justify-content: center;
      align-items: center;
      color: white;
      border: 2px solid $logo-color;
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

      button,
      a {

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

    &--user {
      text-decoration: underline;
      color: white;

      span {
        color: white;
        margin: 0 0.2rem;
      }

    }
  }

  .nav {
    position: sticky;
    top: 3rem;
    background-color: $header-color;
    border: 1px solid white;

    &__logo {
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      background-size: cover;
      font-family: 'Mignone', sans-serif;
      font-size: 1.5rem;
      padding: 0.5rem;
      cursor: pointer;

      img {
        height: 100%;
        padding: .5rem;
      }
    }

    &__ops {
      display: flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      color: white;
      // cursor: pointer;

      ul {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: row;
        width: 100%;
        color: white;

        li {

          &:hover {
            border-bottom: 1px solid white;
            cursor: pointer;
          }

        }
      }

    }

    &__social {
      display: flex;
      justify-content: center;
      align-items: center;

      ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 40%;

        li {
          // padding: 2rem;
          display: block;
          color: white;
          cursor: pointer;
        }
      }
    }
  }

  .logout {
    cursor: pointer;
  }

}
</style>
