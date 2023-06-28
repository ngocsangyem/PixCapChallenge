import { Employee } from './types/Employee';
import EmployeeOrgApp from './employeeOrgApp';
import { organizationalStructure } from './data/company_tree';

const app = new EmployeeOrgApp(organizationalStructure);
const moveCta = document.getElementById('move-cta');
const undoCta = document.getElementById('undo-cta');
const redoCta = document.getElementById('redo-cta');
const DEFAULT_EMPLOYEE_ID = 0;

// HTML rendering logic (using vanilla JavaScript)
const renderOrganizationalStructure = () => {
	const gameContainer = document.getElementById('game-container');
	if (!gameContainer) return;

	gameContainer.innerHTML = ''; // Clear the game container

	const renderEmployee = (employee: Employee, container: HTMLElement) => {
		const employeeCard = document.createElement('div');
		employeeCard.classList.add('bg-gray-200', 'rounded', 'p-4');
		employeeCard.textContent = employee.name;

		container.appendChild(employeeCard);

		if (employee.subordinates.length > 0) {
			const subordinatesContainer = document.createElement('div');
			subordinatesContainer.classList.add('pl-4');
			employeeCard.appendChild(subordinatesContainer);

			employee.subordinates.forEach(subordinate => {
				renderEmployee(subordinate, subordinatesContainer);
			});
		}
	}

	renderEmployee(app.CEO, gameContainer);
}

const moveEmployee = (employeeID: number, supervisorID: number) => {
	app.move(employeeID, supervisorID);
	renderOrganizationalStructure();
}

const undoMove = () => {
	app.undo();
	renderOrganizationalStructure();
}

const redoMove = () => {
	app.redo();
	renderOrganizationalStructure();
}

moveCta?.addEventListener('click', () => {
	const employeeIdElement = document.getElementById('employeeId');
	const supervisorElement = document.getElementById('superVisorId');

	const employeeID = employeeIdElement instanceof HTMLInputElement ? Number(employeeIdElement.value) : DEFAULT_EMPLOYEE_ID;
	const supervisorID = supervisorElement instanceof HTMLInputElement ? Number(supervisorElement.value) : DEFAULT_EMPLOYEE_ID;

	moveEmployee(employeeID, supervisorID);

	// Todo: remove duplicate condition check
	if (employeeIdElement instanceof HTMLInputElement) {
		employeeIdElement.value = '';
	}
	if (supervisorElement instanceof HTMLInputElement) {
		supervisorElement.value = '';
	}
});

undoCta?.addEventListener('click', undoMove);
redoCta?.addEventListener('click', redoMove)

// Initial rendering
renderOrganizationalStructure();