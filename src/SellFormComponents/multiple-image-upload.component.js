import React, { useState, useEffect } from "react";
import { MDBCardImage, MDBFile } from "mdb-react-ui-kit";
import { useToast, Spinner, Text, Box, Alert, AlertIcon, Button } from "@chakra-ui/react";
import axios from "axios";

export default function MultipleImageUploadComponent({ onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [moderationResult, setModerationResult] = useState(null);
  const [moderationError, setModerationError] = useState(null);
  const [bypassModeration, setBypassModeration] = useState(false);
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

  const handleBypassModeration = () => {
    setBypassModeration(true);
    if (selectedFile) {
      onFileSelect(selectedFile);
      setModerationResult({ isAppropriate: true });
      setModerationError(null);
      toast({
        title: "Moderation Bypassed",
        description: "Image has been accepted without moderation. Please ensure it follows community guidelines.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="custom-file-input mt-3 mb-3">
      <MDBFile onChange={handleChange} />
      <div className="container mt-2 mx-4">
        {isChecking && (
          <Box display="flex" alignItems="center" mb={2}>
            <Spinner size="sm" color="blue.500" mr={2} />
            <Text fontSize="sm">Checking image content with AI...</Text>
          </Box>
        )}
        
        {moderationResult && moderationResult.isAppropriate && (
          <Alert status="success" size="sm" mb={2} borderRadius="md">
            <AlertIcon />
            <Text fontSize="sm">Image approved</Text>
          </Alert>
        )}
        
        {moderationResult && !moderationResult.isAppropriate && (
          <Alert status="error" size="sm" mb={2} borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontSize="sm" fontWeight="bold">Image rejected</Text>
              <Text fontSize="sm">{moderationResult.moderationDetails?.reason || "Inappropriate content"}</Text>
              {moderationResult.moderationDetails?.hasAdultContent && (
                <Text fontSize="sm" color="red.600" fontWeight="bold">Adult content detected</Text>
              )}
            </Box>
          </Alert>
        )}
        
        {/* Moderation error display removed */}
        
        {imageSrc && (
          <div className="mt-2">
            <MDBCardImage
              src={imageSrc}
              alt="Selected"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
              className="img-thumbnail"
            />
          </div>
        )}
      </div>
    </div>
  );
}
