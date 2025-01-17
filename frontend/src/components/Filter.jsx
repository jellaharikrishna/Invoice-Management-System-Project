/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
  import React, { useState } from 'react';

  const Filter = ({ onFilter }) => {
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
      setStatus(e.target.value);
      onFilter(e.target.value); 
    };

    return (
      <div className="filter-container">
        <label htmlFor="status-filter">Filter by Status: </label>
        <select id="status-filter" value={status} onChange={handleChange}>
          <option value="">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    );
  };

  export default Filter;
