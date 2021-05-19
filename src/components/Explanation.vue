<template>
<div>
  <b-jumbotron :header="$t('explanation.jumbotronHeader')" :lead="$t('explanation.jumbotronLead')">
    <p>{{ $t("explanation.projectSummaryParagraph") }}</p>
    <b-button variant="primary" onclick="document.getElementById('addmemorialform').scrollIntoView({ behavior: 'smooth'})">{{ $t("explanation.makeAMemorialButton") }}</b-button>
  </b-jumbotron>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="lang in langs" :key="lang.name" :value="lang.locale">
        {{ lang.name }}
      </option>
    </select>
  </div>
</div>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: [
                     { 'name': 'हिन्दी', 'locale' : 'hi' },
                     { 'name': 'తెలుగు', 'locale' : 'te' },
                     { 'name': 'বাংলা', 'locale' : 'bn' },
                     { 'name': 'മലയാളം', 'locale' : 'ml' },
                     { 'name': 'मराठी', 'locale' : 'mr' },
                     { 'name': 'ਪੰਜਾਬੀ', 'locale' : 'pa' }, 
                     { 'name': 'தமிழ்', 'locale': 'ta' } ,
                     { 'name': 'ಕನ್ನಡ', 'locale' : 'kn' },
                     { 'name': 'ગુજરાતી', 'locale' : 'gu' },
                     { 'name': 'English', 'locale' : 'en' }] }
  }
}
</script>
