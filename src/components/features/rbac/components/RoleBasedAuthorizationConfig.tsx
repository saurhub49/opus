import { Box, Checkbox, Chip, Divider, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAddOrRemoveRoleTypeAuthorizationsMutation, useGetAllRoleTypeAuthorizationsQuery } from "../apis/rbac.api";
import React from "react";
import { RoleTypeAuthorization, RoleTypeAuthorizationConfigurationDTO, RoleTypeAuthorizationConfigurationDTOPermissionEnum, RoleTypeEntityPermission } from "../../../../openapi";
import GenericPageTemplate from "../../common/components/GenericPageTemplate";
import { convertUppercaseStringsWithUnderscoresToReadableString } from "../../common/utils/common.utils";
import { convertStringToRoleTypeAuthorizationConfigurationDTOPermissionEnum } from "../utils/rbac.utils";



const RoleBasedAuthorizationConfig: React.FC = () => {
    const [selectedRoleType, setSelectedRoleType] = React.useState<RoleTypeAuthorization | null>(null);
    const { data, isLoading, refetch, isFetching } = useGetAllRoleTypeAuthorizationsQuery();
    const [addOrRemoveRoleTypeAuthorizations, addOrRemoveRoleTypeAuthorizationsResult] = useAddOrRemoveRoleTypeAuthorizationsMutation();

    const onChangeSelectedRoleTypeHandler = React.useCallback((event: SelectChangeEvent) => {
        if (!!data) {
            const currentRoleType = data.find(roleType => roleType.id === Number(event.target.value));

            if (!!currentRoleType) {
                setSelectedRoleType(currentRoleType);
            }
        }
    }, [data]);

    const onClickEntityPermissionChangeHandler = React.useCallback(
        (
            entity: string,
            permissionType: RoleTypeAuthorizationConfigurationDTOPermissionEnum | null,
            checked: boolean
        ) => {
            if (!!selectedRoleType && !!selectedRoleType.id && !!permissionType) {
                const request: RoleTypeAuthorizationConfigurationDTO = {
                    entity: entity,
                    permission: permissionType,
                    roleTypeId: selectedRoleType.id,
                    value: checked,
                }
                addOrRemoveRoleTypeAuthorizations(request);
            }
        }, [addOrRemoveRoleTypeAuthorizations, selectedRoleType]);

    React.useEffect(() => {
        if (!!data && !!!selectedRoleType) {
            setSelectedRoleType(data[0])
        }
    }, [data, isLoading, selectedRoleType]);

    React.useEffect(() => {
        if (!isLoading && addOrRemoveRoleTypeAuthorizationsResult.isSuccess) {
            addOrRemoveRoleTypeAuthorizationsResult.reset();
            refetch()
                .then((response) => {
                    if (!!response.data) {
                        const currentRoleType = response.data.find(roleType => roleType.id === selectedRoleType?.id);

                        if (!!currentRoleType) {
                            setSelectedRoleType(currentRoleType);
                        }
                    }
                });
        }
    }, [addOrRemoveRoleTypeAuthorizationsResult, data, isLoading, refetch, selectedRoleType?.id]);

    return (
        <GenericPageTemplate
            loading={false}
            title="Role Types"
            subtitle="Authorizations for all role types"
            pageActions={[
                <Box>
                    {selectedRoleType && <FormControl fullWidth>
                        <InputLabel>Role Type</InputLabel>
                        <Select
                            value={String(selectedRoleType.id)}
                            label="Role Type"
                            onChange={onChangeSelectedRoleTypeHandler}
                        >
                            {
                                data && data.map((roleType) => (
                                    <MenuItem key={roleType.id} value={roleType.id}>{roleType.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>}
                </Box>
            ]}
        >
            {!!selectedRoleType &&
                <>
                    <Divider>
                        <Chip label={selectedRoleType.name} color="primary" variant="outlined" />
                    </Divider>
                    <TableContainer component={Paper} sx={{ my: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="body1" fontWeight="bold">
                                            Entity
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1" fontWeight="bold">
                                            Read
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1" fontWeight="bold">
                                            Create
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1" fontWeight="bold">
                                            Update
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1" fontWeight="bold">
                                            Delete
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    isLoading || isFetching ? (
                                        Array.from({ length: 8 }).map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Skeleton variant="text" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton variant="rectangular" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton variant="rectangular" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton variant="rectangular" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton variant="rectangular" />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        selectedRoleType.entityPermissions && (
                                            Object.entries(selectedRoleType.entityPermissions).map(([entity, permissions]) => (
                                                <RoleBasedAuthorizationConfigEntityRow
                                                    entity={entity}
                                                    permissions={permissions}
                                                    onClickEntityPermissionChangeHandler={onClickEntityPermissionChangeHandler}
                                                    key={entity}
                                                />
                                            ))
                                        )
                                    )

                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>}
        </GenericPageTemplate>
    )
}

interface RoleBasedAuthorizationConfigEntityRowProps {
    entity: string;
    permissions: RoleTypeEntityPermission;
    onClickEntityPermissionChangeHandler:
    (
        entity: string,
        permissionType: RoleTypeAuthorizationConfigurationDTOPermissionEnum | null,
        checked: boolean
    ) => void;
}

const RoleBasedAuthorizationConfigEntityRow: React.FC<RoleBasedAuthorizationConfigEntityRowProps> = (props) => {
    const { entity, permissions, onClickEntityPermissionChangeHandler } = props;

    const onClickCheckboxHandler = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onClickEntityPermissionChangeHandler(
            entity,
            convertStringToRoleTypeAuthorizationConfigurationDTOPermissionEnum(event.target.id),
            event.target.checked);
    }, [entity, onClickEntityPermissionChangeHandler]);

    return (
        <TableRow key={entity}>
            <TableCell>
                <Typography variant="body1">
                    {convertUppercaseStringsWithUnderscoresToReadableString(entity)}
                </Typography>
            </TableCell>
            <TableCell>
                <Checkbox
                    id={RoleTypeAuthorizationConfigurationDTOPermissionEnum.Read}
                    checked={permissions.read}
                    onChange={onClickCheckboxHandler}
                />
            </TableCell>
            <TableCell>
                <Checkbox
                    id={RoleTypeAuthorizationConfigurationDTOPermissionEnum.Create}
                    checked={permissions.create}
                    onChange={onClickCheckboxHandler}
                />
            </TableCell>
            <TableCell>
                <Checkbox
                    id={RoleTypeAuthorizationConfigurationDTOPermissionEnum.Update}
                    checked={permissions.update}
                    onChange={onClickCheckboxHandler}
                />
            </TableCell>
            <TableCell>
                <Checkbox
                    id={RoleTypeAuthorizationConfigurationDTOPermissionEnum.Delete}
                    checked={permissions.delete}
                    onChange={onClickCheckboxHandler}
                />
            </TableCell>
        </TableRow>
    )
}

export default RoleBasedAuthorizationConfig;