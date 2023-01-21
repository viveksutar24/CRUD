import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {



  // name = "";
  // email= "";
  // mobileno = "";

  posting= false;
  id: any;
  formgroup: any;
  route: any;

  constructor(private api: ApiService, private router: Router, route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.formgroup = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      mobileno: new FormControl("", Validators.required),
    });


    this.id = this.route.snapshot.paramas.get["id"];

    if (this.id != undefined) {

      this.api.get("https://63c8e730320a0c4c953cb515.mockapi.io/api/v1/users/" + this.id).subscribe((result: any) => {

        this.formgroup = new FormGroup({
          name: new FormControl(result.name, Validators.required),
          email: new FormControl(result.email, Validators.compose([Validators.required, Validators.email])),
          mobileno: new FormControl(result.mobileno, Validators.required),
        });

      })

    }
  }

  // submit(){
  //   let data = {name:this.name,email:this.email,mobileno:this.mobileno};
  //   this.posting = true;
  //   this.api.post("https://63c8e730320a0c4c953cb515.mockapi.io/api/v1/users/",data).subscribe((result)=>{

  //     this.router.navigate([''])
  //   })
  // }



  submit(data: any) {
    // console.log(data)
    this.posting = true;
    if (this.id == undefined) {

      this.api.post("https://63c8e730320a0c4c953cb515.mockapi.io/api/v1/users/", data).subscribe((result) => {

        (this.router.navigate(['']))

      });
    }
    else {
      this.api.put("https://63c8e730320a0c4c953cb515.mockapi.io/api/v1/users/"+this.id, data).subscribe((result) => {

        (this.router.navigate(['']))

      });


    }
  }

}
