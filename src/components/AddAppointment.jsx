import {
  Button,
  CloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Stack,
  HStack,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { RiHeartAdd2Line } from "react-icons/ri";
import SelectAppoType from "@/components/SelectAppoType.jsx";

function AddAppointment({ onSaveAppointment }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const petName = useRef("");
  const ownerName = useRef("");
  const service = useRef("");
  const date = useRef("");
  const btime = useRef("");
  const howLong = useRef("");
  const notes = useRef("");
  const [appoType, setAppoType] = useState("");

  const calculateEndTime = (time, long) => {
    const [hourStr, minuteStr] = time.split(":");
    const startHour = Number(hourStr);
    const startMinute = Number(minuteStr);
    const newLong = Number(long);

    let newHour = startHour + Math.floor(newLong);
    let newMinute = startMinute;

    if (newHour >= 24) {
      newHour = newHour % 24;
    }

    const formattedHour = `${newHour.toString().padStart(2, "0")}:${newMinute
      .toString()
      .padStart(2, "0")}`;
    return formattedHour;
  };

  const handleSave = () => {
    onSaveAppointment({
      id: Date.now(),
      petName: petName.current.value,
      ownerName: ownerName.current.value,
      service: service.current.value,
      date: date.current.value,
      time: btime.current.value,
      endTime: calculateEndTime(btime.current.value, howLong.current.value),
      type: appoType,
      notes: notes.current.value,
    });
    onClose();
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={onOpen}>
        <HStack spacing={2}>
          <RiHeartAdd2Line />
          Add Appointment
        </HStack>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Pet Name</FormLabel>
                <Input ref={petName} type="text" placeholder="pet name" />
              </FormControl>
              <FormControl>
                <FormLabel>Owner Name</FormLabel>
                <Input ref={ownerName} type="text" placeholder="owner name" />
              </FormControl>
              <FormControl>
                <FormLabel>Service</FormLabel>
                <Input ref={service} type="text" placeholder="service" />
              </FormControl>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input ref={date} type="date" />
              </FormControl>
              <FormControl>
                <FormLabel>Time</FormLabel>
                <Input ref={btime} type="time" />
              </FormControl>
              <FormControl>
                <FormLabel>How Long (hours)</FormLabel>
                <Input ref={howLong} type="number" placeholder="duration" />
              </FormControl>
              <FormControl>
                <FormLabel>Appointment Type</FormLabel>
                <SelectAppoType
                  appoType={appoType}
                  updateAppoType={(ntype) => setAppoType(ntype)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Note</FormLabel>
                <Input ref={notes} type="text" placeholder="note" />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddAppointment;
