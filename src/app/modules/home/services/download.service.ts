import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {
    constructor(private http: HttpClient) { }

    downloadFile(url: string): Observable<HttpEvent<any>> {
        return this.http.get(url, { reportProgress: true, observe: 'events', responseType: 'blob' });
    }
}