import {v4 as uuidv4} from 'uuid';
import {Button, Flex, HStack, Input, Table} from "@chakra-ui/react"

import SelectHasActiveTreatment from "@/components/SelectHasActiveTreatment.jsx";
import {useState} from "react";
import AddPatient from "@/components/AddPatients.jsx";

import {AiOutlineDelete} from "react-icons/ai";
import SearchBar from "@/components/SearchBar.jsx";


function Patients({patients, setPatients}) {


    const [filteredPatients, setFilteredPatients] = useState([...patients])


    const updateTreatmentStatus = (targetId, newTreatment) => {
        const newArray = patients.map((patient) => {
                if (patient.id === targetId) {

                    return {
                        ...patient,
                        hasActiveTreatment: newTreatment
                    }
                } else {
                    return patient
                }
            }
        )
        setPatients(newArray)
        setFilteredPatients(newArray)
    }

    const updateTreatment = (targetId, newTreatment) => {
        const newArray = patients.map((patient) => {
                if (patient.id === targetId) {

                    return {
                        ...patient,
                        activeTreatment: newTreatment
                    }
                } else {
                    return patient
                }
            }
        )
        setPatients(newArray)
        setFilteredPatients(newArray)
    }

    const updateDate = (targetId, newDate) => {
        const newArray = patients.map((patient) => {
                if (patient.id === targetId) {

                    return {
                        ...patient,
                        lastVisit: newDate
                    }
                } else {
                    return patient
                }
            }
        )
        setPatients(newArray)
        setFilteredPatients(newArray)
    }

    return (
        <Flex direction="column" justifyContent="flex-start" h="100vh">
            <HStack gap={15}>
                <AddPatient onSavePatient={(newPatient) => {
                    setPatients([...patients, newPatient])
                    setFilteredPatients([...patients, newPatient])
                }
                }/>
                <SearchBar patients={patients} searchSetting={(s) => setFilteredPatients(s)}/>
            </HStack>

            <Table.Root size="sm">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Owner Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Pet Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Species</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">TreatmentStatus</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">ActiveTreatment</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">LastVisit</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {filteredPatients.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.ownerName}</Table.Cell>
                            <Table.Cell>{item.petName}</Table.Cell>
                            <Table.Cell>{item.species}</Table.Cell>
                            <Table.Cell>
                                <SelectHasActiveTreatment updateTreatmentStatus={updateTreatmentStatus}
                                                          hasActiveTreatment={item.hasActiveTreatment}
                                                          itemId={item.id}
                                />
                            </Table.Cell>
                            <Table.Cell textAlign="end">
                                <Input textAlign="end"
                                       value={item.activeTreatment}
                                       onChange={(e) => updateTreatment(item.id, e.target.value)}
                                />
                            </Table.Cell>
                            <Table.Cell textAlign="end">
                                <Input type="date" textAlign="end"
                                       value={item.lastVisit}
                                       onChange={(e) => updateDate(item.id, e.target.value)}
                                />
                            </Table.Cell>
                            <Table.Cell textAlign="end">
                                <Button bg="white"
                                        _dark={{
                                            bg: "black"
                                        }}
                                        onClick={() => {
                                            setPatients(patients.filter((p) => p.id !== item.id))
                                            setFilteredPatients(patients.filter((p) => p.id !== item.id))
                                        }
                                        }
                                >
                                    <AiOutlineDelete color="red"/>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Flex>
    )

}

export default Patients;