import { render } from '@testing-library/react';

import IconButton from '@components/common/button/icon-button.component';
import PlusFilledIcon from '@components/icons/plus-filled.icon';

import '@testing-library/jest-dom';

const testId = 'icon-iconButton-test';

describe('icon-iconButton', () => {
  it('should render IconButton', () => {
    const iconButton = render(<IconButton data-testid={testId} Icon={PlusFilledIcon} />);

    expect(iconButton.getByTestId(testId)).toBeInTheDocument();
    expect(iconButton.getByTestId(testId)).toHaveClass('bg-primary text-white hover:bg-slate-600');
  });

  it('should render IconButton with Secondary Theme', () => {
    const iconButton = render(
      <IconButton data-testid={testId} theme={IconButton.Theme.Secondary} Icon={PlusFilledIcon} />,
    );

    expect(iconButton.getByTestId(testId)).toHaveClass(
      'bg-white text-primary hover:drop-shadow-md',
    );
  });

  it('should render IconButton with Danger Theme', () => {
    const iconButton = render(
      <IconButton data-testid={testId} theme={IconButton.Theme.Danger} Icon={PlusFilledIcon} />,
    );

    expect(iconButton.getByTestId(testId)).toHaveClass(
      'bg-white text-red-700 fill-red-700 hover:drop-shadow-md',
    );
  });
});
