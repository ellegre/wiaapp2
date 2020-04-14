<template>
  <header class="header">
      <div class="header-container">        
        <h1 class="header__title">Tracking systems</h1>
        <img class="header__logo" src="../assets/track.png" width="40" height="40" alt="logo">
        <div class="logout">
          <span class="logout__span" id="username">{{  username || `` }}</span>        
          <button class="logout__btn">exit</button>  
        </div>        
      </div>
      
    </header>
</template>

<script>

export default {

  computed: {
     username() {
      return this.$store.getters['user/userName'];
    }
  }
};
</script>

<style scoped lang="less">

.header {
  background-color: #333;
  text-align: center; 
  padding: 10px 30px;
}

.header__logo {
  margin-left: 10px;
}

.logout {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
} 

.header__title {
  display: inline-block;
  color: #fff;
}

.logout__span {
  display: inline-block;
  color: #fff;
}

.logout__btn {
  margin: 0;
  margin-left: 20px;
  padding: 0 10px;
  display: inline-block;
  background-color: #333;
  border: none;
  font: inherit;
  color: #fff;
  &:hover,
  &:focus {
    background-color: #43853d;
  }
}


</style>