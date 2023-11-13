import GenericPageTemplate from "../../common/components/GenericPageTemplate";
import GenericDataGrid from "../../common/components/GenericDataGrid";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";
import { employeeDataGridColumns } from "../../common/utils/dataGrid.utils";
import { useEffect } from "react";
import { getUsers } from "../actions/employee.action";

const EmployeeHome: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(state => state.employees)

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <GenericPageTemplate loading={false} title="Employees" subtitle="A list of all employees is displayed" pageActions={[<Button variant="contained">Add New Employee</Button>]}>
            <GenericDataGrid columns={employeeDataGridColumns} rows={users} />
        </GenericPageTemplate>
    )
}

export default EmployeeHome;