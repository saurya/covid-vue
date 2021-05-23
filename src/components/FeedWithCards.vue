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
 this.res = {
  "landing_list": [
    {
      "age": 0,
      "death_date": "Sat, 08 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Ranchi",
      "is_active": 1,
      "name": "Mritunjay Srivastava",
      "photo_path": "https://storage.googleapis.com/covid-india-grief/image_uploads/1621340468_53390.jpg",
      "province": "Jharkhand",
      "uq_str": "1621340468_53390"
    },
    {
      "age": 0,
      "death_date": "Sat, 01 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Ranchi",
      "is_active": 1,
      "name": "Khwaja Mujahidudin ",
      "photo_path": "",
      "province": "Jharkhand",
      "uq_str": "1621340385_31110"
    },
    {
      "age": 0,
      "death_date": "Sat, 01 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Ranchi",
      "is_active": 1,
      "name": "Sunil Kamal ",
      "photo_path": "",
      "province": "Jharkhand",
      "uq_str": "1621340365_19557"
    },
    {
      "age": 0,
      "death_date": "Sat, 01 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Ranchi",
      "is_active": 1,
      "name": "Pankaj Prasad ",
      "photo_path": "",
      "province": "Jharkhand",
      "uq_str": "1621340348_59226"
    },
    {
      "age": 53,
      "death_date": "Thu, 13 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Gulbarga",
      "is_active": 1,
      "name": "Jayatheerth Kagalkar ",
      "photo_path": "https://storage.googleapis.com/covid-india-grief/image_uploads/1621332893_83039.jpg",
      "province": "Karnataka",
      "uq_str": "1621332893_83039"
    },
    {
      "age": 58,
      "death_date": "Sat, 01 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Chennai",
      "is_active": 1,
      "name": "Prabhu ",
      "photo_path": "",
      "province": "Tamil Nadu",
      "uq_str": "1621332780_92765"
    },
    {
      "age": 0,
      "death_date": "Sat, 01 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Lucknow",
      "is_active": 1,
      "name": "Akhilesh Krishna Mohan ",
      "photo_path": "https://storage.googleapis.com/covid-india-grief/image_uploads/1621332746_18693.jpg",
      "province": "Uttar Pradesh",
      "uq_str": "1621332746_18693"
    },
    {
      "age": 65,
      "death_date": "Sat, 01 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Bangalore Urban",
      "is_active": 1,
      "name": "Mahadeva Prakash ",
      "photo_path": "https://storage.googleapis.com/covid-india-grief/image_uploads/1621332708_92310.jpg",
      "province": "Karnataka",
      "uq_str": "1621332708_92310"
    },
    {
      "age": 47,
      "death_date": "Sat, 15 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Erode",
      "is_active": 1,
      "name": "Chandrasekaran ",
      "photo_path": "https://storage.googleapis.com/covid-india-grief/image_uploads/1621332620_5610.jpg",
      "province": "Tamil Nadu",
      "uq_str": "1621332620_5610"
    },
    {
      "age": 58,
      "death_date": "Sat, 15 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Delhi",
      "is_active": 1,
      "name": "Sunil Jain",
      "photo_path": "https://storage.googleapis.com/covid-india-grief/image_uploads/1621332504_29947.jpg",
      "province": "Delhi",
      "uq_str": "1621332504_29947"
    }
  ],
  "memorial": {},
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 25
  },
  "uq_str": ""
};
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

 var res ={}; res['data'] = {
  "landing_list": [
    {
      "age": 0,
      "death_date": "Sat, 08 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Ranchi",
      "is_active": 1,
      "name": "Mritunjay Srivastava",
      "photo_path": "https://storage.googleapis.com/covid-india-grief/image_uploads/1621340468_53390.jpg",
      "province": "Jharkhand",
      "uq_str": "1621340468_53390"
    },
    {
      "age": 0,
      "death_date": "Sat, 01 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Ranchi",
      "is_active": 1,
      "name": "Khwaja Mujahidudin ",
      "photo_path": "",
      "province": "Jharkhand",
      "uq_str": "1621340385_31110"
    },
    {
      "age": 0,
      "death_date": "Sat, 01 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Ranchi",
      "is_active": 1,
      "name": "Sunil Kamal ",
      "photo_path": "",
      "province": "Jharkhand",
      "uq_str": "1621340365_19557"
    },
    {
      "age": 0,
      "death_date": "Sat, 01 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Ranchi",
      "is_active": 1,
      "name": "Pankaj Prasad ",
      "photo_path": "",
      "province": "Jharkhand",
      "uq_str": "1621340348_59226"
    },
    {
      "age": 53,
      "death_date": "Thu, 13 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Gulbarga",
      "is_active": 1,
      "name": "Jayatheerth Kagalkar ",
      "photo_path": "https://storage.googleapis.com/covid-india-grief/image_uploads/1621332893_83039.jpg",
      "province": "Karnataka",
      "uq_str": "1621332893_83039"
    },
    {
      "age": 58,
      "death_date": "Sat, 01 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Chennai",
      "is_active": 1,
      "name": "Prabhu ",
      "photo_path": "",
      "province": "Tamil Nadu",
      "uq_str": "1621332780_92765"
    },
    {
      "age": 0,
      "death_date": "Sat, 01 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Lucknow",
      "is_active": 1,
      "name": "Akhilesh Krishna Mohan ",
      "photo_path": "https://storage.googleapis.com/covid-india-grief/image_uploads/1621332746_18693.jpg",
      "province": "Uttar Pradesh",
      "uq_str": "1621332746_18693"
    },
    {
      "age": 65,
      "death_date": "Sat, 01 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Bangalore Urban",
      "is_active": 1,
      "name": "Mahadeva Prakash ",
      "photo_path": "https://storage.googleapis.com/covid-india-grief/image_uploads/1621332708_92310.jpg",
      "province": "Karnataka",
      "uq_str": "1621332708_92310"
    },
    {
      "age": 47,
      "death_date": "Sat, 15 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Erode",
      "is_active": 1,
      "name": "Chandrasekaran ",
      "photo_path": "https://storage.googleapis.com/covid-india-grief/image_uploads/1621332620_5610.jpg",
      "province": "Tamil Nadu",
      "uq_str": "1621332620_5610"
    },
    {
      "age": 58,
      "death_date": "Sat, 15 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Delhi",
      "is_active": 1,
      "name": "Sunil Jain",
      "photo_path": "https://storage.googleapis.com/covid-india-grief/image_uploads/1621332504_29947.jpg",
      "province": "Delhi",
      "uq_str": "1621332504_29947"
    }
  ],
  "memorial": { 
      memorial_data: {
      "age": 58,
      "death_date": "Sat, 15 May 2021 00:00:00 GMT",
      "death_message": "",
      "district": "Delhi",
      "is_active": 1,
      "name": "Sunil Jain",
      "photo_path": "https://storage.googleapis.com/covid-india-grief/image_uploads/1621332504_29947.jpg",
      "province": "Delhi",
      "uq_str": "1621332504_29947"
      },
      status: 404 
     },
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 25
  },
  "uq_str": ""
};
          this.memorials = res.data['landing_list']
          this.pagination_token = res.data['pagination']
          this.totalMemorials = this.pagination_token['total']
          this.perPage = this.pagination_token['per_page']
          this.currentPage = this.pagination_token['page']
          if (res.data['memorial'] && res.data['memorial']['status']) {
            this.prependAndHighlightMemorial(res.data['memorial'].memorial_data, res.data['memorial'].status)
          }

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
      } else if (memorial_status == 201) {
        memorial.is_under_review = true
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

.card-columns {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
    -webkit-column-gap: 1.25rem;
    -moz-column-gap: 1.25rem;
    grid-column-gap: 1.25rem;
    column-gap: 1.25rem;
    orphans: 1;
    widows: 1;

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
}
</style>
