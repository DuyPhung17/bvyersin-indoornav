// src/components/DestinationSelector.js
import React from "react";
import "./DestinationSelector.css"; // Tạo file CSS này

const DestinationSelector = ({
  startPointName,
  destinations,
  selectedDestinationId,
  onDestinationChange,
  isDisabled,
}) => {
  return (
    <div className={`destination-selector ${isDisabled ? "disabled" : ""}`}>
      <div className="form-group">
        <label htmlFor="start-point">Điểm Bắt Đầu:</label>
        <input
          type="text"
          id="start-point"
          value={startPointName}
          disabled // Luôn disable vì được xác định từ QR
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="destination-point">Chọn Điểm Đến:</label>
        <select
          id="destination-point"
          value={selectedDestinationId}
          onChange={(e) => onDestinationChange(e.target.value)}
          disabled={isDisabled || destinations.length === 0}
        >
          <option value="">-- Vui lòng chọn --</option>
          {destinations.map((dest) => (
            <option key={dest.id} value={dest.id}>
              {dest.name}
            </option>
          ))}
        </select>
        {destinations.length === 0 && !isDisabled && (
          <p className="no-destinations-info">
            Không có điểm đến nào từ vị trí này.
          </p>
        )}
      </div>
    </div>
  );
};

export default DestinationSelector;
