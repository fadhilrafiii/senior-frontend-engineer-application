import { render } from '@testing-library/react';

import LoadingScreen from '@components/common/loading/loading-screen.component';

import '@testing-library/jest-dom';

const testId = 'loading-screen';

describe('loading-screen', () => {
  it('should render LoadingScreen', () => {
    const loadingScreen = render(<LoadingScreen data-testid={testId} />);

    expect(loadingScreen.getByTestId(testId)).toBeInTheDocument();
  });
});
