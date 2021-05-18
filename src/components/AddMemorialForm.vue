<template>
<b-form id="addmemorialform" @submit="onSubmit" v-if="show">
            <div class="form-container">
              <h3 class="mb-3">Make a memorial for your loved one</h3>
              <b-row class="justify-content-center">
                <b-col cols="8" sm="4">
                  <b-form-group id="input-group-2" label="First Name" label-for="input-2">
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
                    label="Gender"
                  >
                    <b-form-input 
                      list="my-list-id-3"
                      v-model="memorial.gender"
                      required
                      :placeholder="$t('placeholdersMemorial.gender')"
                    ></b-form-input>
                    <datalist id="my-list-id-3">
                      <option v-for="gender in genders" :key="gender">{{ gender }}</option>
                    </datalist>
                  </b-form-group>
                </b-col>

              </b-row>
      
              <b-row class="justify-content-center">
                <b-col cols="8" sm="4">
                  <b-form-group id="input-group-3" label="Last Name" label-for="input-3">
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
                        label="Photo"
                        >
                        <!-- Styled -->
                            <b-form-file
                             class="form-control-file"
                             type="file"
                             accept="image/*"
                             multiple
                             @change="uploadFile" 
                            ></b-form-file>
                        </b-form-group>
                  </b-col>
              </b-row>
              <b-row class="justify-content-center">
                  <b-col sm="4">
                    <b-form-group
                    label="Date of Birth"
                    >
                    <b-form-datepicker id="birth-datepicker" v-model="memorial.birth_date" class="mb-2"></b-form-datepicker>
                    </b-form-group>
                </b-col>
                <b-col sm="4">
                    <b-form-group
                    label="Date of Passing"
                    >
                    <b-form-datepicker id="passing-datepicker" v-model="memorial.passing_date" class="mb-2"></b-form-datepicker>
                    </b-form-group>
                </b-col>
              </b-row>
              <b-row class="justify-content-center">
               <b-col cols="8" sm="8">
                  <b-form-group
                    label="Location"
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
                 <b-form-group label="More than anything else they loved...">
                    <b-form-textarea 
                      v-model="memorial.prompt_response"
                      required
                      :placeholder="$t('placeholdersMemorial.prompt_response')"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>

            <b-row class="justify-content-center">
              <b-col sm="8">
                <b-button type="submit" class="mr-2 my-3" variant="success" block>SUBMIT AND MAKE A MEMORIAL</b-button>
              </b-col>
            </b-row>
            </div>
          </b-form>
</template>

<script>
import locations from './json/locations.json'
import prompts from './json/prompts.json'
import axios from 'axios'
// TODO(saurya): Add thumbnail image for Photos
// TODO(saurya): Use Axios to hit the backend and submit this data
// TODO(saurya): Display success/continuation token to user somehow
// TODO(saurya): Turn color of background of form to Arjun's choice
var genders = [ "Male", "Female", "Third Gender" ]
const SERVER = "localhost:8000"
const ADD_MEMORIAL_URL_PATH = SERVER + '/add_memorial'
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
          birth_date: '',
          passing_date: '',
          location: '',
          prompt: 'More than anything else, they loved...',
          prompt_response: ''
        },
        locations: locations,
        genders: genders,
        prompts: prompts,
        show: true,
        showFailAlert: false,
        showSuccessAlert: false,
        showProgressBar: false,
      }
    },
    methods: {
        uploadFile (event) {
          this.files = event.target.files
        },
        handleSubmit() {
          const formData = new FormData();
          for (const i of Object.keys(this.files)) {
            formData.append('files', this.files[i])
          }
          axios.post('http://localhost:4000/api/file-upload', formData, {
          }).then((res) => {
            console.log(res)
          })
        },  

      async onSubmit(evt) {
        evt.preventDefault()
   /*
        var user_doc_id = null
        var submit_success = true
        this.formShow = false
        this.showProgressBar = true
        await db.collection("memorial").add({
            first_name: this.memorial.first_name,
            last_name: this.memorial.last_name,
            email: this.memorial.email,
            secondary_email: this.memorial.secondary_email,
            university: this.memorial.university,
            major: this.memorial.major,
            education: this.memorial.education,
            dob: this.memorial.date,
            linkedin_url: this.memorial.linkedin_url,
            file_name: this.file.name,
            country: this.memorial.country,
            create_time: Math.round(new Date().getTime()/1000)
          })
        .then(function(docRef) {
            user_doc_id = docRef.id
            submit_success = submit_success && true
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
          submit_success = submit_success && false
        });
        var storageRef = storage.ref('memorials/'+ user_doc_id + '/' + this.file.name);
        var self = this
        await storageRef.put(this.file).on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                self.value = percentage
            },
            function error(error) {
                self.showProgressBar = false
                console.error("Error adding document: ", error);
                submit_success = submit_success && false
            },
            function complete() {
                self.showProgressBar = false
                console.log('Uploaded a blob or file!')
                submit_success = submit_success && true
            }
        )
        
        if (submit_success) {
          this.show = false
          this.showSuccessAlert = true
        } else {
          this.show = false
          this.showFailAlert = true
        }*/
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
