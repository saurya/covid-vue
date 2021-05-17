<template>
  <div id="app">
    <Explanation />
    <FeedWithCards />
    <AddMemorialForm />
  </div>
</template>

<script>
import Explanation from './components/Explanation.vue'
import FeedWithCards from './components/FeedWithCards.vue'
import AddMemorialForm from './components/AddMemorialForm.vue'

export default {
  name: 'App',
  components: {
    Explanation,
    FeedWithCards,
    AddMemorialForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 8px;
}
button.btn {
  border-radius: 30px;
  padding-left: 40px;
  padding-right: 40px;
}
</style>
