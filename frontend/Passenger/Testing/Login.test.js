import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "./Login";

test("Positive Test: Renders the Login component", () => {
  const { getByText, getByPlaceholderText } = render(<Login />);
  
  // Assert that key elements are present in the component
  expect(getByText("Hi Welcome Back ! 👋")).toBeTruthy();
  expect(getByPlaceholderText("Enter your email address")).toBeTruthy();
  expect(getByPlaceholderText("Enter your password")).toBeTruthy();
  // Add more assertions as needed
});

test("Negative Test: Displays an error message for an invalid email", async () => {
  const { getByText, getByPlaceholderText, getByTestId } = render(<Login />);
  const emailInput = getByPlaceholderText("Enter your email address");
  const loginButton = getByTestId("login-button");

  // Fill in invalid email address
  fireEvent.changeText(emailInput, "invalid-email");
  fireEvent.press(loginButton);

  // Wait for the alert to appear
  await waitFor(() => expect(getByText("Please enter a valid email address")).toBeTruthy());
  // Add more assertions as needed
});

test("Positive Test: Successfully logs in with valid credentials", async () => {
  const { getByPlaceholderText, getByTestId } = render(<Login />);
  const emailInput = getByPlaceholderText("Enter your email address");
  const passwordInput = getByPlaceholderText("Enter your password");
  const loginButton = getByTestId("login-button");

  // Fill in valid email and password
  fireEvent.changeText(emailInput, "valid-email@example.com");
  fireEvent.changeText(passwordInput, "password123");
  fireEvent.press(loginButton);

});
