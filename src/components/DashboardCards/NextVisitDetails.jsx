import {Card, Heading, Stack, Text} from "@chakra-ui/react"


function NextVisitDetails({nextCardAppos}) {

    const [nowH, nowM] = new Date().toTimeString().split(":")
    const todaysAppos = nextCardAppos.filter(appo => (
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
        <Stack direction="row" alignItems="center" spacing={2} width="100%">
            <Card.Root size="md" width="100%">
                <Card.Header>
                    <Heading size="lg"> Upcoming Patient Details</Heading>
                </Card.Header>
                <Card.Body color="fg.muted">
                    {todaysSortedAppos.length > 0 ? (
                        <>
                            <Text mb={2}>Owner Name: {todaysSortedAppos[0].ownerName}</Text>
                            <Text mb={2}>Pet Name: {todaysSortedAppos[0].petName}</Text>
                            <Text mb={2}>Service: {todaysSortedAppos[0].service}</Text>
                            <Text mb={2}>Time: {todaysSortedAppos[0].time}</Text>
                            <Text mb={2}>Appointment Type: {todaysSortedAppos[0].type}</Text>
                            <Text mb={2}>Note: {todaysSortedAppos[0].notes}</Text>
                        </>
                    ) : (
                        <Text>No appointments for today.</Text>
                    )}
                </Card.Body>
            </Card.Root>
        </Stack>

    )

}

export default NextVisitDetails;
