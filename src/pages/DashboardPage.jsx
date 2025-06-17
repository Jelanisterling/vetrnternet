import {
  Grid,
  GridItem,
  VStack,
  SimpleGrid,
  Flex,
  Heading,
  HStack,
} from "@chakra-ui/react";
import SideBar from "@/components/SideBar.jsx";
import { useState } from "react";
import ToggleButton from "@/components/ToggleButton.jsx";
import Schedule from "@/components/Schedule.jsx";
import AddAppointment from "@/components/AddAppointment.jsx";
import Patients from "@/components/Patients.jsx";
import PatientsByCondition from "@/components/DashboardCards/PatientsByCondition.jsx";
import PatientsListDashboard from "@/components/DashboardCards/PatientsListDashboard.jsx";
import DocumentUpload from "@/components/DocumentUpload.jsx";
import NextVisitDetails from "@/components/DashboardCards/NextVisitDetails.jsx";
import { v4 as uuidv4 } from "uuid";

function DashboardPage({ onLogout }) {
  // ✅ Now starts EMPTY
  const [_appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const handleDeleteAppointment = (eventToDelete) => {
    const newArray = _appointments.filter((appo) => appo.id !== eventToDelete);
    setAppointments(newArray);
  };

  const [selectedButton, setSelectedButton] = useState("Dashboard");

  return (
    <Grid
      templateAreas={`"sidebar top" "sidebar main"`}
      templateColumns={{ base: "1fr", md: "160px 1fr", lg: "250px 1fr" }}
      templateRows={selectedButton === "Dashboard" ? "150px 1fr" : "1fr"}
      minH="100vh"
    >
      <GridItem
        area="sidebar"
        bgColor="orange.100"
        _dark={{ bg: "gray.900" }}
        p="4"
        display={{ base: "none", md: "Flex" }}
      >
        <SideBar
          onClicked={(name) => setSelectedButton(name)}
          selected={selectedButton}
          onLogout={onLogout}
        />
      </GridItem>

      {selectedButton === "Dashboard" && (
        <GridItem
          area="top"
          bg="blue.200"
          _dark={{ backgroundColor: "blue.900" }}
          p="4"
        >
          <HStack justifyContent="space-between">
            <Heading
              size="6xl"
              p={4}
              mx={30}
              color="pink.800"
              _dark={{ color: "white" }}
            >
              Hi, Emir
            </Heading>
            <ToggleButton />
          </HStack>
        </GridItem>
      )}

      <GridItem area="main" p="4">
        {selectedButton === "Schedule" && (
          <>
            <AddAppointment
              onSaveAppointment={(newAppo) =>
                setAppointments([..._appointments, newAppo])
              }
            />
            <Schedule
              appointments={_appointments}
              handleDeleteAppointment={handleDeleteAppointment}
            />
          </>
        )}

        {selectedButton === "Patients" && (
          <Patients
            patients={patients}
            setPatients={(p) => setPatients(p)}
          />
        )}

        {selectedButton === "Dashboard" && (
          <SimpleGrid
            columns={{ base: 2, md: 5 }}
            gap={{ base: "24px", md: "40px" }}
          >
            <GridItem colSpan={{ base: 1, md: 3 }}>
              <PatientsListDashboard appointments={_appointments} />
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <PatientsByCondition patients={patients} />
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <NextVisitDetails nextCardAppos={_appointments} />
            </GridItem>
          </SimpleGrid>
        )}

        {selectedButton === "Documents" && <DocumentUpload />}
      </GridItem>
    </Grid>
  );
}

export default DashboardPage;
