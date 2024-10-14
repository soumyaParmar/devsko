/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box, Button, Stack, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody } from '@chakra-ui/react';

const technologies = [
  { name: 'C#', color: 'purple.500' },
  { name: 'Java', color: 'orange.500' },
  { name: 'JavaScript', color: 'yellow.500' },
  { name: 'Python', color: 'blue.500' },
  { name: 'Ruby', color: 'red.500' },
  { name: 'Go', color: 'teal.500' },
  { name: 'Swift', color: 'orange.400' },
  { name: 'Rust', color: 'orange.600' },
  { name: 'PHP', color: 'blue.400' },
  { name: 'Kotlin', color: 'purple.400' },
  { name: 'TypeScript', color: 'blue.600' }
];

const CoreTechnologies = () => {
  const [selectedTech, setSelectedTech] = useState(null); // store selected tech
  const [hoveredTech, setHoveredTech] = useState(null); // store hovered tech

  const handleSelect = (tech) => {
    setSelectedTech(tech);
  };

  return (
    <Stack direction="row" spacing={4} mt={4}>
      {technologies.map((tech, index) => (
        <Popover key={index} isLazy>
          <PopoverTrigger>
            <Button
              variant="outline"
              colorScheme={selectedTech === tech.name ? 'teal' : 'gray'}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              onClick={() => handleSelect(tech.name)}
            >
              {tech.name}
            </Button>
          </PopoverTrigger>
          {hoveredTech === tech.name && (
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Button onClick={() => handleSelect(tech.name)} colorScheme="teal">Select {tech.name}</Button>
              </PopoverBody>
            </PopoverContent>
          )}
        </Popover>
      ))}
    </Stack>
  );
};

export default CoreTechnologies;
