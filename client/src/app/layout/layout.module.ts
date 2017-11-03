import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
    imports: [
        LayoutRoutingModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        CollapseModule,
        ToastyModule.forRoot()
    ],
    declarations: [LayoutComponent, HeaderComponent],
    providers: [

    ]
})
export class LayoutModule { }