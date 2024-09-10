// import { Component, ViewChild, ElementRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

// @Component({
//   selector: 'app-image-upload',
//   standalone: true,
//   imports: [CommonModule, ImageCropperComponent],
//   templateUrl: './image-upload.component.html',
//   styleUrls: ['./image-upload.component.css'],
// })
// export class ImageUploadComponent {
//   imageUrl: string | ArrayBuffer | null = null; // Stores the selected image URL
//   isImageUploaded: boolean = false; // Flag to check if the image is uploaded
//   isDragging: boolean = false;
//   isCropping: boolean = false;
//   imageChangedEvent: any = '';
//   croppedImage: any = ''; // Holds the base64 data of the cropped image

//   @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // To trigger the file input programmatically

//   // Trigger file input
//   triggerFileInput(): void {
//     this.fileInput.nativeElement.click();
//   }

//   // Handle image selection from file input
//   onImageSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.readFile(file);
//     }
//   }

//   // Read the selected file using FileReader API
//   readFile(file: File): void {
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.imageUrl = reader.result; // Set the image URL to base64 data
//       this.isImageUploaded = true;
//     };
//     reader.readAsDataURL(file); // Read the file as data URL
//   }

//   // Handle drag-and-drop functionality
//   onDrop(event: any): void {
//     event.preventDefault();
//     this.isDragging = false;
//     const file = event.dataTransfer.files[0];
//     if (file) {
//       this.readFile(file); // Call readFile to display the dropped image
//     }
//   }

//   onDragOver(event: any): void {
//     event.preventDefault();
//     this.isDragging = true;
//   }

//   onDragLeave(): void {
//     this.isDragging = false;
//   }

//   deleteImage(): void {
//     // Reset the image URL and isImageUploaded flag
//     this.imageUrl = null;
//     this.isImageUploaded = false;
//   }
// }

import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true, // Ensures it's a standalone component
  imports: [CommonModule], // Import CommonModule for ngStyle and other common directives
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @ViewChild('cropImage', { static: false }) cropImage!: ElementRef<HTMLImageElement>;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  profileImage: string | ArrayBuffer | null = null;
  croppedImage: string | null = null;
  isCropping: boolean = false;

  cropStartX: number = 0;
  cropStartY: number = 0;
  cropEndX: number = 0;
  cropEndY: number = 0;

  cropStyle: any = {};

  ngOnInit() {
    this.loadCroppedImage();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      this.resetState();

      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(input.files[0]);

      this.fileInput.nativeElement.value = '';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const reader = new FileReader();

      this.resetState();

      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);

      this.fileInput.nativeElement.value = '';
    }
  }

  startCropping(event: MouseEvent): void {
    this.isCropping = true;
    this.cropStartX = event.offsetX;
    this.cropStartY = event.offsetY;
    console.log('Cropping started at:', this.cropStartX, this.cropStartY); // Debugging
}

onCrop(event: MouseEvent): void {
  if (this.isCropping) {
      this.cropEndX = event.offsetX;
      this.cropEndY = event.offsetY;
      
      // Ensure that crop dimensions are always positive
      const cropWidth = Math.abs(this.cropEndX - this.cropStartX);
      const cropHeight = Math.abs(this.cropEndY - this.cropStartY);
      
      if (cropWidth > 0 && cropHeight > 0) {
          this.cropStyle = {
              left: `${Math.min(this.cropStartX, this.cropEndX)}px`,
              top: `${Math.min(this.cropStartY, this.cropEndY)}px`,
              width: `${cropWidth}px`,
              height: `${cropHeight}px`
          };
      }
  }
}

endCropping(): void {
  this.isCropping = false;

  const imageElement = this.cropImage.nativeElement;
  const cropWidth = Math.abs(this.cropEndX - this.cropStartX);
  const cropHeight = Math.abs(this.cropEndY - this.cropStartY);

  // Validate the crop dimensions
  if (cropWidth > 0 && cropHeight > 0) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      const imageX = Math.min(this.cropStartX, this.cropEndX);
      const imageY = Math.min(this.cropStartY, this.cropEndY);

      if (context) {
          // Clear the canvas
          context.clearRect(0, 0, canvas.width, canvas.height);

          // Draw the cropped area of the image onto the canvas
          context.drawImage(
              imageElement,
              imageX, imageY, // Source x, y in the image
              cropWidth, cropHeight, // Source width and height
              0, 0, // Destination x, y on the canvas
              cropWidth, cropHeight // Destination width and height
          );

          // Get the cropped image as a Base64 encoded string
          const croppedDataURL = canvas.toDataURL('image/png');
          console.log('Cropped image data URL:', croppedDataURL); // Debugging

          this.croppedImage = croppedDataURL;
          this.saveCroppedImage(croppedDataURL);
      }
  } else {
      console.warn('Invalid crop dimensions, unable to crop image.');
  }
}

  saveCroppedImage(imageData: string): void {
    console.log("Saving cropped image:", imageData); // Debugging
    localStorage.setItem('croppedImage', imageData);
}


  loadCroppedImage(): void {
    const savedImage = localStorage.getItem('croppedImage');
    console.log("Loaded cropped image:", savedImage); // Debugging
    if (savedImage) {
        this.croppedImage = savedImage;
    }
}


  public resetState(): void {
    this.profileImage = null;
    this.croppedImage = null;
    this.isCropping = false;
    this.cropStartX = 0;
    this.cropStartY = 0;
    this.cropEndX = 0;
    this.cropEndY = 0;
    this.cropStyle = {};
  }
}