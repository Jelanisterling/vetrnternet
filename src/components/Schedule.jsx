import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useRef } from "react";
import EventDetails from "@/components/EventDetails.jsx";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

function Schedule({ appointments, handleDeleteAppointment }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef();

  
  const [eventIdToDelete, setEventIdToDelete] = useState(null);

  const openDeleteConfirm = (eventId) => {
    setEventIdToDelete(eventId);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    handleDeleteAppointment(eventIdToDelete);
    setIsAlertOpen(false);
    setIsDrawerOpen(false);
    setSelectedEvent(null);
    setEventIdToDelete(null);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={appointments.map((appo) => ({
          title: `${appo.petName} (${appo.ownerName}) - ${appo.service}`,
          start: `${appo.date}T${appo.time}`,
          end: `${appo.date}T${appo.endTime}`,
          allDay: false,
          extendedProps: {
            notes: appo.notes,
            date: appo.date,
            timeRange: `${appo.time} - ${appo.endTime}`,
            id: appo.id,
            type: appo.type,
          },
        }))}
        eventDidMount={(info) => {
          info.el.style.cursor = "pointer";
        }}
        selectable={true}
        editable={false}
        eventClick={(info) => {
          // Extract pet & owner safely
          const [petAndOwner, service] = info.event.title.split(" - ");
          const petMatch = petAndOwner.match(/^(.+?) \((.+?)\)$/);
          const eventPetName = petMatch?.[1] ?? "";
          const eventOwnerName = petMatch?.[2] ?? "";

          setSelectedEvent({
            eventPetName,
            eventOwnerName,
            eventService: service,
            start: info.event.extendedProps.date,
            time: info.event.extendedProps.timeRange,
            type: info.event.extendedProps.type,
            note: info.event.extendedProps.notes,
            onDelete: () => openDeleteConfirm(info.event.extendedProps.id),
          });

          setIsDrawerOpen(true);
        }}
      />

      {selectedEvent && (
        <EventDetails
          selectedEvent={selectedEvent}
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Appointment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default Schedule;
