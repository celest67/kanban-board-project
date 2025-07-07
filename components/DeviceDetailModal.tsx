import { useMemo } from "react";
import { Device } from "@/data/devices";
import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const DeviceDetailModal = ({ device }: { device: Device }) => {
  const movedHistory = useMemo(() => {
    if (device.movedHistory) {
      return device.movedHistory.reverse();
    } else {
      return [];
    }
  }, [device]);
  return (
    <Card className="w-full shadow">
      <CardContent>
        <Typography
          variant="h6"
          className="capitalize"
          component="h2"
          gutterBottom
        >
          {device.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="uppercase"
          gutterBottom
        >
          {device.type}
        </Typography>
        <Box className="my-2 flex flex-col gap-0.5">
          {device.state && (
            <Box className="flex justify-between">
              <Typography variant="body2" className="font-bold">
                State
              </Typography>
              <Typography variant="body2">{device.state}</Typography>
            </Box>
          )}
          {device.locked !== undefined && (
            <Box className="flex justify-between">
              <Typography variant="body2" className="font-bold">
                Status
              </Typography>
              <Typography variant="body2">
                {device.locked ? "Locked" : "Unlocked"}
              </Typography>
            </Box>
          )}
          {device.level !== undefined && (
            <Box className="flex justify-between">
              <Typography variant="body2" className="font-bold">
                Level
              </Typography>
              <Typography variant="body2">
                {Math.round(device.level * 100)}%
              </Typography>
            </Box>
          )}
          {device.temp !== undefined && (
            <Box className="flex justify-between">
              <Typography variant="body2" className="font-bold">
                Temperature
              </Typography>
              <Typography variant="body2">{device.temp}°</Typography>
            </Box>
          )}
          {device.mode && (
            <Box className="flex justify-between">
              <Typography variant="body2" className="font-bold">
                Mode
              </Typography>
              <Typography variant="body2">{device.mode}</Typography>
            </Box>
          )}
        </Box>
        {movedHistory.length > 0 && (
          <>
            <Divider className="my-1" />
            <Typography variant="subtitle1" className="font-bold" gutterBottom>
              Comments
            </Typography>
            <List dense>
              {movedHistory.map((move) => (
                <ListItem key={move.timestamp?.toString()} className="p-0">
                  <ListItemText
                    primary={`${move.timestamp?.toLocaleString()}- ${
                      move.comment
                    }`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceDetailModal;
