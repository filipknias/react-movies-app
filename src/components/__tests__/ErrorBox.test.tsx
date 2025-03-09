import { render, screen } from "@/utilities/testUtils";
import { test, describe } from 'vitest';
import ErrorBox from "@/components/common/ErrorBox";

describe("ErrorBox", () => {
  test("renders component", () => {
    const props = { 
      errorMessage: "Error message",
      retryFunction: () => {},
      retryLoading: false, 
    };
    
    render(<ErrorBox {...props} />);
  });

  test("display error message", () => {
    const props = { 
      errorMessage: "Error message",
      retryFunction: () => {},
      retryLoading: false, 
    };
    
    render(<ErrorBox {...props} />);
 
    const errorMessage = screen.getByText(props.errorMessage);
    expect(errorMessage).toBeInTheDocument();
  });
});
