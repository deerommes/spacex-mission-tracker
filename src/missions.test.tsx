import { render, screen, cleanup } from '@testing-library/react';
import Missions from './Missions';

test('Displays Missions heading', () => {
  render(<Missions />);
  const heading = screen.getByText(/missions/i);
  expect(heading).toHaveTextContent('Missions');
});

test('search input', () => {
  render(<Missions />);
  const filterInput = screen.getByTestId('missions');
  expect(filterInput).toBeInTheDocument();
});

it('should render the component onto the screen', () => {
  render(<Missions />);
  expect(screen.getByTestId('missions')).toBeInTheDocument();
});
