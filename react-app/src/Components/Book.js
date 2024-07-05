import React, { useState, useEffect } from "react";
import axios from "axios";

const Book = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://appsail-10083632218.development.catalystappsail.com/zoho-data"
      )
      .then((response) => {
        setBookingsData(response.data.records);
        console.log(response.data.records)
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id, booking) => {
    setEditingId(id);
    setEditedData({ ...booking });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (id) => {
    axios
      .post("http://localhost:9000/customer-details", editedData)
      .then((response) => {
        setBookingsData((prevData) =>
          prevData.map((booking) =>
            booking.id === id ? { ...booking, ...editedData } : booking
          )
        );
        setEditingId(null);
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {bookingsData.map((booking) => (
        <div key={booking.id}>
          <div>
            <label>Customer name</label>
            {editingId === booking.id ? (
              <input
                type="text"
                name="Name"
                value={editedData.Name}
                onChange={handleChange}
              />
            ) : (
              <input type="text" value={booking["Name"]} readOnly />
            )}
          </div>
          <div>
            <label>Age</label>
            {editingId === booking.id ? (
              <input
                type="text"
                name="Age"
                value={editedData.Age}
                onChange={handleChange}
              />
            ) : (
              <input type="text" value={booking.Age} readOnly />
            )}
          </div>
          <div>
            <label>Phone Number</label>
            {editingId === booking.id ? (
              <input
                type="text"
                name="Phone"
                value={editedData.Phone}
                onChange={handleChange}
              />
            ) : (
              <input type="text" value={booking.Phone} readOnly />
            )}
          </div>
          {editingId === booking.id ? (
            <button onClick={() => handleSave(booking.id)}>Save</button>
          ) : (
            <button onClick={() => handleEdit(booking.id, booking)}>Edit</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Book;