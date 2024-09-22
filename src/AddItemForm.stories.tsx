import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AddItemForm from './AddItemForm';

const meta = {
  title: 'components/AddItemForm',
  component: AddItemForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const callback = action("Add button was pressed")

export const BaseExample: Story = {
  args: {
    initText: 'Title',
    onAddItem: callback,
  },
};
