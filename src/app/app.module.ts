import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { FormItemComponent } from './invoice-form/form-item/form-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceFormComponent,
    FormItemComponent,
    InvoiceComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { 
        path: 'invoice', 
        component: InvoiceFormComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'invoice/:invoice_number', 
        component: InvoiceComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'login', 
        component: LoginComponent,
      },
      { 
        path: 'logout', 
        component: LogoutComponent,
        canActivate: [AuthGuard]
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
