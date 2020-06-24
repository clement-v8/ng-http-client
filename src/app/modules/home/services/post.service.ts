import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostEntityModel } from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private httpClient: HttpClient) { }

    getListPosts(): Observable<PostEntityModel[]> {
        return this.httpClient.get<PostEntityModel[]>('https://jsonplaceholder.typicode.com/posts',
            {withCredentials: true}
        );
    }

    createPost(post: PostEntityModel): Observable<PostEntityModel> {
        return this.httpClient.post<PostEntityModel>('https://jsonplaceholder.typicode.com/posts', post);
    }

    updatePost(postId: number, post: PostEntityModel): Observable<PostEntityModel> {
        return this.httpClient.put<PostEntityModel>(`https://jsonplaceholder.typicode.com/posts/${ postId }`, post);
    }

    updateOptionPost(postId: number, post: Partial<PostEntityModel>): Observable<PostEntityModel> {
        return this.httpClient.patch<PostEntityModel>(`https://jsonplaceholder.typicode.com/posts/${ postId }`, post);
    }

    deletePost(postId: number): Observable<any> {
        return this.httpClient.delete(`https://jsonplaceholder.typicode.com/posts/${ postId }`);
    }
}
