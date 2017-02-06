<template>
  <div v-if="loaded" class="wrapper">
  <div class="column is-12 main m-t-0">
    <section class="is-12 column backdrop-wrapper p-a-0">
      <img class="backdrop" v-bind:src="'https://image.tmdb.org/t/p/w1000/' + movie.backdrop_path"/>
    </section>
    <div class="divider"></diV>

    <div class="column is-2 is-offset-1 poster">
      <img v-bind:src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path">
      <star-rating v-bind:increment="0.5"
               v-bind:max-rating="5"
               v-bind:rating="movie.vote_average / 2"
               read-only="true"
               inactive-color="#000004"
               active-color="#0C6291"
               :star-size="25"
               class="justify-center"
               text-class="rating">
     </star-rating>
    </div>
    <div class="column is-6 is-offset-1 details">
      <h1 class="title">{{ movie.original_title }}</h1>
  </div>
  </div>
  <movie-details v-bind:movie="movie"></movie-details>
  </div>
  <Loading v-else></Loading>
</template>

<script>
import Loading from './loading'
import StarRating from 'vue-star-rating'
import movieDetails from './movie-details'

/* global fetch */
export default {
  name: 'hello',
  components: {
    Loading,
    StarRating,
    movieDetails
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

.details {
  margin-top: -250px;
  z-index: 2;
  position: relative;

  h1 {
    font-weight: 800;
    font-size: 36px;
    color: #FBFEF9;
    text-align: left;
  }
}

.rating {
  color: #FBFEF9;
}

.poster {
  position: absolute;
  transform: translateY(-50%);
  left: 0;

  img {
    border: 5px solid #FBFEF9;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  }
}

.divider {
  height: 60px;
  background: #A63446;
  width: 100%;
  transform: translateY(-50%);
}


.wrapper {
  width: 100%;

  .main {
    height: 500px;
    margin-top: 0;
  }
  .p-a-0 {
    padding: 0;
  }

  .justify-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
