import GenericPageTemplate from "../../common/components/GenericPageTemplate";
import GenericDataGrid from "../../common/components/GenericDataGrid";
import Button from "@mui/material/Button";
import { employeesDataGridColumns } from "../../common/utils/dataGrid.utils";
import { useGetAllEmployeesQuery } from "../api/employees.api";

const EmployeeHome: React.FC = () => {
    const { data: employees, isLoading: isEmployeesLoading } = useGetAllEmployeesQuery();

    return (
        <GenericPageTemplate loading={isEmployeesLoading} title="Employees" subtitle="A list of all employees from the organisation" pageActions={[<Button variant="contained">Add New Employee</Button>]}>
            <GenericDataGrid columns={employeesDataGridColumns} rows={employees ?? []} />
        </GenericPageTemplate>
    )
}

export default EmployeeHome;