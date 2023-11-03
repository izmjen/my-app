import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent {
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb : FormBuilder,
    private _epmService :EmployeeService,
    private _dialogRef:MatDialogRef<EmpAddEditComponent>
    ){
    this.empForm = this._fb.group({
      CHECKPOINT:'',
      Mates:'',
      Time:'',
      Date:'',
      Contact:'',
    })
  }

  onFormSubmit(){
    if(this.empForm.valid){
      this._epmService.addEmployee(this.empForm.value).subscribe({
        next: (val:any) => {
          alert('CHECKPOINT added successfuly');
          this._dialogRef.close(true);
        },
        error: (err:any) =>{
          console.error(err);
        }
      })
    }
  }
}
