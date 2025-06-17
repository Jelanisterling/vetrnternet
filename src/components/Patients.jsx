import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  Flex,
  HStack,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import SelectHasActiveTreatment from "@/components/SelectHasActiveTreatment.jsx";
import { useState } from "react";
import AddPatient from "@/components/AddPatients.jsx";
import { AiOutlineDelete } from "react-icons/ai";
import SearchBar from "@/components/SearchBar.jsx";

function Patients({ patients, setPatients }) {
  const [filteredPatients, setFilteredPatients] = useState([...patients]);

  const updateTreatmentStatus = (targetId, newTreatment) => {
    const newArray = patients.map((patient) =>
      patient.id === targetId
        ? { ...patient, hasActiveTreatment: newTreatment }
        : patient
    );
    setPatients(newArray);
    setFilteredPatients(newArray);
  };

  const updateTreatment = (targetId, newTreatment) => {
    const newArray = patients.map((patient) =>
      patient.id === targetId
        ? { ...patient, activeTreatment: newTreatment }
        : patient
    );
    setPatients(newArray);
    setFilteredPatients(newArray);
  };

  const updateDate = (targetId, newDate) => {
    const newArray = patients.map((patient) =>
      patient.id === targetId
        ? { ...patient, lastVisit: newDate }
        : patient
    );
    setPatients(newArray);
    setFilteredPatients(newArray);
  };

  const handleDelete = (id, petName) => {
    if (window.confirm(`Are you sure you want to delete ${petName}?`)) {
      const newArray = patients.filter((p) => p.id !== id);
      setPatients(newArray);
      setFilteredPatients(newArray);
    }
  };

  return (
    <Flex direction="column" justifyContent="flex-start" h="100vh">
      <HStack gap={4} mb={4}>
        <AddPatient
          onSavePatient={(newPatient) => {
            const newArray = [...patients, newPatient];
            setPatients(newArray);
            setFilteredPatients(newArray);
          }}
        />
        <SearchBar
          patients={patients}
          searchSetting={(s) => setFilteredPatients(s)}
        />
      </HStack>

      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Owner Name</Th>
            <Th>Pet Name</Th>
            <Th>Species</Th>
            <Th textAlign="end">Treatment Status</Th>
            <Th textAlign="end">Active Treatment</Th>
            <Th textAlign="end">Last Visit</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredPatients.map((item) => (
            <Tr key={item.id}>
              <Td>{item.ownerName}</Td>
              <Td>{item.petName}</Td>
              <Td>{item.species}</Td>
              <Td>
                <SelectHasActiveTreatment
                  updateTreatmentStatus={updateTreatmentStatus}
                  hasActiveTreatment={item.hasActiveTreatment}
                  itemId={item.id}
                />
              </Td>
              <Td textAlign="end">
                <Input
                  textAlign="end"
                  value={item.activeTreatment}
                  onChange={(e) => updateTreatment(item.id, e.target.value)}
                />
              </Td>
              <Td textAlign="end">
                <Input
                  type="date"
                  textAlign="end"
                  value={item.lastVisit}
                  onChange={(e) => updateDate(item.id, e.target.value)}
                />
              </Td>
              <Td textAlign="end">
                <Button
                  bg="white"
                  _dark={{ bg: "black" }}
                  onClick={() => handleDelete(item.id, item.petName)}
                >
                  <AiOutlineDelete color="red" />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}

export default Patients;
