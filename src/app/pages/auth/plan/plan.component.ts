import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AlertComponent } from 'src/app/components/modals/alert/alert.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlanComponent implements OnInit {
  selectedPlan: any = null;
  hasSignedUp: boolean = false;
  selectedTab: number = 0;
  public user: { name: string, address: string, zipcode: string, email: string, phoneNo: string } = {
    name: '',
    address: '',
    zipcode: '',
    email: '',
    phoneNo: ''
  }
  public userFldsVlds = {
    name: false,
    address: false,
    zipcode: false,
    email: false,
    phoneNo: false
  }
  public billing: { name: string, number: string, cvc: string, expiry: any } = {
    name: '',
    number: '',
    cvc: '',
    expiry: ''
  }
  public billfldsVld: { name: boolean, number: boolean, cvc: boolean, expiry: boolean } = {
    name: false,
    number: false,
    cvc: false,
    expiry: false,
  }
  constructor(public auth: AuthService,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit() {
  }

  register(plan) {
    this.selectedPlan = plan;
  }

  showMessage(message) {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { message: message, title: 'Error Message' }
    });
  }

  changeInFields(field) {
    if (field == 'name')
      this.userFldsVlds.name = false;
    else if (field == 'address')
      this.userFldsVlds.address = false;
    else if (field == 'email')
      this.userFldsVlds.email = false;
    else if (field == 'phoneNo')
      this.userFldsVlds.phoneNo = false;
    else if (field == 'zipcode')
      this.userFldsVlds.zipcode = false;
    else if (field == 'cardname')
      this.billfldsVld.name = false;
    else if (field == 'cardnumber')
      this.billfldsVld.number = false;
    else if (field == 'cardexpiry')
      this.billfldsVld.expiry = false;
    else if (field == 'cardcvc')
      this.billfldsVld.cvc = false;
  }

  previous() {
    if (this.hasSignedUp == true) {
      this.selectedTab = 0;
      this.hasSignedUp = false;
    } else if (this.selectedPlan != null) {
      this.selectedTab = 0;
      this.selectedPlan = null;
    }
  }

  signUp() {
    var check = false;
    if (this.user.name == '') {
      this.userFldsVlds.name = true;
      check = true;
    }
    if (this.user.address == '') {
      this.userFldsVlds.address = true;
      if (!check)
        check = true;
    }
    if (this.user.email == '') {
      this.userFldsVlds.email = true;
      if (!check)
        check = true;
    }
    if (this.user.phoneNo == '' || this.user.phoneNo == null) {
      this.userFldsVlds.phoneNo = true;
      if (!check)
        check = true;
    }
    if (this.user.zipcode == '' || this.user.zipcode == null) {
      this.userFldsVlds.zipcode = true;
      if (!check)
        check = true;
    }
    if (check) {
      this.showMessage("Please don't leave any field blank.");
      return;
    }
    var params = {
      name: this.user.name,
      address: this.user.address,
      zip: this.user.zipcode,
      email: this.user.email,
      phone: this.user.phoneNo,
      package: this.selectedPlan._id
    }
    this.auth.signUp(params).subscribe((user) => {
      this.hasSignedUp = true;
      this.selectedTab = 1;
      console.log(user);
    }, (error) => {
      console.log(error);
    })
  }

  billMe() {
    var check: boolean = false;
    if (this.billing.name == '') {
      check = true;
      this.billfldsVld.name = true;
    }
    if (this.billing.number == '' || this.billing.number == null) {
      this.billfldsVld.number = true;
      if (!check)
        check = true;
    }
    if (this.billing.expiry == '' || this.billing.expiry == null) {
      this.billfldsVld.expiry = true;
      if (!check)
        check = true;
    }
    if (this.billing.cvc == '' || this.billing.cvc == null) {
      this.billfldsVld.cvc = true;
      if (!check)
        check = true;
    }
    if (check) {
      this.showMessage("Please don't leave any field blank.");
      return;
    }
    var params = {
      email: this.user.email,
      card_number: this.billing.number,
      card_expiry_year: this.billing.expiry.split('-')[0],
      card_expiry_month: this.billing.expiry.split('-')[1],
      card_cvc: this.billing.cvc
    }
    this.auth.pay(params).subscribe((success) => {
      alert('Payment recieved, Please check your email.');
      this.router.navigate(['/home'])
    }, (error) => {

    })
  }

}
