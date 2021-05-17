<template>
<b-form id="addmemorialform" @submit="onSubmit" @reset="onReset" v-if="show">
            <div class="form-container">
              <h3 class="mb-3">Your Details</h3>
              <b-form-row>
                <b-col cols="12" sm="4">
                  <b-form-group id="input-group-2" label="First Name*" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="memorial.first_name"
                    required
                    :placeholder="$t('placeholdersMemorial.first_name')"
                  ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="4">
                  <b-form-group id="input-group-3" label="Last Name*" label-for="input-3">
                  <b-form-input
                    id="input-3"
                    v-model="memorial.last_name"
                    required
                    :placeholder="$t('placeholdersMemorial.last_name')"
                  ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row>
                  <b-col sm="4">
                    <b-form-group
                    label="Date of Birth"
                    >
                    <b-form-datepicker id="example-datepicker" v-model="memorial.birth_date" class="mb-2"></b-form-datepicker>
                    </b-form-group>
                </b-col>
                <b-col sm="4">
                    <b-form-group
                    label="Date of Passing"
                    >
                    <b-form-datepicker id="passing-datepicker" v-model="memorial.passing_date" class="mb-2"></b-form-datepicker>
                    </b-form-group>
                </b-col>
               <b-col cols="12" sm="4">
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
               <b-col cols="12" sm="4">
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

              </b-form-row>
              <b-form-row>
                  <b-col sm="8">
                      <b-form-group
                        label="Photo"
                        >
                        <!-- Styled -->
                            <b-form-file
                            v-model="file"
                            :state="Boolean(file)"
                            required
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                            ></b-form-file>
                        </b-form-group>
                  </b-col>
              </b-form-row>
            </div>
            <b-row>
              <b-col sm="4">
                <b-button type="reset" class="mr-2 my-3"  variant="danger" block>Reset</b-button>
              </b-col>
              <b-col sm="4">
                <b-button type="submit"  class="mr-2 my-3" variant="success" block>Submit</b-button>
              </b-col>
            </b-row>
          </b-form>
</template>

<script>
import locations from './json/locations.json'
// TODO(saurya): Figure out why the columns aren't working
// TODO(saurya): Add thumbnail image for Photos
// TODO(saurya): Lay everything out correctly
// TODO(saurya): Use Axios to hit the backend and submit this data
// TODO(saurya): Display success/continuation token to user somehow
// TODO(saurya): Turn input fields into borderless beauties
// TODO(saurya): Turn color of background of form to Arjun's choice
var genders = [ "Male", "Female", "Third Gender" ]
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
          email: '',
          location: '',
          prompt: '',
          prompt_response: ''
        },
        locations: locations,
        genders: genders,
        show: true,
        showFailAlert: false,
        showSuccessAlert: false,
        showProgressBar: false,
      }
    },
    methods: {
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
      },
      onReset(evt) {
        evt.preventDefault()
        confirm("Are you sure you want to reset the form? You will lose all of your inputs.");
        // Reset our form values
        this.memorial.first_name = ''
        this.memorial.last_name = ''
        this.memorial.email = ''
        // TODO(saurya): Finish resetting all the form fields
        this.file = null
        
        this.showFailAlert = false
        this.showSuccessAlert = false
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
}
</script>
