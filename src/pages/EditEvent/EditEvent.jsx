import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
//import styles from './AddEvent.module.css'

const EditEvent = (props) => {
  const navigate = useNavigate()
  const {event} = useLocation()
  const {photo} = useLocation()
  const [formData, setFormData] = useState({event})
  const [eventPhotoData, setEventPhotoData] = useState({photo})

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      props.handleAddEvent(formData, eventPhotoData.photo)
      // change to item and act page ^
    } catch (err) {
      console.log(err)
    }
  }
  const handleChangePhoto = (evt) => {
    setEventPhotoData({ photo: evt.target.files[0] })
  }

  const {eventName, eventDate, eventDetails } = formData

  const isFormInvalid = () => {
    return !(eventName && eventDate)
  }

  return (
    <>
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            autoComplete="off"
            id="eventName"
            value={eventName}
            name="eventName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="eventDate">Event Date</label>
          <input
            type="datetime-local"
            id="eventDate"
            value={eventDate}
            name="eventDate"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="eventDetails">Event Details</label>
          <textarea
            autoComplete="off"
            id="eventDetails"
            value={eventDetails}
            name="eventDetails"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="photo-upload">
            Upload Photo
          </label>
          <input
            type="file"
            id="photo-upload"
            className="form-control"
            name="photo"
            onChange={handleChangePhoto}
          />
        </div>
        <button disabled={isFormInvalid()} type='submit'>
          Add Event
        </button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </form>
    </>
  )
}

export default EditEvent;