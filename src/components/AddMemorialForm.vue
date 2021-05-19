<template>
<b-form id="addmemorialform" @submit.prevent="onSubmit" v-if="show">
            <div class="form-container">
              <h3 class="mb-3">{{ $t("addMemorialForm.formTitle") }}</h3>
              <b-row class="justify-content-center">
                <b-col cols="8" sm="4">
                  <b-form-group id="input-group-2" :label="$t('addMemorialForm.firstName')" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="memorial.first_name"
                    required
                    :placeholder="$t('placeholdersMemorial.first_name')"
                  ></b-form-input>
                  </b-form-group>
                </b-col>

               <b-col cols="8" sm="4">
                  <b-form-group
                    :label="$t('addMemorialForm.gender')"
                  >
                    <b-form-input 
                      list="my-list-id-3"
                      v-model="memorial.gender"
                      required
                      :placeholder="$t('placeholdersMemorial.gender')"
                    ></b-form-input>
                    <datalist id="my-list-id-3">
                      <option v-for="gender in $t('addMemorialForm.genders')" :key="gender">{{ gender }}</option>
                    </datalist>
                  </b-form-group>
                </b-col>

              </b-row>
      
              <b-row class="justify-content-center">
                <b-col cols="8" sm="4">
                  <b-form-group id="input-group-3" :label="$t('addMemorialForm.lastName')" label-for="input-3">
                  <b-form-input
                    id="input-3"
                    v-model="memorial.last_name"
                    required
                    :placeholder="$t('placeholdersMemorial.last_name')"
                  ></b-form-input>
                  </b-form-group>
                </b-col>
                  <b-col sm="4">
                      <b-form-group
                        :label="$t('addMemorialForm.photo')"
                        >
                        <!-- Styled -->
                            <b-form-file
                             class="form-control-file"
                             ref="fileupload"
                             type="file"
                             @change="handleFileUpload($event)"
                             name="file"
                             accept="image/*"
                            ></b-form-file>
                        </b-form-group>
                  </b-col>
              </b-row>
              <b-row class="justify-content-center">
                  <b-col sm="4">
                    <b-form-group
                    :label="$t('addMemorialForm.dateOfBirth')"
                    >
                    <b-form-datepicker id="birth-datepicker" v-model="memorial.birth_date" class="mb-2"></b-form-datepicker>
                    </b-form-group>
                </b-col>
                <b-col sm="4">
                    <b-form-group
                    :label="$t('addMemorialForm.dateOfPassing')"
                    >
                    <b-form-datepicker id="passing-datepicker" required v-model="memorial.passing_date" class="mb-2"></b-form-datepicker>
                    </b-form-group>
                </b-col>
              </b-row>
              <b-row class="justify-content-center">
               <b-col cols="8" sm="8">
                  <b-form-group
                    :label="$t('addMemorialForm.location')"
                  >
                    <b-form-input
                      list="my-list-id-2"
                      v-model="memorial.location"
                      required
                      :placeholder="$t('placeholdersMemorial.location')"
                    ></b-form-input>
                    <datalist id="my-list-id-2">
                      <option v-for="location in locations" :key="location">{{ location }}</option>
                    </datalist>
                  </b-form-group>
                </b-col>

              </b-row>
              <b-row class="justify-content-center">
               <b-col cols="8" sm="8">
                 <b-form-group :label="$t('addMemorialForm.prompt')">
                    <b-form-textarea 
                      v-model="memorial.prompt_response"
                      :placeholder="$t('placeholdersMemorial.prompt_response')"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>

            <b-row class="justify-content-center">
              <b-col sm="8">
                <b-button type="submit" class="mr-2 my-3" variant="success" block>{{ $t('addMemorialForm.submitAndMakeMemorial') }}</b-button>
              </b-col>
            </b-row>
            </div>
          </b-form>
</template>

<script>
import locations from './json/locations.json'
import moment from 'moment'
import axios from 'axios'
// TODO(saurya): Add thumbnail image for Photos
// TODO(saurya): Use Axios to hit the backend and submit this data
// TODO(saurya): Display success/continuation token to user somehow
// TODO(saurya): Turn color of background of form to Arjun's choice

export default {
  name: 'AddMemorialForm',
  props: {
    msg: String
  },
  data() {
      return {
        name: '',
        file: null,
        value: 0,
        max: 100,
        terms: 0,
        memorial: {
          first_name: '',
          last_name: '',
          gender: '',
          photo_upload: '',
          photo_base64: '',
          birth_date: '',
          passing_date: '',
          location: '',
          prompt_response: ''
        },
        locations: locations,
        show: true,
        showFailAlert: false,
        showSuccessAlert: false,
        showProgressBar: false,
      }
    },
    methods: {
      handleFileUpload(event) {
        this.memorial.photo_upload = event.target.files[0]
      },
      async onSubmit() {
        var postable_memorial = {
           name: this.memorial.first_name + ' ' + this.memorial.last_name,
           death_date: this.memorial.passing_date,
           age: moment(this.memorial.passing_date).diff(moment(this.memorial.birth_date), 'years'),
           location: this.memorial.location,
           province: this.memorial.location.split('::')[0],
           district: this.memorial.location.split('::')[1],
           file: this.memorial.photo_upload, 
           death_message: this.$t('addMemorialForm.prompt') + this.memorial.prompt_response
        };
        var formData = new FormData();
        formData.append("file", postable_memorial.file);
        formData.append("name", postable_memorial.name);
        formData.append("death_date", postable_memorial.death_date);
        formData.append("age", postable_memorial.age);
        formData.append("location", postable_memorial.location);
        formData.append("death_message", postable_memorial.death_message);

        axios.post('/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
          var reader = new FileReader()
          var callback = function() {
             this.$root.$emit('addMemorialMessage', postable_memorial);
          }.bind(this) 
          reader.onload = function() {
             postable_memorial.photo_path = reader.result
             callback();
          }
          reader.readAsDataURL(postable_memorial.file)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        }).finally(() => {
          this.$refs.fileupload.value = null;
          this.memorial =  {
            first_name: '',
            last_name: '',
            gender: '',
            photo_upload: '',
            birth_date: '',
            passing_date: '',
            location: '',
            prompt_response: ''
          }
        });
      }
    }
}
</script>

<style>
legend,label {
  text-align: left;
}
</style>
<style scoped>
.form-container {
  padding: 2rem 2rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: 0.3rem;
}

.form-control {
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  background-color: transparent;
}
</style>
