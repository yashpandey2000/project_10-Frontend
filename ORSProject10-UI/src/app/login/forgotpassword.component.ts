import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';
import { DataValidator } from '../utility/data-validator';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgotpassword.component.html'
})

export class ForgotPasswordComponent implements OnInit {

  endpoint = "http://localhost:8080/Auth";

  form = {
    error: false,
    message: "",
    login: '',
  };

  inputerror = {};
  message = '';

  constructor(private httpService: HttpServiceService, private dataValidator: DataValidator, private router: Router) {
  }


  validate(){
    let flag = true;
    flag = flag && this.dataValidator.isNotNull(this.form.login);
    return flag;
  }

  /**
   * Initialize component
   */
  ngOnInit() {
  }

  submit() {
    var _self = this;
    this.httpService.post(_self.endpoint + "/forgetPassword" , this.form, function (res) {

      console.log('MyResoonse', res);

      _self.form.message = '';
      _self.inputerror = {};
          console.log(res.result.message+'------>msg');
      if (res.result.message) {
        _self.form.message = res.result.message;
        console.log(_self.form.message+'-------> msg in sucess');
      }

      _self.form.error = !res.success;
      if (_self.form.error && res.result.inputerror) {
          _self.inputerror = res.result.inputerror;
      }
    });
  }
}
