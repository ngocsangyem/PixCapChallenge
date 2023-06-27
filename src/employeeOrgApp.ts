import { Employee, IEmployeeOrgApp } from './types/Employee';

class EmployeeOrgApp implements IEmployeeOrgApp {
  public CEO: Employee;
  private moveHistory: { employee: Employee; oldSupervisor: Employee }[];
  private redoHistory: { employee: Employee; newSupervisor: Employee }[];

  constructor(CEO: Employee) {
    this.CEO = CEO;
    this.moveHistory = [];
    this.redoHistory = [];
  }

  move(employeeID: number, supervisorID: number): void {
    const employee = this.findEmployeeByID(this.CEO, employeeID);
    const supervisor = this.findEmployeeByID(this.CEO, supervisorID);
  
    if (employee && supervisor && employee !== supervisor) {
      const oldSupervisor = this.findSupervisor(this.CEO, employee);
  
      if (oldSupervisor) {
        oldSupervisor.subordinates = oldSupervisor.subordinates.filter(
          (subordinate) => subordinate !== employee
        );
      }
  
      supervisor.subordinates.push(employee);
  
      this.moveHistory.push({ employee, oldSupervisor });
      // Clear redo history
      this.redoHistory = [];
    }
  }

  undo(): void {
    const lastMove = this.moveHistory.pop();

    if (lastMove) {
      const { employee, oldSupervisor } = lastMove;
      const currentSupervisor = this.findSupervisor(this.CEO, employee);

      if (currentSupervisor) {
        currentSupervisor.subordinates = currentSupervisor.subordinates.filter(
          (subordinate) => subordinate !== employee
        );
      }

      oldSupervisor.subordinates.push(employee);

      this.redoHistory.push({ employee, newSupervisor: currentSupervisor });
    }
  }

  redo(): void {
    const lastRedo = this.redoHistory.pop();

    if (lastRedo) {
      const { employee, newSupervisor } = lastRedo;
      const currentSupervisor = this.findSupervisor(this.CEO, employee);

      if (currentSupervisor) {
        currentSupervisor.subordinates = currentSupervisor.subordinates.filter(
          (subordinate) => subordinate !== employee
        );
      }

      newSupervisor.subordinates.push(employee);

      this.moveHistory.push({ employee, oldSupervisor: currentSupervisor });
    }
  }

  private findEmployeeByID(root: Employee, employeeID: number): Employee {
    const stack: Employee[] = [root];
  
    while (stack.length > 0) {
      const current = stack.pop();
  
      if (current) {
        if (current.uniqueId === employeeID) {
          return current;
        }
  
        stack.push(...current.subordinates);
      }
    }
  
    // Employee not found in the organization
    throw new Error('Employee not found');
  }

  private findSupervisor(root: Employee, employee: Employee): Employee {
    const stack: Employee[] = [root];
  
    while (stack.length > 0) {
      const current = stack.pop();
  
      if (current) {
        if (current.subordinates.includes(employee)) {
          return current;
        }
  
        stack.push(...current.subordinates);
      }
    }
    
    // Supervisor not found in the organization
    throw new Error('Supervisor not found');
  }
}

export default EmployeeOrgApp;