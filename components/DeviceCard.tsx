import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Device } from "../data/devices";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const DeviceCard = ({
  device,
  handleOpenModal,
}: {
  device: Device;
  handleOpenModal: (device: Device) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: device.id,
      data: { device },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Box ref={setNodeRef} style={style}>
      <Card className="mt-2 shadow w-full">
        <CardActionArea onClick={() => handleOpenModal(device)}>
          <CardContent className="flex align-center gap-1">
            <Box
              {...listeners}
              {...attributes}
              sx={{ cursor: "grab", touchAction: "none" }}
            >
              <DragIndicatorIcon sx={{ color: "text.secondary" }} />
            </Box>
            <Box>
              <Typography
                variant="body1"
                component="h2"
                className="capitalize font-bold"
              >
                {device.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                className="mt-0.5 uppercase"
              >
                {device.type}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default DeviceCard;
