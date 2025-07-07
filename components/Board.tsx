"use client";
import { useState } from "react";
import { Box, IconButton, Modal } from "@mui/material";
import { Device, initializedDevices, StateType } from "../data/devices";
import Column from "./Column";
import DeviceDetailModal from "./DeviceDetailModal";
import CloseIcon from "@mui/icons-material/Close";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const Board = () => {
  const [devices, setDevices] = useState<Device[]>(initializedDevices);
  const columnStates = Object.values(StateType);

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const handleOpenModal = (device: Device) => {
    setSelectedDevice(device);
  };

  const handleCloseModal = () => {
    setSelectedDevice(null);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    if (over) {
      const activeDevice = active.data.current?.device as Device;
      const newStateType = over.id as StateType;

      setDevices((prevDevices) =>
        prevDevices.map((device) => {
          if (device.id === activeDevice.id) {
            return {
              ...device,
              stateType: newStateType,
              movedHistory: [
                ...device.movedHistory,
                {
                  timestamp: new Date(),
                  comment: `Moved to ${newStateType}`,
                },
              ],
            };
          }
          return device;
        })
      );
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box className="flex gap-2 p-2 justify-center">
        {devices &&
          columnStates?.map((stateValue) => {
            const devicesForColumn = devices.filter(
              (device) => device.stateType === stateValue
            );

            return (
              <Column
                key={stateValue}
                title={stateValue}
                devices={devicesForColumn}
                handleOpenModal={handleOpenModal}
              />
            );
          })}
        <Modal
          open={selectedDevice !== null}
          onClose={handleCloseModal}
          aria-labelledby="device-detail-title"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 0,
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

            {selectedDevice && <DeviceDetailModal device={selectedDevice} />}
          </Box>
        </Modal>
      </Box>
    </DndContext>
  );
};

export default Board;
