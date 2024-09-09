import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent {
  imageUrl: string | ArrayBuffer | null = null; // Stores the selected image URL
  isImageUploaded: boolean = false; // Flag to check if the image is uploaded
  isDragging: boolean = false;
  isCropping: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = ''; // Holds the base64 data of the cropped image

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // To trigger the file input programmatically

  // Trigger file input
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Handle image selection from file input
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.readFile(file);
    }
  }

  // Read the selected file using FileReader API
  readFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result; // Set the image URL to base64 data
      this.isImageUploaded = true;
    };
    reader.readAsDataURL(file); // Read the file as data URL
  }

  // Handle drag-and-drop functionality
  onDrop(event: any): void {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer.files[0];
    if (file) {
      this.readFile(file); // Call readFile to display the dropped image
    }
  }

  onDragOver(event: any): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(): void {
    this.isDragging = false;
  }

  deleteImage(): void {
    // Reset the image URL and isImageUploaded flag
    this.imageUrl = null;
    this.isImageUploaded = false;
  }
}
