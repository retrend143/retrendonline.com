import React from 'react';
import { Box, Heading, Table, Tbody, Tr, Td, Text } from '@chakra-ui/react';
import { normalizePropertyData, getPropertyTypeLabel, getFormattedAmenities } from '../utils/PropertyDataUtils';

const PropertyDetailsDisplay = ({ propertyData }) => {
  // If no property data, return null
  if (!propertyData) return null;

  // Parse and normalize the property data
  const data = normalizePropertyData(propertyData);
  
  // If no valid data after normalization, don't render
  if (Object.keys(data).length === 0) return null;

  // Property fields to display and their labels
  const propertyFields = [
    { key: 'propertyType', label: 'Property Type', formatter: getPropertyTypeLabel },
    { key: 'bhk', label: 'BHK' },
    { key: 'bedrooms', label: 'Bedrooms' },
    { key: 'bathrooms', label: 'Bathrooms' },
    { key: 'furnishing', label: 'Furnishing' },
    { key: 'projectStatus', label: 'Project Status' },
    { key: 'construction_status', label: 'Construction Status' },
    { key: 'listedBy', label: 'Listed By' },
    { key: 'superBuiltupArea', label: 'Super Builtup Area', unit: 'sq.ft' },
    { key: 'carpetArea', label: 'Carpet Area', unit: 'sq.ft' },
    { key: 'maintenance', label: 'Maintenance', prefix: '₹', suffix: '/month' },
    { key: 'totalFloors', label: 'Total Floors' },
    { key: 'floorNo', label: 'Floor Number' },
    { key: 'carParking', label: 'Car Parking' },
    { key: 'facing', label: 'Facing' },
    { key: 'projectName', label: 'Project Name' },
    { key: 'age', label: 'Age' },
    { key: 'balconies', label: 'Balconies' },
    { key: 'description', label: 'Description' }
  ];

  // Get formatted amenities
  const amenitiesList = data.amenities ? getFormattedAmenities(data.amenities) : [];

  return (
    <Box 
      mb={6} 
      mx="auto" 
      maxWidth="800px" 
      borderWidth="1px" 
      borderRadius="lg" 
      borderColor="gray.200" 
      overflow="hidden"
      boxShadow="sm"
      bg="white"
    >
      <Box 
        bg="gray.50" 
        p={3} 
        borderBottomWidth="1px" 
        borderColor="gray.200"
      >
        <Heading size="xs" textTransform="uppercase" textAlign="center">
          PROPERTY DETAILS
        </Heading>
      </Box>

      <Box p={4}>
        <Box textAlign="left">
          {propertyFields.map(field => {
            // Only render if the data has this field
            if (!data[field.key]) return null;
            
            // Format the value
            let displayValue = data[field.key];
            
            // Use formatter if provided
            if (field.formatter) {
              displayValue = field.formatter(displayValue);
            }
            
            // Add units or prefixes if needed
            if (field.unit) {
              displayValue = `${displayValue} ${field.unit}`;
            }
            
            if (field.prefix) {
              displayValue = `${field.prefix}${displayValue}`;
            }
            
            if (field.suffix) {
              displayValue = `${displayValue}${field.suffix}`;
            }
            
            return (
              <Text key={field.key} mb={2} textAlign="left" display="flex">
                <Text as="span" fontWeight="medium" color="gray.600" width="150px">{field.label}: </Text>
                <Text as="span">{displayValue}</Text>
              </Text>
            );
          })}
        </Box>
        
        {/* Amenities section, only if present */}
        {amenitiesList.length > 0 && (
          <Box mt={6}>
            <Box 
              bg="gray.50" 
              p={3} 
              mb={4} 
              borderRadius="md"
            >
              <Heading size="xs" textTransform="uppercase" textAlign="center">
                AMENITIES
              </Heading>
            </Box>
            <Box textAlign="left">
              <Text textAlign="left">{amenitiesList.join(', ')}</Text>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PropertyDetailsDisplay;