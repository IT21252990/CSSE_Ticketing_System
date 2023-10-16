import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Signup from './Signup';

describe('Signup Component', () => {
  it('renders the component', () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);
    expect(getByText('Create Your Passenger Account')).toBeTruthy();
  });

  it('validates input fields', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<Signup />);
    
    // Find your input fields by placeholder text
    const firstNameInput = getByPlaceholderText('Enter your First Name');
    const lastNameInput = getByPlaceholderText('Enter your Last Name');
    const emailInput = getByPlaceholderText('Enter your email address');
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const passwordInput = getByPlaceholderText('Enter your password');
    const confirmPasswordInput = getByPlaceholderText('Enter your Confirm Password');
    
    // Fill in invalid values and trigger signup
    fireEvent.changeText(firstNameInput, '');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(emailInput, 'invalid_email');
    fireEvent.changeText(phoneInput, '123');
    fireEvent.changeText(passwordInput, 'pass');
    fireEvent.changeText(confirmPasswordInput, 'password');
    fireEvent.press(getByTestId('signup-button'));
    
    // Expect to see error alerts
    expect(getByText('Please fill in all fields.')).toBeTruthy();
    expect(getByText('Please enter a valid email address.')).toBeTruthy();
    expect(getByText('Password must be at least 6 characters long.')).toBeTruthy();
    expect(getByText('Passwords do not match.')).toBeTruthy();
  });

});
