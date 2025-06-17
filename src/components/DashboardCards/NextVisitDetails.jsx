import { Card, Heading, Stack, Text, Box } from "@chakra-ui/react";

function NextVisitDetails({ nextCardAppos }) {
  const now = new Date();
  const todayDate = now.toISOString().split("T")[0];

  
  const todaysAppos = nextCardAppos.filter(
    (appo) => appo.date === todayDate
  );

  
  const upcomingAppos = todaysAppos.filter((appo) => {
    const [h, m] = appo.time.split(":").map(Number);
    const appoDate = new Date();
    appoDate.setHours(h, m, 0, 0);
    return appoDate >= now;
  });

 
  const sortedUpcomingAppos = upcomingAppos.sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  return (
    <Stack direction="row" alignItems="center" spacing={2} width="100%">
      <Card size="md" width="100%" p={4}>
        <Box mb={4}>
          <Heading size="lg">Upcoming Patient Details</Heading>
        </Box>
        <Box color="gray.500">
          {sortedUpcomingAppos.length > 0 ? (
            <>
              <Text mb={2}>Owner Name: {sortedUpcomingAppos[0].ownerName}</Text>
              <Text mb={2}>Pet Name: {sortedUpcomingAppos[0].petName}</Text>
              <Text mb={2}>Service: {sortedUpcomingAppos[0].service}</Text>
              <Text mb={2}>Time: {sortedUpcomingAppos[0].time}</Text>
              <Text mb={2}>Appointment Type: {sortedUpcomingAppos[0].type}</Text>
              <Text mb={2}>Note: {sortedUpcomingAppos[0].notes}</Text>
            </>
          ) : (
            <Text>No upcoming appointments today.</Text>
          )}
        </Box>
      </Card>
    </Stack>
  );
}

export default NextVisitDetails;
