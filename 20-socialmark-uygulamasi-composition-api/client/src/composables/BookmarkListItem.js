import { computed, inject } from "vue";
import { useUserStore } from "@/stores";
export default function (item) {

  const appAxios = inject("appAxios");
  const userStore = useUserStore();

  const likeItem = () => {
    appAxios({
      url: alreadyLiked.value ? `/user_likes/${likedItem.value.id}` : "/user_likes",
      method: alreadyLiked.value ? "DELETE" : "POST",
      data: {
        userId: userStore._getCurrentUser.id,
        bookmarkId: item.id,
      },
    }).then((res) => {
      let bookmarks = [...userStore._userLikes];
      if (alreadyLiked.value) {
        bookmarks = bookmarks.filter((b) => b.id !== likedItem.value.id);
      } else {
        bookmarks = [...bookmarks, res.data];
      }
      userStore.setLikes(bookmarks);
    });
  };
  const bookmarkItem = () => {
    appAxios({
      url: alreadyBookmarked.value ? `/user_bookmarks/${bookmarkedItem.value.id}` : "/user_bookmarks",
      method: alreadyBookmarked.value ? "DELETE" : "POST",
      data: {
        userId: userStore._getCurrentUser.id,
        bookmarkId: item.id,
      },
    }).then((res) => {
      let bookmarks = [...userStore._userBookmarks];
      if (alreadyBookmarked.value) {
        bookmarks = bookmarks.filter((b) => b.id !== bookmarkedItem.value.id);
      } else {
        bookmarks = [...bookmarks, res.data];
      }
      userStore.setBookmarks(bookmarks);
    });
  };

  const categoryName = computed(() => item?.category?.name || "-");
  const userName = computed(() => item?.user?.fullname || "-");
  const alreadyLiked = computed(() => Boolean(likedItem.value));
  const alreadyBookmarked = computed(() => Boolean(bookmarkedItem.value));
  const likedItem = computed(() => userStore._userLikes?.find((i) => i.bookmarkId === item.id));
  const bookmarkedItem = computed(() => userStore._userBookmarks?.find((i) => i.bookmarkId === item.id));
  return {
    likeItem,
    bookmarkItem,
    categoryName,
    userName,
    alreadyLiked,
    alreadyBookmarked,
    likedItem,
    bookmarkedItem,
  };
}
