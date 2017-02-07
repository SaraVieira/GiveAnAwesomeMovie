<template>
  <div class="column is-8 is-offset-3 movie-details">
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
    <h2>{{movie.title}}</h2>
    <h3>{{movie.tagline}}</h3>
    <b>Overview: </b>
    <p>{{movie.overview}}</p>
  </div>
</template>


<script>
export default {
  name: 'movieDetails',
  components: {},
  props: ['movie'],
  data () {
    return {

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
</style>
