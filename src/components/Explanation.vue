<template>
<div>
  <b-jumbotron :header="$t('explanation.jumbotronHeader')" :lead="$t('explanation.jumbotronLead')">
    <p>{{ $t("explanation.projectSummaryParagraph") }}</p>
    <b-button variant="primary" onclick="document.getElementById('addmemorialform').scrollIntoView({ behavior: 'smooth'})">{{ $t("explanation.makeAMemorialButton") }}</b-button>
  </b-jumbotron>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</div>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['hi', 'bn', 'mr', 'pa', 'ta', 'ml', 'kn', 'gu', 'te', 'en'] }
  }
}
</script>
