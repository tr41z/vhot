import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Info from '../pages/Info';
import EventDetails from '../components/Event/EventDetails';
import Create from '../pages/Create';

const Routers = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path='/create' element={<Create />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
      </Routes>
    );
}

export default Routers