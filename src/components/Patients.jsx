import { v4 as uuidv4 } from 'uuid';
import { Button, Flex, HStack, Input, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import SelectHasActiveTreatment from "@/components/SelectHasActiveTreatment.jsx";
import { useState } from "react";
import AddPatient from "@/components/AddPatients.jsx";
import { AiOutlineDelete } from "react-icons/ai";
import SearchBar from "@/components/SearchBar.jsx";

function Patients({ patients, setPatients }) {
  const [filteredPatients, setFilteredPatients] = useState([...patients]);

  const updateTreatmentStatus = (targetId, newTreatment) => {
    const newArray = patients.map((patient) => {
      if (patient.id === targetId) {
        return {
          ...patient,
          hasActiveTreatment: newTreatment,
        };
      }
      return patient;
    });
    setPatients(newArray);
    setFilteredPatients(newArray);
  };

  const updateTreatment = (targetId, newTreatment) => {
    const newArray = patients.map((patient) => {
      if (patient.id === targetId) {
        return {
          ...patient,
          activeTreatment: newTreatment,
        };
      }
      return patient;
    });
    setPatients(newArray);
    setFilteredPatients(newArray);
  };

  const updateDate = (targetId, newDate) => {
    const newArray = patients.map((patient) => {
      if (patient.id === targetId) {
        return {
          ...patient,
          lastVisit: newDate,
        };
      }
      return patient;
    });
    setPatients(newArray);
    setFilteredPatients(newArray);
  };

  return (
    <Flex direction="column" justifyContent="flex-start" h="100vh">
      <HStack gap={15}>
        <AddPatient
          onSavePatient={(newPatient) => {
            setPatients([...patients, newPatient]);
            setFilteredPatients([...patients, newPatient]);
          }}
        />
        <SearchBar patients={patients} searchSetting={(s) => setFilteredPatients(s)} />
      </HStack>

      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Owner Name</Th>
            <Th>Pet Name</Th>
            <Th>Species</Th>
            <Th textAlign="end">TreatmentStatus</Th>
            <Th textAlign="end">ActiveTreatment</Th>
            <Th textAlign="end">LastVisit</Th>
            <Th></Th> {/* For delete button */}
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
                  onClick={() => {
                    setPatients(patients.filter((p) => p.id !== item.id));
                    setFilteredPatients(patients.filter((p) => p.id !== item.id));
                  }}
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
