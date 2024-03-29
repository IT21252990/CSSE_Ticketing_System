import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
import QRDisplay from '../screens/QRDisplay';
import '@testing-library/jest-native/extend-expect';
test('Renders QR code with input', () => {
  const { getByText, getByPlaceholderText, getByTestId } = render(<QRDisplay />);

  const inputField = getByPlaceholderText('Enter text');
  fireEvent.changeText(inputField, 'Test Text'); 
  const generateButton = getByText('Generate QR Code');
  fireEvent.press(generateButton); 
  const qrCode = getByTestId('qr-code');
  expect(qrCode).toBeTruthy();
});

// Negative Test Case: Try generating a QR code without input
test('Does not generate QR code without input', () => {
  const { getByText } = render(<QRDisplay />);

  // Find and click the Generate QR Code button without entering text
  const generateButton = getByText('Generate QR Code');
  fireEvent.press(generateButton);

  // Check if no QR code is displayed
  const qrCode = queryByTestId('qr-code');
  expect(qrCode).toBeNull();
});

// Negative Test Case: Check for default QR code display
test('Shows default QR code with no input', () => {
  const { getByTestId } = render(<QRDisplay />);

  // Find the QR code and check if it has a default value
  const qrCode = getByTestId('qr-code');
  expect(qrCode).toBeTruthy();
  expect(qrCode.props.value).toBe('NA');
});
