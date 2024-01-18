import React, { useCallback, useEffect } from "react";
import { DepartmentDTO, DepartmentRequestDTO } from "../../../../openapi";
import useGenericModal from "../../common/hooks/useGenericModal.hook";
import { useCreateDepartmentMutation, useGetAllDepartmentsQuery, useUpdateDepartmentMutation } from "../apis/departments.api";
import { Box, Button, Typography } from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import { departmentsDataGridColumns } from "../../common/utils/dataGrid.utils";
import GenericButton from "../../common/components/GenericButton";
import GenericDataGrid from "../../common/components/GenericDataGrid";
import GenericModal from "../../common/components/GenericModal";
import GenericPageTemplate from "../../common/components/GenericPageTemplate";
import GenericTextField from "../../common/components/GenericTextField";

const initialDepartmentState: DepartmentDTO = {
    id: 0,
    name: '',
    description: '',
}

const DepartmentsHome: React.FC = () => {
    const { modalOpen, openModalHandler, closeModalHandler, modalState: departmentState, setModalState: setDepartmentState, onChangeHandler } = useGenericModal(initialDepartmentState);
    const { data: departments, isLoading: isDepartmentsLoading, refetch: refetchDepartments, isFetching: isDepartmentsFetching } = useGetAllDepartmentsQuery();
    const [createDepartment, createDepartmentResult] = useCreateDepartmentMutation();
    const [updateDepartment, updateDepartmentResult] = useUpdateDepartmentMutation();

    const onCreateDepartmentHandler = useCallback(() => {
        const departmentRequestDTO: DepartmentRequestDTO = {
            name: departmentState.name,
            description: departmentState.description,
        };
        createDepartment(departmentRequestDTO);
    }, [createDepartment, departmentState]);

    const onUpdateDepartmentHandler = useCallback(() => {
        const departmentRequestDTO: DepartmentRequestDTO = {
            name: departmentState.name,
            description: departmentState.description,
        };

        updateDepartment({ id: departmentState.id ?? 0, departmentRequestDTO });
    }, [departmentState.name, departmentState.description, departmentState.id, updateDepartment]);

    const onRowClickHandler = useCallback((params: GridRowParams<DepartmentDTO>) => {
        setDepartmentState(params.row);
        openModalHandler();
    }, [openModalHandler, setDepartmentState]);

    useEffect(() => {
        if (createDepartmentResult.isSuccess) {
            closeModalHandler();
            refetchDepartments();
            createDepartmentResult.reset();
        }
    }, [closeModalHandler, createDepartmentResult, refetchDepartments]);

    useEffect(() => {
        if (updateDepartmentResult.isSuccess) {
            closeModalHandler();
            refetchDepartments();
            updateDepartmentResult.reset();
        }
    }, [closeModalHandler, updateDepartmentResult, refetchDepartments]);

    return (
        <GenericPageTemplate
            loading={isDepartmentsLoading || isDepartmentsFetching}
            title="Departments"
            subtitle="Departments in your organization"
            pageActions={[<Button variant="contained"
                onClick={openModalHandler}
            >
                Add New Departmment
            </Button>]}>
            <GenericDataGrid columns={departmentsDataGridColumns} rows={departments ?? []} onRowClick={onRowClickHandler} />
            <GenericModal open={modalOpen} handleClose={closeModalHandler}>
                <>
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Enter Department details
                        </Typography>
                        <GenericTextField<DepartmentDTO, 'name'>
                            field='name'
                            label='Department Name'
                            onChange={onChangeHandler}
                            required
                            value={departmentState.name}
                        />
                        <GenericTextField<DepartmentDTO, 'description'>
                            field='description'
                            label='Department Description'
                            onChange={onChangeHandler}
                            required
                            value={departmentState.description}
                            sx={{
                                mt: 1
                            }}
                        />
                    </React.Fragment>
                    <React.Fragment>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <GenericButton
                                onClick={closeModalHandler}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Cancel
                            </GenericButton>
                            <GenericButton
                                variant='contained'
                                onClick={departmentState.id === 0 ? onCreateDepartmentHandler : onUpdateDepartmentHandler}
                                sx={{ mt: 3, ml: 1 }}
                                loading={createDepartmentResult.isLoading || updateDepartmentResult.isLoading}
                            >
                                Save
                            </GenericButton>
                        </Box>
                    </React.Fragment>
                </>
            </GenericModal>
        </GenericPageTemplate>
    )
}

export default DepartmentsHome;