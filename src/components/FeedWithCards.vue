<template>
<div class="mx-auto" id="memorial-container">
<div v-for="(memorial, i) in memorials" :key="i" class="card mx-auto" style="width: 28rem;">
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
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
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
          this.memorials = this.res['landing_list']
          this.pagination_token = this.res['pagination']
          this.totalMemorials = this.pagination_token['total']
          this.perPage = this.pagination_token['per_page']
          this.currentPage = this.pagination_token['page']
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
