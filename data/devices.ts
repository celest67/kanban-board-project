export enum StateType {
  REQUESTED = "Requested",
  PURCHASED = "Purchased",
  SHIPPED = "Shipped",
  INSTALLED = "Installed",
}

export enum deviceType {
  SWITCH = "SWITCH",
  LOCK = "LOCK",
  DIMMER = "DIMMER",
  THERMO = "THERMO",
}

export interface MovedComment {
  timestamp?: Date;
  comment: string;
}

export interface Device {
  id: string;
  name: string;
  type: deviceType;
  state?: string;
  codes?: string[];
  locked?: boolean;
  level?: number;
  temp?: number;
  mode?: string;
  stateType: StateType;
  movedHistory: MovedComment[];
}

// 1. these states include: requested, purchased, shipped, installed.
// 2. states. As part of a transition, a comment should be added to the device to
// sig nal the state change as well as a timestamp that is automatically supplied.
// 3. When a user opens a device they should be able to view the details of the device and any
// comments associated with that device.

export const rawData = {
  devices: [
    { name: "light switch 1", type: "SWITCH", state: "off" },
    { name: "light switch 2", type: "SWITCH", state: "off" },
    { name: "light switch 3", type: "SWITCH", state: "off" },
    { name: "light switch 4", type: "SWITCH", state: "off" },
    {
      name: "door lock",
      type: "LOCK",
      codes: ["1234", "2345", "3456", "4567"],
      locked: true,
    },
    { name: "hallway dimmer", type: "DIMMER", level: 0.85 },
    { name: "hallway dimmer", type: "DIMMER", level: 0.85 },
    { name: "thermostat", type: "THERMO", temp: 72.0, mode: "AUTO" },
  ],
};

export const initializedDevices: Device[] = rawData.devices.map(
  (device, index) => ({
    ...device,
    id: `device-${index + 1}`,
    stateType: StateType.REQUESTED,
    movedHistory: [],
  })
) as Device[];
