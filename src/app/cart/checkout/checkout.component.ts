import {
  Component,
  effect,
  inject,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {toSignal} from "@angular/core/rxjs-interop";
import {EMPTY} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {CheckoutInfo, LOCAL_STORAGE_CHECKOUT_KEY} from "../checkout-info";

const phoneNumberRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  private fb = inject(FormBuilder);
  checkoutForm = this.fb.group({
    firstName: this.fb.control('', Validators.required),
    lastName: this.fb.control('', Validators.required),
    phoneNumber: this.fb.control('', [Validators.required, Validators.pattern(phoneNumberRegex)]),
    email: this.fb.control('', Validators.email),
    address: this.fb.group({
      city: this.fb.control('', Validators.required),
      street: this.fb.control('', Validators.required),
      zip: this.fb.control('', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]),
      additionalInfo: this.fb.control('')
    }),
    payment: this.fb.control<'cash' | 'credit_card'>('cash'),
    creditCard: this.fb.group({
      cardNumber: this.fb.control('', Validators.pattern(/^\d{16}$/)),
      expirationDate: this.fb.control('', Validators.pattern(/^\d{2}\/\d{2}$/)),
      cvv: this.fb.control('', Validators.pattern(/^\d{3}$/))
    })
  });

  private selectedPayment = toSignal(this.checkoutForm.get('payment')?.valueChanges || EMPTY);
  private creditCardTemplateRef = viewChild.required('credit_card', {read: TemplateRef});
  private creditCardContainer = viewChild.required('credit_card_container', {read: ViewContainerRef});

  private router = inject(Router);

  constructor() {
    effect(() => {
      let cardNumber = this.checkoutForm.get('creditCard.cardNumber');
      let expiryDate = this.checkoutForm.get('creditCard.expirationDate');
      let cvv = this.checkoutForm.get('creditCard.cvv');

      if (this.selectedPayment() === 'credit_card') {
        cardNumber?.addValidators(Validators.required);
        expiryDate?.addValidators(Validators.required);
        cvv?.addValidators(Validators.required);
        this.creditCardContainer().createEmbeddedView(this.creditCardTemplateRef());
      }
      if (this.selectedPayment() === 'cash') {
        this.creditCardContainer().clear();
        cardNumber?.removeValidators(Validators.required);
        cardNumber?.reset();
        expiryDate?.removeValidators(Validators.required);
        expiryDate?.reset();
        cvv?.removeValidators(Validators.required);
        cvv?.reset();
      }

      cardNumber?.updateValueAndValidity();
      expiryDate?.updateValueAndValidity();
      cvv?.updateValueAndValidity();
    }, {allowSignalWrites: true});
  }

  ngOnInit() {
    const checkoutInfo = localStorage.getItem(LOCAL_STORAGE_CHECKOUT_KEY);
    if (checkoutInfo) {
      this.checkoutForm.patchValue(JSON.parse(checkoutInfo) as CheckoutInfo);
    }
  }

  toOrderSummary() {
    const checkoutInfo = this.checkoutForm.value as CheckoutInfo;
    localStorage.setItem(LOCAL_STORAGE_CHECKOUT_KEY, JSON.stringify(checkoutInfo));
    this.router.navigate(['/cart/order-summary']).then(r => console.log('navigated'));
  }

}
