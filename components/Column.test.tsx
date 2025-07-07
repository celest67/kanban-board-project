import { render, screen } from "@testing-library/react";
import Column from "./Column";
import { Device, deviceType, StateType } from "../data/devices";
import { useDroppable } from "@dnd-kit/core";

// Mock the child component to isolate the Column component
jest.mock("./DeviceCard", () => () => <div data-testid="device-card" />);

// Mock the useDroppable hook from dnd-kit
jest.mock("@dnd-kit/core", () => ({
  // We need to provide a mock implementation for useDroppable
  useDroppable: jest.fn(),
}));
const mockUseDroppable = useDroppable as jest.Mock;

describe("Column", () => {
  // Create mock data that will be used in the tests
  const mockDevices: Device[] = [
    {
      id: "1",
      name: "Device 1",
      type: deviceType.SWITCH,
      stateType: StateType.REQUESTED,
      movedHistory: [],
    },
    {
      id: "2",
      name: "Device 2",
      type: deviceType.LOCK,
      stateType: StateType.REQUESTED,
      movedHistory: [],
    },
  ];
  const mockHandleOpenModal = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockUseDroppable.mockReturnValue({
      setNodeRef: jest.fn(),
      isOver: false,
    });
  });

  it("should render the title and the correct number of device cards", () => {
    render(
      <Column
        title="Requested"
        devices={mockDevices}
        handleOpenModal={mockHandleOpenModal}
      />
    );

    expect(screen.getByText("Requested")).toBeInTheDocument();

    const deviceCards = screen.getAllByTestId("device-card");
    expect(deviceCards).toHaveLength(2);
  });
});
