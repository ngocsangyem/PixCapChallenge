export interface Employee {
	uniqueId: number;
	name: string;
	subordinates: Employee[];
}

export interface IEmployeeOrgApp {
	CEO: Employee;
	/**
	* Moves the employee with employeeID (uniqueId) under a supervisor
	(another employee) that has supervisorID (uniqueId).
	* E.g. move Bob (employeeID) to be subordinate of Georgina
	(supervisorID). * @param employeeID
	* @param supervisorID
	*/
	move(employeeID: number, supervisorID: number): void;
	/** Undo last move action */
	undo(): void;
	/** Redo last undone action */
	redo(): void;
}