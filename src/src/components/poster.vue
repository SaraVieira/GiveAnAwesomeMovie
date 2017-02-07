<template>
  <div class="column is-2 is-offset-1 poster">
    <img v-bind:src="'https://image.tmdb.org/t/p/w300/' + poster">
    <star-rating v-bind:increment="0.5"
             v-bind:max-rating="5"
             v-bind:rating="rating / 2"
             read-only="true"
             inactive-color="#000004"
             active-color="#0C6291"
             :star-size="25"
             class="justify-center"
             text-class="rating">
   </star-rating>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
  name: 'poster',
  components: {
    StarRating
  },
  props: ['poster', 'rating']
}
</script>


<style scoped lang="less">
@import "../less/_utils.less";

.poster {
  position: absolute;
  transform: translateY(-50%);
  left: 0;

  img {
    border: 5px solid #FBFEF9;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  }
}

</style>
