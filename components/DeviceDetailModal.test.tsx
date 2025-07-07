import { render, screen } from "@testing-library/react";
import DeviceDetailModal from "./DeviceDetailModal";
import { Device, deviceType, StateType } from "../data/devices";

describe("DeviceCard", () => {
  it("should render the device name and type correctly", () => {
    const sampleDevice: Device = {
      id: "device-1",
      name: "light switch 1",
      state: "off",
      type: deviceType.SWITCH,
      stateType: StateType.REQUESTED,
      movedHistory: [],
    };

    render(<DeviceDetailModal device={sampleDevice} />);

    expect(screen.getByText(sampleDevice.name)).toBeInTheDocument();
    expect(screen.getByText(sampleDevice.type)).toBeInTheDocument();
  });

  it("should render door lock device name and type correctly", () => {
    const sampleDevice: Device = {
      id: "device-1",
      name: "door lock",
      locked: true,
      type: deviceType.LOCK,
      stateType: StateType.REQUESTED,
      movedHistory: [],
    };

    render(<DeviceDetailModal device={sampleDevice} />);

    expect(screen.getByText(sampleDevice.name)).toBeInTheDocument();
    expect(screen.getByText(sampleDevice.type)).toBeInTheDocument();
  });

  it("should render dimmer device name and type correctly", () => {
    const sampleDevice: Device = {
      id: "device-1",
      name: "dimmer",
      level: 0.85,
      type: deviceType.DIMMER,
      stateType: StateType.REQUESTED,
      movedHistory: [],
    };

    render(<DeviceDetailModal device={sampleDevice} />);

    expect(screen.getByText(sampleDevice.name)).toBeInTheDocument();
    expect(screen.getByText(sampleDevice.type)).toBeInTheDocument();
  });

  it("should render dimmer device name and type correctly", () => {
    const sampleDevice: Device = {
      id: "device-1",
      name: "thermo",
      mode: "AUTO",
      temp: 72,
      type: deviceType.THERMO,
      stateType: StateType.REQUESTED,
      movedHistory: [],
    };

    render(<DeviceDetailModal device={sampleDevice} />);

    expect(screen.getByText(sampleDevice.name)).toBeInTheDocument();
    expect(screen.getByText(sampleDevice.type)).toBeInTheDocument();
  });
});
