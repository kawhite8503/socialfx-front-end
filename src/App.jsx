import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import AddEvent from './pages/AddEvent/AddEvent'
import * as eventService from './services/eventService'
import AddDetails from './pages/AddDetails/AddDetails'
import EventList from './pages/EventList/EventList'
import EventShow from './pages/EventShow/EventShow'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [events, setEvents] =  useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }



  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleAddEvent = async (eventData, photo) => {
    const newEvent = await eventService.create(eventData)
    if (photo) {
      newEvent.photo = await eventPhotoHelper(photo, newEvent._id)
    }
    setEvents([...events, newEvent])
    navigate(`/events/${newEvent._id}/details`)
  }

  const handleUpdateEvent = async (updatedEventData) => {
    const updatedEvent = await eventService.updateEvent(updatedEventData)
    const newEventsArray = events.map(event =>
      event._id === updatedEvent._id ? updatedEvent : event)
      setEvents(newEventsArray)
      navigate("/")
  }

  const eventPhotoHelper = async (photo, id) => {
    const photoData = new FormData()
    photoData.append('photo', photo)
    return await eventService.addPhoto(photoData, id)
  }

  const handleDeleteEvent = async eventId => {
    const deletedEvent = await eventService.deleteEvent(eventId)
    const newEventsArray = events.filter(event => event._id !== deletedEvent._id)
    setEvents(newEventsArray)
  }
  
  return (
    <>
      <div className='App'>
        <NavBar user={user} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Landing user={user}/>} />
            <Route path="/add" element={<AddEvent handleAddEvent={handleAddEvent} events={events}/>} />
            <Route path="/all" element={<EventList handleDeleteEvent={handleDeleteEvent} events={events} user={user} setEvents={setEvents}/>} />
            <Route path="/events/:eventId/details" element={<AddDetails handleAddEvent={handleAddEvent} events={events}/>} />
            <Route
              path="/signup"
              element={<Signup handleSignupOrLogin={handleSignupOrLogin} events={events}/>}
            />
            <Route
              path="/login"
              element={<Login handleSignupOrLogin={handleSignupOrLogin} events={events}/>}
            />
            <Route
              path="/profiles"
              element={user ? <Profiles /> : <Navigate to="/login" />}
            />
            <Route
              path="/events/:eventId"
              element={<EventShow events={events}/>}
            />
            <Route
              path="/changePassword"
              element={
                user ? (
                  <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App