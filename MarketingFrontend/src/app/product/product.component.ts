import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/Product';
import { ProductService } from '../services/productService/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product:any={}
  products:Product[]=[]
  showForm = false
  isEditing = false

  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.getProducts()
  }
  toggleForm() {
    this.showForm = !this.showForm; // Basculez entre afficher et masquer le formulaire
  }
  CloseForm(addForm: NgForm) {
    this.toggleForm() ;
    addForm.resetForm();
  }
  toggleEditing(id:number) {
    this.isEditing = !this.isEditing;
  }
  getProducts(){
    this.productService.getProducts().subscribe(
      (response)=>this.products=response,
      (error:HttpErrorResponse)=>alert(error.message)
    );
  }
  addProduct(addForm:NgForm){
    if(addForm.valid){
    this.productService.addProduct(this.product).subscribe(
      (response) => console.log(response),
      (error:HttpErrorResponse) => alert(error.message)
    );
    }
    location.reload()
  }
}
