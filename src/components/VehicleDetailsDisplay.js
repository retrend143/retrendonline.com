import React from 'react';
import { Box, Heading, Text, Divider, SimpleGrid, Table, Tbody, Tr, Td } from '@chakra-ui/react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SpeedIcon from '@mui/icons-material/Speed';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsIcon from '@mui/icons-material/Settings';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const VehicleDetailsDisplay = ({ vehicleData }) => {
  // If no vehicle data, return null
  if (!vehicleData) return null;
  
  // If empty object, return null
  if (Object.keys(vehicleData).length === 0) return null;

  // Determine if the vehicle is a bike
  const isBike = vehicleData.vehicleType === 'bike';

  // List of car-specific features that should not be shown for bikes
  const carSpecificFeatures = [
    'airbags',
    'airConditioning',
    'powerWindows',
    'powerSteering',
    'cruiseControl',
    'parkingSensors',
    'rearCamera'
  ];

  // Vehicle fields to display with their icons
  const vehicleFields = [
    { key: 'vehicleType', label: 'Type', icon: <DirectionsCarIcon /> },
    { key: 'brand', label: 'Brand', icon: <DirectionsCarIcon /> },
    { key: 'model', label: 'Model', icon: <DirectionsCarIcon /> },
    { key: 'fuelType', label: 'Fuel Type', icon: <LocalGasStationIcon /> },
    { key: 'transmission', label: 'Transmission', icon: <SettingsIcon /> },
    { key: 'year', label: 'Year', icon: <EventIcon /> },
    { key: 'month', label: 'Month', icon: <EventIcon /> },
    { key: 'ownership', label: 'Ownership', icon: <PersonIcon />, formatter: value => `${value} owner` },
    { key: 'kmDriven', label: 'KM Driven', icon: <SpeedIcon /> },
    { key: 'color', label: 'Color', icon: <ColorLensIcon /> },
    { key: 'registrationPlace', label: 'Registration', icon: <LocationOnIcon /> },
    { key: 'insurance', label: 'Insurance', icon: <SecurityIcon /> }
  ];

  // Format features
  const formatFeatures = (features) => {
    if (!features) return [];
    return Object.entries(features)
      // Filter out car-specific features for bikes
      .filter(([key, _]) => !isBike || !carSpecificFeatures.includes(key))
      .map(([key, value]) => {
        let label = key.replace(/([A-Z])/g, ' $1').trim(); // Convert camelCase to Title Case
        label = label.charAt(0).toUpperCase() + label.slice(1); // Capitalize first letter
        
        if (key === 'airbags') {
          return { 
            label, 
            value: `${value} airbags`,
            icon: <CheckCircleIcon color="green" />
          };
        }
        
        return { 
          label, 
          value: value ? 'Yes' : 'No',
          icon: value ? <CheckCircleIcon color="green" /> : <CancelIcon color="red" />
        };
      });
  };

  const features = vehicleData.features ? formatFeatures(vehicleData.features) : [];

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
          VEHICLE DETAILS
        </Heading>
      </Box>

      <Box p={4}>
        <Box textAlign="left">
          {vehicleFields.map(field => {
            // Only render if the data has this field
            if (!vehicleData[field.key]) return null;
            
            // Format the value
            let displayValue = vehicleData[field.key];
            
            // Use formatter if provided
            if (field.formatter) {
              displayValue = field.formatter(displayValue);
            }
            
            // Capitalize first letter of fuel type
            if (field.key === 'fuelType' && typeof displayValue === 'string') {
              displayValue = displayValue.charAt(0).toUpperCase() + displayValue.slice(1);
            }
            
            // Format vehicle type
            if (field.key === 'vehicleType' && typeof displayValue === 'string') {
              displayValue = displayValue === 'car' ? 'Car' : 'Bike';
            }
            
            return (
              <Text key={field.key} mb={2} textAlign="left" display="flex">
                <Text as="span" fontWeight="medium" color="gray.600" width="150px">{field.label}: </Text>
                <Text as="span">{displayValue}</Text>
              </Text>
            );
          })}
        </Box>
        
        {/* Features section, only if present */}
        {features.length > 0 && (
          <Box mt={6}>
            <Box 
              bg="gray.50" 
              p={3} 
              mb={4} 
              borderRadius="md"
            >
              <Heading size="xs" textTransform="uppercase" textAlign="center">
                ADDITIONAL VEHICLE INFORMATION
              </Heading>
            </Box>
            <Box textAlign="left">
              {features.map((feature) => (
                <Text key={feature.label} mb={2} textAlign="left" display="flex">
                  <Text as="span" fontWeight="medium" color="gray.600" width="150px">{feature.label}: </Text>
                  <Text as="span">{feature.value}</Text>
                </Text>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VehicleDetailsDisplay; 
