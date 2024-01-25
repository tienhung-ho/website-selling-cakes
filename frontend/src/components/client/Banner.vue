<template>
  <div class="container-fluid">

    <div class="banner row">
      <div class="banner__content col-5">
        <h1 class="banner__content--title">
          Welcome to <br> <span :style="{fontSize: '4rem'}">THE TASTEAT</span>
        </h1>
        <p>Simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy.
        </p>
      </div>
      <div class="banner__background col-7">
        <div class="banner__background--layout">
          <img src="../../assets/client/images/Banner.png" loading="lazy" alt="">
        </div>
      </div>


    </div>
  </div>
</template>

<script>

export default {
  name: 'Banner'
}

</script>

<style lang="scss" scoped>

@import '../../assets//client//css/variables.scss';
@import url('https://fonts.cdnfonts.com/css/natural-precision');
@import url('https://fonts.cdnfonts.com/css/barthez');

.banner {
  // width: 100%;
  position: relative;
  background-color: $header-color;
  height: 80vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__content {
    color: white;
    padding: 4rem;
    h1 {
      font-size: 3rem;
      font-family: 'Natural Precision', sans-serif;
    }

    p {
      font-family: 'Barthez', sans-serif;
      font-size: 1.5rem;
    }
  }

  &__background {
    display: flex;
    align-items: center;
    vertical-align: middle;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 6rem;

    &--layout {
      width: 15rem;
      height: 20rem;
      
      
      img {
        border: 0.5rem solid #c4c4c4;
        border-bottom: none;
        width: 24rem;
        
        border-radius: 626px 626px 0px 0px;
        background: #C4C4C4;
        box-shadow: 0px 43px 35px 0px rgba(241, 235, 235, 0.31);

      }




    }
  }

}
</style>
