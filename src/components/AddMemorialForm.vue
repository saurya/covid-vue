<template>
<b-form id="addmemorialform" @submit.prevent="onSubmit" enctype="multipart/form-data">
            <div class="form-container">
              <h3 class="mb-3">{{ $t("addMemorialForm.formTitle") }}</h3>
               <b-row class="justify-content-center">
               <b-col cols="8" sm="8">
                 <b-form-group>
                    <b-form-select
                       v-model="$i18n.locale"
                       class="locale-changer"
                    >
      <option v-for="lang in langs" :key="lang.name" :value="lang.locale">
        {{ lang.name }}
      </option>


                    </b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
             <b-row class="justify-content-center">
                <b-col cols="8">
                  <b-form-group id="input-group-2" :label="$t('addMemorialForm.name')" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="memorial.name"
                    required
                    :placeholder="$t('placeholdersMemorial.name')"
                  ></b-form-input>
                  </b-form-group>
                </b-col>

              </b-row>
      
              <b-row class="justify-content-center">
                <b-col cols="8" sm="4">
                  <b-form-group
                    :label="$t('addMemorialForm.gender')"
                  >
                    <b-form-input 
                      list="my-list-id-3"
                      v-model="memorial.gender"
                      :placeholder="$t('placeholdersMemorial.gender')"
                    ></b-form-input>
                    <datalist id="my-list-id-3">
                      <option v-for="gender in $t('addMemorialForm.genders')" :key="gender">{{ gender }}</option>
                    </datalist>
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
                             plain
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
                    :label="$t('addMemorialForm.location1')"
                  >
                    <b-form-input
                      list="my-list-id-2"
                      v-model="memorial.location1"
                      required
                      :placeholder="$t('placeholdersMemorial.location')"
                    ></b-form-input>
                    <datalist id="my-list-id-2">
                      <option v-for="location in $t('locations')" :key="location">{{ location.state }}</option>
                    </datalist>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="justify-content-center">
                <b-col cols="8">
                  <b-form-group :label="$t('addMemorialForm.prompt')"
                  >
                    <b-form-input 
                      list="my-list-id-4"
                      v-model="memorial.prompt"
                      :placeholder="$t('placeholdersMemorial.prompt')"
                    ></b-form-input>
                    <datalist id="my-list-id-4">
                      <option v-for="prompt in $t('addMemorialForm.prompts')" :key="prompt">{{ prompt }}</option>
                    </datalist>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="justify-content-center">
               <b-col cols="8" sm="8">
                 <b-form-group>
                    <b-form-textarea 
                      v-model="memorial.prompt_response"
                      :placeholder="$t('placeholdersMemorial.prompt_response')"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>
            <b-row>
            </b-row>
            <b-row class="justify-content-center">
              <b-col sm="8">
                <b-button type="submit" class="mr-2 my-3" variant="success" block>{{ $t('addMemorialForm.submitAndMakeMemorial') }}</b-button>
              </b-col>
            </b-row>
            </div>
   <b-toast id="my-toast" variant="warning" class="initially-hidden" no-auto-hide toast-class="initially-hidden" :title="submission_response">
        {{submission_details}}
    </b-toast>
          </b-form>

          
</template>

<script>
import moment from 'moment'
import axios from 'axios'
var HARDCODED_FALLBACK_DATE = '2021-05-01'
var HARDCODED_FALLBACK_AGE = 0
// TODO(saurya): Add thumbnail image for Photos
// TODO(saurya): Display success/continuation token to user somehow

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
          name: '',
          gender: '',
          photo_upload: '',
          photo_base64: '',
          birth_date: '',
          passing_date: '',
          location: '',
          prompt: '',
          prompt_response: ''
        },
        memorial_response: {},
        show: true,
        submission_response: "",
        submission_details: "",
         langs: [
                     { 'name': 'हिन्दी', 'locale' : 'hi' },
                     { 'name': 'తెలుగు', 'locale' : 'te' },
                     { 'name': 'বাংলা', 'locale' : 'bn' },
                     { 'name': 'മലയാളം', 'locale' : 'ml' },
                     { 'name': 'मराठी', 'locale' : 'mr' },
                     { 'name': 'ਪੰਜਾਬੀ', 'locale' : 'pa' }, 
                     { 'name': 'தமிழ்', 'locale': 'ta' } ,
                     { 'name': 'ಕನ್ನಡ', 'locale' : 'kn' },
                     { 'name': 'ગુજરાતી', 'locale' : 'gu' },
                     { 'name': 'English', 'locale' : 'en' }] 

      }
    },
    methods: {
      handleFileUpload(event) {
        this.memorial.photo_upload = event.target.files[0]
      },
      async onSubmit() {
        var age = moment(this.memorial.passing_date).diff(moment(this.memorial.birth_date), 'years') 
        this.postable_memorial = {
           name: this.memorial.name,
           death_date: this.memorial.passing_date ? this.memorial.passing_date : HARDCODED_FALLBACK_DATE,
           location: this.memorial.location,
           province: this.memorial.location.split('::')[0],
           district: this.memorial.location.split('::')[1],
           age: isNaN(age) ? HARDCODED_FALLBACK_AGE : age,
           file: this.memorial.photo_upload, 
           death_message: this.memorial.prompt_response ? this.memorial.prompt + this.memorial.prompt_response : ""
        };
        var formData = new FormData();
        formData.append("file", this.postable_memorial.file);
        formData.append("name", this.postable_memorial.name);
        formData.append("age", this.postable_memorial.age);
        formData.append("death_date", this.postable_memorial.death_date);
        formData.append("location", this.postable_memorial.location);
        formData.append("message", this.postable_memorial.death_message);
        formData.append("locale", this.$i18n.locale);

        axios.post('/json', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
          this.postable_memorial.id = res.data['uq_str']
          this.postable_memorial.permalink = '/' + '?show_memorial=' + this.postable_memorial.id
          this.submission_response = this.$t('addMemorialForm.submissionSuccessfulToastTitle')
          this.submission_details = this.$t('addMemorialForm.submissionSuccessfulToastContent')
        })
        .catch((error) => {
          // eslint-disable-next-line
         console.error(error);
         this.submission_response = this.$t('addMemorialForm.submissionFailedToastTitle')
         this.submission_details = this.$t('addMemorialForm.submissionFailedToastContent')
       }).finally((response) => {
          this.$refs.fileupload.reset()
          this.memorial =  {
            name: '',
            gender: '',
            photo_upload: '',
            birth_date: '',
            passing_date: '',
            location: '',
            prompt_response: ''
          }
          this.memorial_response = response
        
          // FUCKME(saurya): This is all a horrible hack around this bug: https://github.com/bootstrap-vue/bootstrap-vue/pull/6362          // May God have mercy on my soul.
          this.$bvToast.show('my-toast')
          window.setTimeout(
          () => {
                 document.getElementById('my-toast').classList.add('show')
                 document.getElementById('my-toast').classList.add('show-real')
                }, 500)
        });
      }
    }
}
</script>

<style>
legend,label {
  text-align: left;
}

#my-toast.initially-hidden {
  opacity: 0;
}
#my-toast.initially-hidden.show-real {
  opacity: 1;
}
.close {
  position: absolute;
  right: 5px;
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
