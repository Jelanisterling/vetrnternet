import {Card, Heading, Stack, Text} from "@chakra-ui/react"


function PatientsByCondition({patients}) {

    const statusCounts = patients.reduce((acc, patient) => {
        const status = patient.hasActiveTreatment;
        if (!status) return acc;
        acc[status] = (acc[status] ? acc[status] : 0) + 1;
        return acc;
    }, {});

    return (
        <Stack direction="row" alignItems="center" spacing={2} width="100%">
            <Card.Root size="md" width="100%">
                <Card.Header>
                    <Heading size="lg"> Patients By Treatment Status</Heading>
                </Card.Header>
                <Card.Body color="fg.muted">
                    {Object.entries(statusCounts).map(([statu, num]) => (
                            <Text key={statu}>{`${num} person  : ${statu}`}</Text>
                        )
                    )}

                </Card.Body>
            </Card.Root>
        </Stack>

    )

}

export default PatientsByCondition;