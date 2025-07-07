import { render, screen, fireEvent } from "@testing-library/react";
import Board from "./Board";
import { StateType } from "../data/devices";

// Mock child components
jest.mock("./Column", () => ({ title, devices, handleOpenModal }) => (
  <div data-testid="column" onClick={() => handleOpenModal(devices[0])}>
    <h2 data-testid="column-title">{title}</h2>
    <span>{devices.length} devices</span>
  </div>
));
jest.mock("./DeviceDetailModal", () => ({ device }) => (
  <div data-testid="detail-modal">{device.name}</div>
));

// Mock DndContext
jest.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }) => <div>{children}</div>,
}));

describe("Board", () => {
  it("should render a column for each state type", () => {
    render(<Board />);

    const columns = screen.getAllByTestId("column");
    const numberOfStates = Object.values(StateType).length;
    expect(columns).toHaveLength(numberOfStates);

    expect(screen.getByText("Requested")).toBeInTheDocument();
    expect(screen.getByText("Purchased")).toBeInTheDocument();
    expect(screen.getByText("Shipped")).toBeInTheDocument();
    expect(screen.getByText("Installed")).toBeInTheDocument();
  });

  it("should open and close the modal when a device is clicked", () => {
    render(<Board />);

    expect(screen.queryByTestId("detail-modal")).not.toBeInTheDocument();

    const firstColumn = screen.getAllByTestId("column")[0];
    fireEvent.click(firstColumn);

    expect(screen.getByTestId("detail-modal")).toBeInTheDocument();
    expect(screen.getByText("light switch 1")).toBeInTheDocument();

    const closeButton = screen.getByLabelText("close");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("detail-modal")).not.toBeInTheDocument();
  });
});
