import React, { useState } from "react";
import styles from "./app.module.css";
import { tower, floor, room } from "./consts";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

interface IMeetingRoom {
  tower: string;
  floor: number | null;
  room: number | null;
  date: string;
  text: string;
}

function App() {
  const [meetingRoom, setMeetingRoom] = useState<IMeetingRoom>({
    tower: "",
    floor: null,
    room: null,
    date: "",
    text: "",
  });
  const [startDate, setStartDate] = useState(new Date());

  const handleClear = () => {
    setMeetingRoom({
      tower: "",
      floor: null,
      room: null,
      date: "",
      text: "",
    });
  };

  const handleSend = () => {
    console.log(JSON.stringify(meetingRoom));
  };

  // const handleChange = (name, event) => {
  //   setMeetingRoom({ ...meetingRoom, name: event.target.value });
  // };

  return (
    <div className={styles.app}>
      <select
        value={meetingRoom.tower}
        name="tower"
        id="tower"
        onChange={(e) =>
          setMeetingRoom({ ...meetingRoom, tower: e.target.value })
        }
      >
        {tower.map((t, i) => (
          <option value={t} key={i}>
            Башня {t}
          </option>
        ))}
      </select>
      <select
        name="floor"
        id="floor"
        onChange={(e) =>
          setMeetingRoom({ ...meetingRoom, floor: +e.target.value })
        }
      >
        {floor.map((f, i) => (
          <option value={f} key={i}>
            {f} Этаж
          </option>
        ))}
      </select>
      <select
        name="room"
        id="room"
        onChange={(e) =>
          setMeetingRoom({ ...meetingRoom, room: +e.target.value })
        }
      >
        {room.map((r, i) => (
          <option value={r} key={i}>
            {r} Переговорная
          </option>
        ))}
      </select>
      <DatePicker
        showIcon
        selected={startDate}
        showTimeSelect
        dateFormat="Pp"
        timeIntervals={60}
        locale="ru"
        minDate={new Date()}
        showDisabledMonthNavigation
        onChange={(date) => setStartDate(date)}
        withPortal
      />
      <label>
        Комментарий:
        <textarea name="comment" />
      </label>
      <div>
        <button onClick={handleClear}>Очистить</button>
        <button onClick={handleSend}>Отправить</button>
      </div>
    </div>
  );
}

export default App;
