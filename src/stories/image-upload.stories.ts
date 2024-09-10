import { Meta, StoryFn } from '@storybook/angular';
import { ImageUploadComponent } from '../app/image-upload/image-upload.component';

// Define metadata for the story
export default {
  title: 'Components/ImageUpload',
  component: ImageUploadComponent,
  // Define component properties (args) here
  argTypes: {
    profileImage: { control: 'text' },
    croppedImage: { control: 'text' },
  }
} as Meta<ImageUploadComponent>;

// Create the Story Template
const Template: StoryFn<ImageUploadComponent> = (args: ImageUploadComponent) => ({
  component: ImageUploadComponent,
  props: args, // This passes the args directly as props
});

// Create variations of the story
export const Default = Template.bind({});
Default.args = {
  profileImage: '',
  croppedImage: ''
};
