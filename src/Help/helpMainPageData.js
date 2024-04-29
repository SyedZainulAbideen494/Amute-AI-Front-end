import React, { Fragment, useState, useCallback } from "react";
import './help.css'
import upArrow from '../images/icons8-arrow-up.png'
import downArrow from '../images/icons8-arrow-down.png'
import TermsAndConditions from "./terms&conditions";

const HelpMainPageData = () => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const toggleAccordion1 = useCallback(() => {
        setIsOpen1(!isOpen1);
    }, [isOpen1]);

    const toggleAccordion2 = useCallback(() => {
        setIsOpen2(!isOpen2);
    }, [isOpen2]);

    return (
        <Fragment>
            <div className="help-container">
            <div className="accordion-item">
                <div className="accordion-heading" onClick={toggleAccordion1}>
                    <h2>Terms and Conditions <img src={isOpen1 ? upArrow : downArrow} alt="Toggle" /></h2>
                </div>
                {isOpen1 && (
                    <div className="accordion-content">
                       <TermsAndConditions/>
                    </div>
                )}
            </div>
            <div className="accordion-item">
                <div className="accordion-heading" onClick={toggleAccordion2}>
                    <h2>Terms and Conditions <img src={isOpen2 ? upArrow : downArrow} alt="Toggle"/></h2>
                </div>
                {isOpen2 && (
                    <div className="accordion-content">
                       <h1>Hi</h1>
                    </div>
                )}
            </div>
            </div>
        </Fragment>
    );
}

export default HelpMainPageData;