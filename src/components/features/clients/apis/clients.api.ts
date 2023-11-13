import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ClientDTO } from '../../../../openapi';
import { ClientsApi } from "../../../../openapi";

const clientsApi = new ClientsApi();

export const clientActions = createApi({
    reducerPath: 'clientActions',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints: (builder) => ({
        getClients: builder.query<ClientDTO[], void>({
            queryFn: async () => {
                const response = await clientsApi.getAllClients();
                return response;
            },
        }),
        createClient: builder.mutation<ClientDTO, ClientDTO>({
            queryFn: async (newClient) => {
                const response = await clientsApi.createClient(newClient);
                return response;
            }
        }),
        updateClient: builder.mutation<ClientDTO, { id: number, updatedClient: ClientDTO }>({
            queryFn: async ({ id, updatedClient }) => {
                const response = await clientsApi.updateClient(id, updatedClient);
                return response;
            }
        })
    })
})

export const { useGetClientsQuery, useCreateClientMutation, useUpdateClientMutation } = clientActions;