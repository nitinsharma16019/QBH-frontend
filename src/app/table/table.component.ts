import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, userResponse } from '../models/user.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  isDownload=false;
  pdfId: any;
  constructor(public userService:UserService){}

  ngOnInit(): void {
    this.userService.getUsers();
  }

  onEdit(user:User){
    this.userService.editId=user.id;
    this.userService.userForm.patchValue(user)
  }

  onDelete(id:number){
    this.userService.deleteUser(id).then((res:any)=>{
      this.userService.getUsers();
      alert('user deleted successfully')
    }).catch(error => {
      console.error(error)
    });
  }

  onGeneratePDF(){
    this.userService.generatePdf().subscribe((res:any)=>{
      this.pdfId = res.pdfId;
      this.isDownload=true;
    })
  }

  downloadPdf(){
    if (this.pdfId) {
      this.userService.downloadPdf(this.pdfId).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
        this.isDownload=false;
      });
    }
  }
}
