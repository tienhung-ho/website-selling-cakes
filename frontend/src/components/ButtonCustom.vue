<template>
  <div class="buttons">
    <button class="pulse" 
      :style="{ 
        borderColor: this.borderColor, 
        color: this.color, 
        width: this.width, 
        height: this.height 
        }"
        :type="this.type"
      >

      {{ content }}
    </button>
  </div>
</template>

<script>

export default {
  name: 'ButtonCustom',

  props: {
    content: {
      type: String,
      default: "button"
    },

    width: {
      type: String,
      default: '100%'
    },

    height: {
      type: String,
      default: '100%'
    },

    borderColor: {
      type: String,
      default: 'white'
    },

    color: {
      type: String,
      default: 'green'

    },
    type: {
      type: String,
      default: 'text'
    }

  }
}

</script>

<style lang="scss" scoped>

@import '@/assets/client/css/variables.scss';

button {
  margin: 0;
}

// Animate the size, outside
.pulse:hover,
.pulse:focus {
  animation: pulse 1s;
  box-shadow: 0 0 0 2em transparent;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 var(--hover);
  }
}

$colors: (
  pulse: #6c0478,
);


@each $button, $color in $colors {
  .#{$button} {
    --color: #{$color} !important;
    --hover: #{adjust-hue($color, 45deg)} !important;
  }
}


button {
  color: var(--color);
  transition: 0.25s;
  display: flex;
  align-items: center;
  text-align: center;
  vertical-align: middle;

  &:hover,
  &:focus {
    border-color: #6c0478 !important;
    color: black;
  }
}

button {
  background: none;
  border: 2px solid;
  font: inherit;
  line-height: 1;
  // margin: 0.5em;
  padding: 1em 2em;
  display: flex;
  align-items: center;
  text-align: center;
  vertical-align: middle;
}

h1 {
  font-weight: 400;
}

code {
  color: #6c0478;
  font: inherit;
}
</style>
