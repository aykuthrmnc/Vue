import { ref } from "vue";
export default function () {
  const show = ref(true);
  const toggleIt = () => {
    show.value = !show.value;
  };

  return {
    show,
    toggleIt,
  };
}
