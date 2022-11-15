import Uber from './components/Uber';
import Lyft from './components/Lyft';
import Curb from "./components/Curb";
import Nav from './components/Nav';
import React, { useRef } from 'react';
import { useDisclosure, Box } from '@chakra-ui/react';
import DrawerComponent from './components/DrawerComponent';

function ResourcesPage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    return (
        <Box>
            <Nav ref={btnRef} onOpen={onOpen} />
            <Uber />
            <Lyft />
            <Curb />
            <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
        </Box>
    );
}

export default ResourcesPage;