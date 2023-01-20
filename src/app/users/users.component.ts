import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;


  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.load()


  }

  load() {
    this.api.get("https://63c8e730320a0c4c953cb515.mockapi.io/api/v1/users/").subscribe((result) => {
      this.users = result
    })
  }

  deleteuser(id: any) {
    if (confirm("Sure To Delete ?")) {

      // alert(id);
      this.api.delete("https://63c8e730320a0c4c953cb515.mockapi.io/api/v1/users/" + id).subscribe((result) => {
        this.load()

      })
    }

  }

}
