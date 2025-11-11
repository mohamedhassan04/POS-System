import { api } from "../utils/api";

export const tableApi = api.injectEndpoints({
  endpoints: (build) => ({
    findAllTables: build.query({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
        query {
  findAllTables {
  id
    number
  }
}
      `,
        },
      }),
      transformResponse: (response) => {
        return response?.data?.findAllTables;
      },
    }),
  }),
});

export const { useFindAllTablesQuery } = tableApi;
