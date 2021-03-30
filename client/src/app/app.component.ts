import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EmployeeService]
})
export class AppComponent {
  btnSave: any;
  btnUpdate: any;
  emp_name = '';
  id: any;
  emp_email = '';
  emp_status: any;
  list: any = [];
  svgmsg: any;
  success: any;
  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  emailAlert:any;

  constructor(private api: EmployeeService) {
    this.loadData();
    this.btnSave = true
  }

  empForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  })

  get name() { return this.empForm.get("name") }
  get email() { return this.empForm.get("email") }

  saveEmployee() {
    if (this.emp_email.match(this.mailformat)) {
      this.api.post('http://localhost:5000/store',
        {
          name: this.emp_name,
          email: this.emp_email,
          status: this.emp_status
        }).then((x: any) => {
          console.log('Item Saved', x);
          if (x.error) {
            // alert("Name already exits...Please Change the Employee name")
            this.svgmsg = "* name already exits..."

          }
          else {
            this.loadData();
            this.success = "Added done"
            this.emp_name = '';
            this.emp_status = '';
            this.emp_email = '';
            this.svgmsg = '';
            this.emailAlert = '';
          }
        }).catch((x: any) => {
          alert("Please..Check your server and connection");
          console.error('Error is', x);
        });
    } else {
      this.emailAlert = "Incorrect pattern EMAIL"
      // alert("Incorret Email pattern")
    }

  }

  updateEmployee() {
    if (this.emp_email.match(this.mailformat)) {
      this.api.put("http://localhost:5000/updateemployee/" + this.id,
        {
          name: this.emp_name,
          email: this.emp_email,
          status: this.emp_status
        }).then((x: any) => {
          if (x.error) {
            // alert("Name already exits...Please Change the Employee name")
            this.svgmsg = "Name already exits..."
          }
          else {
            this.loadData();
            // alert("Added sucessfully");
            this.emp_name = '';
            this.emp_status = '';
            this.emp_email = '';
            this.svgmsg = '';
            this.emailAlert = '';
            this.btnUpdate = false;
            this.btnSave = true;
          }
        }).catch((x) => {
          alert("Please..Check your server and connection");
          console.error('Error is', x);
        });
    } else {
      this.emailAlert = "Incorrect pattern EMAIL"
    }
  }

  editEmployee(emp: any) {
    this.btnUpdate = true;
    this.btnSave = false;
    this.id = emp._id
    this.emp_name = emp.name,
      this.emp_email = emp.email,
      this.emp_status = emp.status;
  }

  async loadData() {
    try {
      var res: any = await this.api.get(`http://localhost:5000/fetch`);
      console.log('Response is ', res);
      this.list = res;
    } catch (e) {
      alert("Error in GET..please wait or Re-check your connection..")
      console.log('the error in get ', e);
    }
  }

  deleteEmployee(_id: string) {
    if (confirm('Are you want sure to delete this record ?')) {
      this.api.delete(_id).then((res) => {
        console.log('deleted successfully', res);
        this.loadData();
      })
    }
  }

  refreshForm() {
    // document.location.reload();
    this.emp_name = '';
    this.emp_status = '';
    this.emp_email = '';
    this.svgmsg = '';
    this.emailAlert = '';
    this.btnSave = true
    this.btnUpdate = false
  }
}