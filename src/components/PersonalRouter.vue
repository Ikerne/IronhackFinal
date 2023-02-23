<!--HTML-->
<template>
  <router-link :to="route">{{ buttonText }}</router-link>
</template>
<!--JS-->
<script setup>
defineProps({
  route: String,
  buttonText: String,
});
</script>
