import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PocketbaseService } from 'src/app/pocketbase.service';
import { CustomerLog } from 'src/app/shared/address.model';
import { environment } from 'src/environments/environment';
import { SlicePipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit{
  panelOpenState = false;
  orderStatus: boolean = false;
  customerLogs: CustomerLog[] = [];
  admin: boolean = false;
  params: any;
  pageSize: any;
  displayedItems: any;

  constructor(private database: PocketbaseService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.params = data;
      if(data['id'] === environment.SILAS_ADMIN_ID || data['id'] === environment.LECOY_ADMIN_ID){
        this.admin = true;
        this.database.getCustomerLogs().then(data =>{
          data.forEach((data: any) => {
            const customerData = new CustomerLog(
              data,
              data.id,
              data.first_name,
              data.last_name,
              data.email_address,
              data.shipping_address,
              data.phone_number,
              data.purchase_time,
              data.products_purchased,
              data.products_purchased[0].total,
              data.order_status)
            this.customerLogs.push(customerData);
          });
        })
      }else{
        this.admin = false;
        this.database.getUserLogs(data['id']).then(data => {
          data.items.forEach((data: any) => {
            if(this.params['order-type'] == 'your-orders' && data.order_status == false){
              const customerData = new CustomerLog(
                data,
                data.id,
                data.first_name,
                data.last_name,
                data.email_address,
                data.shipping_address,
                data.phone_number,
                data.purchase_time,
                data.products_purchased,
                data.products_purchased[0].total,
                data.order_status)
                this.customerLogs.push(customerData);
            }else if (this.params['order-type'] == 'previous-orders' && data.order_status == true){
              const customerData = new CustomerLog(
                data,
                data.id,
                data.first_name,
                data.last_name,
                data.email_address,
                data.shipping_address,
                data.phone_number,
                data.purchase_time,
                data.products_purchased,
                data.products_purchased[0].total,
                data.order_status)
                this.customerLogs.push(customerData);
            }
          });
        })
      }
    });
    this.displayedItems = this.customerLogs.slice(0, this.pageSize);
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedItems = this.customerLogs.slice(startIndex, endIndex);
  }

  updateOrders(log:any, id: string, orderStatus: any){
    log.order_status = orderStatus;
    this.database.updateCustomerLog(id,log);
  }
}
