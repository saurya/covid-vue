<template>
<div>
<div v-for="memorial in memorials" :key="memorial" class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">{{ memorial.first_name }}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios';
const FETCH_MEMORIAL_API_PATH = '';

export default {
  name: 'FeedWithCards',
  data() {
    return {
      memorials: [],
    };
  },
  methods: {
    getMemorials() {
      axios.get(FETCH_MEMORIAL_API_PATH)
        .then((res) => {
          this.msg = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
  created() {
    this.getMemorials();
  },
};
</script>
