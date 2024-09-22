import type { Meta, StoryObj } from '@storybook/react';

import Task from './Task';

const meta = {
  title: 'components/Task',
  component: Task,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Task>;

export default meta; 
type Story = StoryObj<typeof meta>;

export const BaseExample: Story = {
  args: {
    todoListId: '1',
    task: {id: 'id', title: 'This task isn\'t done', isDone: false },
  },
};
