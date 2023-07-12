import { computed, ref } from "vue";

export default function () {
  const title = ref("Bu bir setup başlık");
  const titleLengthMessage = computed(() => title.value.length + " adet karakter yazdınız.");

  return {
    title,
    titleLengthMessage,
  };
}
