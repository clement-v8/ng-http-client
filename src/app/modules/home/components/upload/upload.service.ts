import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    constructor(private http: HttpClient) { }

    postFile(files: Array<File>): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('fileUpload', files[i], files[i].name);
        }
        return this.http.post(`${BASE_URL}`, formData, { observe: 'events', reportProgress: true });
    }
}
