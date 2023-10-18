import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
import QRScanner from '../screens/QRScanner';
import '@testing-library/jest-native/extend-expect';

describe('QRScanner', () => {
  test('renders "Not yet scanned" when not scanned', () => {
    const { getByText } = render(<QRScanner />);
    const scanAgainButton = getByTestId('scan-again-button');
    
    // Positive test case
    expect(getByText('Not yet scanned')).toBeTruthy();

    // Negative test case
    expect(scanAgainButton).toBeNull();
  });

  test('allows scanning and rescanning', () => {
    const { getByTestId } = render(<QRScanner />);
    const scanAgainButton = getByTestId('scan-again-button');
    
    // Click the "Scan again?" button
    fireEvent.press(scanAgainButton);

    // Positive test case
    expect(getByTestId('scan-text').props.children).toBe('Not yet scanned');

    // Negative test case
    expect(scanAgainButton).toBeNull();
  });

  test('displays "No access to camera" if permission denied', () => {
    // Mock permission to simulate "No access"
    jest.mock('expo-barcode-scanner', () => ({
      ...jest.requireActual('expo-barcode-scanner'),
      requestPermissionsAsync: jest.fn(() => ({ status: 'denied' })),
    }));

    const { getByText, getByTestId } = render(<QRScanner />);
    const allowCameraButton = getByTestId('allow-camera-button');
    
    // Positive test case
    expect(getByText('No access to camera')).toBeTruthy();
    expect(allowCameraButton).toBeTruthy();

    // Negative test case
    expect(getByText('Requesting for camera permission')).toBeNull();
  });
});
