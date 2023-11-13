import { Box, Button, Grid, Typography } from "@mui/material";
import GenericDataGrid from "../../common/components/GenericDataGrid";
import GenericPageTemplate from "../../common/components/GenericPageTemplate";
import { useCallback, useEffect, useState } from "react";
import GenericModal from "../../common/components/GenericModal";
import { ClientDTO } from "../../../../openapi";
import { clientsDataGridColumns } from "../../common/utils/dataGrid.utils";
import GenericTextField from "../../common/components/GenericTextField";
import React from "react";
import GenericButton from "../../common/components/GenericButton";
import { useCreateClientMutation, useGetClientsQuery, useUpdateClientMutation } from "../apis/clients.api";
import { GridRowParams } from "@mui/x-data-grid";
import GenericCheckbox from "../../common/components/GenericCheckbox";

const initialState: ClientDTO = {
    id: 0,
    name: '',
    createdDate: '',
    status: true,
    pictureUrl: '',
    website: '',
}

const ClientsHome: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [clientState, setClientState] = useState<ClientDTO>(initialState);
    const { data: clients, isLoading: loading, refetch: refetchClients } = useGetClientsQuery();
    const [createClient, createClientResult] = useCreateClientMutation();
    const [updateClient, updateClientResult] = useUpdateClientMutation();

    const openModalHandler = useCallback(() => {
        setModalOpen(true);
    }, []);

    const closeModalHandler = useCallback(() => {
        setModalOpen(false);
        setClientState(initialState);
    }, []);

    const onChangeHandler = useCallback(<K extends keyof ClientDTO>(field: K, value: ClientDTO[K]) => {
        setClientState(prevState => ({ ...prevState, [field]: value }))
    }, []);

    const onCreateClientHandler = useCallback(() => {
        createClient(clientState);
    }, [clientState, createClient]);

    const onUpdateClientHandler = useCallback(() => {
        updateClient({ id: clientState.id ?? 0, updatedClient: clientState });
    }, [clientState, updateClient]);

    const onRowClickHandler = useCallback((params: GridRowParams<ClientDTO>) => {
        setClientState(params.row);
        setModalOpen(true);
    }, []);

    useEffect(() => {
        if (createClientResult.isSuccess) {
            closeModalHandler();
            refetchClients();
            createClientResult.reset();
        }
    }, [closeModalHandler, createClientResult, createClientResult.isSuccess, refetchClients]);

    useEffect(() => {
        if (updateClientResult.isSuccess) {
            closeModalHandler();
            refetchClients();
            updateClientResult.reset();
        }
    }, [closeModalHandler, updateClientResult, updateClientResult.isSuccess, refetchClients]);

    return (
        <GenericPageTemplate loading={loading} title="Clients" subtitle="A list of all clients is displayed" pageActions={[<Button variant="contained" onClick={openModalHandler}>Add New Client</Button>]}>
            <GenericDataGrid columns={clientsDataGridColumns} rows={clients ?? []} onRowClick={onRowClickHandler} />
            <GenericModal open={modalOpen} handleClose={closeModalHandler}>
                <>
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Enter client details
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <GenericTextField<ClientDTO, 'name'>
                                    field={"name"}
                                    label={"Name"}
                                    required={true}
                                    value={clientState.name}
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GenericTextField<ClientDTO, 'pictureUrl'>
                                    field={"pictureUrl"}
                                    label={"Logo Url"}
                                    required={false}
                                    value={clientState.pictureUrl}
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GenericTextField<ClientDTO, 'website'>
                                    field={"website"}
                                    label={"Website"}
                                    required={false}
                                    value={clientState.website}
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GenericCheckbox<ClientDTO, 'status'>
                                    field={"status"}
                                    label={"Status"}
                                    required={true}
                                    value={!!clientState.status}
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                        </Grid>
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
                                onClick={clientState.id === 0 ? onCreateClientHandler : onUpdateClientHandler}
                                sx={{ mt: 3, ml: 1 }}
                                loading={createClientResult.isLoading}
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

export default ClientsHome;