import {
  Button,
  CloseButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  VStack,
  Portal,
} from "@chakra-ui/react";

function EventDetails({ selectedEvent, isOpen, onClose }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent rounded="md" p="4">
        <DrawerHeader mb={8}>EVENT INFORMATION</DrawerHeader>
        <DrawerBody>
          <VStack alignItems="stretch" spacing={4}>
            <VStack alignItems="stretch">
              <h2 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>PetName</h2>
              <p>{selectedEvent.eventPetName}</p>
            </VStack>
            <VStack alignItems="stretch">
              <h2 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>OwnerName</h2>
              <p>{selectedEvent.eventOwnerName}</p>
            </VStack>
            <VStack alignItems="stretch">
              <h2 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>Service</h2>
              <p>{selectedEvent.eventService}</p>
            </VStack>
            <VStack alignItems="stretch">
              <h2 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>Date</h2>
              <p>{selectedEvent.start}</p>
            </VStack>
            <VStack alignItems="stretch">
              <h2 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>Time</h2>
              <p>{selectedEvent.time}</p>
            </VStack>
            <VStack alignItems="stretch">
              <h2 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>Appointment Type</h2>
              <p>{selectedEvent.type}</p>
            </VStack>
            <VStack alignItems="stretch">
              <h2 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>Note</h2>
              <p>{selectedEvent.note}</p>
            </VStack>
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              selectedEvent.onDelete();
              onClose();
            }}
          >
            Delete
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
        <CloseButton
          position="absolute"
          top="1rem"
          right="1rem"
          onClick={onClose}
        />
      </DrawerContent>
    </Drawer>
  );
}

export default EventDetails;
