<template>
  <InputMask mask="09.99.9999" v-model="a" />

  <div class="hello">
    <h1>{{ $t("welcome") }}</h1>
    <p v-html="$t('descr')"></p>
    <hr />
    <div>
      <div v-if="languages">
        <span v-for="(lng, index) in Object.keys(languages)" :key="lng">
          <a v-if="$i18next.resolvedLanguage !== lng" v-on:click="$i18next.changeLanguage(lng)">
            {{ languages[lng].nativeName }}
          </a>
          <strong v-if="$i18next.resolvedLanguage === lng">
            {{ languages[lng].nativeName }}
          </strong>
          <span v-if="index < Object.keys(languages).length - 1">&nbsp;|&nbsp;</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { ref } from "@vue/reactivity";
    
    const a = ref("");
    
    const languages = ref({
      en: { nativeName: "English" },
      de: { nativeName: "Deutsch" },
    });
    </script>
    