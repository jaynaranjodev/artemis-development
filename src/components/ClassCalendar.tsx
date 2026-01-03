'use client';

import { useState, useEffect } from 'react';
import styles from './ClassCalendar.module.css';

interface CalendarClass {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  dayOfWeek: number;
  classType: string;
  instructor: {
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

interface DayData {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  dayClasses: CalendarClass[];
  classType: 'prev-month' | 'next-month' | 'today' | 'current';
}

export default function ClassCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [classes, setClasses] = useState<CalendarClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('/api/classes?academyId=jj-grappling');
        if (response.ok) {
          const data = await response.json();
          setClasses(data);
        } else {
          const errData = await response.text();
          setError(`API error: ${response.status}`);
        }
      } catch (error) {
        setError(String(error));
      } finally {
        setLoading(false);
      }
    };
    
    fetchClasses();
  }, []);

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatTimeEST = (time: string) => {
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    const ampm = hour >= 12 ? 'pm' : 'am';
    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;
    return `${hour}:${minutes}${ampm}`;
  };

  const renderCalendar = (): DayData[] => {
    const days: DayData[] = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    
    const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const prevMonthDays = prevDate.getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const prevDay = prevMonthDays - i;
      days.push({
        day: prevDay,
        isCurrentMonth: false,
        isToday: false,
        dayClasses: [],
        classType: 'prev-month'
      });
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayOfWeek = date.getDay();
      const isToday = new Date().toDateString() === date.toDateString();
      const dayClasses = classes.filter(c => {
        const matchesDay = c.dayOfWeek === dayOfWeek;
        const matchesFilter = filterType === 'ALL' || c.classType === filterType;
        return matchesDay && matchesFilter;
      });

      days.push({
        day,
        isCurrentMonth: true,
        isToday,
        dayClasses,
        classType: isToday ? 'today' : 'current'
      });
    }
    
    const totalCells = days.length;
    const remainingCells = 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        dayClasses: [],
        classType: 'next-month'
      });
    }

    return days;
  };

  const calendarDays = renderCalendar();

  return (
    <div className={styles.calendarWrapper}>
      {loading && <div style={{ padding: '20px', textAlign: 'center' }}>Loading calendar...</div>}
      {error && <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Error: {error}</div>}
      {!loading && !error && classes.length === 0 && <div style={{ padding: '20px', textAlign: 'center' }}>No classes found</div>}
      {!loading && !error && classes.length > 0 && <div style={{ padding: '10px', fontSize: '12px', color: '#666' }}>Loaded {classes.length} classes</div>}
      
      <div className={styles.calendarHeader}>
        <button 
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          className={styles.calendarNavBtn}
        >
          ← Prev
        </button>
        <h3 className={styles.calendarTitle}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button 
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          className={styles.calendarNavBtn}
        >
          Next →
        </button>
      </div>

      <div className={styles.filterSection}>
        <label htmlFor="classTypeFilter" className={styles.filterLabel}>Filter by Class Type:</label>
        <select 
          id="classTypeFilter"
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="ALL">All Classes</option>
          <option value="ADULT_BJJ">Adult BJJ</option>
          <option value="YOUTH_BJJ">Youth BJJ</option>
          <option value="KICKBOXING">Kickboxing</option>
        </select>
      </div>

      <div className={styles.calendarWeekdays}>
        {dayNames.map(day => (
          <div key={day} className={styles.weekdayLabel}>{day}</div>
        ))}
      </div>

      <div className={styles.calendarGrid}>
        {calendarDays.map((dayData, idx) => (
          <div 
            key={idx} 
            className={`${styles.calendarDay} ${dayData.classType === 'today' ? styles.today : ''} ${dayData.classType === 'prev-month' ? styles.prevMonth : ''} ${dayData.classType === 'next-month' ? styles.nextMonth : ''}`}
          >
            <div className={styles.dayNumber}>{dayData.day}</div>
            <div className={styles.dayClasses}>
              {dayData.dayClasses.map(cls => (
                <div key={cls.id} className={styles.classBadge} title={cls.name}>
                  <div className={styles.classTime}>{formatTimeEST(cls.startTime)}</div>
                  <div className={styles.className}>{cls.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
