import { Avatar } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";


export const employeeDataGridColumns: GridColDef[] = [
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

export const clientsDataGridColumns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        flex: 1,
        type: 'number'
    },
    {
        field: 'pictureUrl',
        headerName: 'Logo',
        flex: 1,
        renderCell: (params) => <Avatar alt="O" src={params.value} />
    },
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
    },
    {
        field: 'createdDate',
        headerName: 'Created Date',
        flex: 1,
        valueGetter: ({ value }) => value && moment(new Date(value)).format('LL'),
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        type: 'boolean'
    },
    {
        field: 'website',
        headerName: 'Website',
        flex: 1,
    }
]