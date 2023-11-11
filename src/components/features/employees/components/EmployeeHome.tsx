import GenericPageTemplate from "../../common/components/GenericPageTemplate";
import GenericDataGrid from "../../common/components/GenericDataGrid";
import Button from "@mui/material/Button";
import DataGridModel from "../../common/enums/DataGridModel.enums";

const EmployeeHome: React.FC = () => {

    return (
        <GenericPageTemplate title="Employees" subtitle="A list of all employees is displayed" pageActions={[<Button variant="contained">Add New Employee</Button>]}>
            <GenericDataGrid dataGridModel={DataGridModel.EMPLOYEE} />
        </GenericPageTemplate>
    )
}

export default EmployeeHome;