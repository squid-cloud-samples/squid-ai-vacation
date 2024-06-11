import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PlaceIcon from '@mui/icons-material/Place';
import './SelectLocation.scss';

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

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-container">
        <PlaceIcon className="input-icon" />
        <input
          className="input-field"
          type="text"
          id="zipcode"
          value={zipcode}
          onChange={handleZipcodeChange}
          placeholder="Enter or obtain your ZIP code"
        />
      </div>
      <div className="input-container">
        <DatePicker
          className="input-field"
          dateFormat="MMMM dd"
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date(new Date().setDate(new Date().getDate() + 14))}
          maxDate={
            startDate
              ? new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000)
              : new Date(new Date().setDate(new Date().getDate() + 300))
          }
          placeholderText="Select dates"
          selectsRange
          showIcon
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 48 48"
            >
              <mask id="ipSApplication0">
                <g
                  fill="none"
                  stroke="#fff"
                  strokeLinejoin="round"
                  strokeWidth="4"
                >
                  <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                  <path
                    fill="#888"
                    d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                  ></path>
                </g>
              </mask>
              <path
                fill="currentColor"
                d="M0 0h48v48H0z"
                mask="url(#ipSApplication0)"
              ></path>
            </svg>
          }
        />
      </div>
      <button className="sq-btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default SelectLocation;
