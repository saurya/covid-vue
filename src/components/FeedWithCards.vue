<template>
<div class="mx-auto" id="memorial-container">
<div v-for="(memorial, i) in memorials" :key="i" class="card mx-auto" style="width: 18rem;">
  <div class="img-square-wrapper">
    <img class="card-img-top" :src="memorial.photo_path" alt="Card image cap" v-if="memorial.photo_path">
  </div>
  <div class="card-body">
    <h5 class="card-title">{{ memorial.name }}</h5>
    <p class="card-text" v-if="memorial.age">{{ memorial.age }}</p>
    <p class="card-text" v-if="memorial.birth_date">{{ memorial.birth_date | moment('DD/MM/YYYY') }}</p>
    <p class="card-text" v-if="memorial.death_date">{{ memorial.death_date | moment('DD/MM/YYYY') }}</p>
    <p class="card-text" v-if="memorial.district">{{ memorial.district }}</p>
    <p class="card-text" v-if="memorial.province">{{ memorial.province }}</p>
    <p class="card-text" v-if="memorial.death_message">{{ memorial.death_message }}</p>
  </div>


</div>
<b-pagination class="justify-content-center"
        v-model="currentPage"
        :total-rows="totalMemorials"
        :per-page="perPage"
        @change="handlePageChange"></b-pagination>
</div>
</template>

<script>
import axios from 'axios';

const FETCH_MEMORIAL_API_PATH = '/json';

export default {
  name: 'FeedWithCards',
  data() {
    return {
      memorials: [],
      pagination_token: '',
      perPage: 10,
      currentPage: 1,
      totalMemorials: 15
    };
  },
  methods: {
    getMemorials(page) {
      var page_path = FETCH_MEMORIAL_API_PATH;
      if (page >= 1) {
        page_path = page_path + "/" + page
      }
      axios.get(page_path)
        .then((res) => {
          this.memorials = res.data['landing_list']
          this.pagination_token = res.data['pagination']
          this.totalMemorials = this.pagination_token['total']
          this.perPage = this.pagination_token['per_page']
          this.currentPage = this.pagination_token['page']
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    handlePageChange(value) {
      this.getMemorials(value)
    }
  },
  created() {
    this.getMemorials(0);
    this.$root.$on('addMemorialMessage', (memorial) => {
      this.memorials.unshift(memorial)
      document.getElementById('memorial-container').scrollIntoView({ behavior: 'smooth' })
    });
  },
};
</script>
