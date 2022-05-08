import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeComponent } from '../employee/employee.component';
import { CommonService } from '../services/common.service';
import { filter, debounceTime, map, distinctUntilChanged} from 'rxjs/operators'
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild('departmentSearch') departmentSearch: ElementRef;
  constructor(
    public commonService: CommonService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    fromEvent(this.departmentSearch.nativeElement, 'keyup').pipe(
      map((event:any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((res: string) => {
      console.log(res)
      this.commonService.searchByDepartmentName(res);
    });
  }
  addEmployee() {
    this.modalService.open(EmployeeComponent, { centered: true });
  }

  editEmployee(id: string) {
    let modalref = this.modalService.open(EmployeeComponent, { centered: true });
    modalref.componentInstance.employeeId = id;
  }

  removeEmployee (id: string) {
    this.commonService.removeEmployee(id);
  }
}
