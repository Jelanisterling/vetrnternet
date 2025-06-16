import {Button, CloseButton, Drawer, Portal, VStack} from "@chakra-ui/react"


function EventDetails({selectedEvent, isOpen, onClose}) {

    return (
        <Drawer.Root open={isOpen} onOpenChange={(value) => onClose(value)}>
            <Portal>
                <Drawer.Backdrop/>
                <Drawer.Positioner padding="4">
                    <Drawer.Content rounded="md">
                        <Drawer.Header>
                            <Drawer.Title mb={8}>EVENT INFORMATION</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body spaceY="10">
                            <VStack alignItems="stretch">
                                <h2 style={{fontSize: '1.15rem', marginBottom: '0.5rem'}}>PetName</h2>
                                <p>{selectedEvent.eventPetName}</p>
                            </VStack>
                            <VStack alignItems="stretch">
                                <h2 style={{fontSize: '1.15rem', marginBottom: '0.5rem'}}>OwnerName</h2>
                                <p>{selectedEvent.eventOwnerName}</p>
                            </VStack>
                            <VStack alignItems="stretch">
                                <h2 style={{fontSize: '1.15rem', marginBottom: '0.5rem'}}>Service</h2>
                                <p>{selectedEvent.eventService}</p>
                            </VStack>
                            <VStack alignItems="stretch">
                                <h2 style={{fontSize: '1.15rem', marginBottom: '0.5rem'}}>Date</h2>
                                <p>{selectedEvent.start}</p>
                            </VStack>
                            <VStack alignItems="stretch">
                                <h2 style={{fontSize: '1.15rem', marginBottom: '0.5rem'}}>Time</h2>
                                <p>{selectedEvent.time}</p>
                            </VStack>
                            <VStack alignItems="stretch">
                                <h2 style={{fontSize: '1.15rem', marginBottom: '0.5rem'}}>Appointment Type</h2>
                                <p>{selectedEvent.type}</p>
                            </VStack>
                            <VStack alignItems="stretch">
                                <h2 style={{fontSize: '1.15rem', marginBottom: '0.5rem'}}>Note</h2>
                                <p>{selectedEvent.note}</p>
                            </VStack>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button onClick={() => {
                                selectedEvent.onDelete();
                                onClose();
                            }}>Delete</Button>
                            <Button variant="outline" onClick={onClose}>CLOSE</Button>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm"/>
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )

}

export default EventDetails;