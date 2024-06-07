import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit{
  pdfs: any;
  imageUrls:any;
  constructor(private userService:UserService,private ds:DomSanitizer){}

  ngOnInit(): void {
    this.getAllPdfs();
  }

  getAllPdfs(): void {
    this.userService.PdfsList().subscribe((res: any) => {
      this.pdfs = res;
      this.imageUrls = this.pdfs.map((pdf: any) => {
        const imageData = new Uint8Array(pdf.data); // Assuming `data` contains Uint8Array of PDF content
        const blob = new Blob([imageData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        return this.ds.bypassSecurityTrustUrl(url);
      });
      console.log(this.imageUrls)
    });
  }
}
