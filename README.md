# Password Strength Meter For Vue

To display the strength of the password with a visual feedback.

[Password Strength Meter](https://www.npmjs.com/package/vue-password-strength-meter) use [zxcvbn](https://github.com/dropbox/zxcvbn) to estimate the strength of the password and also provide a visual feedback with suggestions and warning messages.

This lib was developed based on the following [tutorial](https://scotch.io/tutorials/password-strength-meter-in-angularjs).

How then is password strength measured? `Dropbox developed an algorithm for a realistic password strength estimator inspired by password crackers. This algorithm is packaged in a Javascript library called zxcvbn. In addition, the package contains a dictionary of commonly used English words, names and passwords.`

# Demo

[See Demo Here](https://antoantonyk.github.io/vue-password-strength-meter/)

```html
<password-strength-meter [password]="password"></password-strength-meter>
```

## Get Started

**Step 1:** Install vue-password-strength-meter

```sh
npm install vue-password-strength-meter --save
```

**Step 2:** Import Password Strength Meter into your app

```js
....
import VuePasswordStrengthMeter from 'vue-password-strength-meter';

export default {
  name: "app",
  components: {
    PasswordStrengthMeter: VuePasswordStrengthMeter
  },
```

**Step 3:** use the PasswordStrengthMeter component in your component template

```ts
  <PasswordStrengthMeter :password="password"/>
```

## API

| option            |  bind  |   type   |                          default                           | description                                                                                                             |
| :---------------- | :----: | :------: | :--------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| password          | props  |  string  |                             -                              | password to calculate its strength                                                                                      |
| minPasswordLength | props  |  number  |                             8                              | min length of password to calculate the strength                                                                        |
| enableFeedback    | props  | boolean  |                           false                            | to show/hide the suggestions and warning messages                                                                       |
| colors            | props  | string[] | ['darkred', 'orangered', 'orange', 'yellowgreen', 'green'] | to overide the meter colors, password strength range is 0 - 4, for strength 0 equals first color in the array and so on |
| strengthChange    | \$emit |  number  |                             -                              | emits the strength of the provided password in number -> range 0 - 4                                                    |
