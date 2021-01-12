# Medyasoft Validation
Medyasoft Validation is a jQuery form validation library.

# Demo
<a href="#" target="blank">Bootstrap UI Demo</a>

# Quick Start
- Clone the repo: `git clone [test]`

# Usage

## CSS

<p>Copy-paste the stylesheet <link> into your <head> before all other stylesheets to load our CSS.</p>
 
`<link href="assets/css/ms.validation.min.css" rel="stylesheet">`

## JS

<p>Place one of the following <strong>script</strong> near the end of your pages, right before the closing <strong>body</strong> tag, to enable them. jQuery must come first,  then our JavaScript plugin.</p>
 
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="assets/js/ms.validation.min.js"></script>
```

## HTML

```
<div class="ms-validate-element" error-message="Name field cannot be empty.">
    <label>Name:</label>
    <input type="text" placeholder="Name" name="name" />
</div>
```

# Example

```
$('.validate-form').msValidation({
  onComplete: function (response, form) { },
});
```