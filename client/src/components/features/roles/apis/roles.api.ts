import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RoleApi, RoleDTO, RoleRequestDTO, RoleTypeDTO, RoleTypesApi } from "../../../../openapi";
import { BASE_PATH } from "../../../../openapi/base";


const roles = new RoleApi();
const roleTypes = new RoleTypesApi();

export const rolesApi = createApi({
    reducerPath: "rolesApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_PATH }),
    endpoints: builder => ({
        getAllRoles: builder.query<RoleDTO[], void>({
            queryFn: async () => {
                const response = await roles.getAllRoles();
                return response;
            }
        }),
        getAllRoleTypes: builder.query<RoleTypeDTO[], void>({
            queryFn: async () => {
                const response = await roleTypes.getAllRoleTypes();
                return response;
            }
        }),
        createRole: builder.mutation<RoleDTO, RoleRequestDTO>({
            queryFn: async (roleRequestDTO) => {
                const response = await roles.createRole(roleRequestDTO);
                return response;
            }
        }),
        updateRole: builder.mutation<RoleDTO, { id: number, roleRequestDTO: RoleRequestDTO }>({
            queryFn:async ({ id, roleRequestDTO }) => {
                const response = await roles.updateRole(id, roleRequestDTO);
                return response;
            }
        })
    })
})

export const { useGetAllRolesQuery, useGetAllRoleTypesQuery, useCreateRoleMutation, useUpdateRoleMutation } = rolesApi;