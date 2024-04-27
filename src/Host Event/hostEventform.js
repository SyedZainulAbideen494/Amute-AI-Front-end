import React, { Fragment, useState } from "react";
import "./hostEvent.css";

const NewEventForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        startTime: "",
        endTime: "",
        date: "",
        isForever: false
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // You can handle form submission here
      };
    
      return (
        <Fragment>
        <form className="form-container_create_queue_form" onSubmit={handleSubmit}>
        <h2>
  <span style={{ color: '#fff' }}>New </span>
  <span style={{ color: '#979CE1' }}>Queue</span>
 </h2>
          <label>
            Queue Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="dark-theme_create_queue"
            />
          </label>
          <label>
            Start Time:
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="dark-theme_create_queue"
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="dark-theme_create_queue"
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required={!formData.isForever}
              disabled={formData.isForever}
              className="dark-theme_create_queue"
            />
          </label>
          <p style={{textAlign: 'center'}}>Or</p>
          <label style={{color: 'white', textAlign:' center'}}>
            <input
              type="checkbox"
              name="isForever"
              checked={formData.isForever}
              onChange={handleChange}
              className="dark-theme_create_queue"
            />
           Forever/until I delete
          </label>
          <button type="submit" className="dark-theme_create_queue_button">Create Queue</button>
        </form>
        </Fragment>
      );
    };

export default NewEventForm;