import { createContext, useState } from 'react';

const EditingBookingContext = createContext();
export default EditingBookingContext;

export function EditingBookingProvider({ children }) {
  const [editingBooking, setEditingBooking] = useState(null);

  return (
    <EditingBookingContext.Provider value={{ editingBooking, setEditingBooking }}>
      {children}
    </EditingBookingContext.Provider>
  );
}
