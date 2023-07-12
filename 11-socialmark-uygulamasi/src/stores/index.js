import { defineStore } from "pinia";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      user: null,
      saltKey: "booklike123!456?",
    };
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    logoutUser() {
      this.user = null;
    },
    setLikes(likeIds) {
      this.user.likes = likeIds;
    },
    setBookmarks(bookmarkIds) {
      this.user.bookmarks = bookmarkIds;
    },
  },
  getters: {
    _isAuthenticated: (state) => state.user !== null,
    _getCurrentUser(state) {
      const user = state.user;
      // if (user !== null && user.hasOwnProperty("password")) {
      //   delete user.password;
      // }
      delete user?.password;
      return user;
    },
    _currentUserId: (state) => state.user?.id,
    _userLikes: (state) => state.user.likes || [],
    _userBookmarks: (state) => state.user.bookmarks || [],
    _saltKey: (state) => state.saltKey,
  },
  persist: {
    // paths: ["user.id", "user.username"],
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },
  },
});
