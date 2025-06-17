import {
  VStack,
  Button,
  HStack,
  Heading,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { CiHome, CiLogout } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { GrSchedules } from "react-icons/gr";

function SideBar({ onClicked, selected, onLogout }) {
  const buttonNames = [
    { name: "Dashboard", icon: CiHome },
    { name: "Patients", icon: IoPeopleOutline },
    { name: "Documents", icon: HiOutlineDocumentText },
    { name: "Schedule", icon: GrSchedules },
  ];

  const bg = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex
      direction="column"
      h="100vh"
      p="4"
      alignItems={{ md: "flex-start", lg: "center" }}
      position="fixed"
      bg={bg}
      borderRight="1px solid"
      borderColor={borderColor}
      w={{ base: "full", md: "60" }}
    >
      <Heading size={{ base: "lg", md: "xl", lg: "3xl" }} my="10">
        VET CLINIC
      </Heading>

      <VStack h="100%" justifyContent="space-between" w="full">
        <VStack spacing={4} w="full" alignItems="flex-start">
          {buttonNames.map(({ name, icon }) => (
            <HStack key={name} w="full" spacing={3}>
              <Icon
                as={icon}
                w={6}
                h={6}
                color={selected === name ? "orange.500" : "gray.600"}
              />
              <Button
                onClick={() => onClicked(name)}
                variant="ghost"
                size="md"
                colorScheme={selected === name ? "orange" : "gray"}
                fontWeight={selected === name ? "bold" : "normal"}
                isDisabled={selected === name}
              >
                {name}
              </Button>
            </HStack>
          ))}
        </VStack>

        <HStack
          mb={4}
          spacing={2}
          cursor="pointer"
          onClick={onLogout} // ✅ Call the prop instead of alert!
          _hover={{ color: "orange.600" }}
        >
          <Icon as={CiLogout} w={6} h={6} />
          <Button variant="link" size="md" colorScheme="orange">
            Log Out
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default SideBar;
