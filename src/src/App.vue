<template>
  <div id="app" class="columns">
    <nav>
      <img src="./assets/logo.svg" />
    </nav>
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style lang="scss">
@import "../node_modules/bulma/bulma.sass";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #FBFEF9;
}

nav {
  width: 100px;
  height: 140px;
  background: #FBFEF9;
  position: fixed;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 70%;
    max-width: 70%;
  }
}
</style>
