import { api } from "../utils/api";

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    findAllCategory: build.query({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query {
               findAllCategories {
                 id
                 name
                 products {
                 name
                 price
    }
  }
            }
          `,
        },
      }),
    }),

    findAllProductsByCategory: build.query({
      query: (categoryId: string) => ({
        url: "",
        method: "POST",
        body: {
          query: `
        query ($categoryId: String!) {
          findAllProductsByCategory(categoryId: $categoryId) {
            id
            name
            price
          }
        }
      `,
          variables: { categoryId },
        },
      }),
      transformResponse: (response) => {
        return response?.data?.findAllProductsByCategory;
      },
    }),
  }),
});

export const { useFindAllCategoryQuery, useFindAllProductsByCategoryQuery } =
  categoryApi;
