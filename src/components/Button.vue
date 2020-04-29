<template>
  <div>
    <button 
    @click="click"
    type="button"
    class="button"
    >{{title}}
    </button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      title: {
        type: String,
        default: 'Close'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      click() {
       this.$emit( 'click')
      }
    },
    computed: {
      className() {
        return {
          button__disabled: this.disabled
        }
      }
    }
  }
	
</script>
<style>

.button {
  padding: 10px;
  margin-top: 90px;
  width: 100%;
  box-sizing: border-box;
  font-size: 18px;
  cursor: pointer;
  border-radius: 22px;
  background-color: #E3F6CE;
}

.button:hover,
.button:focus {
  background-color: #D0F5A9;
}

.button:active {
  background-color: #BEF781;
  outline: none;
}

.button__disabled {
  opacity: 0.5;
}
</style>
