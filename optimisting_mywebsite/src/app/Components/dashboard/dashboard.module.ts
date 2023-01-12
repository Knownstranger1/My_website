import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule} from '@angular/material/card'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatTabsModule } from '@angular/material/tabs'
import { SearchComponent } from '../User/search/search.component';
import { HomescreenComponent } from '../User/homescreen/homescreen.component';
import { WatchComponent } from '../User/watch/watch.component';
import { ToolbarComponent } from '../User/toolbar/toolbar.component';
import { SliderComponent } from '../User/slider/slider.component';
import { DialogComponent } from '../User/dialog/dialog.component';
import {MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from "swiper/angular"
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    DashboardComponent,
    SearchComponent,
    HomescreenComponent,
    WatchComponent,
    ToolbarComponent,
    SliderComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    NgxPaginationModule,
    FormsModule,
    SwiperModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class DashboardModule { }
