import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Employee } from '../interfaces/employee';
import * as InitialData from '../mockedData/employee.json';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  toggleAscending = false;
  employeeData: Employee[] = InitialData['default'];
  employeeDataSubject  = new BehaviorSubject<Employee[]>(this.employeeData);
  employeeData$ = this.employeeDataSubject.asObservable();
  latestId = this.employeeData.length + 1;
  constructor() {
    console.log("Check", this.employeeData)
    this.broadCastEmployeeData();
  }
  
  addEmployee(data: Employee): void {
    this.latestId++;
    this.employeeData.push({id: this.latestId, ...data});
    this.broadCastEmployeeData();
  }

  getEmployee(id: string): Observable<Employee> {
    return of(this.employeeData.find((employee: Employee) => employee.id === id));
  }

  updateEmployee(id: string, data: Employee): void {
    let index = this.employeeData.findIndex((employee: Employee) => employee.id === id);
    this.employeeData[index] = data;
    this.broadCastEmployeeData();
  }

  removeEmployee(id: string): void {
    let index = this.employeeData.findIndex((employee: Employee) => employee.id === id);
    this.employeeData.splice(index, 1);
    this.broadCastEmployeeData();
  }

  broadCastEmployeeData(): void {
    this.employeeDataSubject.next(this.employeeData);
    console.log(this.employeeData)
  }

  sortBySalary() {
    this.toggleAscending = !this.toggleAscending;
    let sortedData = this.toggleAscending ? 
        this.employeeData.sort((a, b) => a.salary - b.salary) : 
        this.employeeData.sort((a, b) => b.salary - a.salary);
    this.employeeDataSubject.next(sortedData);
    this.broadCastEmployeeData();
  }

  searchByDepartmentName(text: string) {
    if (text === '') {
      this.broadCastEmployeeData();
    } else {
      let filteredData = this.employeeData.filter((emp: Employee) => {
        return emp.department.toLowerCase().indexOf(text.toLowerCase()) !== -1;
      });
      this.employeeDataSubject.next(filteredData);
    }
  }
}
