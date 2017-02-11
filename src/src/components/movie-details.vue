<template>
  <div class="column is-8 is-offset-3 movie-details">
    <h2 class="h2">{{movie.title}}</h2>
    <h3 class="h3">{{movie.tagline}}</h3>
    <b>Genres: </b>
    <ul>
      <li v-for="genre in movie.genres">{{genre.name}}</li>
    </ul>
    <div>
      <b>Runtime: </b> {{movie.runtime}} m
    </div>
    <div>
      <b>Release Date: </b> {{movie.release_date}}
    </diV>
    <div>
      <b>Produced by: </b>
      <ul>
        <li v-for="company in movie.production_companies">{{company.name}}</li>
      </ul>
    </diV>
    <b>Overview: </b>
    <p>{{movie.overview}}</p>

    <h2 class="h2 trailer">Trailer</h2>
    <ul>
      <li v-for="trailer in movie.trailer">
        <div class="overlay" v-if="moviePLaying"></diV>
        <youtube :video-id="trailer.key" @playing="playing" @paused="pause" @ended="stop"></youtube>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: 'movieDetails',
  components: {},
  props: ['movie'],
  data () {
    return {
      moviePLaying: false
    }
  },
  methods: {
    playing () {
      this.moviePLaying = true
    },
    stop () {
      this.moviePLaying = false
    },
    pause () {
      this.moviePLaying = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../less/_utils.less";

.movie-details {
  margin-top: 60px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.7);
  width: 100%;
  height: 100%;
  z-index: 10;
  transition: all 500ms ease;

  & + * {
    z-index: 11;
    position: relative;
  }
}

b {
  float: left;
  padding-right: 5px;
}

ul {
  li {
    display: inline-block;

    &:not(:last-child):after {
      content: ',';
      padding-right: 3px;
    }
  }
}

.trailer {
  margin: 10px 0;
}
</style>
