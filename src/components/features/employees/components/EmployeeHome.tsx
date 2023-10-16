import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppSelector } from "../../../../global/redux/hooks";


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

const EmployeeHome: React.FC = () => {
    const users = useAppSelector(state => state.employees.users);

    return (
        <>
            <h1>Employee Grid</h1>
            <DataGrid
                columns={columns}
                rows={users.content ?? []}
            />
        </>
    )
}

export default EmployeeHome;