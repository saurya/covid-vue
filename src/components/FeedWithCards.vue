<template>
<div>
<div v-for="memorial in memorials" :key="memorial" class="card" style="width: 18rem;">
  <img class="card-img-top" :src="memorial.photo_file" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">{{ memorial.first_name }} {{ memorial.last_name }}</h5>
    <p class="card-text">{{ memorial.birth_date }}</p>
    <p class="card-text">{{ memorial.passing_date }}</p>
    <p class="card-text">{{ memorial.location }}</p>
    <p class="card-text">{{ memorial.prompt }}</p>
    <p class="card-text">{{ memorial.prompt_response }}</p>
  </div>
</div>
<b-pagination
        @change="handlePageChange"></b-pagination>
</div>
</template>

<script>
import axios from 'axios';
const FETCH_MEMORIAL_API_PATH = 'https://covid-deaths-inda.uc.r.appspot.com/getmemorials';

export default {
  name: 'FeedWithCards',
  data() {
    return {
      memorials: [{            "first_name" : "Raghav",
            "last_name" : "Rao",
            "gender" : "Male",
            "birth_date" : "Mar 22 1960",
            "passing_date" : "Apr 24 2021",
            "location" : "Hyderabad, Telangana",
            "prompt" : "More than anything else, they loved...",
            "prompt_response" : "...their family.",
            "photo_file": ""
            }
      ],
      pagination_token: ''
    };
  },
  methods: {
    getMemorials(page) {
      axios.get(FETCH_MEMORIAL_API_PATH + page ? "/" + page : "")
        .then((res) => {
          this.memorials = res.data['memorials']
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
    this.getMemorials();
  },
};
</script>
