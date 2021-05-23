<template>
<div>
<b-card-group columns id="memorial-container">
<b-card v-for="(memorial, i) in memorials" :key="i" v-bind:class="{ 'alert-primary': memorial.is_highlighted, 'alert-danger': memorial.is_not_found, 'alert-warning': memorial.is_under_review }" 
  :img-src="memorial.photo_path"
  img-top
  :title="memorial.name"
  :href="memorial.permalink"
>
    <b-card-text>
    <p class="card-text" v-if="memorial.age">{{ memorial.age }}</p>
    <p class="card-text" v-if="memorial.birth_date">{{ memorial.birth_date | moment('DD/MM/YYYY') }}</p>
    <p class="card-text" v-if="memorial.death_date">{{ memorial.death_date | moment('DD/MM/YYYY') }}</p>
    <p class="card-text" v-if="memorial.district">{{ memorial.district }}</p>
    <p class="card-text" v-if="memorial.province">{{ memorial.province }}</p>
    <p class="card-text" v-if="memorial.death_message">{{ memorial.death_message }}</p>
    </b-card-text>
</b-card>
</b-card-group>

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
      page_path = page_path + "?locale=" + this.$i18n.locale
      const urlParams = new URLSearchParams(window.location.search);
      const memorial_id = urlParams.get('show_memorial');
      if (memorial_id) {
        page_path = page_path + "&memorial_id=" + memorial_id 
      }
      axios.get(page_path)
        .then((res) => {
          this.memorials = res.data['landing_list']
          this.pagination_token = res.data['pagination']
          this.totalMemorials = this.pagination_token['total']
          this.perPage = this.pagination_token['per_page']
          this.currentPage = this.pagination_token['page']
          if (res.data['memorial'] && res.data['memorial']['status']) {
            this.prependAndHighlightMemorial(res.data['memorial'].memorial_data, res.data['memorial'].status)
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    handlePageChange(value) {
      this.getMemorials(value)
      this.scrollToTopOfMemorialContainer()
    },
    scrollToTopOfMemorialContainer() {
      document.getElementById('memorial-container').scrollIntoView({ behavior: 'smooth' })
    },
    prependAndHighlightMemorial(memorial, memorial_status) {
      if (memorial_status == 200) {
        memorial.is_highlighted = true
      } else if (memorial_status == 404) {
        memorial.is_not_found = true
        memorial.name = this.$t('feed.memorialNotFound')
      } else if (memorial_status == 201) {
        memorial.is_under_review = true
        memorial.name = this.$t('feed.memorialUnderReview')
      }
      this.memorials.unshift(memorial)
      this.scrollToTopOfMemorialContainer()
    },

  },
  created() {
    this.getMemorials(0);
  },
};
</script>
<style>
@media (max-width: 1200px) {
.card-columns {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
}
}
@media (max-width: 800px) {
.card-columns {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
}
}
@media (max-width: 500px) {
.card-columns {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
    -webkit-column-gap: 1.25rem;
    -moz-column-gap: 1.25rem;
    grid-column-gap: 1.25rem;
    column-gap: 1.25rem;
    orphans: 1;
    widows: 1;
}
}

.card-img-top {
   flex-shrink: 0;
   width: 100%;
   max-width: 200px;
   max-height: 200px;
}
.card {
   display:inline-block !important;
   width: 250px;
   margin-bottom: 0.6em;
}
</style>
