import {VStack, Button, HStack, Heading, Flex, Icon} from "@chakra-ui/react"
import {CiHome, CiLogout} from "react-icons/ci";
import {IoPeopleOutline} from "react-icons/io5";
import {HiOutlineDocumentText} from "react-icons/hi2";
import {GrSchedules} from "react-icons/gr";
import {color} from "framer-motion";

function SideBar({onClicked, selected}) {

    const buttonNames = [
        {name: "Dashboard", icon: CiHome},
        {name: "Patients", icon: IoPeopleOutline},
        {name: "Documents", icon: HiOutlineDocumentText},
        {name: "Schedule", icon: GrSchedules}
    ];

    return (
        <Flex direction="column" h="100vh" p="4" alignItems={{md: "flex-start", lg: "center"}} position="fixed">

            <Heading size={{md: "xl", lg: "3xl"}} my="10">VET CLINIC</Heading>

            <VStack h="100%" justifyContent="space-between">
                <VStack spacing={2}>
                    {buttonNames.map(({name, icon}) => (
                            <HStack key={name} width="100%">


                                <Icon as={icon} size={{md: "sm", lg: "lg"}} opacity={selected === name ? 0.4 : 1}/>

                                <Button
                                    disabled={selected === name}
                                    key={name}
                                    onClick={() => onClicked(name)}
                                    variant="link"
                                    size={{md: "sm", lg: "lg"}}
                                >
                                    {name}
                                </Button>
                            </HStack>
                        )
                    )
                    }
                </VStack>

                <HStack mb={4} _hover={{color: "orange.600"}}>
                    <Icon as={CiLogout} size="lg"/>
                    <Button variant="link">Log Out</Button>
                </HStack>
            </VStack>
        </Flex>
    )
}

export default SideBar
