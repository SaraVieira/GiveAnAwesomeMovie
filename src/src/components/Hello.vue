<template>
  <div v-if="loaded" class="wrapper">
    <div class="column is-12 main m-t-0">
      <backdrop v-bind:backdrop="movie.backdrop_path"></backdrop>
      <poster v-bind:poster="movie.poster_path" v-bind:rating="movie.vote_average"></poster>
      <h1 class="title is-6 column is-offset-1">{{ movie.original_title }}</h1>
    </div>
    <movie-details v-bind:movie="movie"></movie-details>
  </div>
  <Loading v-else></Loading>
</template>

<script>
import Loading from './loading'
import movieDetails from './movie-details'
import backdrop from './backdrop'
import poster from './poster'

/* global fetch */
export default {
  name: 'hello',
  components: {
    Loading,
    movieDetails,
    backdrop,
    poster
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
        self.loaded = true
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
@import "../less/_utils.less";

.wrapper {
  width: 100%;

  .main {
    height: 500px;
    margin-top: 0;
  }

  h1 {
    font-weight: 800;
    font-size: 36px;
    color: #FBFEF9;
    text-align: left;
    margin-top: -250px;
    z-index: 2;
    position: relative;
  }
}
</style>
