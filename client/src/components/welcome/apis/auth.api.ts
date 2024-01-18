import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_PATH } from "../../../openapi/base";
import { AuthControllerApi, ConfirmUserDTO } from "../../../openapi";

const auth = new AuthControllerApi();

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_PATH }),
    endpoints: builder => ({
        confirmUser: builder.mutation<string, ConfirmUserDTO>({
            queryFn: async (user) => {
                const response = await auth.confirmUser(user);
                return response;
            }
        })
    })
})

export const { useConfirmUserMutation } = authApi;