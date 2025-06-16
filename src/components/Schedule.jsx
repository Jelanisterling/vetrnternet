import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventDetails from "@/components/EventDetails.jsx";
import {useState} from "react";


function Schedule({appointments, handleDeleteAppointment}) {

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={appointments.map(appo => ({
                            title: `${appo.petName} (${appo.ownerName}) - ${appo.service}`,
                            start: `${appo.date}T${appo.time}`,
                            end: `${appo.date}T${appo.endTime}`,
                            allDay: false,
                            extendedProps: {
                                note: appo.notes,
                                dateForEvent: appo.date,
                                timeForEvent: appo.time + " - " + appo.endTime,
                                id: appo.id,
                                type: appo.type
                            }
                        }
                    )
                )
                }
                eventDidMount={(info) => {
                    info.el.style.cursor = "pointer";
                }}

                selectable={true}
                editable={false}

                eventClick={(info) => {
                    const [eventPetAndOwner, eventService] = info.event.title.split(/\s*-\s*/);
                    const [eventPetName, eventOwnerName] = eventPetAndOwner.replace(/[()]/g, '').split(" ");
                    setSelectedEvent({
                        eventPetName: eventPetName,
                        eventOwnerName: eventOwnerName,
                        eventService: eventService,
                        start: info.event.extendedProps.dateForEvent,
                        time: info.event.extendedProps.timeForEvent,
                        type: info.event.extendedProps.type,
                        note: info.event.extendedProps.note,
                        onDelete: () => {
                            handleDeleteAppointment(info.event.extendedProps.id)
                        }
                    });
                    setIsDrawerOpen(true);
                }}
            />

            {selectedEvent && <EventDetails
                selectedEvent={selectedEvent}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}/>}
        </>
    )
}

export default Schedule;