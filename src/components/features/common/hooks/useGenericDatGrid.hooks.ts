import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";
import DataGridModel from "../enums/DataGridModel.enums";
import { employeeDataGridColumns } from "../utils/dataGrid.utils";
import { getUsers } from "../../employees/actions/employee.action";


function useGenericDataGrid(dataGridModel: DataGridModel) {
    const dispatch = useAppDispatch();
    const rows: any[] = useAppSelector(state => {
        if (dataGridModel === DataGridModel.EMPLOYEE) {
            return state.employees.users;
        } else {
            return [];
        }
    })

    useEffect(() => {
        if (dataGridModel === DataGridModel.EMPLOYEE) {
            dispatch(getUsers());
        }
    }, [dataGridModel, dispatch]);

    const columns = useMemo(() => {
        if (dataGridModel === DataGridModel.EMPLOYEE) {
            return employeeDataGridColumns;
        } else {
            return [];
        }
    }, [dataGridModel]);

    return  { rows, columns };
}

export default useGenericDataGrid;