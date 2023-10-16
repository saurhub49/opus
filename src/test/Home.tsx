
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../global/redux/hooks";
import { useEffect } from "react";
import { getUsers } from "../components/features/employees/actions/employee.action";
import { CssBaseline } from "@mui/material";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, type: 'number' },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'middleName', headerName: 'Middle Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'dateOfBirth', headerName: 'Date of Birth', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'nationality', headerName: 'Nationality', flex: 1 },
    { field: 'maritalStatus', headerName: 'Marital Status', flex: 1 },
];

const Home = () => {
    const users = useAppSelector(state => state.employees.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <>

            <CssBaseline />
            <h1>Employee Grid</h1>
            <DataGrid
                columns={columns}
                rows={users.content ?? []}
                slots={{
                    toolbar: GridToolbar,

                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                pageSizeOptions={[100, 10, 25, 50]}
                pagination
                checkboxSelection={false}
                sx={{
                    boxShadow: 2,
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold'
                    },
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none'
                    }
                }}
                density="comfortable"
            />
        </>
    )
}

export default Home;