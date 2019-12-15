<template>
  <div id="app">
    <form class="form-signup needs-validation" @submit="onSubmit" novalidate>
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Password Strength Meter - Demo
        </h1>
        <p>
          To display the strength of the password with a visual feedback.
          PasswordStrengthMeter use
          <a href="https://github.com/dropbox/zxcvbn">zxcvbn</a> to estimate the
          strength of the password and also provide a visual feedback with
          suggestions and warning messages.
        </p>
      </div>

      <div class="form-label-group">
        <input
          type="text"
          id="inputFullname"
          class="form-control"
          placeholder="Fullname"
          autocomplete="name"
          v-model="form.fullname"
          :class="{ 'is-invalid': error.fullname }"
        />
        <label for="inputFullname">Fullname</label>
        <div class="invalid-feedback">Please provide a Fullname.</div>
      </div>

      <div class="form-label-group">
        <input
          type="text"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          v-model="form.email"
          autocomplete="email"
          :class="{ 'is-invalid': error.email }"
        />
        <label for="inputEmail">Email address</label>
        <div class="invalid-feedback">Please provide a email.</div>
      </div>

      <div class="form-label-group">
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          aria-describedby="passwordHelpBlock"
          v-model="form.password"
          autocomplete="current-password"
          :class="{ 'is-invalid': error.password }"
        />
        <label for="inputPassword">Password</label>
        <PasswordStengthMeter
          :password="form.password"
          :enableFeedback="true"
          @strengthChange="onPasswordStrengthChanged($event)"
        ></PasswordStengthMeter>
        <small id="passwordHelpBlock" class="form-text text-muted">
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </small>
        <div class="invalid-feedback">Please provide a valid Password.</div>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>

      <button
        id="btn-submit"
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >
        Sign up
      </button>
    </form>
  </div>
</template>

<script>
import PasswordStengthMeter from "./components/PasswordStengthMeter.vue";

/* eslint-disable no-console */
export default {
  name: "app",
  components: {
    PasswordStengthMeter
  },
  data: function() {
    return {
      error: {
        fullname: false,
        email: false,
        password: false
      },
      form: { fullname: "", email: "", password: "" }
    };
  },
  methods: {
    onPasswordStrengthChanged(strength) {
      console.log("====================================");
      console.log("onPasswordStrengthChanged", strength);
      console.log("====================================");
    },
    onSubmit(e) {
      e.preventDefault();
      if (this.isFormValid()) {
        console.log("====================================");
        console.log("userForm", this.form);
        console.log("====================================");
      } else {
        console.log("====================================");
        console.log("userForm Validation Failed", this.form);
        console.log("====================================");
      }
    },
    isFormValid() {
      const { fullname, email, password } = this.form;

      if (fullname) {
        this.error.fullname = false;
      } else {
        this.error.fullname = true;
      }

      if (email) {
        this.error.email = false;
      } else {
        this.error.email = true;
      }

      if (password) {
        this.error.password = false;
      } else {
        this.error.password = true;
      }

      return Object.keys(this.error).every(key => !this.error[key]);
    }
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

:root {
  --input-padding-x: 0.75rem;
  --input-padding-y: 0.75rem;
}

html,
body {
  height: 100%;
}

body {
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

#app {
  .form-signup {
    width: 100%;
    max-width: 420px;
    padding: 15px;
    margin: auto;
  }

  .form-control {
    height: auto !important;
  }

  .form-label-group {
    position: relative;
    margin-bottom: 1rem;
  }

  .form-label-group > input,
  .form-label-group > label {
    padding: var(--input-padding-y) var(--input-padding-x);
  }

  .form-label-group > label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    /* Override default `<label>` margin */
    line-height: 1.5;
    color: #495057;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
  }

  .form-label-group input::-webkit-input-placeholder {
    color: transparent;
  }

  .form-label-group input:-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-moz-placeholder {
    color: transparent;
  }

  .form-label-group input::placeholder {
    color: transparent;
  }

  .form-label-group input:not(:placeholder-shown) {
    padding-top: calc(
      var(--input-padding-y) + var(--input-padding-y) * (2 / 3)
    );
    padding-bottom: calc(var(--input-padding-y) / 3);
  }

  .form-label-group input:not(:placeholder-shown) ~ label {
    padding-top: calc(var(--input-padding-y) / 3);
    padding-bottom: calc(var(--input-padding-y) / 3);
    font-size: 12px;
    color: #777;
  }
}
</style>
