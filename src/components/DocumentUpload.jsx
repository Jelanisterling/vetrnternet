import { useState, useRef } from "react";
import {
  Box,
  VStack,
  Text,
  Heading,
  Icon,
  Flex,
  Button,
  HStack,
  Link,
  Progress,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { MdUploadFile } from "react-icons/md";

function DocumentUpload() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [fileToDelete, setFileToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    
    setFiles((prev) => [...prev, ...selectedFiles]);

    
    selectedFiles.forEach((fileObj) => {
      const fileName = fileObj.file.name;
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress((prev) => ({ ...prev, [fileName]: progress }));
        if (progress >= 100) clearInterval(interval);
      }, 200);
    });
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const confirmDelete = (index) => {
    setFileToDelete(index);
    onOpen();
  };

  const handleDeleteConfirmed = () => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[fileToDelete].previewUrl);
      return prev.filter((_, i) => i !== fileToDelete);
    });
    onClose();
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
          onClick={handleClick}
        >
          <Icon as={MdUploadFile} boxSize={12} color="orange.400" />
          <Text mt={2} mb={4} color="gray.600" _dark={{ color: "gray.300" }}>
            Click to select or drag files here
          </Text>
          <Button
            size="sm"
            colorScheme="orange"
            onClick={handleClick}
            variant="outline"
          >
            Browse Files
          </Button>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,image/*"
            style={{ display: "none" }}
          />
        </Flex>

        {files.length > 0 && (
          <Box>
            <Text fontWeight="bold" mb={2}>
              Uploaded Files:
            </Text>
            <VStack align="start" spacing={3} w="100%">
              {files.map(({ file, previewUrl }, index) => (
                <Box key={index} w="100%">
                  <HStack justify="space-between" w="100%">
                    <Text fontSize="sm" noOfLines={1}>
                      📄 {file.name}
                    </Text>
                    <HStack spacing={2}>
                      <Link
                        href={previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="blue.500"
                        fontSize="sm"
                      >
                        View
                      </Link>
                      <Link
                        href={previewUrl}
                        download={file.name}
                        color="green.500"
                        fontSize="sm"
                      >
                        Download
                      </Link>
                      <Button
                        size="xs"
                        colorScheme="red"
                        variant="outline"
                        onClick={() => confirmDelete(index)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </HStack>
                  {uploadProgress[file.name] < 100 && (
                    <Progress
                      value={uploadProgress[file.name] || 0}
                      size="xs"
                      colorScheme="orange"
                      mt={1}
                    />
                  )}
                </Box>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>

      {/* Confirm Delete Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete File
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this file? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirmed} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}

export default DocumentUpload;
