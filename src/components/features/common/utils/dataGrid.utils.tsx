import { Avatar } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";


export const employeeDataGridColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number' },
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

export const rolesDataGridColumns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        type: 'number'
    },
    {
        field: 'roleName',
        headerName: 'Role Name',
        flex: 1
    },
    {
        field: 'roleDescription',
        headerName: 'Role Description',
        flex: 1
    },
    {
        field: 'roleTypeName',
        headerName: 'Role Type Name',
        flex: 1,
    },
]

export const departmentsDataGridColumns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        type: 'number'
    },
    {
        field: 'name',
        headerName: 'Department Name',
        flex: 1
    },
    {
        field: 'description',
        headerName: 'Department Description',
        flex: 1
    },
]

export const employeesDataGridColumns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        type: 'number'
    },
    {
        "field": "employeeId",
        "headerName": "Employee ID",
        "flex": 1
    },
    {
        "field": "firstName",
        "headerName": "First Name",
        "flex": 1
    },
    {
        "field": "lastName",
        "headerName": "Last Name",
        "flex": 1
    },
    {
        "field": "workEmail",
        "headerName": "Email",
        "flex": 1
    },
    {
        "field": "roleName",
        "headerName": "Role",
        "flex": 1
    },
    {
        "field": "departmentName",
        "headerName": "Department",
        "flex": 1
    },
    {
        "field": "hireDate",
        "headerName": "Hire Date",
        "flex": 1,
        valueGetter: ({ value }) => value && moment(new Date(value)).format('LL'),
    },
    {
        "field": "reportingManager",
        "headerName": "Reporting Manager",
        "flex": 1
    }
]
