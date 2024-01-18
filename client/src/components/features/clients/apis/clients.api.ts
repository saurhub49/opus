import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ClientDTO } from '../../../../openapi';
import { ClientsApi } from "../../../../openapi";
import { BASE_PATH } from '../../../../openapi/base';

const clients = new ClientsApi();

export const clientApi = createApi({
    reducerPath: 'clientApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_PATH }),
    endpoints: (builder) => ({
        getClients: builder.query<ClientDTO[], void>({
            queryFn: async () => {
                const response = await clients.getAllClients();
                return response;
            },
        }),
        createClient: builder.mutation<ClientDTO, ClientDTO>({
            queryFn: async (newClient) => {
                const response = await clients.createClient(newClient);
                return response;
            }
        }),
        updateClient: builder.mutation<ClientDTO, { id: number, updatedClient: ClientDTO }>({
            queryFn: async ({ id, updatedClient }) => {
                const response = await clients.updateClient(id, updatedClient);
                return response;
            }
        })
    })
})

export const { useGetClientsQuery, useCreateClientMutation, useUpdateClientMutation } = clientApi;