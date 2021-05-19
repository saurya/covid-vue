<template>
<div>
  <b-jumbotron :header="$t('explanation.jumbotronHeader')" :lead="$t('explanation.jumbotronLead')">
    <p>{{ $t("explanation.projectSummaryParagraph") }}</p>
    <b-button variant="primary" onclick="document.getElementById('addmemorialform').scrollIntoView({ behavior: 'smooth'})">{{ $t("explanation.makeAMemorialButton") }}</b-button>
  </b-jumbotron>
</div>
</template>
