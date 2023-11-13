import { DataGrid, GridColDef, GridEventListener, GridToolbar } from "@mui/x-data-grid"

interface GenericDataGridProps {
    columns: GridColDef[];
    rows: any[];
    onRowClick?: GridEventListener<"rowClick"> | undefined;
}

const GenericDataGrid: React.FC<GenericDataGridProps> = (props) => {
    const { rows, columns, onRowClick } = props;

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
                },
                '& .MuiDataGrid-columnHeader:focus': {
                    outline: 'none'
                },
            }}
            density="comfortable"
            onRowClick={onRowClick}
        />
    )
}

export default GenericDataGrid;