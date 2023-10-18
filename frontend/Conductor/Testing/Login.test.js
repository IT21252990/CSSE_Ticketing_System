import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
import Login from '../screens/Login';
import '@testing-library/jest-native/extend-expect';


describe('Login Component', () => {
  test('Positive Test: Renders the Login component correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    const usernameInput = getByPlaceholderText('Enter your user name');
    const passwordInput = getByPlaceholderText('Enter your password');
    const loginButton = getByText('Login');

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  test('Positive Test: Toggling password visibility', () => {
    const { getByPlaceholderText, getByTestId } = render(<Login />);
    const passwordInput = getByPlaceholderText('Enter your password');
    const togglePasswordButton = getByTestId('toggle-password-button');

    // Initially, password is hidden
    expect(passwordInput.props.secureTextEntry).toBe(true);

    fireEvent.press(togglePasswordButton);

    // After clicking the toggle button, password should be shown
    expect(passwordInput.props.secureTextEntry).toBe(false);
  });

  test('Negative Test: Invalid login', () => {
    // To test the negative scenario, you can mock the fetch function to return an error response
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const { getByText } = render(<Login />);
    const loginButton = getByText('Login');

    fireEvent.press(loginButton);

   
  });
});
