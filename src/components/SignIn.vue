<!--HTML-->
<template>
  <div class="container">
      <div class="header">
        <div class="header-description">
          <h3 class="header-title">Welcome to TaskIt</h3>
            <p class="header-subtitle">Start organizing your tasks!</p>
            <p>Sign In</p>
          </div><!--end of header description div-->
      </div> <!--end of header div-->
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
              <form @submit.prevent="signIn" class="form-sign-in">
                <div class="form">
                  <div class="form-input">
                    <label class="input-field-label">E-mail</label>
                    <input
                      type="email"
                      class="input-field"
                      placeholder="example@gmail.com"
                      id="email"
                      v-model="email"
                      required
                    />
                  </div>
                  <div class="form-input">
                    <label class="input-field-label">Password</label>
                    <input
                      type="password"
                      class="input-field"
                      placeholder="**********"
                      id="password"
                      v-model="password"
                      required
                    />
                  </div>
                  <button class="button button-signInUp" type="submit">Sign In</button>
                  <p>
                    Have an account?
                    <PersonalRouter
                      :route="route"
                      :buttonText="buttonText"
                      class="sign-up-link nav-link"
                    />
                  </p>
                </div>
              </form>
              <div v-show="errorMsg">{{errorMsg}}</div>
            </div><!--end of sticky-content -->
        </div> <!--end of sticky div-->
      </div> <!--end of sticky outer div-->
    </div>
  </div> <!--end of container div-->
</template>
<!--JS-->
<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Input Fields
const email = ref("");
const password = ref("");


// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
try {
await useUserStore().signIn(email.value, password.value);
redirect.push({ path: "/" });
} catch (error) {
errorMsg.value = error.message;
setTimeout(() => {
errorMsg.value = null;
}, 5000);
}
};
</script>

