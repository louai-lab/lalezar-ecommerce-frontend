import { create } from "zustand";
import axiosInstance from "../Utils/AxiosInstance";
import { set } from "lodash";

export const useCategoriesStore = create((set) => ({
  categories: [],
  loading: true,

  getAllCategories: async () => {
    try {
      set({ loading: true });

      const response = await axiosInstance.get(`/categories`);

      if (response) {
        // console.log(response.data);
        set({
          categories: response.data.categories,
          categoryCount: response.data.categoryCount,
          loading: false,
        });
      }
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));

export const useProductsStore = create((set, get) => ({
  selectedPageNumber: null,
  updateSelectedPageNumber: (pageNumber) => {
    set({ selectedPageNumber: pageNumber });
    // console.log(pageNumber);
  },

  selectedCategoriesId: null,
  updateSelectedCategoriesId: (selectedCategories) => {
    set({ selectedCategoriesId: selectedCategories });
    // console.log(selectedCategories);
  },

  searchName: "",
  updateSearchName: (serachInput) => {
    set({ searchName: serachInput });
    console.log(serachInput);
  },

  products: [],
  loading: true,

  getAllProducts: async () => {
    try {
      set({ loading: true });

      const categoryId = get().selectedCategoriesId || null;

      const pageNumber = get().selectedPageNumber || 1;

      const pageSize = 10;

      const searchName = get().searchName || "";

      // console.log(searchName);

      const url =
        `/products?pageNumber=${pageNumber}&pageSize=${pageSize}` +
        (categoryId ? `&categoryId=${categoryId}` : "") +
        (searchName ? `&searchName=${searchName}` : "");

      const response = await axiosInstance.get(url);

      if (response) {
        // console.log(response.data);
        set({
          products: response.data.products,
          productCount: response.data.productCount,
          loading: false,
        });
      }
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));

export const useClientsStore = create((set) => ({
  clients: [],
  loading: true,

  getAllClients: async () => {
    try {
      set({ loading: true });

      const response = await axiosInstance.get(`/client`);

      if (response) {
        // console.log(response.data);
        set({
          clients: response.data.clients,
          clientCount: response.data.clientCount,
          loading: false,
        });
      }
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));
