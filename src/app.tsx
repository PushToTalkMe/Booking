import React, { useState } from "react";
import styles from "./app.module.css";
import { tower, floor, room } from "./consts";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";

export interface IMeetingRoom {
  tower: string;
  floor: number | null;
  room: number | null;
  date: Date | null;
  text: string;
}

registerLocale("ru", ru);

function App(): React.JSX.Element {
  const [meetingRoom, setMeetingRoom] = useState<IMeetingRoom>({
    tower: "A",
    floor: 3,
    room: 1,
    date: null,
    text: "",
  });

  const handleClear = () => {
    setMeetingRoom({
      tower: "A",
      floor: 3,
      room: 1,
      date: null,
      text: "",
    });
  };

  const handleSend = () => {
    if (meetingRoom.date) {
      console.log(JSON.stringify(meetingRoom));
    } else {
      alert("Пожалуйста, выберите дату!");
    }
  };

  return (
    <div className={styles.app}>
      <select
        className={styles.select}
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
        className={styles.select}
        value={`${meetingRoom.floor}`}
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
        className={styles.select}
        value={`${meetingRoom.room}`}
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
        className={styles.date}
        selected={meetingRoom.date}
        showTimeSelect
        showDisabledMonthNavigation
        timeIntervals={60}
        locale="ru"
        minDate={new Date()}
        maxDate={new Date(new Date().setMonth(5))}
        onChange={(date: Date) =>
          setMeetingRoom({ ...meetingRoom, date: date })
        }
        timeFormat="HH:mm"
        timeCaption="Время"
        dateFormat="d MMMM yyyy HH:mm"
        withPortal
      />
      <textarea
        className={styles.text}
        placeholder="Комментарий"
        name="comment"
        value={meetingRoom.text}
        onChange={(e) =>
          setMeetingRoom({ ...meetingRoom, text: e.target.value })
        }
      />
      <div className={styles.buttons}>
        <button className={styles.clear} onClick={handleClear}>
          Очистить
        </button>
        <button className={styles.send} onClick={handleSend}>
          Отправить
        </button>
      </div>
    </div>
  );
}

export default App;
