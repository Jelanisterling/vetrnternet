import {Card, Heading, Stack, Text, HStack} from "@chakra-ui/react"


function PatientsListDashboard({appointments}) {

    const [nowH, nowM] = new Date().toTimeString().split(":")
    const todaysAppos = appointments.filter(appo => (
        appo.date === new Date().toISOString().split("T")[0]
        && (Number(appo.time.split(":")[0]) === Number(nowH) ?
                Number(appo.time.split(":")[1]) >= Number(nowM)
                : Number(appo.time.split(":")[0]) >= Number(nowH)
        )
    ))


    const todaysSortedAppos = todaysAppos.sort((a, b) => {
            if (Number(a.time.split(":")[0]) !== Number(b.time.split(":")[0])) {
                return Number(a.time.split(":")[0]) - Number(b.time.split(":")[0])
            } else Number(a.time.split(":")[1]) - Number(b.time.split(":")[1])
        }
    )


    return (
        <Stack direction="row" alignItems="center" spacing={8} width="100%">
            <Card.Root size="md" width="100%">
                <Card.Header>
                    <Heading size="lg"> Today's Appointments</Heading>
                </Card.Header>
                <Card.Body color="fg.muted">
                    {todaysSortedAppos.map(appo => (
                        <HStack px={4} my="1" height={8} align="center" borderRadius="md" bg="gray.200" key={appo.id}
                                _dark={{color: "white", backgroundColor: "blue.800"}}>
                            {` ${appo.ownerName} (${appo.petName}) - ${appo.type} @ ${appo.time} `}
                        </HStack>
                    ))}
                </Card.Body>
            </Card.Root>
        </Stack>

    )

}

export default PatientsListDashboard;