import { render, screen } from '@testing-library/react';
import App from './App';
import WS from "jest-websocket-mock";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Vars");
  expect(linkElement).toBeInTheDocument();
});
