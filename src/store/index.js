import { defineStore } from "pinia";

export const indexStore = defineStore("main", {
  state: () => ({
    movieItems: [],
    resultOptions: [],
    searchOptions: [],
    createdDiscoveryList: false,
    currentDisplayPage: 0,
  }),
  getters: {},
  actions: {
    // Add items to the cart
    addMovieItem(movieObject) {
      this.movieItems.push(movieObject);
    },

    // Remove items from the cart
    removeMovieItem(arraySlot) {
      this.movieItems.splice(arraySlot, 1);
    },

    // Add movie options to the shopping area
    addResultOption(id) {
      this.resultOptions.push({ id });
    },

    showSearchOption(page) {
      this.resultOptions = this.searchOptions[page];
    },

    // Makes sure that movie options aren't added again when the page loads more then once
    finishList() {
      this.createdDiscoveryList = true;
    },

    // Add page slots into searchOptions
    addPageSearch() {
      this.searchOptions.push([]);
    },

    // Adds results from search axios call to searchOptions
    addResultToPageSearch(page, newID) {
        this.searchOptions[page].push(newID);
    }
  },
});

// Methods can also be async
// Learn getters - modify state variables without actually changing them
