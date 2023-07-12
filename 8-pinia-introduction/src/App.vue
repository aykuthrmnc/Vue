<template>
  <!-- <p>{{ user.contactName }}</p>
  <p>{{ user._contactName }}</p>
  <p>{{ soyadEkle }}</p> -->
  <div class="container">
    <h3>Alışveriş Listesi</h3>
    <div>
      <input type="text" placeholder="Ne alacaksın?" @keydown.enter="user.onSave" />
    </div>
    <item-list />
    <small class="text-primary d-block text-end">{{ itemCount }} adet alınacak ürün vardır.</small>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import ItemList from "@/components/ItemList.vue";
export default {
  components: { ItemList },
  setup() {
    const user = useUserStore();
    return { user };
  },
  mounted() {
    this.user.getItems();
  },
  computed: {
    soyadEkle() {
      return this.user._contactName + " " + this.user.contactLastName;
    },
    itemCount() {
      return this.user.itemList.length;
    },
  },
};
</script>
