import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DepartmentDTO, DepartmentRequestDTO, DepartmentsApi } from "../../../../openapi";
import { BASE_PATH } from "../../../../openapi/base";


const departments = new DepartmentsApi();

export const departmentApi = createApi({
    reducerPath: 'departmentApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_PATH }),
    endpoints: builder => ({
        getAllDepartments: builder.query<DepartmentDTO[], void>({
            queryFn: async () => {
                const response = await departments.getAllDepartments();
                return response;
            }
        }),
        createDepartment: builder.mutation<DepartmentDTO, DepartmentRequestDTO>({
            queryFn: async (departmentRequestDTO) => {
                const response = await departments.createDepartment(departmentRequestDTO);
                return response;
            }
        }),
        updateDepartment: builder.mutation<DepartmentDTO, { id: number, departmentRequestDTO: DepartmentRequestDTO }>({
            queryFn: async ({ id, departmentRequestDTO }) => {
                const response = await departments.updateDepartment(id, departmentRequestDTO);
                return response;
            }
        })
    })
})

export const { useGetAllDepartmentsQuery, useCreateDepartmentMutation, useUpdateDepartmentMutation } = departmentApi;