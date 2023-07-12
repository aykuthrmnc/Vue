<template>
  <div class="card-item" :class="{ '-active': isCardFlipped }" v-if="labels && inputFields">
    <div class="card-item__side -front">
      <div :class="{ '-active': focusElementStyle }" :style="focusElementStyle" class="card-item__focus" ref="focusElement"></div>
      <div class="card-item__cover" :aria-label="imageCover">
        <img v-if="currentCardBackground" :src="currentCardBackground" class="card-item__bg" alt="Background image" />
      </div>
      <div class="card-item__wrapper">
        <div class="card-item__top">
          <img src="../assets/images/chip.png" class="card-item__chip" alt="Card chip image" />
          <div class="card-item__type">
            <transition name="slide-fade-up">
              <img v-if="cardType" :src="getCreditCardImage" :key="cardType" :alt="`${cardType} brand image`" class="card-item__typeImg" />
            </transition>
          </div>
        </div>
        <label :for="inputFields.cardNumber" :ref="inputFields.cardNumber" aria-label="Card number" class="card-item__number">
          <span v-for="(n, $index) in currentPlaceholder" :key="$index">
            <transition name="slide-fade-up">
              <div v-if="getIsNumberMasked($index, n)" class="card-item__numberItem">*</div>
              <div
                v-else-if="valueFields.cardNumber.length > $index"
                :class="{ '-active': n.trim() === '' }"
                :key="currentPlaceholder"
                class="card-item__numberItem"
              >
                {{ valueFields.cardNumber[$index] }}
              </div>
              <div v-else :class="{ '-active': n.trim() === '' }" :key="currentPlaceholder + 1" class="card-item__numberItem">
                {{ n }}
              </div>
            </transition>
          </span>
        </label>
        <div class="card-item__content">
          <label :for="inputFields.cardName" :ref="inputFields.cardName" aria-label="Card name" class="card-item__info">
            <div class="card-item__holder">
              {{ labels.cardHolder || "Card Holder" }}
            </div>
            <transition name="slide-fade-up">
              <div v-if="valueFields.cardName.length" class="card-item__name" key="1">
                <transition-group name="slide-fade-right">
                  <span v-for="(n, key) in valueFields.cardName.replace(/\s\s+/g, ' ')" :key="key + 1" class="card-item__nameItem">{{ n }}</span>
                </transition-group>
              </div>
              <div class="card-item__name" v-else key="2">
                {{ labels.cardName || "Full Name" }}
              </div>
            </transition>
          </label>
          <div class="card-item__date" ref="cardDate">
            <label :for="inputFields.cardMonth" class="card-item__dateTitle" aria-label="Expiration date">{{
              labels.cardExpires || "Expires"
            }}</label>
            <label :for="inputFields.cardMonth" class="card-item__dateItem" aria-label="Card month">
              <transition name="slide-fade-up">
                <span v-if="valueFields.cardMonth" :key="valueFields.cardMonth">{{ valueFields.cardMonth }}</span>
                <span v-else key="2">{{ labels.cardMonth || "MM" }}</span>
              </transition>
            </label>
            /
            <label :for="inputFields.cardYear" class="card-item__dateItem" aria-label="Card year">
              <transition name="slide-fade-up">
                <span v-if="valueFields.cardYear" :key="valueFields.cardYear">{{ String(valueFields.cardYear).slice(2, 4) }}</span>
                <span v-else key="2">{{ labels.cardYear || "YY" }}</span>
              </transition>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="card-item__side -back">
      <div class="card-item__cover" :aria-label="imageCover">
        <img v-if="currentCardBackground" :src="currentCardBackground" class="card-item__bg" alt="Background image" />
      </div>
      <div class="card-item__band"></div>
      <div class="card-item__cvv">
        <label :for="inputFields.cardCvv" aria-label="Card CVV">
          <div class="card-item__cvvTitle">{{ labels.cardCvv }}</div>
          <div class="card-item__cvvBand">
            <span>{{ valueFields.cardCvv }}</span>
          </div>
        </label>
        <div class="card-item__type">
          <img v-if="cardType" :src="getCreditCardImage" class="card-item__typeImg" alt="Dark bar image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";
const { valueFields, inputFields, labels, isCardNumberMasked, hasRandomBackgrounds, backgroundImage, setType } = defineProps({
  valueFields: {
    type: Object,
    required: true,
  },
  inputFields: {
    type: Object,
    default: () => ({
      cardNumber: "v-card-number",
      cardName: "v-card-name",
      cardMonth: "v-card-month",
      cardYear: "v-card-year",
      cardCvv: "v-card-cvv",
    }),
  },
  labels: {
    type: Object,
    default: () => ({
      cardName: "Full Name",
      cardHolder: "Card Holder",
      cardMonth: "MM",
      cardYear: "YY",
      cardExpires: "Expires",
      cardCvv: "CVV",
    }),
  },
  isCardNumberMasked: {
    type: Boolean,
    default: true,
  },
  hasRandomBackgrounds: {
    type: Boolean,
    default: true,
  },
  backgroundImage: {
    type: [String, Number],
    default: "",
  },
  setType: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["get-type"]);

let defaultPlaceholder = ref("#### #### #### ####");
let focusElementStyle = ref(null);
let currentFocus = ref(null);
let isFocused = ref(false);
let isCardFlipped = ref(false);
let amexCardPlaceholder = ref("#### ###### #####");
let fifteenCardPlaceholder = ref("#### #### #### ###");
let dinersCardPlaceholder = ref("#### ###### ####");
let unionPayCardPlaceholder = ref("###### ####### ######");
let defaultCardPlaceholder = ref(defaultPlaceholder);
let currentPlaceholder = ref(defaultPlaceholder);

const jcbCardPlaceholder = computed(() => {
  const number = valueFields.cardNumber.replace(/\s+/g, "");
  return number.startsWith("2131") || number.startsWith("1800") ? fifteenCardPlaceholder.value : defaultPlaceholder.value;
});

const getCreditCardImage = computed(() => new URL(`../assets/images/${cardType.value}.png`, import.meta.url));

const cardType = computed(() => {
  const acceptedTypes = [
    "visaelectron",
    "visa",
    "elo",
    "amex",
    "mastercard",
    "discover",
    "unionpay",
    "troy",
    "dinersclub",
    "jcb",
    "laser",
    "dankort",
    "uatp",
    "mir",
    "hipercard",
    "aura",
    "maestro",
  ];
  const setTypeValue = setType?.toLowerCase()?.replace(/ /g, "");
  if (setTypeValue?.length && acceptedTypes.includes(setTypeValue)) return setTypeValue;

  const number = valueFields.cardNumber.replace(/\s+/g, "");

  if (number.match(/^4(026|17500|405|508|844|91[37])/)) {
    return "visaelectron";
  }
  if (number.match(/^4\d{12}(\d{3})?$/)) return "visa";
  if (
    number.match(
      /^((509091)|(636368)|(636297)|(504175)|(438935)|(40117[8-9])|(45763[1-2])|(457393)|(431274)|(50990[0-2])|(5099[7-9][0-9])|(50996[4-9])|(509[1-8][0-9][0-9])|(5090(0[0-2]|0[4-9]|1[2-9]|[24589][0-9]|3[1-9]|6[0-46-9]|7[0-24-9]))|(5067(0[0-24-8]|1[0-24-9]|2[014-9]|3[0-379]|4[0-9]|5[0-3]|6[0-5]|7[0-8]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(6504(8[5-9]|9[0-9])|6505(0[0-9]|1[0-9]|2[0-9]|3[0-8]))|(6505(4[1-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(65072[0-7])|(6509(0[1-9]|1[0-9]|20))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[0-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8])))/
    )
  ) {
    return "elo";
  }
  if (number.match(/^3[47]\d{13}$/)) return "amex";
  if (number.match(/^(5[1-5]\d{4}|677189)\d{10}$/)) return "mastercard";
  if (number.match(/^6(?:011|5[0-9]{2})[0-9]{12}$/)) return "discover";
  if (number.match(/^62[0-9]\d{14,17}$/)) return "unionpay";
  if (number.match(/^9792\d{12}$/)) return "troy";
  if (number.match(/^3(0[0-5]|[68]\d)\d{11,16}/)) return "dinersclub";
  if (number.match(/(?:2131|1800|35[0-9]{3})[0-9]{11}$/)) return "jcb";
  if (number.match(/^(6304|6706|6709|6771)[0-9]{12,15}$/)) return "laser";
  if (number.match(/^5019\d{12}$/)) return "dankort";
  if (number.match(/^1\d{14}$/)) return "uatp";
  if (number.match(/^220[0-4]\d{12}$/)) return "mir";
  if (number.match(/^(606282\d{10}(\d{3})?)|(3841\d{15})$/)) {
    return "hipercard";
  }
  if (number.match(/^((?!504175))^((?!5067))(^50[0-9])/)) return "aura";
  if (number.match(/(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/)) {
    return "maestro";
  }

  return "";
});

const imageCover = computed(() => (hasRandomBackgrounds && parseInt(backgroundImage) ? "Image cover" : ""));

const isBackgroundImageFromAssets = computed(() => {
  const numberImage = parseInt(backgroundImage);
  return Number.isFinite(numberImage) && parseInt(numberImage) < 26 && parseInt(numberImage) > 0;
});

const currentCardBackground = computed(() => {
  const numberImage = parseInt(backgroundImage);

  // if (isBackgroundImageFromAssets) {
  //   return `../assets/images/${numberImage}.jpg`;
  // }

  if (backgroundImage && !Number.isFinite(numberImage)) {
    return backgroundImage;
  }

  if (hasRandomBackgrounds) {
    const random = Math.floor(Math.random() * 25 + 1);

    return new URL(`../assets/images/${random}.jpg`, import.meta.url);
  }

  return null;
});

watchEffect(() => {
  if (currentFocus.value) {
    changeFocus();
  } else {
    focusElementStyle.value = null;
  }
});

watchEffect(() => {
  emit("get-type", cardType);
  // changePlaceholder();
});

const addOrRemoveFieldListeners = (event = "addEventListener") => {
  const fields = document.querySelectorAll("[data-card-field]");
  fields.forEach((element) => {
    element[event]("focus", () => {
      isFocused.value = true;
      if (element.id === this.inputFields.cardYear || element.id === inputFields.cardMonth) {
        currentFocus.value = "cardDate";
      } else {
        currentFocus.value = element.id;
      }
      isCardFlipped.value = element.id === inputFields.cardCvv;
    });
    element[event]("blur", () => {
      isCardFlipped.value = !element.id === inputFields.cardCvv;
      const timeout = setTimeout(() => {
        if (!isFocused.value) {
          currentFocus.value = null;
        }
        clearTimeout(timeout);
      }, 300);
      isFocused.value = false;
    });
  });
};

const changeFocus = () => {
  const target = currentFocus.value;
  focusElementStyle.value = target
    ? {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
      }
    : null;
};

const getIsNumberMasked = (index, n) => {
  const numbers = cardType.value === "amex" ? 13 : 14;
  return index < numbers && valueFields.cardNumber.length > index && n.trim() !== "" && isCardNumberMasked;
};

const changePlaceholder = () => {
  const cardsPlaceholder = {
    amex: amexCardPlaceholder.value,
    dinersclub: dinersCardPlaceholder.value,
    jcb: jcbCardPlaceholder.value,
    uatp: fifteenCardPlaceholder.value,
    unionpay: unionPayCardPlaceholder.value,
  };

  currentPlaceholder.value = cardsPlaceholder[cardType.value] || defaultCardPlaceholder.value;
  this.$nextTick(() => {
    this.changeFocus();
  });
};

addOrRemoveFieldListeners();
</script>

<style src="../assets/css/style.min.css" scoped></style>
