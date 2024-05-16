import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  onCreate: (zipcode: string, startDate: Date, endDate: Date) => void;
}

const SelectLocation: React.FC<Props> = ({ onCreate }) => {
  const [zipcode, setZipcode] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleZipcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (zipcode && startDate && endDate) {
      onCreate(zipcode, startDate, endDate);
      setZipcode('');
      setStartDate(null);
      setEndDate(null);
    } else {
      alert('Please complete all fields.');
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(
            'Latitude: ',
            position.coords.latitude,
            'Longitude: ',
            position.coords.longitude,
          );
        },
        (error) => {
          console.error('Error Code = ' + error.code + ' - ' + error.message);
        },
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="zipcode">Zipcode:</label>
        <input
          type="text"
          id="zipcode"
          value={zipcode}
          onChange={handleZipcodeChange}
          placeholder="Enter or obtain your ZIP code"
        />
      </div>
      <div>
        <label>Date Range:</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date(new Date().setDate(new Date().getDate() + 14))}
          maxDate={new Date(new Date().setDate(new Date().getDate() + 300))}
          placeholderText="Select start date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={
            startDate
              ? new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000)
              : null
          }
          placeholderText="Select end date"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SelectLocation;
