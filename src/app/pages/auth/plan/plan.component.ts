import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  selectedPlan: any = null;
  hasSignedUp: boolean = false;
  public user = {
    name: '',
    address: '',
    unit: '',
    zipcode: '',
    email: '',
    phoneNo: ''
  }
  public billing = {
    name: '',
    number: '',
    cvc: '',
    expiry: ''
  }
  constructor(public auth: AuthService,
    public router: Router) { }

  ngOnInit() {
  }

  register(plan) {
    this.selectedPlan = plan;
  }

  signUp() {
    if (this.user.name == '' || this.user.address == '' || this.user.unit == '' || this.user.zipcode == '' || this.user.email == '' || this.user.phoneNo == '') {
      alert("Please don't leave any field blank.")
      return;
    }
    var params = {
      name: this.user.name,
      address: this.user.address,
      unit: this.user.unit,
      zip: this.user.zipcode,
      email: this.user.email,
      phone: this.user.phoneNo,
      package: this.selectedPlan._id
    }
    this.auth.signUp(params).subscribe((user) => {
      this.hasSignedUp = true;
      console.log(user);
    }, (error) => {
      console.log(error);
    })
  }

  billMe() {
    if (this.billing.name == '' || this.billing.number == '' || this.billing.cvc == '' || this.billing.expiry == '') {
      alert("Please don't leave any field blank.");
      return;
    }
    console.log(this.billing.expiry);
    var params = {
      email: this.user.email,
      card_number: this.billing.number,
      card_expiry_year: this.billing.expiry.split('-')[0],
      card_expiry_month: this.billing.expiry.split('-')[1],
      card_cvc: this.billing.cvc
    }
    this.auth.pay(params).subscribe((success) => {
      alert('Payment recieved, Please check your email.');
      this.router.navigate(['/login'])
    }, (error) => {

    })
  }

}
