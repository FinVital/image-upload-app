import { Component } from '@angular/core';
import { ImageUploadComponent } from './image-upload/image-upload.component'; // Import standalone component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ImageUploadComponent], // Add the ImageUploadComponent to the imports
  template: `<app-image-upload></app-image-upload>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
