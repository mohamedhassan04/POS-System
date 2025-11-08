import { api } from "../utils/api";

export interface LoginInput {
  username: string;
  password: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            mutation Login($loginUserInput: LoginUserInput!) {
              login(loginUserInput: $loginUserInput) {
                name
                access_token
              }
            }
          `,
          variables: {
            loginUserInput: credentials,
          },
        },
      }),
    }),

    getCurrentUser: build.query({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query {
              current {
                status
                success {
                  id
                  name
                  access_token
                }
              }
            }
          `,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery } = authApi;
