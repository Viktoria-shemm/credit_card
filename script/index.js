import { el, mount, setChildren } from "redom";
import CreditCardInputMask from "credit-card-input-mask";

const createCard = () => {
  const wrapper = el(".wrapper");
  mount(document.body, wrapper);

  const card = el(".card", el("p.secure", "Secure Checkout"));
  mount(wrapper, card);

  const creditCard = el(".credit-card");
  mount(card, creditCard);

  const cardNumber = el("span.card__number", "xxxx xxxx xxxx xxxx");
  const cardPersonal = el(".card__personal");
  setChildren(creditCard, cardNumber, cardPersonal);

  const cardName = el("span.card__name", "John Doe");
  const cardDate = el("span.card__date", "04/24");
  setChildren(cardPersonal, cardName, cardDate);

  const span = {
    number: cardNumber,
    name: cardName,
    date: cardDate,
  };

  return span;
};

const createForm = () => {
  const card = document.querySelector(".card");
  const form = el("form.form", { action: "#", id: "form" });
  mount(card, form);

  const cardHolder = el(".form__input-wrap.form__input-wrap_holder");
  const labelHolder = el("label.form__label.form__holder-label", "Card Holder");
  const inputHolder = el("input.input.input__holder", {
    type: "text",
    name: "name",
    required: true,
  });
  setChildren(cardHolder, labelHolder, inputHolder);

  const cardNumber = el(".form__input-wrap.form__input-wrap_number");
  const labelNumber = el("label.form__label.form__number-label", "Card Number");
  const inputNumber = el("input.input.input__number#cardNumber", {
    type: "text",
    name: "number",
    placeholder: "xxxx xxxx xxxx xxxx",
    required: true,
  });
  setChildren(cardNumber, labelNumber, inputNumber);

  const cardExpiry = el(".form__input-wrap.form__input-wrap_date");
  const labelExpiry = el("label.form__label.form__date-label", "Card Expiry");
  const inputExpiry = el("input.input.input__date", {
    type: "text",
    name: "date",
    placeholder: "MM/YY",
    maxlength: 5, 
    required: true,
  });
  setChildren(cardExpiry, labelExpiry, inputExpiry);

  const cardCvv = el(".form__input-wrap.form__input-wrap_cvv");
  const labelCvv = el("label.form__label.form__cvv-label", "Card CVV");
  const inputCvv = el("input.input.input__cvv", {
    type: "text",
    name: "cvv",
    required: true,
    placeholder: "***",
    maxlength: 3,
  });
  setChildren(cardCvv, labelCvv, inputCvv);

  const button = el("button.form__button", "CHECK OUT");

  setChildren(form, cardHolder, cardNumber, cardExpiry, cardCvv, button);

  const formattedCreditCardInput = new CreditCardInputMask({
    element: document.querySelector("#cardNumber"),
    pattern: "{{9999}} {{9999}} {{9999}} {{9999}}",
  });
};

const inputControl = (span) => {
  const form = document.querySelector("form");
  form.addEventListener("input", ({ target }) => {
    if (target.name === "name") {
      target.value = target.value.replace(/[^a-z]/gi, "");
      span.name.textContent = target.value;
    } else if (target.name === "number") {
      target.value = target.value.replace(/[^\d]/, "");
      span.number.textContent = target.value;
    } else if (target.name === "date") {
      target.value = target.value.replace(/[^\d\/]/, "");
      if (target.value.length === 2) {
        target.value = target.value + "/";
      } else if (target.value.includes("/") && target.value.length === 3) {
        target.value = target.value.replace("/", "");
      }
      span.date.textContent = target.value;
    } else if (target.name === "cvv") {
      target.value = target.value.replace(/[^\d]/, "");
    }
  });
};

const init = () => {
  const span = createCard();
  createForm();
  inputControl(span);
};

init();
