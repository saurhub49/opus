import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"


interface GenericDataGridProps {
    columns: GridColDef<any>[];
    rows: readonly any[]
}

const GenericDataGrid: React.FC<GenericDataGridProps> = (props) => {
    const { columns, rows } = props;

    return (
        <DataGrid
            columns={columns}
            rows={rows}
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
    )
}

export default GenericDataGrid;