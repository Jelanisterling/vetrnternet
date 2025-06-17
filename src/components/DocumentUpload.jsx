import { useState } from "react";
import {
  Box,
  Input,
  VStack,
  Text,
  Heading,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { MdUploadFile } from "react-icons/md";

function DocumentUpload() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  return (
    <Flex justify="center" align="start" w="100%" p={8}>
      <VStack
        spacing={6}
        w="100%"
        maxW="600px"
        p={6}
        borderRadius="2xl"
        boxShadow="lg"
        bg="white"
        _dark={{ bg: "gray.800" }}
        align="stretch"
      >
        <Heading size="lg" textAlign="center" color="orange.500">
          Upload Documents
        </Heading>

        <Flex
          direction="column"
          align="center"
          justify="center"
          p={6}
          border="2px dashed"
          borderColor="gray.300"
          _dark={{ borderColor: "gray.600" }}
          borderRadius="xl"
          cursor="pointer"
          _hover={{ bg: "gray.50", _dark: { bg: "gray.700" } }}
        >
          <Icon as={MdUploadFile} boxSize={12} color="orange.400" />
          <Text mt={2} mb={4} color="gray.600" _dark={{ color: "gray.300" }}>
            Click below to select documents
          </Text>
          <Input
            type="file"
            multiple
            onChange={handleFileChange}
            variant="unstyled"
            accept=".pdf,.doc,.docx,image/*"
          />
        </Flex>

        {files.length > 0 && (
          <Box>
            <Text fontWeight="bold" mb={2}>
              Uploaded Files:
            </Text>
            <VStack align="start" spacing={1}>
              {files.map((file, index) => (
                <Text key={index} fontSize="sm">
                  📄 {file.name}
                </Text>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </Flex>
  );
}

export default DocumentUpload;
