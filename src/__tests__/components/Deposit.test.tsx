import { render, fireEvent, screen } from "@testing-library/react";
import Deposit from "@/app/deposit/page";

test("renders Deposit form and submits correctly", () => {
  render(<Deposit />);

  const ibanInput = screen.getByLabelText(/iban/i);
  const amountInput = screen.getByLabelText(/amount/i);
  const submitButton = screen.getByText(/deposit/i);

  fireEvent.change(ibanInput, { target: { value: "test-iban" } });
  fireEvent.change(amountInput, { target: { value: "100" } });
  fireEvent.click(submitButton);

  // Expectation: submit logic is triggered (you can mock or spy on the function)
  expect(screen.getByText(/deposit successful/i)).toBeUndefined();
});
