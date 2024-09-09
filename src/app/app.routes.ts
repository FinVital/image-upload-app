import { Routes } from '@angular/router';
import { ImageUploadComponent } from './image-upload/image-upload.component';

export const routes: Routes = [
  {
    path: '',
    component: ImageUploadComponent  // Add your ImageUploadComponent as the default route or specify the path
  },
];
