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
import {v4 as uuidv4} from 'uuid';
import {useRef} from "react"
import {BsPersonAdd} from "react-icons/bs";

function AddPatient({onSavePatient}) {

    const name = useRef("")
    const petName = useRef("")
    const species = useRef("")
    const activeTreatment = useRef("")
    const lastVisit = useRef("")


    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                    <HStack spacing={2}>
                        <BsPersonAdd/>
                        Add Patient
                    </HStack>
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Add Patient</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Stack gap="4">
                                <Field.Root>
                                    <Field.Label>Owner Name</Field.Label>
                                    <Input ref={name} type="text" placeholder="name"/>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Pet Name</Field.Label>
                                    <Input ref={petName} type="text" placeholder="pet name"/>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Species</Field.Label>
                                    <Input ref={species} type="text" placeholder="species"/>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Active Treatment</Field.Label>
                                    <Input ref={activeTreatment} type="text" placeholder="active treatment"/>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Last Visit</Field.Label>
                                    <Input ref={lastVisit} type="date" placeholder="last visit"/>
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Dialog.ActionTrigger asChild>
                                <Button onClick={() => onSavePatient({
                                    id: uuidv4(),
                                    ownerName: name.current.value,
                                    petName: petName.current.value,
                                    species: species.current.value,
                                    hasActiveTreatment: "",
                                    activeTreatment: activeTreatment.current.value,
                                    lastVisit: lastVisit.current.value
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

export default AddPatient;