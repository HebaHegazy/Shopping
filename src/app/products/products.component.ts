import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

	public products:any;
	public productTitle:any;
	public productPrice:any;
	public productImage:any;
	public countVal:any = 0;
	public receiptProducts:any= [];
    public total:any=0;
    public PaidAmount:any;
    public due:any;

  constructor(private prodServ:ProductService) { }

  ngOnInit() {

  	this.prodServ.getProducts().subscribe(data=>
  	{
  		console.log(data) ;
  		this.products = data['data'];
  	});
  }

  	clicked(i) {

        for (let product in this.products) {
            
            if(i == this.products[product].id)
            {
        		this.productImage = this.products[product].image;
      			this.productTitle = this.products[product].title;
      			this.productPrice = this.products[product].price;
      			this.receiptProducts.push({'prodImage':this.productImage,'prodTitle':this.productTitle,'prodPrice':this.productPrice, 'countVal' : 1});
        	}
    	}
        this.updateTotal();
    }

    plus(index, c)
      {
          this.receiptProducts[index].countVal = c+1;
          this.updateTotal();
      }

    minus(index, c)
      {
          if(c>1)
          this.receiptProducts[index].countVal = c-1;
          this.updateTotal();
      }

      removeRow(index)
    {
        
        this.receiptProducts.splice(index,1);
        this.updateTotal();
    }

    clear()
    {
    	this.receiptProducts.splice(0,this.receiptProducts.length);
        this.updateTotal();
    }

    updateTotal()
    {
        this.total=0;
        for (var product in this.receiptProducts) {

            this.total = this.total + (this.receiptProducts[product].prodPrice * this.receiptProducts[product].countVal)
        }
    }

    getPaidAmount(values)
    {
        this.PaidAmount = values.paid;
        this.calculate();
         
      }

    calculate()
      {
        this.due = this.PaidAmount -  this.total;
      }

}