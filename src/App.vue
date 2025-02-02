<script setup lang="ts">
import PasswordGenerator from './components/PasswordGenerator.vue'
import '@arco-design/web-vue/dist/arco.css'
</script>

<template>
  <div class="container">
    <PasswordGenerator />
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  width: 100vw;
  max-width: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 1rem;
}
</style>
