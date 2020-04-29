<template>
  <div v-if="textMessage"  v-click-outside="onClose"  class="message popup">
    <p :class="className" class="message__text">{{textMessage}}</p>
    <div v-show="textMessage !== 'Logout successfully!' " class="button__wrapper">
      <Button @click="onClose"/>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';
export default {
  data() {
    return {}
  },
  components: {
    Button
  },
  computed: {
    textMessage() {      
      return this.$store.getters['message/codeMessage'];
    },
    className() {
      return {
        'success': this.$store.getters['message/codeMessage'] === 'Logout successfully!'
      }
    }
  },
  methods: {
    onClose() {
      this.$store.commit('message/CLOSE_MESSAGE');
    }
  }
}
</script>

<style>
.message {
  width: 500px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -300px;
  margin-top: -220px;
  content: "";
  text-align: center;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  background-color: #fff;
  display: block;
}

.message__text {
  font-size: 24px;
  margin: 0;
  padding: 10px;
  margin-bottom: 10px;
}

.button__wrapper {
  margin: 0 auto;
  width: 140px;
}

.success {
  color: #43853d;
}
</style>
