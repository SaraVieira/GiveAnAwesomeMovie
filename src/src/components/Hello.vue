<template>
  <div v-if="loaded" class="column is-12">
    <section class="is-12 column backdrop-wrapper">
      <img class="backdrop" v-bind:src="'https://image.tmdb.org/t/p/w1000/' + movie.backdrop_path"/>
    </section>

    <div class="column is-2 is-offset-1 poster">
            <img v-bind:src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path">
         <h1 class="title">{{ movie.original_title }}</h1>
    </div>
  </div>
  <Loading v-else></Loading>
</template>

<script>
import Loading from './loading'

/* global fetch */
export default {
  name: 'hello',
  components: {
    Loading
  },
  mounted: function () {
    this.getMovies()
  },
  methods: {
    getMovies: function () {
      var self = this
      fetch('http://localhost:8081/api/movie/random')
      .then((resp) => resp.json()) // Transform the data into json
      .then((data) => {
        self.movie = data
        this.loaded = true
      })
    }
  },
  data () {
    return {
      movie: {},
      loaded: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

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

.poster {
  position: absolute;
  transform: translateY(-50%);
  left: 0;

  img {
    border: 5px solid #eaeaea;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  }
}

</style>
