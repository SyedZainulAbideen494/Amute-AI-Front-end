import React, { Fragment, useState, useCallback } from "react";
import './help.css'
import upArrow from '../images/icons8-arrow-up.png'
import downArrow from '../images/icons8-arrow-down.png'
import TermsAndConditions from "./terms&conditions";
import AppDetails from "./aboutApp";
import ReportForm from "./reportform";
import DownloadAPK from "./Download";

const HelpMainPageData = () => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);

    const toggleAccordion1 = useCallback(() => {
        setIsOpen1(!isOpen1);
    }, [isOpen1]);

    const toggleAccordion2 = useCallback(() => {
        setIsOpen2(!isOpen2);
    }, [isOpen2]);

    const toggleAccordion3 = useCallback(() => {
        setIsOpen3(!isOpen3);
    }, [isOpen3]);

    const toggleAccordion4 = useCallback(() => {
        setIsOpen4(!isOpen4);
    }, [isOpen4]);


    return (
        <Fragment>
            <div className="help-container">
             <div className="accordion-item">
                <div className="accordion-heading" onClick={toggleAccordion3}>
                    <h2>Report bug / suggest Improvement <img src={isOpen3 ? upArrow : downArrow} alt="Toggle"/></h2>
                </div>
                {isOpen3 && (
                    <div className="accordion-content">
                       <ReportForm/>
                    </div>
                )}
            </div>
            <div className="accordion-item">
                <div className="accordion-heading" onClick={toggleAccordion4}>
                    <h2>Download<img src={isOpen4 ? upArrow : downArrow} alt="Toggle"/></h2>
                </div>
                {isOpen4 && (
                    <div className="accordion-content">
                       <DownloadAPK/>
                    </div>
                )}
            </div>
            </div>
        </Fragment>
    );
}

export default HelpMainPageData;