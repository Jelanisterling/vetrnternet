import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  HStack,
} from "@chakra-ui/react";

function PatientsListDashboard({ appointments }) {
  // Get today’s date in YYYY-MM-DD
  const todayDate = new Date().toISOString().split("T")[0];

  // Option A: show ALL today’s appointments
  const todaysAppos = appointments.filter(
    (appo) => appo.date === todayDate
  );

  // Sort by time properly
  const todaysSortedAppos = todaysAppos.sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  return (
    <Stack direction="row" alignItems="center" spacing={8} width="100%">
      <Card size="md" width="100%">
        <CardHeader>
          <Heading size="lg">Today's Appointments</Heading>
        </CardHeader>
        <CardBody color="fg.muted">
          {todaysSortedAppos.length === 0 ? (
            <p>No appointments today.</p>
          ) : (
            todaysSortedAppos.map((appo) => (
              <HStack
                key={appo.id}
                px={4}
                my="1"
                height={8}
                align="center"
                borderRadius="md"
                bg="gray.200"
                _dark={{ color: "white", backgroundColor: "blue.800" }}
              >
                {`${appo.ownerName} (${appo.petName}) - ${appo.type} @ ${appo.time}`}
              </HStack>
            ))
          )}
        </CardBody>
      </Card>
    </Stack>
  );
}

export default PatientsListDashboard;
