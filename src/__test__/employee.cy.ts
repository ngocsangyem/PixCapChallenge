import EmployeeOrgApp from '../employeeOrgApp';
import { organizationalStructure } from '../data/company_tree';

describe('EmployeeOrgApp', () => {
	let app: EmployeeOrgApp;

	beforeEach(() => {
		app = new EmployeeOrgApp(organizationalStructure);
	});

	it('should move an employee to a new supervisor', () => {
		app.move(2, 11); // Move Bruce Willis under Tyler Simpson

		const bruceWillis = app.findEmployeeByID(app.CEO, 2);
		const tylerSimpson = app.findEmployeeByID(app.CEO, 11);
		const bruceWillisSubordinates = bruceWillis.subordinates;

		expect(bruceWillis.name).toBe('Bruce Willis');
		expect(tylerSimpson.name).toBe('Tyler Simpson');
		expect(bruceWillisSubordinates).toHaveLength(0);
		expect(tylerSimpson.subordinates).toContainEqual(bruceWillis);
	});

	it('should undo the last move action', () => {
		app.move(2, 11); // Move Bruce Willis under Tyler Simpson
		app.undo(); // Undo the last move action

		const bruceWillis = app.findEmployeeByID(app.CEO, 2);
		const sarahDonald = app.findEmployeeByID(app.CEO, 5);
		const bruceWillisSubordinates = bruceWillis.subordinates;

		expect(bruceWillis.name).toBe('Bruce Willis');
		expect(sarahDonald.name).toBe('Sarah Donald');
		expect(bruceWillisSubordinates).toHaveLength(0);
	});

	it('should redo the last undone action', () => {
		app.move(2, 11); // Move Bruce Willis under Tyler Simpson
		app.undo(); // Undo the last move action
		app.redo(); // Redo the last undone action

		const bruceWillis = app.findEmployeeByID(app.CEO, 2);
		const tylerSimpson = app.findEmployeeByID(app.CEO, 11);
		const bruceWillisSubordinates = bruceWillis.subordinates;

		expect(bruceWillis.name).toBe('Bruce Willis');
		expect(tylerSimpson.name).toBe('Tyler Simpson');
		expect(bruceWillisSubordinates).toHaveLength(0);
		expect(tylerSimpson.subordinates).toContainEqual(bruceWillis);
	});
});