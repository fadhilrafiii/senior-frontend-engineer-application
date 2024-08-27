import { render } from '@testing-library/react';

import TextField from '@components/common/input/text-field.component';
import PlusFilledIcon from '@components/icons/plus-filled.icon';

import '@testing-library/jest-dom';

const id = 'text-field-id';
const testId = 'text-field-test-id';

describe('text-field', () => {
  it('should render TextField', () => {
    const textField = render(<TextField data-testid={testId} />);

    expect(textField.getByTestId(testId)).toBeInTheDocument();
  });

  it('should render TextField with StartIcon', () => {
    const textField = render(<TextField id={id} data-testid={testId} StartIcon={PlusFilledIcon} />);

    expect(textField.getByTestId(testId)).toBeInTheDocument();
    expect(textField.getByTestId(`start_icon_${id}`)).toBeInTheDocument();
  });

  it('should render TextField with EndIcon', () => {
    const textField = render(<TextField id={id} data-testid={testId} EndIcon={PlusFilledIcon} />);

    expect(textField.getByTestId(testId)).toBeInTheDocument();
    expect(textField.getByTestId(`end_icon_${id}`)).toBeInTheDocument();
  });

  it('should render TextField with error', () => {
    const textField = render(<TextField id={id} data-testid={testId} error="This is error" />);

    expect(textField.getByTestId(testId)).toBeInTheDocument();
    expect(textField.container.querySelector('input')).toHaveClass('border-red-700 bg-red-50');
    expect(textField.getByTestId(`error_${id}`)).toBeInTheDocument();
  });

  it('should render TextField with helper text', () => {
    const textField = render(
      <TextField id={id} data-testid={testId} helperText="This is helper" />,
    );

    expect(textField.getByTestId(testId)).toBeInTheDocument();
    expect(textField.getByTestId(`helper_${id}`)).toBeInTheDocument();
  });

  it('should render TextField with label', () => {
    const textField = render(<TextField id={id} data-testid={testId} label="Label" />);

    expect(textField.getByTestId(testId)).toBeInTheDocument();
    expect(textField.container.querySelector('label')).toBeInTheDocument();
  });
});
