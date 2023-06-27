import EmployeeOrgApp from './employeeOrgApp';
import { ceo } from './data/company_tree';

// Instantiate the EmployeeOrgApp
const app = new EmployeeOrgApp(ceo);

// Move an employee
app.move(7, 3); // Move Bob Saget to be subordinate of Sarah Donald

// Print the updated organizational structure
console.log(app.CEO);

// Undo the move action
app.undo();

// Print the organizational structure after undoing the move action
console.log(app.CEO);

// Redo the move action
app.redo();

// Print the organizational structure after redoing the move action
console.log(app.CEO);