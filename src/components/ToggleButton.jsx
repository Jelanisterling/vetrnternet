import {Button, Box} from "@chakra-ui/react";
import {useColorMode, useColorModeValue} from "@/components/ui/color-mode"
import {BsSun, BsMoon} from "react-icons/bs";


function ToggleButton() {
    const {toggleColorMode, colorMode} = useColorMode();
    const isLight = colorMode === "light";

    return (
        <Button
            onClick={toggleColorMode}
            position="relative"
            overflow="hidden"
            w="44px"
            h="44px"
            p="0"
            variant="ghost"
            borderRadius="full"
            bg={useColorModeValue("orange.100", "gray.700")}
            _hover={{
                bg: useColorModeValue("gray.300", "gray.600"),
                transform: "scale(1.05)",
                transition: "all 0.3s ease"
            }}
            _active={{transform: "scale(0.95)"}}
        >

            <Box
                position="absolute"
                opacity={isLight ? 1 : 0}
                transform={isLight ? "translateY(0)" : "translateY(20px)"}
                transition="all 0.3s ease"
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100%"
                h="100%"
            >
                <BsMoon size="20" color="black"/>
            </Box>


            <Box
                position="absolute"
                opacity={isLight ? 0 : 1}
                transform={isLight ? "translateY(-20px)" : "translateY(0)"}
                transition="all 0.3s ease"
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100%"
                h="100%"
            >
                <BsSun size="20" color="#ff8c00"/>
            </Box>
        </Button>
    );
}

export default ToggleButton;

