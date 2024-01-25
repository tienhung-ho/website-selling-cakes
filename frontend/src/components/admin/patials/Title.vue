<template>
  <div class="title container-fluid">
    <div class="title__header row">
      <div class="title__header--logo col-3">
        THE TASTEAT
      </div>
      <div class="title__header--ops col-9">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            style="fill: rgba(225, 225, 225, 1);transform: ;msFilter:;">
            <path
              d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z">
            </path>
            <path
              d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z">
            </path>
          </svg>
        </span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            style="fill: rgba(225, 225, 225, 1);transform: ;msFilter:;">
            <path
              d="M5 6a.4.4 0 0 0-.38.62l2 3.38-3.06 5.4a.45.45 0 0 0 0 .45.43.43 0 0 0 .38.19h2.87a.89.89 0 0 0 .79-.55s3-5.31 3.11-5.51l-2-3.46A.91.91 0 0 0 7.92 6zM17.16 2a.84.84 0 0 0-.77.55L10 13.93l4.09 7.52a.91.91 0 0 0 .81.55h2.88a.43.43 0 0 0 .38-.18.45.45 0 0 0 0-.45l-4.07-7.43 6.36-11.31a.45.45 0 0 0 0-.45.44.44 0 0 0-.38-.18z">
            </path>
          </svg>
        </span>
        <div class="header__img">
          <img src="https://images.pexels.com/photos/5273717/pexels-photo-5273717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
        </div>
      </div>

    </div>
    <div class="title__content row">
      <h1>
        {{ title }}
      </h1>

      <p>
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Title',

  components: {

  },

  props: {
    title: {
      type: String,
      // default: 'Admin'
    },

    content: {
      type: String,
      default: 'We believe that the foundation of a great cake lies in the quality of its ingredients. That\'s why we use only the finest, freshest components to ensure each bite is a delightful experience.'
    },
  }

}

</script>

<style lang="scss" scoped>
@import '@/assets/admin/scss/variables.scss';
@import url('https://fonts.cdnfonts.com/css/lt-binary-neue');

.title {
  width: 100%;
  height: 17rem;
  background-color: rgba($color: $sidebar-color, $alpha: .92);
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  padding-top: 0;
  font-family: 'LT Binary Neue', sans-serif;

  &__content {
    color: white;
    padding: 1rem;

    h1 {
      font-size: 3rem;
      padding: 0rem;
    }

    p {
      font-size: 1rem;
      padding: 0.5rem 6rem;
    }


  }

  &__header {
    background-color: rgba($color: $sidebar-color, $alpha: .98);
    color: white;
    align-items: center;
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
    height: 25%;

    &--ops {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      span {
        margin-right: 1.8rem;
      }
      .header__img {
        margin-right: 1rem;
        border-radius: 100%;
        width: 3rem;
        height: 3rem;
        background-color: white;

        img {
          object-fit: cover;
          aspect-ratio: 16/9;
          background-size: cover;
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
      }
    }

  }


}
</style>
