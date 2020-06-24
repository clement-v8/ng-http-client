import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { PostService } from './services/post.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './inteceptors/request.interceptor';
import { UploadComponent } from './components/upload/upload.component';
@NgModule({
    declarations: [HomeComponent, UploadComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        // HttpClientModule
    ],
    providers: [
        PostService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ]
})
export class HomeModule { }
