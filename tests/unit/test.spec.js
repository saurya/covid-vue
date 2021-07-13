import { shallowMount, createLocalVue } from '@vue/test-utils'
import AddMemorialForm from '@/components/AddMemorialForm.vue'
import VueI18n from 'vue-i18n'

describe("addmemorial testl", () => {
    let localVue = createLocalVue()
    localVue.use(VueI18n)
    test = {
      name: 'kevin smith',
      gender: 'male',
      photo_upload: 'no',
      photo_base64: 'nan',
      birth_date: '25-11-1954',
      passing_date: '25-11-2020',
      location: 'jaipur::rajasthan',
      prompt: 'none',
      prompt_response: 'none'
  }
    const i18n = new VueI18n({
      locale: 'en',
      fallbackLocale: 'en'
      
    })
    
    const wrapper = shallowMount( AddMemorialForm, {i18n,localVue});

  it("renders successfully", () => {
    mocks: {
      $t: (msg) => msg
    }
      
      wrapper.vm.test();
      expect(wrapper.vm.memorial).toStrictEqual(test); 
    })
  })

