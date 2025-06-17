import { Card, Heading, Stack, Text, Box } from "@chakra-ui/react";

function PatientsByCondition({ patients }) {
  const statusCounts = patients.reduce((acc, patient) => {
    const status = patient.hasActiveTreatment;
    if (!status) return acc;
    acc[status] = (acc[status] ? acc[status] : 0) + 1;
    return acc;
  }, {});

  return (
    <Stack direction="row" alignItems="center" spacing={2} width="100%">
      <Card size="md" width="100%" p={4}>
        <Box mb={4}>
          <Heading size="lg">Patients By Treatment Status</Heading>
        </Box>
        <Box color="gray.500">
          {Object.entries(statusCounts).map(([status, num]) => (
            <Text key={status}>{`${num} person : ${status}`}</Text>
          ))}
        </Box>
      </Card>
    </Stack>
  );
}

export default PatientsByCondition;
