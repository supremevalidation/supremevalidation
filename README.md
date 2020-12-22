<img width="150" src="https://avatars2.githubusercontent.com/u/75118074" alt="Supreme Validation" />

# Supreme Validation
Supreme Validation is a jQuery form validation library.

# Demo
<a href="https://supremevalidation.github.io/demo/" target="blank">Bootstrap UI Demo</a>

# Quick Start
- Clone the repo: `git clone https://github.com/yasgo/supreme-validation.git`
- Install with npm: `npm install supreme-validation`

# Status
[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/yasgo/supremevalidation)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/154c5ce30c2c4a9e889ec780bdfe3860)](https://app.codacy.com/gh/supremevalidation/supremevalidation?utm_source=github.com&utm_medium=referral&utm_content=supremevalidation/supremevalidation&utm_campaign=Badge_Grade)
[![npm version](https://img.shields.io/npm/v/supreme-validation)](https://www.npmjs.com/package/supreme-validation)

# Usage

## CSS

<p>Copy-paste the stylesheet <link> into your <head> before all other stylesheets to load our CSS.</p>
 
`<link href="assets/css/supreme.validation.min.css" rel="stylesheet">`

## JS

<p>Place one of the following <strong>script</strong> near the end of your pages, right before the closing <strong>body</strong> tag, to enable them. jQuery must come first,  then our JavaScript plugin.</p>
 
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="assets/js/supreme.validation.min.js"></script>
```

## HTML

```
<div class="supreme-validate-element" error-message="Name field cannot be empty.">
    <label>Name:</label>
    <input type="text" placeholder="Name" name="name" />
</div>
```

# Example

```
$('#contact-form').supremeValidation({
    onSuccess: function (response) {
        console.log('success response: ', response)
    },
    onError: function (error) {
        console.log('error: ', error)
    }
});
```


# License
Licensed under the MIT License, Copyright © 2020-present Yasin Burak Kalkan.
See <a href="https://github.com/yasgo/supreme-validation/blob/main/LICENSE" target="_blank">LICENSE</a> for more information.
