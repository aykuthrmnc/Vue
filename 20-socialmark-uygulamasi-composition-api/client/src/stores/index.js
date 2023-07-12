import { defineStore } from "pinia";
import SecureLS from "secure-ls";
import { ref, computed } from "vue";
var ls = new SecureLS({ isCompression: false });

//! NEW STORAGE
export const useUserStore = defineStore(
  "user",
  () => {
    const state = ref({
      user: null,
      saltKey: "booklike123!456?",
    });

    const setUser = (user) => {
      state.value.user = user;
    };
    const logoutUser = () => {
      state.value.user = null;
    };
    const setLikes = (likeIds) => {
      state.value.user.likes = likeIds;
    };
    const setBookmarks = (bookmarkIds) => {
      state.value.user.bookmarks = bookmarkIds;
    };

    const _isAuthenticated = computed(() => state.value.user !== null);
    const _getCurrentUser = computed(() => {
      const user = state.value.user;
      // if (user !== null && user.hasOwnProperty("password")) {
      //   delete user.password;
      // }
      delete user?.password;
      return user;
    });
    const _currentUserId = computed(() => state.value.user?.id);
    const _userLikes = computed(() => state.value.user?.likes || []);
    const _userBookmarks = computed(() => state.value.user?.bookmarks || []);
    const _saltKey = computed(() => state.value.saltKey);

    return {
      state,
      setUser,
      logoutUser,
      setLikes,
      setBookmarks,
      _isAuthenticated,
      _getCurrentUser,
      _currentUserId,
      _userLikes,
      _userBookmarks,
      _saltKey,
    };
  },
  {
    persist: {
      // paths: ["user.id", "user.username"],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    },
  }
);

//! OLD STORAGE
// export const useUserStore = defineStore({
//   id: "user",
//   state: () => {
//     return {
//       user: null,
//       saltKey: "booklike123!456?",
//     };
//   },
//   actions: {
//     setUser(user) {
//       this.user = user;
//     },
//     logoutUser() {
//       this.user = null;
//     },
//     setLikes(likeIds) {
//       this.user.likes = likeIds;
//     },
//     setBookmarks(bookmarkIds) {
//       this.user.bookmarks = bookmarkIds;
//     },
//   },
//   getters: {
//     _isAuthenticated: (state) => state.user !== null,
//     _getCurrentUser(state) {
//       const user = state.user;
//       // if (user !== null && user.hasOwnProperty("password")) {
//       //   delete user.password;
//       // }
//       delete user?.password;
//       return user;
//     },
//     _currentUserId: (state) => state.user?.id,
//     _userLikes: (state) => state.user?.likes || [],
//     _userBookmarks: (state) => state.user?.bookmarks || [],
//     _saltKey: (state) => state.saltKey,
//   },
//   persist: {
//     // paths: ["user.id", "user.username"],
//     storage: {
//       getItem: (key) => ls.get(key),
//       setItem: (key, value) => ls.set(key, value),
//       removeItem: (key) => ls.remove(key),
//     },
//   },
// });
