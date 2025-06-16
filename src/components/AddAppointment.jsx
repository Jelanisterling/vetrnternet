import {
    Button,
    CloseButton,
    Dialog,
    Portal,
    Input,
    Stack,
    HStack,
    Field
} from "@chakra-ui/react"

import {useRef, useState} from "react"
import {RiHeartAdd2Line} from "react-icons/ri";
import SelectAppoType from "@/components/SelectAppoType.jsx";

function AddAppointment({onSaveAppointment}) {

    const petName = useRef("")
    const ownerName = useRef("")
    const service = useRef("")
    const date = useRef("")
    const btime = useRef("")
    const howLong = useRef("")
    const notes = useRef("")
    const [appoType, setAppoType] = useState("")

    const calculateEndTime = (time, long) => {

        const [hourStr, minuteStr] = time.split(":");

        const startHour = Number(hourStr);
        const startMinute = Number(minuteStr);
        const newLong = Number(long);

        let newHour = Math.floor(startHour) + Math.floor(newLong);
        let newMinute = Math.floor(startMinute);

        if (newHour >= 24) {
            newHour = newHour % 24;
        }

        const formattedHour = `${newHour.toString().padStart(2, "0")}:${newMinute.toString().padStart(2, "0")}`;
        return formattedHour;

    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                    <HStack spacing={2}>
                        <RiHeartAdd2Line/>
                        Add Appointment
                    </HStack>
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Add Appointment</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Stack gap="4">
                                <Field.Root>
                                    <Field.Label>Pet Name</Field.Label>
                                    <Input ref={petName} type="text" placeholder="pet name"/>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Owner Name</Field.Label>
                                    <Input ref={ownerName} type="text" placeholder="owner name"/>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Service</Field.Label>
                                    <Input ref={service} type="text" placeholder="service"/>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Date</Field.Label>
                                    <Input ref={date} type="date" placeholder="date"/>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Time</Field.Label>
                                    <Input ref={btime} type="time" placeholder="time"/>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>How Long</Field.Label>
                                    <Input ref={howLong} type="number" placeholder="how long"/>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Appointment Type</Field.Label>
                                    <SelectAppoType appoType={appoType} updateAppoType={(ntype) => setAppoType(ntype)}/>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Note</Field.Label>
                                    <Input ref={notes} type="text" placeholder="note"/>
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Dialog.ActionTrigger asChild>
                                <Button onClick={() => onSaveAppointment({
                                    id: Date.now(),
                                    petName: petName.current.value,
                                    ownerName: ownerName.current.value,
                                    service: service.current.value,
                                    date: date.current.value,
                                    time: btime.current.value,
                                    endTime: calculateEndTime(btime.current.value, howLong.current.value),
                                    type: appoType,
                                    notes: notes.current.value
                                })}>Save</Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm"/>
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default AddAppointment;