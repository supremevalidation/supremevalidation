import { CustomValidation } from "../custom-validation";

const isElementFull = (item) => {
  const minChar = item.closest(".supreme-validate-element").attr("min");

  return item.val() === "" || item.val() === null || minChar && item.val().length < minChar;
};

export default function standartValidate(collection) {

  const errorResponse = collection.filter((item) => {
    const hasCustomValidation = $(item).parent().attr("custom-validation") !== undefined;
    const customValidationName = $(item).parent().attr("custom-validation");

    if (hasCustomValidation) {
      const value = $(item).val();
      const validationFunc = CustomValidation[customValidationName];
      const control = validationFunc(value);

      if (!control) {
        return item;
      }
    } else {
      if (isElementFull($(item))) {
        return item;
      }
    }
  });

  const successResponse = collection.filter((item) => {
    const hasCustomValidation = item.parentNode.hasAttribute("custom-validation");
    const customValidationName = $(item).parent().attr("custom-validation");

    if (hasCustomValidation) {
      if (CustomValidation[customValidationName]($(item).val())) {
        return item;
      }
    } else {
      if (!isElementFull($(item)))
        return item;
    }
  });

  return {
    errorElements: errorResponse,
    successElements: successResponse
  };
}