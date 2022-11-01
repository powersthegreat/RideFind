import React, { useState } from 'react';
import { Data } from './Data';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';

import classes from './DriverItem2.module.css'

const AccordionSection = styled.div``;
const Container = styled.div``;
const Wrap = styled.div``;
const Dropdown = styled.div``;


const Accordion = () => {
  const [clicked, setClicked] = useState(false);

  const toggle = index => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <IconContext.Provider value={{ color: '#00305B', size: '25px'}}>
      <AccordionSection className={classes.accordionsection}>
        <Container className={classes.container}>
          {Data.map((item, index) => {
            return (
              <>
                <Wrap className={classes.wrap} onClick={() => toggle(index)} key={index}>
                  <img src={item.company_logo} alt="logo" width="50" height="auto"></img>
                  <p>{item.eta}</p>
                  <h3>{item.cost}</h3>
                  <span>{clicked === index ? <AiOutlineUp /> : <AiOutlineDown />}</span>
                </Wrap>
                {clicked === index ? (
                  <Dropdown className={classes.dropdown}>
                    <p>{item.vehicle}</p>
                    <p>{item.ride_time}</p>
                    <p>{item.rating}</p>
                  </Dropdown>
                ) : null}
              </>
            );
          })}
        </Container>
      </AccordionSection>
    </IconContext.Provider>
  );
};

export default Accordion;