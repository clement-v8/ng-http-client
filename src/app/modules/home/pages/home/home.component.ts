import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { DownloadService } from '../../services/download.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(
        private readonly homeService: PostService,
        private readonly downloadService: DownloadService
    ) { }

    ngOnInit(): void {
        this.homeService.getListPosts().subscribe(console.log);
    }
    progress: number = -1;
    downloadFile(): void {
        this.downloadService.downloadFile('https://cdn.filestackcontent.com/sZ9r8Bp5SCSZcY2TxPYn').subscribe((data: HttpEvent<any>) => {
            switch (data.type) {
            case HttpEventType.DownloadProgress:
                this.progress = Math.round(100 * data.loaded / data.total);
                break;
            case HttpEventType.Response:
                console.log('😺 Done!', data.body);
                this.saveFile(data.body, 'test.png');
            }
        });
    }

    private saveFile(data: Blob, fileName: string): void {
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(data);
        link.download = fileName;
        link.click();
    }
}
