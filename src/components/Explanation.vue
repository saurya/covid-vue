<template>
<div>
  <b-jumbotron :header="$t('explanation.jumbotron_header')" :lead="$t('explanation.jumbotron_lead')">
    <p>{{ $t("explanation.project_summary_paragraph") }}</p>
    <b-button variant="primary" onclick="document.getElementById('addmemorialform').scrollIntoView({ behavior: 'smooth'})">{{ $t("explanation.make_a_memorial_button") }}</b-button>
  </b-jumbotron>
</div>
</template>
