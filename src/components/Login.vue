<template>
  <div>
    <button @click="auth.signInAnonymously()">Sign In Anonimously</button>
    <h3>
      {{ newUser ?
      'Create account'
      :
      'Sign in with email'
      }}
    </h3>
    <input v-model="email" type="email" placeholder="email" required />
    <input v-model="password" type="password" placeholder="password" required />
    <button
      @click="signInOrCreate()"
      :class="{'is-loading': loading}"
    >{{ newUser ? 'Register' : 'Log In'}}</button>
    <p v-if="error">{{error}}</p>
    <a
      href="#"
      @click="newUser = !newUser"
    >{{ !newUser ? 'New here? Create account' : 'Already registered? Log in'}}</a>
  </div>
</template>



<script>
import { auth } from "../firebase";

export default {
  data() {
    return {
      auth,
      newUser: false,
      email: "",
      password: "",
      loading: false,
      error: "",
    };
  },

  methods: {
    async signInOrCreate() {
      this.loading = true;
      this.error = "";

      try {
        if (this.newUser) {
          await auth.createUserWithEmailAndPassword(this.email, this.password);
        } else {
          await auth.signInWithEmailAndPassword(this.email, this.password);
        }
      } catch (err) {
        this.error = err.message;
      }

      this.loading = false;
    },
  },
};
</script>