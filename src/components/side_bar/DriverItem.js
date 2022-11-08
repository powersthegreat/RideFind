import React, { useState } from 'react';
import { rideData } from './DriverData';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';

import classes from './DriverItem.module.css'

const AccordionSection = styled.div``;
const Container = styled.div``;
const Wrap = styled.div``;
const Dropdown = styled.div``;


const DriverItem = () => {
  const [clicked, setClicked] = useState(false);

  const toggle = index => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <IconContext.Provider value={{ color: '#00305B', size: '20px'}}>
      <AccordionSection className={classes.accordionsection}>
        <Container className={classes.container}>
          {rideData.map((item, index) => {
            return (
              <>
                <Wrap className={classes.wrap} onClick={() => toggle(index)} key={index}>
                    <div>
                        <img className={classes.logo} src={item.company_logo} alt="logo" width="70" height="auto"></img>
                        <p className={classes.eta}>{item.eta} minutes away</p>
                    </div>
                    <h3 className={classes.cost}>${item.cost.toFixed(2)}</h3>
                    <span className={classes.arrow}>{clicked === index ? <AiOutlineUp /> : <AiOutlineDown />}</span>
                </Wrap>
                {clicked === index ? (
                    <Dropdown className={classes.dropdown}>
                        <div className={classes.descriptiontitlediv}>
                            <h3 className={classes.descriptiontitle}>Ride Details</h3>
                        </div>
                        <div className={classes.divdescription}>
                            <p className={classes.title}>Company</p>
                            <p className={classes.ridedata}>{item.company}</p>
                        </div>
                        <div className={classes.divdescription}>
                            <p className={classes.title}>Time Estimate</p>
                            <p className={classes.ridedata}>{item.ride_time}</p>
                        </div>
                        <div className={classes.divdescription}>
                            <p className={classes.title}>Cost</p>
                            <p className={classes.ridedata}>{item.cost}</p>
                        </div>
                        <div className={classes.divdescription}>
                            <p className={classes.title}>Vehicle Type</p>
                            <p className={classes.ridedata}>{item.vehicle}</p>
                        </div>
                        <div className={classes.divdescription}>
                            <p className={classes.title}>Driver Rating</p>
                            <p className={classes.ridedatafinal}>{item.rating}</p>
                        </div>
                        <div className={classes.bookbuttondiv}>
                            <button className={classes.bookbutton} type="action">Book</button>
                        </div>
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

export default DriverItem;