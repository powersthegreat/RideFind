import React, { useState } from 'react';
// import { rideData } from './DriverData';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';

import classes from './DriverItem.module.css'

const AccordionSection = styled.div``;
const Container = styled.div``;
const Wrap = styled.div``;
const Dropdown = styled.div``;


const DriverItem = (props) => {
  const data = props.data;
  const [clicked, setClicked] = useState(false);

  const toggle = index => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  function bookClicked() {
    alert("Booking not avaliable in simulated mode.");
  };


  return (
    <IconContext.Provider value={{ color: '#00305B', size: '20px'}}>
      <AccordionSection className={classes.accordionsection}>
        <Container className={classes.container}>
          {data.map((item, index) => {
            
            var main_var = `$${item.cost.toFixed(2)}`;
            if (props.type === "time") {
              main_var = `${item.ride_time} min`;
            } else if (props.type === "rating") {
              main_var = `${item.rating} stars`;
            } else if (props.type === "eta") {
              main_var = `${item.eta} min`;
            }

            return (
              <div key={index}>
                <Wrap className={classes.wrap} onClick={() => toggle(index)} >
                    <div>
                        <p><img className={classes.logo} display="inline-block" src={item.company_logo} alt="logo"></img>
						            <img className={classes.caricon} display="inline-block" src={item.car_icon} alt="icon"></img></p>
                        <p className={classes.eta}>{item.eta} minutes away</p>
                    </div>
                    <h3 className={classes.mainvar}>{main_var}</h3>
                    <span className={classes.arrow}>{clicked === index ? <AiOutlineUp /> : <AiOutlineDown />}</span>
                </Wrap>
                {clicked === index ? (
                    <Dropdown className={classes.dropdown}>
                        <div className={classes.descriptiontitlediv}>
                            <h3 className={classes.descriptiontitle}>Ride Details</h3>
                        </div>
                        <div className={classes.divdescription}>
                            <p className={classes.title}>Company</p>
                            <p className={classes.ridedata}>{item.company[0].toUpperCase() + item.company.slice(1)}</p>
                        </div>
                        <div className={classes.divdescription}>
                            <p className={classes.title}>Time Estimate</p>
                            <p className={classes.ridedata}>{item.ride_time} min</p>
                        </div>
                        <div className={classes.divdescription}>
                            <p className={classes.title}>Cost</p>
                            <p className={classes.ridedata}>${item.cost}</p>
                        </div>
                        <div className={classes.divdescription}>
                            <p className={classes.title}>Vehicle Type</p>
                            <p className={classes.ridedata}>{item.vehicle}</p>
                        </div>
                        <div className={classes.divdescription}>
                            <p className={classes.title}>Driver Rating</p>
                            <p className={classes.ridedatafinal}>{item.rating} stars</p>
                        </div>
                        <div className={classes.bookbuttondiv}>
                            <button className={classes.bookbutton} type="submit" onClick={bookClicked}>Book</button>
                        </div>
                    </Dropdown>
                ) : null}
              </div>
            );
          })}
        </Container>
      </AccordionSection>
    </IconContext.Provider>
  );
};

export default DriverItem;