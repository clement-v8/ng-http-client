import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadService } from './upload.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    progress: { percentage: number } = { percentage: -1 };
    arrayFileUpload: Array<{ url: string, filename: string, filetype: string, value: any }> = [];

    constructor(
        private uploadService: UploadService,
    ) { }

    ngOnInit(): void {
    }

    selectFile(event): void {
        this.progress.percentage = 0;
        const selectedFiles: Array<File> = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            this.uploadLocal(selectedFiles);
            this.uploadService.postFile(selectedFiles).subscribe(
                (data: HttpEvent<any>) => {
                    if (data.type === HttpEventType.UploadProgress) {
                        this.progress.percentage = Math.round(100 * data.loaded / data.total);
                    } else if (data instanceof HttpResponse) {
                        console.log("Upload done")
                    }
                },
                (error: HttpErrorResponse) => {
                    alert(false);
                }
            );
        }
    }

    private uploadLocal(selectedFiles: Array<File>): void {
        if (selectedFiles.length > 0) {
            for (let i = 0; i < selectedFiles.length; i++) {
                const reader: FileReader = new FileReader();
                const file: File = selectedFiles[i];
                const image: { url: string, filename: string, filetype: string, value: any } = {
                    url: null,
                    filename: null,
                    filetype: null,
                    value: null
                };
                reader.readAsDataURL(selectedFiles[i]);
                reader.onload = (event: ProgressEvent<FileReader>) => {
                    image.url = event.target.result as string;
                };
                image.filename = file.name;
                image.filetype = file.type;
                image.value = reader.result;
                this.arrayFileUpload[i] = image;
            }
        }
    }
}
