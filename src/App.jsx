import {Grid, GridItem, VStack, SimpleGrid, Flex, Heading, HStack} from "@chakra-ui/react"
import SideBar from "@/components/SideBar.jsx";
import {useState} from "react";
import ToggleButton from "@/components/ToggleButton.jsx";
import Schedule from "@/components/Schedule.jsx";
import AddAppointment from "@/components/AddAppointment.jsx";
import Patients from "@/components/Patients.jsx";
import PatientsByCondition from "@/components/DashboardCards/PatientsByCondition.jsx";
import PatientsListDashboard from "@/components/DashboardCards/PatientsListDashboard.jsx";

import {v4 as uuidv4} from "uuid";
import NextVisitDetails from "@/components/DashboardCards/NextVisitDetails.jsx";

function App() {


    const [_appointments, setAppointments] = useState([
        {
            id: uuidv4(),
            petName: "Milo",
            ownerName: "Alice Smith",
            service: "Vaccination",
            date: "2025-06-18",
            time: "12:30",
            endTime: "13:30",
            type: "CheckUp",
            notes: "First vaccination"
        },
        {
            id: uuidv4(),
            petName: "Buddy",
            ownerName: "John Doe",
            service: "Dental Cleaning",
            date: "2025-06-15",
            time: "20:30",
            endTime: "22:00",
            type: "Report",
            notes: "Long live king"
        },
        {
            id: uuidv4(),
            petName: "Cody",
            ownerName: "Denis Kral",
            service: "Surgery",
            date: "2025-06-16",
            time: "07:30",
            endTime: "10:20",
            type: "Emergency Visit",
            notes: "Sikidim yavrum tirim tirak tirim tirakkk olurmi hic calismamk"
        },
        {
            id: uuidv4(),
            petName: "Estus",
            ownerName: "Emir Yumrukkaya",
            service: "Review",
            date: "2025-06-17",
            time: "19:05",
            endTime: "21:00",
            type: "Video Consultation",
            notes: "It's me"
        },
        {
            id: uuidv4(),
            petName: "Dante",
            ownerName: "Mustafa Kemal",
            service: "Vaccination",
            date: "2025-06-18",
            time: "06:30",
            endTime: "08:00",
            type: "on-Side Consultation",
            notes: "There were many enemies"
        },
        {
            id: uuidv4(),
            petName: "Lufi",
            ownerName: "Jack Shephard",
            service: "Control Of Result",
            date: "2025-06-19",
            time: "08:00",
            endTime: "10:40",
            type: "Report",
            notes: "Blalbla blablablabla I am doctor too"
        },
        {
            id: uuidv4(),
            petName: "Kufi",
            ownerName: "Muhammed bin Tayyar",
            service: "Dental Cleaning",
            date: "2025-06-20",
            time: "12:00",
            endTime: "13:00",
            type: "CheckUp",
            notes: "darariiiiiii darari dararii"
        },
        {
            id: uuidv4(),
            petName: "Fluffy",
            ownerName: "Samy Tomy Glock",
            service: "Surgery",
            date: "2025-06-18",
            time: "14:30",
            endTime: "16:00",
            type: "Emergency Visit",
            notes: "tun tun ne"
        },
        {
            id: uuidv4(),
            petName: "Dumy",
            ownerName: "Big John Doe ",
            service: "Vaccination",
            date: "2025-06-18",
            time: "21:00",
            endTime: "22.30",
            type: "on-Side Consultation",
            notes: "not urgent"
        },
        {
            id: uuidv4(),
            petName: "Donk",
            ownerName: "Sunny Punchrock",
            service: "Review",
            date: "2025-06-15",
            time: "17:30",
            endTime: "20:40",
            type: "Video Consultation",
            notes: "dsdsdfsfs"
        },
        {
            id: uuidv4(),
            petName: "Lokom",
            ownerName: "Andy Cot",
            service: "Dental Cleaning",
            date: "2025-06-18",
            time: "08:30",
            endTime: "11:00",
            type: "CheckUp",
            notes: "who are you?",
        }
    ]);

    const [patients, setPatients] = useState([
            {
                id: uuidv4(),
                ownerName: "Ali Veli",
                petName: "Boncuk",
                species: "Dog",
                hasActiveTreatment: "Active",
                activeTreatment: "Surgery",
                lastVisit: "2024-06-10"
            },
            {
                id: uuidv4(),
                ownerName: "Ayşe Fatma",
                petName: "Pamuk",
                species: "Cat",
                hasActiveTreatment: "",
                activeTreatment: "",
                lastVisit: "2024-06-05"
            }


        ]
    )


    const handleDeleteAppointment = (eventToDelete) => {
        const newArray = _appointments.filter(appo => appo.id !== eventToDelete
        );
        setAppointments(newArray);
    };


    const [selectedButton, setSelectedButton] = useState("Dashboard");


    return (
        <Grid templateAreas={`"sidebar top" "sidebar main"`}
              templateColumns={{base: "1fr", md: "160px 1fr", lg: "250px 1fr"}}
              templateRows={selectedButton === "Dashboard" ? "150px 1fr" : "1fr"}
              minH="100vh"
        >
            <GridItem area="sidebar" bgColor="orange.100" _dark={{bg: "gray.900"}} p="4"
                      display={{base: "none", md: "Flex"}}>
                <SideBar onClicked={(name) => setSelectedButton(name)} selected={selectedButton}/>
            </GridItem>
            {selectedButton === "Dashboard" && (
                <GridItem area="top" bg="blue.200" _dark={{backgroundColor: "blue.900"}} p="4">
                    <HStack justifyContent="space-between">
                        <Heading size="6xl" p={4} mx={30} color="pink.800" _dark={{color: "white"}}>Hi, Emir</Heading>
                        <ToggleButton/>
                    </HStack>
                </GridItem>)}
            <GridItem area="main" p="4">
                {selectedButton === "Schedule" &&
                    <>
                        <AddAppointment onSaveAppointment={(newAppo) => setAppointments([..._appointments, newAppo])}/>
                        <Schedule appointments={_appointments} handleDeleteAppointment={handleDeleteAppointment}/>
                    </>
                }
                {selectedButton === "Patients" &&
                    <Patients patients={patients} setPatients={(p) => setPatients(p)}/>
                }
                {selectedButton === "Dashboard" &&
                    <SimpleGrid columns={{base: 2, md: 5}} gap={{base: "24px", md: "40px"}}>
                        <GridItem colSpan={{base: 1, md: 3}}>
                            <PatientsListDashboard appointments={_appointments}/>
                        </GridItem>
                        <GridItem colSpan={{base: 1, md: 2}}>
                            <PatientsByCondition patients={patients}/>
                        </GridItem>

                        <GridItem colSpan={{base: 1, md: 2}}>
                            <NextVisitDetails nextCardAppos={_appointments}/>
                        </GridItem>

                    </SimpleGrid>

                }
            </GridItem>

        </Grid>
    )
}

export default App
