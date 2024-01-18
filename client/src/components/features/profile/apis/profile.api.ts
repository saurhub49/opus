import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProfileDetailsDTO, ProfileUpdateDTO, UsersApi } from "../../../../openapi";
import { BASE_PATH } from "../../../../openapi/base";


const users = new UsersApi();

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_PATH }),
    endpoints: builder => ({
        updateProfile: builder.mutation<ProfileDetailsDTO, ProfileUpdateDTO>({
            queryFn: async (profileUpdateDTO) => {
                const response = await users.updateUserProfile(profileUpdateDTO);
                return response;
            }
        })
    })
})

export const { useUpdateProfileMutation } = profileApi