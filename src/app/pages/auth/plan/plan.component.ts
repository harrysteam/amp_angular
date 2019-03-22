import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

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
    if (this.user.name == '' || this.user.address == '' || this.user.zipcode == '' || this.user.email == '' || this.user.phoneNo == '') {
      alert("Please don't leave any field blank.")
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
      this.router.navigate(['/home'])
    }, (error) => {

    })
  }

}
