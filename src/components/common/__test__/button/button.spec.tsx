import { render } from '@testing-library/react';

import Button from '@components/common/button/button.component';

import '@testing-library/jest-dom';

const testId = 'button-test';

describe('button', () => {
  it('should render Button', () => {
    const label = 'Test';
    const button = render(<Button data-testid={testId}>{label}</Button>);

    expect(button.getByText(label)).toBeInTheDocument();
    expect(button.getByTestId(testId)).toHaveTextContent(label);
  });

  it('should render Button with Secondary Theme', () => {
    const label = 'Test';
    const button = render(
      <Button data-testid={testId} theme={Button.Theme.Secondary}>
        {label}
      </Button>,
    );

    expect(button.getByTestId(testId)).toHaveClass(
      'bg-white text-primary border-primary hover:bg-slate-100',
    );
  });

  it('should render Button with Danger Theme', () => {
    const label = 'Test';
    const button = render(
      <Button data-testid={testId} theme={Button.Theme.Danger}>
        {label}
      </Button>,
    );

    expect(button.getByTestId(testId)).toHaveClass(
      'bg-red-700 text-white border-red-700 hover:bg-red-600',
    );
  });

  it('should render Button with Link Theme', () => {
    const label = 'Test';
    const button = render(
      <Button data-testid={testId} theme={Button.Theme.Link}>
        {label}
      </Button>,
    );

    expect(button.getByTestId(testId)).toHaveClass(
      'bg-transparent text-primary border-0 hover:underline',
    );
  });
});
