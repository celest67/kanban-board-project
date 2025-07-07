import { render, screen } from "@testing-library/react";
import DeviceCard from "../components/DeviceCard";
import { Device, deviceType, StateType } from "../data/devices";

const mockHandleOpenModal = jest.fn();

describe("DeviceCard", () => {
  it("should render the device name and type correctly", () => {
    const sampleDevice: Device = {
      id: "device-1",
      name: "Test Light Switch",
      type: deviceType.SWITCH,
      stateType: StateType.REQUESTED,
      movedHistory: [],
    };

    render(
      <DeviceCard device={sampleDevice} handleOpenModal={mockHandleOpenModal} />
    );

    expect(screen.getByText("Test Light Switch")).toBeInTheDocument();
    expect(screen.getByText("SWITCH")).toBeInTheDocument();
  });
});
