<template>
  <div id="admin" class="columns">
    <table class="table">
      <thead>
        <tr>
          <th><abbr title="IMDB ID">IMDB ID</abbr></th>
          <th><abbr title="Name">Name</abbr></th>
          <th>Delete</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th><abbr title="IMDB ID">IMDB ID</abbr></th>
          <th><abbr title="Name">Name</abbr></th>
          <th>Delete</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="movie in movies">
          <th>{{movie.imdbID}}</th>
          <td>{{movie.name}}</td>
          <th><a v-on:click="deleteMovie(movie._id)" class="delete"></a></th>
        </tr>
        <tr>
            <th colspan="3">
              <form v-on:submit="addMovie()">
                <p class="control">
                  <input class="input" v-model="id" type="text" placeholder="IMDB ID" required>
                </p>
                <p class="control">
                  <input class="input" v-model="name" type="text" placeholder="Name" required>
                </p>
                <button class="button is-primary">Add Movie</button>
              </form>
            </th>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* global fetch */
export default {
  name: 'Admin',
  components: {},
  mounted: function () {
    this.getMovies()
  },
  methods: {
    getMovies: function () {
      var self = this
      fetch('http://localhost:8081/api/movie')
      .then((resp) => resp.json()) // Transform the data into json
      .then((data) => {
        self.movies = data
        this.loaded = true
      })
    },

    deleteMovie: function (id) {
      fetch(`http://localhost:8081/api/movie/${id}`, {method: 'DELETE'})
      .then((resp) => resp.json()) // Transform the data into json
      .then((data) => {
        this.getMovies()
      })
    },

    addMovie: function () {
      var self = this
      fetch(`http://localhost:8081/api/movie`, {
        method: 'POST',
        body: JSON.stringify({
          name: self.name,
          imdbID: self.id
        })
      })
      .then((resp) => resp.json()) // Transform the data into json
      .then((data) => {
        this.getMovies()
        self.id = ''
        self.name = ''
      })
    }
  },
  data () {
    return {
      movies: [],
      loaded: false,
      name: '',
      id: ''
    }
  }
}
</script>

<style lang="scss">
@import "../node_modules/bulma/bulma.sass";

#admin {
  display: flex;
  align-items: center;
  justify-content: center;
  .table {
    margin: 40px 0;
    width: 50%;
  }

  form {
    width: 100%;
    display: flex;
    justify-content: space-around;

    p {
      flex: 1;
      padding-right: 20px;
    }
  }
}

</style>
