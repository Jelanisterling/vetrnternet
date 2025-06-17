import {
  Button,
  CloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Portal,
  Input,
  Stack,
  HStack,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import { BsPersonAdd } from "react-icons/bs";

function AddPatient({ onSavePatient }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const name = useRef(null);
  const petName = useRef(null);
  const species = useRef(null);
  const activeTreatment = useRef(null);
  const lastVisit = useRef(null);

  const handleSave = () => {
    onSavePatient({
      id: uuidv4(),
      ownerName: name.current.value,
      petName: petName.current.value,
      species: species.current.value,
      hasActiveTreatment: "", // You can update this if needed
      activeTreatment: activeTreatment.current.value,
      lastVisit: lastVisit.current.value,
    });
    onClose();
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={onOpen}>
        <HStack spacing={2}>
          <BsPersonAdd />
          Add Patient
        </HStack>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Owner Name</FormLabel>
                <Input ref={name} type="text" placeholder="Name" />
              </FormControl>
              <FormControl>
                <FormLabel>Pet Name</FormLabel>
                <Input ref={petName} type="text" placeholder="Pet Name" />
              </FormControl>
              <FormControl>
                <FormLabel>Species</FormLabel>
                <Input ref={species} type="text" placeholder="Species" />
              </FormControl>
              <FormControl>
                <FormLabel>Active Treatment</FormLabel>
                <Input ref={activeTreatment} type="text" placeholder="Active Treatment" />
              </FormControl>
              <FormControl>
                <FormLabel>Last Visit</FormLabel>
                <Input ref={lastVisit} type="date" placeholder="Last Visit" />
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

export default AddPatient;
