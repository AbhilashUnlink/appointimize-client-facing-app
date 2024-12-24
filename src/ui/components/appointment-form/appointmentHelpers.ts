/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";


const currentDate = new Date();

const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = format(date, "MMM");
    const weekday = date.toLocaleString("en-us", { weekday: "short" });

    return `${weekday}, ${month} ${day}`;
};


export const getNext10Days = () => {
    const days = [];
    for (let i = 2; i < 12; i++) {
        const nextDay = new Date();
        nextDay.setDate(currentDate.getDate() + i);
        days.push(formatDate(nextDay));
    }
    return days;
};

export const generateAvailableTimes = (currentHour: number = new Date().getHours(), selectedDate?: any) => {
    const times: any = [];
    for (let hour = 5; hour <= 23; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            if (selectedDate === "Today" && (hour < currentHour || (hour === currentHour && minute <= currentDate.getMinutes()))) {
                continue;
            }
            const timeString = `${(hour % 12 === 0 ? 12 : hour % 12).toString().padStart(2, "0")}:${minute === 0 ? "00" : "30"} ${hour < 12 ? "AM" : "PM"}`;
            times.push(timeString);
        }
    }
    return times;
};


export function attachTimeToDate(dateStr:any, timeStr:any) {
    // Create a new Date object from the dateStr
    const date = new Date(dateStr);

    // Split the time string into hours, minutes, and AM/PM
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    // Convert 12-hour format to 24-hour format
    let hours24 = hours;
    if (period === 'PM' && hours !== 12) {
        hours24 += 12;
    } else if (period === 'AM' && hours === 12) {
        hours24 = 0;
    }

    // Set the hours and minutes to the new Date object
    date.setHours(hours24);
    date.setMinutes(minutes);
    date.setSeconds(0); // Set seconds to 0 (optional)

    return date;
}