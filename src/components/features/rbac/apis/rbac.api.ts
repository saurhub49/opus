import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RoleTypeAuthorization, RoleTypeAuthorizationConfigurationDTO, RoleTypeAuthorizationConfigurationDTOPermissionEnum, RoleTypesApi } from "../../../../openapi";
import { BASE_PATH } from "../../../../openapi/base";


const roleTypeApi = new RoleTypesApi();

export const rbacApi = createApi({
    reducerPath: 'rbacApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_PATH }),
    endpoints: builder => ({
        getAllRoleTypeAuthorizations: builder.query<RoleTypeAuthorization[], void>({
            queryFn: async () => {
                const response = await roleTypeApi.getAllRoleTypeAuthorizations();
                return response;
            },
        }),
        addOrRemoveRoleTypeAuthorizations: builder
            .mutation<void, { entity: string, permission: RoleTypeAuthorizationConfigurationDTOPermissionEnum, roleTypeId: number, value: boolean }>
            ({
                queryFn: async ({ entity, permission, roleTypeId, value }) => {
                    const roleTypeAuthorizationConfigurationDTO: RoleTypeAuthorizationConfigurationDTO = {
                        entity, permission, roleTypeId, value
                    }
                    const response = await roleTypeApi.addOrRemoveRoleTypeAuthorization(roleTypeAuthorizationConfigurationDTO);
                    return response;
                }
            }),
    })
});

export const { useGetAllRoleTypeAuthorizationsQuery, useAddOrRemoveRoleTypeAuthorizationsMutation } = rbacApi;