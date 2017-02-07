<template>
  <header>
    <section class="is-12 column backdrop-wrapper p-a-0">
      <img class="backdrop" v-bind:src="'https://image.tmdb.org/t/p/w1000/' + backdrop"/>
    </section>
    <div class="divider"></div>
  </header>
</template>

<script>
export default {
  name: 'backdrop',
  props: ['backdrop']
}
</script>


<style scoped lang="less">
@import "../less/_utils.less";

header {
  .backdrop-wrapper {
    height: 500px;
    overflow: hidden;

    img {
      width: 100%;
      display: block;
      filter: blur(1px) grayscale(50%);
      transition: all 200ms ease;

      &:hover {
          filter: blur(0) grayscale(0);
      }
    }
  }

  .divider {
    height: 60px;
    background: #A63446;
    width: 100%;
    transform: translateY(-50%);
  }
}

</style>
