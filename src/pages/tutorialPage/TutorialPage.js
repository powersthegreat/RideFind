import Footer from './components/Footer';
import FindRoute from './components/FindRoute';
import Nav from './components/Nav';
import React, { useRef } from 'react';
import { useDisclosure, Box } from '@chakra-ui/react';
import DrawerComponent from './components/DrawerComponent';
import SeeAvailableRides from './components/SeeAvailableRides';
import ChooseFilterAndSearch from './components/ChooseFilterAndSearch';
import Book from './components/Book';

function TutorialPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <Box>
      <Nav ref={btnRef} onOpen={onOpen} />
      <FindRoute />
      <SeeAvailableRides />
      <ChooseFilterAndSearch />
      <Book />

      <Footer />

      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </Box>
  );
}

export default TutorialPage;