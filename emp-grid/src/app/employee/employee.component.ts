import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../interfaces/employee';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() employeeId: string;
  employeeForm: FormGroup;
  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.employeeId) {
      this.commonService.getEmployee(this.employeeId)
      .subscribe((res: Employee) => {
        this.employeeForm.patchValue(res);
      });
    }
  }

  initForm() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      salary: [5000, Validators.required]
    });
  }

  submit() {
    if (this.employeeForm.invalid) {
      return;
    }
    if (this.employeeId) {
      this.commonService.updateEmployee(this.employeeId, this.employeeForm.value);
    } else {
      this.commonService.addEmployee(this.employeeForm.value);
    }
    this.modalService.dismissAll();
  }
}
