import { api } from "../utils/api";

export const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (order) => ({
        url: "",
        method: "POST",
        body: {
          query: `
             mutation createOrder($createOrderInput: CreateOrderInput!) {
              createOrder(createOrderInput: $createOrderInput) {
                id
                status
                startedAt
                items {
                  product {
                    name
                    price
                  }
                  quantity
                }
                table {
                  number
                }
                user {
                  username
                }
              }
            }
          `,
          variables: {
            createOrderInput: order,
          },
        },
      }),
    }),
    findAllOrdersByStatus: build.query({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
        query {
  findAllOrdersByStatus {
    status
    count
  }
}
      `,
        },
      }),
      transformResponse: (response) => {
        return response?.data?.findAllOrdersByStatus;
      },
    }),

    getActiveOrdersWithDuration: build.query({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
        query {
  getActiveOrdersWithDuration {
    id
    status
    totalAmount
    waitingDuration
    avrgWaitingTime
    startedAt
    deliveredAt
    createdAt
    table {
      number
    }
    items {
      id
      quantity
      price
      product {
        id
        name
      }
    }
  }
}
      `,
        },
      }),
      transformResponse: (response) => {
        return response?.data?.getActiveOrdersWithDuration;
      },
    }),
  }),
});

export const {
  useFindAllOrdersByStatusQuery,
  useCreateOrderMutation,
  useGetActiveOrdersWithDurationQuery,
} = orderApi;
