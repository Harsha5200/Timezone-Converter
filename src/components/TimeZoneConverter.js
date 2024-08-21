import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import TimeZoneDisplay from './TimeZoneDisplay';
import { getShareableLink, scheduleMeet } from '../utils/timeZoneUtils';
import '../styles/TimeZoneConverter.css';

const TimeZoneConverter = () => {
  const [timeZones, setTimeZones] = useState(['UTC', 'Asia/Kolkata']);
  const [currentTime, setCurrentTime] = useState(moment());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  const [showShareableLink, setShowShareableLink] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSliderChange = (e, timeZone) => {
    const minutes = parseInt(e.target.value);
    const newTime = moment().tz(timeZone).startOf('day').add(minutes, 'minutes');
    setCurrentTime(newTime);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(timeZones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTimeZones(items);
  };

  const addTimeZone = (selectedOption) => {
    if (selectedOption && !timeZones.includes(selectedOption.value)) {
      setTimeZones([...timeZones, selectedOption.value]);
    }
  };

  const removeTimeZone = (index) => {
    setTimeZones(timeZones.filter((_, i) => i !== index));
  };

  const generateShareableLink = () => {
    const link = getShareableLink(currentTime, timeZones);
    setShareableLink(link);
    setShowShareableLink(true);
  };

  const timeZoneOptions = moment.tz.names().map(tz => ({ value: tz, label: tz }));

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="controls">
        <div className="add-time-zone">
          <Select
            options={timeZoneOptions}
            onChange={addTimeZone}
            placeholder="Add Time Zone, City or Town"
            className="time-zone-select"
          />
        </div>
        <DatePicker
          selected={currentTime.toDate()}
          onChange={(date) => setCurrentTime(moment(date))}
          dateFormat="MMM d, yyyy"
          customInput={<input className="date-picker" />}
        />
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="icon-button">🌙</button>
        <button onClick={() => setTimeZones([...timeZones.reverse()])} className="icon-button">🔄</button>
        <button onClick={generateShareableLink} className="icon-button">🔗</button>
        <button onClick={() => scheduleMeet(currentTime)} className="icon-button">📅</button>
      </div>
      {showShareableLink && (
        <div className="shareable-link">
          <input type="text" value={shareableLink} readOnly />
          <button onClick={() => setShowShareableLink(false)}>Close</button>
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="time-zones">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="time-zones-container">
              {timeZones.map((zone, index) => (
                <Draggable key={zone} draggableId={zone} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TimeZoneDisplay
                        timeZone={zone}
                        currentTime={currentTime}
                        onDelete={() => removeTimeZone(index)}
                        onSliderChange={handleSliderChange}
                        isDarkMode={isDarkMode}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TimeZoneConverter;