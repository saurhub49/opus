import React, { useCallback, useEffect } from "react";
import GenericDataGrid from "../../common/components/GenericDataGrid";
import GenericPageTemplate from "../../common/components/GenericPageTemplate";
import { rolesDataGridColumns } from "../../common/utils/dataGrid.utils";
import { useCreateRoleMutation, useGetAllRoleTypesQuery, useGetAllRolesQuery, useUpdateRoleMutation } from "../apis/roles.api";
import { RoleDTO, RoleRequestDTO } from "../../../../openapi";
import useGenericModal from "../../common/hooks/useGenericModal.hook";
import GenericModal from "../../common/components/GenericModal";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import GenericTextField from "../../common/components/GenericTextField";
import CircularLoading from "../../common/components/CircularLoading";
import GenericButton from "../../common/components/GenericButton";
import { GridRowParams } from "@mui/x-data-grid";
import { convertUppercaseStringsWithUnderscoresToReadableString } from "../../common/utils/common.utils";

const initialRoleState: RoleDTO = {
    id: 0,
    roleName: '',
    roleDescription: '',
    roleTypeId: 0,
    roleTypeName: undefined,
}

const RolesHome: React.FC = () => {
    const { modalOpen, openModalHandler, closeModalHandler, modalState: roleState, setModalState: setRoleState, onChangeHandler } = useGenericModal(initialRoleState);
    const { data: roles, isLoading: isRolesLoading, refetch: refetchRoles, isFetching: isRolesFetching } = useGetAllRolesQuery();
    const { data: roleTypes, isLoading: isRoleTypesLoading } = useGetAllRoleTypesQuery();
    const [createRole, createRoleResult] = useCreateRoleMutation();
    const [updateRole, updateRoleResult] = useUpdateRoleMutation();

    const onChangeSelectedRoleTypeHandler = React.useCallback((event: SelectChangeEvent) => {
        if (!!roleTypes) {
            const currentRoleType = roleTypes.find(roleType => roleType.id === Number(event.target.value));

            if (!!currentRoleType) {
                onChangeHandler('roleTypeId', currentRoleType.id);
            }
        }
    }, [onChangeHandler, roleTypes]);

    const onCreateRoleHandler = useCallback(() => {
        const roleRequestDTO: RoleRequestDTO = {
            roleName: roleState.roleName,
            roleDescription: roleState.roleDescription,
            roleTypeId: roleState.roleTypeId,
        }
        createRole(roleRequestDTO);
    }, [createRole, roleState]);

    const onUpdateRoleHandler = useCallback(() => {
        const roleRequestDTO: RoleRequestDTO = {
            roleName: roleState.roleName,
            roleDescription: roleState.roleDescription,
            roleTypeId: roleState.roleTypeId,
        }
        updateRole({ id: roleState.id ?? 0, roleRequestDTO });
    }, [roleState.id, roleState.roleDescription, roleState.roleName, roleState.roleTypeId, updateRole]);

    const onRowClickHandler = useCallback((params: GridRowParams<RoleDTO>) => {
        setRoleState(params.row);
        openModalHandler();
    }, [openModalHandler, setRoleState]);

    useEffect(() => {
        if (createRoleResult.isSuccess) {
            closeModalHandler();
            refetchRoles();
            createRoleResult.reset();
        }
    }, [closeModalHandler, createRoleResult, refetchRoles]);

    useEffect(() => {
        if (updateRoleResult.isSuccess) {
            closeModalHandler();
            refetchRoles();
            updateRoleResult.reset();
        }
    }, [closeModalHandler, updateRoleResult, refetchRoles]);

    return (
        <GenericPageTemplate
            loading={isRolesLoading || isRolesFetching}
            title="Roles"
            subtitle="Roles in your organization"
            pageActions={[<Button variant="contained"
                onClick={openModalHandler}
            >
                Add New Role
            </Button>]}>
            <GenericDataGrid columns={rolesDataGridColumns} rows={roles ?? []} onRowClick={onRowClickHandler} />
            <GenericModal open={modalOpen} handleClose={closeModalHandler}>
                {isRoleTypesLoading ?
                    <CircularLoading /> :
                    <>
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                                Enter Role details
                            </Typography>
                            <GenericTextField<RoleDTO, 'roleName'>
                                field='roleName'
                                label='Role Name'
                                onChange={onChangeHandler}
                                required
                                value={roleState.roleName}
                            />
                            <GenericTextField<RoleDTO, 'roleDescription'>
                                field='roleDescription'
                                label='Role Description'
                                onChange={onChangeHandler}
                                required
                                value={roleState.roleDescription}
                                sx={{
                                    mt: 1
                                }}
                            />
                            {roleTypes &&
                                <FormControl fullWidth sx={{
                                    mt: 3
                                }}>
                                    <InputLabel id="roleTypeId">Role Type</InputLabel>
                                    <Select
                                        labelId="roleTypeId"
                                        value={String(roleState.roleTypeId)}
                                        label="Role Type"
                                        onChange={onChangeSelectedRoleTypeHandler}
                                        required
                                    >
                                        {
                                            roleTypes.map((roleType) => (
                                                <MenuItem key={roleType.id} value={roleType.id}>{convertUppercaseStringsWithUnderscoresToReadableString(roleType.name ?? '')}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>}
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
                                    onClick={roleState.id === 0 ? onCreateRoleHandler : onUpdateRoleHandler}
                                    sx={{ mt: 3, ml: 1 }}
                                    loading={createRoleResult.isLoading || updateRoleResult.isLoading}
                                >
                                    Save
                                </GenericButton>
                            </Box>
                        </React.Fragment>
                    </>}
            </GenericModal>
        </GenericPageTemplate>
    )
}

export default RolesHome;