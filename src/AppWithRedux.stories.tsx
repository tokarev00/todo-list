import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';


import AppWithRedux from './AppWithRedux';

const meta = {
  title: 'components/AppWithRedux',
  component: AppWithRedux,
  
} satisfies Meta<typeof AppWithRedux>;

export default meta; 
type Story = StoryObj<typeof meta>;


const callback = action('Text Changed');

export const BaseExample: Story = {
  args: {
  },
};
