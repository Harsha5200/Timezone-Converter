import React from 'react';
import moment from 'moment-timezone';

const TimeZoneDisplay = ({ timeZone, currentTime, onDelete, onSliderChange, isDarkMode }) => {
  const zonedTime = moment(currentTime).tz(timeZone);
  const timeZoneName = moment.tz.zone(timeZone).name;
  const abbreviation = moment.tz.zone(timeZone).abbr(zonedTime.unix());
  
  return (
    <div className={`time-zone-display ${isDarkMode ? 'dark' : ''}`}>
      <button className="remove-btn" onClick={onDelete}>×</button>
      <h3>{timeZoneName} ({abbreviation})</h3>
      <p className="time">{zonedTime.format('h:mm A')}</p>
      <p>{zonedTime.format('ddd, MMM D')}</p>
      <p>GMT {zonedTime.format('Z')}</p>
      <input
        type="range"
        min="0"
        max="1439"
        value={moment.duration(zonedTime.diff(zonedTime.clone().startOf('day'))).asMinutes()}
        onChange={(e) => onSliderChange(e, timeZone)}
        className="time-slider"
      />
      <div className="time-labels">
        <span>12am</span>
        <span>6am</span>
        <span>12pm</span>
        <span>6pm</span>
        <span>11:59pm</span>
      </div>
    </div>
  );
};

export default TimeZoneDisplay;