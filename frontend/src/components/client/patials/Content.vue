<template>
  <div class="title row">
    <h1 class=""> {{ content }} </h1>
  </div>
</template>

<script>

export default {
  name: 'Content',

  props: {
    content: {
      type: String,
      default: 'Content'
    }
  }
}

</script>

<style lang="scss" scoped>

@import '../../../assets/client/css/variables.scss';

@import url('https://fonts.cdnfonts.com/css/share-techmono-2');

.title {
  font-family: 'Share-TechMono', sans-serif;
  height: 30vh;
  display: flex;
  background-color: $header-color;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  h1 {
      font-family: 'Natural Precision', sans-serif;
                                                
      border-bottom: 2px solid $logo-color;
      color: white;
      width: 30%;
    }
}
</style>
