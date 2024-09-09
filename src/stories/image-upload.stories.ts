import { Meta, StoryFn } from '@storybook/angular';
import { ImageUploadComponent } from '../app/image-upload/image-upload.component';

export default {
  title: 'Components/ImageUpload',
  component: ImageUploadComponent,
  parameters: {
    // Storybook options like layout or backgrounds can go here
  },
} as Meta<ImageUploadComponent>;

const Template: StoryFn<ImageUploadComponent> = (args: ImageUploadComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
