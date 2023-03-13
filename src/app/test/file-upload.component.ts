import {HttpClient } from "@angular/common/http";
import { Component, Injectable } from "@angular/core";
import { Observable } from "rxjs";


export class ImageSnippet {
    constructor(
        public src: string,
        public file: File
    ){}
}

@Injectable({ providedIn: 'root'})
export class ImageService{
    constructor(private http: HttpClient){}

    public uploadImage(image: File): Observable<any>{
        const formData = new FormData();
        formData.append('image', image);
        return this.http.post('api/v1/image-upload', formData);
    }
}

@Component({
    selector: 'file-upload',
    template: `<div class='background'>
        <!-- <input type="file" class="file-input"
       (change)="onFileSelected($event)" #fileUpload>
        <div class="file-upload">
        {{fileName || "No file uploaded yet."}}
            <button mat-mini-fab color="primary" class="upload-btn"
            (click)="fileUpload.click()">
                <mat-icon>attach_file</mat-icon>
            </button>
        </div>
    </div>

<div class="progress">
  <mat-progress-bar class="progress-bar" mode="determinate"
                    [value]="uploadProgress" *ngIf="uploadProgress">
  </mat-progress-bar>
  <mat-icon class="cancel-upload" (click)="cancelUpload()" 
            *ngIf="uploadProgress">delete_forever
  </mat-icon> -->


    <label class="image-upload-container btn btn-bwm">
        <span>Select Image</span>
        <input #imageInput
        type="file"
        accept="image/*"
        (change)="processFile(imageInput)"
        >
    </label>

    <div *ngIf="selectedFile" class="img-preview-container">
        <div class="img-preview{{selectedFile.status === 'fail' ? '-error' : ''}}"
        [ngStyle]="{'background-image' : 'url('+ selectedFile.src + ')'}"></div>
    </div>

    <div *ngIf="selectedFile.pending" class="img-loading-overlay">
        <div class="img-spinning-circle"></div>
    </div>

    <div *ngIf="selectedFile.status === 'ok'" class="alert alert-success">Image Uploaded Successfuly!</div>
    <div *ngIf="selectedFile.status === 'fail'" class="alert alert-danger">Image Uploaded Failed!</div>
    </div>
    `,
     styleUrls: ['image-upload.component.scss']
})

export class FileUploadComponent {

    // fileName = '';
    // uploadProgress: number = 0;

    // constructor(private http: HttpClient) {}

    // onFileSelected(event: any) {
    //     const file:File = event.target.files[0];
    //     if (file) {
    //         this.fileName = file.name;
    //         const formData = new FormData();
    //         formData.append("thumbnail", file);
    //         const upload$ = this.http.post("/api/thumbnail-upload", formData);
    //         upload$.subscribe();
    //     } 

    // }

    // cancelUpload(){}




     selectedFile: ImageSnippet | any;

    constructor(private imageService: ImageService){}

    private onSuccess(){
        this.selectedFile.pending = false;
        this.selectedFile.status = 'ok';
    }

    private onError(){
        this.selectedFile.pending = false;
        this.selectedFile.status = 'fail';
        this.selectedFile.src = '';
    }

    processFile(imageInput: any){
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);
            this.imageService.uploadImage(this.selectedFile.file).subscribe({
                complete: () => {
                    this.onSuccess();
                },
                error: () => {
                    this.onError();
                }
        })
        });
        reader.readAsDataURL(file);
    }
}