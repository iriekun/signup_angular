import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public signupForm: FormGroup;
  	public suggestedMail: any;  
  	public email: any;
  	public password: any;
  	public domains: any;

    constructor(private formbuilder: FormBuilder) {
    	this.signupForm = this.formbuilder.group({
            email: ['', Validators.compose([Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),Validators.required])],
      		password: ['', Validators.compose([Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z0-9!@#$%^&*]{8,16}$'), Validators.required])]
        });
        this.domains =['yahoo.com', 'gmail.com', 'ymail.com', 'hotmail.com', 'msn.com', 'rocketmail.com', 'icloud.com', 'me.com'];
    }

    signup(){
    	if (!this.signupForm.valid){
      		console.log("invalid");
    	} else {
    		console.log(this.signupForm.value.email+ this.signupForm.value.password);
    		this.signupForm.reset({email: "", password:""});
    	}

    }

    levenshtein (s1: any, s2: any) {
		if (s1 === s2) return 0;

		var s1_len = s1.length, s2_len = s2.length;

		if (s1_len === 0) return s2_len;
		if (s2_len === 0) return s1_len;

		var v0 = new Array(s1_len + 1), v1 = new Array(s1_len + 1);

		var s1_idx, s2_idx, char_s1, char_s2, cost, m_min, m, vv;

		for (s1_idx = s1_len; s1_idx >= 0; s1_idx--) {
			v0[s1_idx] = s1_idx;
		}
		for (s2_idx = 1; s2_idx <= s2_len; s2_idx++) {
			v1[0] = s2_idx;
			char_s2 = s2[s2_idx - 1];

			for (s1_idx = 0; s1_idx < s1_len; s1_idx++) {
				char_s1 = s1[s1_idx];
				cost = (char_s1 == char_s2) ? 0 : 1;

				m_min  = v0[s1_idx + 1] +    1;
				if ((m = v1[s1_idx    ] +    1) < m_min) m_min = m;
				if ((m = v0[s1_idx    ] + cost) < m_min) m_min = m;

				v1[s1_idx + 1] = m_min;
			}

			vv = v0; v0 = v1; v1 = vv;
		}
		return v0[s1_len];
	}
	checkDomain(){
		if (this.signupForm.value.email.includes('@')){
			var s = this.signupForm.value.email.split("@")[1];
			//console.log(s);
			var res;
			for(let i=0; i<this.domains.length; i++){
				if(s==this.domains[i]){
					return; 
				}
			}
			for(let i=0; i< this.domains.length; i++){
				//use levenshtein distance to calculate the similarity of words
				//if distance =1 or 2 then suggest the correct email
				res = this.levenshtein(s, this.domains[i]);
				if(res==1 || res==2){
					this.suggestedMail = this.signupForm.value.email.split("@")[0]+"@"+this.domains[i];
					//this.signupForm.value.email = this.suggestedMail;
					return true;
				}
				
			}
		}else{
			for(let i=0; i<this.domains.length; i++){
				if(this.signupForm.value.email.includes(this.domains[i])){
					let index = this.signupForm.value.email.indexOf(this.domains[i]);
					this.suggestedMail = this.signupForm.value.email.substring(0,index)+"@"+this.domains[i];
					return true;
				}
			}
		}
		
		
	}
	editMail(){
		this.signupForm.setValue({email: this.suggestedMail, password: this.signupForm.value.password});
	}
}
