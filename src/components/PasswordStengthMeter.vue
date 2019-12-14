<template>
  <div>
    <div class="strength-meter">
      <div
        class="strength-meter-fill"
        :style="{ backgrond: meterColor }"
        :data-strength="passwordStrength"
      ></div>
    </div>
    <template v-if="enableFeedback && feedback">
      <small class="password-feedback" v-if="feedback.warning">
        {{ feedback.warning }}
      </small>
      <small
        class="password-suggetion"
        v-if="feedback.suggestions && feedback.suggestions.length > 0"
      >
        <template v-for="suggetion in feedback.suggestions">
          {{ suggetion }}
        </template>
      </small>
    </template>
  </div>
</template>

<script>
import * as zxcvbn from "zxcvbn";

const defaultColours = [
  "darkred",
  "orangered",
  "orange",
  "yellowgreen",
  "green"
];

export default {
  name: "PasswordStengthMeter",
  props: {
    password: {
      type: String,
      required: true
    },
    minPasswordLength: {
      type: Number,
      default: 8
    },
    enableFeedback: Boolean,
    colors: {
      type: Array,
      default: function() {
        return defaultColours;
      }
    }
  },
  data() {
    return {
      passwordStrength: null,
      feedback: {
        suggestions: [],
        warning: ""
      },
      prevPasswordStrength: null
    };
  },
  watch: {
    password() {
      this.onPasswordChange();
    }
  },
  computed: {
    meterColor() {
      if (!this.strength || this.strength < 0 || this.strength > 5) {
        return this.colors[0] ? this.colors[0] : this.defaultColours[0];
      }

      return this.colors[this.strength]
        ? this.colors[this.strength]
        : this.defaultColours[this.strength];
    }
  },
  methods: {
    score(password) {
      const result = zxcvbn(password);
      return result.score;
    },
    scoreWithFeedback(password) {
      const result = zxcvbn(password);
      return { score: result.score, feedback: result.feedback };
    },
    onPasswordChange() {
      if (!this.password) {
        this.passwordStrength = null;
      } else if (
        this.password &&
        this.password.length < this.minPasswordLength
      ) {
        this.passwordStrength = 0;
      } else {
        if (this.enableFeedback) {
          const result = this.scoreWithFeedback(this.password);
          this.passwordStrength = result.score;
          this.feedback = result.feedback;
        } else {
          this.passwordStrength = this.score(this.password);
          this.feedback = null;
        }
      }

      // Only emit the passwordStrength if it changed
      if (this.prevPasswordStrength !== this.passwordStrength) {
        this.$emit("strengthChange", this.passwordStrength);
        this.prevPasswordStrength = this.passwordStrength;
      }
    }
  },
  mounted() {
    this.onPasswordChange();
  }
};
</script>

<style lang="scss" scoped>
.strength-meter {
  position: relative;
  height: 3px;
  background: #ddd;
  margin: 10px auto 10px;
  border-radius: 3px;
}

.strength-meter:before,
.strength-meter:after {
  content: "";
  height: inherit;
  background: transparent;
  display: block;
  border-color: #fff;
  border-style: solid;
  border-width: 0 5px 0 5px;
  position: absolute;
  width: calc(((100% - 20px) / 5) + 10px);
  z-index: 10;
}

.strength-meter:before {
  left: calc((100% - 20px) / 5);
}

.strength-meter:after {
  right: calc((100% - 20px) / 5);
}

.strength-meter-fill {
  background: transparent;
  height: inherit;
  position: absolute;
  width: 0;
  border-radius: inherit;
  transition: width 0.5s ease-in-out, background 0.25s;
}

.strength-meter-fill[data-strength="0"] {
  background: darkred;
  width: 20%;
}

.strength-meter-fill[data-strength="1"] {
  background: orangered;
  width: 40%;
}

.strength-meter-fill[data-strength="2"] {
  background: orange;
  width: 60%;
}

.strength-meter-fill[data-strength="3"] {
  background: yellowgreen;
  width: 80%;
}

.strength-meter-fill[data-strength="4"] {
  background: green;
  width: 100%;
}

.password-feedback,
.password-suggetion {
  font-size: 70%;
  font-weight: 400;
  color: #6c757d !important;
  display: inline-block;
  margin-top: 0.25rem;
}
</style>
