import type { Preview } from "@storybook/react";
import {ReduxStoreProviderDecorator} from "../src/stories/ReduxStoreProviderDecorator"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    ReduxStoreProviderDecorator,
  ]
};

export default preview;
