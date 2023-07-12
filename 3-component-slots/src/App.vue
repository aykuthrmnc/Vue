<template>
  <Modal>
    <template #title>
      <h3>Slot ile gelen title bilgisi</h3>
    </template>
    <template v-slot:content>
      <p class="text-success">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
        repellendus magnam eos laboriosam. Tenetur fugiat magni earum provident
        animi, necessitatibus dolorem praesentium illo, facilis dolores veniam,
        modi eum nesciunt molestiae.
      </p>
    </template>

    <template #default>
      Bu default olarak gösterilecek
    </template>
  </Modal>
</template>

<script>
import Modal from "./components/Modal.vue";
export default {
  components: { Modal },
};
</script>

<style>
</style>