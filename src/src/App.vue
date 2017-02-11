<template>
  <div id="app" class="columns">
    <nav>
      <img src="./assets/logo.svg" />
      <a href="https://github.com/SaraVieira/HaveAnAwesomeMovie" target="_blank">Github</a>
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
  width: 100%;
  height: 70px;
  background: #FBFEF9;
  position: fixed;
  z-index: 99;
  display: flex;
  align-items: center;
  top: 0px;
  left: 0px;
  padding: 0 10px;
  justify-content: space-between;

  img {
    max-height: 60px;
  }
}
</style>
