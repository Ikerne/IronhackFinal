<!--HTML-->
<template>
  <Nav />
  <div class="sticky-container">
    <div class="sticky-outer">
      <div class="sticky">
      <svg width="0" height="0">
        <defs>
          <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
            <path
              d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
              stroke-linejoin="round"
              stroke-linecap="square"
            />
          </clipPath>
        </defs>
      </svg>
        <div class="sticky-content blue-sticky">
          <h1><b>Name:</b> {{username.split("@")[0]}}</h1>
          <h1><b>Handle:</b> @{{username.split("@")[0]}}</h1>
          <h1><b>Email:</b> {{username}}</h1>
          <img :src="avatar_url ? avatar_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'" alt="Profile picture">
        </div>
      </div>
     </div>
  </div>
</template>
<!--JS-->
<script setup>
  import { supabase } from '../supabase'
  import { onMounted, ref, toRefs } from 'vue'
  import { useUserStore } from "../stores/user";
  import Nav from '../components/Nav.vue';

  const userStore = useUserStore();
  const loading = ref(false);
  const username = ref("");
  const website = ref(null);
  const avatar_url = ref(null);

  onMounted(() => {
    getProfile();
  });

  async function getProfile() {
    await userStore.fetchUser();
    username.value = userStore.profile.username;
    avatar_url.value = userStore.profile.avatar_url;
  }

  async function signOut() {
    try {
      loading.value = true
      let { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }
</script>
<!--CSS-->
<style></style>