import { Employee } from './types/Employee';
import EmployeeOrgApp from './employeeOrgApp';
import { ceo } from './data/company_tree';


const app = new EmployeeOrgApp(ceo);

// HTML rendering logic (using vanilla JavaScript)
function renderOrganizationalStructure() {
  const gameContainer = document.getElementById('game-container');
  if (!gameContainer) return;

  gameContainer.innerHTML = ''; // Clear the game container

  function renderEmployee(employee: Employee, container: HTMLElement) {
    const employeeCard = document.createElement('div');
    employeeCard.classList.add('bg-gray-200', 'rounded', 'p-4', 'mb-4');
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

  // Create buttons for moving employees, undoing moves, and redoing moves
  const moveButton = document.createElement('button');
  moveButton.textContent = 'Move Employee';
  moveButton.addEventListener('click', () => {
    const employeeID = Number(prompt('Enter the Employee ID to move'));
    const supervisorID = Number(prompt('Enter the Supervisor ID'));

    moveEmployee(employeeID, supervisorID);
  });

  const undoButton = document.createElement('button');
  undoButton.textContent = 'Undo';
  undoButton.addEventListener('click', undoMove);

  const redoButton = document.createElement('button');
  redoButton.textContent = 'Redo';
  redoButton.addEventListener('click', redoMove);

  // Append the buttons to the game container
  gameContainer.appendChild(moveButton);
  gameContainer.appendChild(undoButton);
  gameContainer.appendChild(redoButton);
}

function moveEmployee(employeeID: number, supervisorID: number) {
  app.move(employeeID, supervisorID);
  renderOrganizationalStructure();
}

function undoMove() {
  app.undo();
  renderOrganizationalStructure();
}

function redoMove() {
  app.redo();
  renderOrganizationalStructure();
}

// Initial rendering
renderOrganizationalStructure();