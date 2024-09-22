import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';


import EditableSpan from './EditableSpan';

const meta = {
  title: 'components/EditableSpan',
  component: EditableSpan,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof EditableSpan>;

export default meta; 
type Story = StoryObj<typeof meta>;


const callback = action('Text Changed');

export const BaseExample: Story = {
  args: {
   title: 'Text',
    onChange(newTitle) {
      callback(newTitle);
    },
  },
};
