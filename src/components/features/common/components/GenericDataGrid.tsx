import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import DataGridModel from "../enums/DataGridModel.enums";
import useGenericDataGrid from "../hooks/useGenericDatGrid.hooks";


interface GenericDataGridProps {
    dataGridModel: DataGridModel;
}

const GenericDataGrid: React.FC<GenericDataGridProps> = (props) => {
    const { dataGridModel } = props;
    const { rows, columns } = useGenericDataGrid(dataGridModel);

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
        />
    )
}

export default GenericDataGrid;