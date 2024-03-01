<template>
  <div class="buttons"
  
  >
    <button class="pulse" 
      :style="{ 
        borderColor: this.borderColor, 
        color: this.color, 
        width: this.width, 
        height: this.height, 
        borderRadius: this.borderRadius,
        backgroundColor: this.backgroundColor
        
      }"
        
        :type="this.type"
      >

      {{ content }}
    </button>
  </div>
</template>


<script>

// import 'bootstrap/dist/css/bootstrap.css';
// import 'popper.js';
// import 'bootstrap/dist/js/bootstrap';

export default {
  name: 'ButtonCustom',

  data () {

    return {

    }

  },

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
    },
    borderRadius: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    
    
  },
  methods: {
    
  }
}

</script>

<style lang="scss" scoped>

@import '@/assets/client/css/variables.scss';

button {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  pulse: green,
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
    border-color: green !important;
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
  color: greenyellow;
  font: inherit;
}
</style>
