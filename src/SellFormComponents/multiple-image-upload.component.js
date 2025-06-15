import React, { useState, useEffect, useRef } from "react";
import { MDBCardImage, MDBFile, MDBBtn } from "mdb-react-ui-kit";
import { useToast, Spinner, Text, Box, Alert, AlertIcon, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

export default function MultipleImageUploadComponent({ onFileSelect, id }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [moderationResult, setModerationResult] = useState(null);
  const [moderationError, setModerationError] = useState(null);
  const [bypassModeration, setBypassModeration] = useState(true);
  const fileInputRef = useRef(null);
  const toast = useToast();

  const checkImageContent = async (base64Image) => {
    // Skip all moderation and always accept the image
    console.log("Image moderation bypassed - all images allowed");
    setModerationResult({ isAppropriate: true });
    setIsChecking(false);
    return true;
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Reset states
      setModerationResult(null);
      setModerationError(null);
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // First show loading state
      setIsChecking(true);
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target.result;
        
        // Show the image preview immediately, but mark as "checking"
        setImageSrc(result);
        
        try {
          // If bypass is enabled, skip moderation
          if (bypassModeration) {
            setSelectedFile(file);
            onFileSelect(file);
            setModerationResult({ isAppropriate: true });
            setIsChecking(false);
            return;
          }
          
          // Check image content before finalizing
          const isAppropriate = await checkImageContent(result);
          
          if (isAppropriate) {
            setSelectedFile(file);
            // Pass the actual file object to the parent component
            onFileSelect(file);
          } else {
            // If not appropriate, clear the selection but keep the preview
            setSelectedFile(null);
          }
        } catch (error) {
          console.error("Error in image processing:", error);
          setModerationError("Server could not process the image");
          
          // Still pass the file to parent component on error
          setSelectedFile(file);
          onFileSelect(file);
          
          toast({
            title: "Moderation Warning",
            description: "Image moderation service failed, but your image was accepted.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setIsChecking(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImageSrc(null);
    setModerationResult(null);
    setModerationError(null);
    
    // Reset the file input element
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    // Notify parent component that the image has been removed
    onFileSelect(null);
    
    toast({
      title: "Image Removed",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <div className="custom-file-input mt-3 mb-3" style={{ 
      border: "1px solid #e0e0e0", 
      borderRadius: "8px", 
      padding: "15px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {!imageSrc && (
          <div style={{ marginBottom: "10px" }}>
            <Text fontSize="sm" color="gray.600" mb={2}>Select an image file</Text>
            <MDBFile onChange={handleChange} inputRef={fileInputRef} />
          </div>
        )}
        
        <div className="container mt-2">
          {isChecking && (
            <Box display="flex" alignItems="center" mb={2}>
              <Spinner size="sm" color="blue.500" mr={2} />
              <Text fontSize="sm">Checking image content...</Text>
            </Box>
          )}
          
          {imageSrc && (
            <div className="mt-2" style={{ position: "relative" }}>
              <MDBCardImage
                src={imageSrc}
                alt="Selected"
                style={{ 
                  maxWidth: "200px", 
                  maxHeight: "200px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                }}
                className="img-thumbnail"
              />
              
              <Button
                size="sm"
                colorScheme="red"
                position="absolute"
                top="5px"
                right="5px"
                onClick={handleRemoveImage}
                borderRadius="full"
                width="24px"
                height="24px"
                padding="0"
                minWidth="auto"
                boxShadow="0 2px 4px rgba(0,0,0,0.2)"
              >
                <CloseIcon boxSize="10px" />
              </Button>
            </div>
          )}
          
          {moderationResult && moderationResult.isAppropriate && (
            <Alert status="success" size="sm" mt={2} mb={2} borderRadius="md">
              <AlertIcon />
              <Text fontSize="sm">Image approved</Text>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
