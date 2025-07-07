import { Box, Paper, Typography } from "@mui/material";
import { Device } from "../data/devices";
import DeviceCard from "./DeviceCard";
import { useDroppable } from "@dnd-kit/core";

const Column = ({
  title,
  devices,
  handleOpenModal,
}: {
  title: string;
  devices: Device[];
  handleOpenModal: (device: Device) => void;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  const style = {
    backgroundColor: isOver ? "#c8e6c9" : "#f5f5f5",
    transition: "background-color 0.2s ease",
  };
  return (
    <Paper ref={setNodeRef} sx={{ ...style, p: 2, width: 300 }}>
      <Typography
        variant="h5"
        component="h2"
        className="capitalize"
        gutterBottom
      >
        {title}
      </Typography>
      <Box className={"flex flex-col gap-2 min-h-1"}>
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default Column;
