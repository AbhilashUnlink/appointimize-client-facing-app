/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  // FormControl,
} from "@mui/material";
// import 'react-time-picker/dist/TimePicker.css'
// import 'react-clock/dist/Clock.css';
// import DatePicker from 'react-date-picker';
// import 'react-date-picker/dist/DatePicker.css';
// import 'react-calendar/dist/Calendar.css';
// import { TimePicker } from "rsuite";

// Define types
interface AppointmentFormProps {
  open: boolean;
  onClose: () => void;
}

type Time = string;

const AppointmentForm = ({ open, onClose }: AppointmentFormProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("Today");
  const [selectedTime, setSelectedTime] = useState<Time | null>(null);
  const [timesAvailable, setTimesAvailable] = useState<Time[]>([]);
  // const [showCustomDatePicker, setShowCustomDatePicker] = useState<boolean>(false);
  // const [showCustomTimePicker, setShowCustomTimePicker] = useState<boolean>(false);
  // const [formData, setFormData] = useState<any>({
  //   date: null,
  //   time: "",
  // });

  // Get current date for validation
  const currentDate = new Date();

  // Generate Available Times Function (with 30-minute intervals and AM/PM format)
  const generateAvailableTimes = (currentHour: number = new Date().getHours()): Time[] => {
    const times: Time[] = [];
    for (let hour = 5; hour <= 23; hour++) {
      // Add both hour and 30-minutes interval to the times list
      for (let minute = 0; minute < 60; minute += 30) {
        if (selectedDate === "Today" && (hour < currentHour || (hour === currentHour && minute <= currentDate.getMinutes()))) {
          continue;
        }
        const timeString = `${hour % 12 === 0 ? 12 : hour % 12}:${minute === 0 ? "00" : "30"} ${hour < 12 ? "AM" : "PM"}`;
        times.push(timeString);
      }
    }
    return times;
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    setTimesAvailable(selectedDate === "Today" ? generateAvailableTimes(currentHour) : generateAvailableTimes());
  }, [selectedDate]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeClick = (time: Time) => {
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    alert(`Appointment scheduled for ${selectedDate} at ${selectedTime}`);
    onClose(); // Close the dialog on submit
  };

  // const handleChange = (field: string, value: any) => {
  //   setFormData((prevData: any) => ({
  //     ...prevData,
  //     [field]: value,
  //   }));
  // };

  return (
    <Dialog open={open} onClose={onClose}>
      {/* Dialog Title */}
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#D81B60" }}>
        🎉 Let's Get You Booked! 🎉
      </DialogTitle>

      <DialogContent>
        {/* Date Selection Section */}
        <Typography
          variant="h5"
          sx={{ color: "#D81B60", fontWeight: "bold", textAlign: "center", marginBottom: "16px" }}
        >
          Pick Your Spot on Our Calendar 📅
        </Typography>

        {/* Horizontal Scrollable Date Buttons */}
        <div className="overflow-x-auto flex gap-4 py-2 no-scrollbar" style={{ flexWrap: "nowrap" }}>
          {["Today", "Tomorrow", "Overmorrow"].map((date, index) => {
            return (
              <CustomButton
                key={index}
                label={`${getDateIcon(date)} ${date}`}
                onClick={() => handleDateChange(date)}
                isSelected={selectedDate === date}
                minWidth={150}
              />
            );
          })}

          {/* Custom Date Button */}
          {/* <CustomButton
            label="Custom Date 📅"
            onClick={() => setShowCustomDatePicker(!showCustomDatePicker)}
            isSelected={false}
            minWidth={200}
          /> */}
        </div>

        {/* DatePicker when "Custom Date" is selected */}
        {/* {showCustomDatePicker && (
          <DatePicker
            value={formData.date}
            onChange={(date) => {
              handleChange("date", date)
            }}
            minDate={currentDate}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
          />
        )} */}

        {/* Time Selection Section */}
        <Typography
          variant="h6"
          sx={{ fontStyle: "italic", color: "#2E3B4E", textAlign: "center", marginTop: "20px" }}
        >
          Choose Your Appointment Time ⏰
        </Typography>

        {/* Scrollable Time Buttons */}
        <div className="overflow-x-auto flex gap-2 py-2 no-scrollbar" style={{ flexWrap: "nowrap" }}>
          {timesAvailable.map((time, index) => (
            <Box key={index} className="min-w-max">
              <Button
                variant={selectedTime === time ? "contained" : "outlined"}
                fullWidth
                sx={{ color: selectedTime === time ? "secondary" : "default" }}
                onClick={() => handleTimeClick(time)}
                className="rounded-full"
                style={{
                  borderRadius: "50px",
                  minWidth: "100px",
                  height: "40px",
                  backgroundColor: selectedTime === time ? "#D81B60" : "#000",
                  color: selectedTime === time ? "#fff" : "#fff",
                  transition: "background-color 0.3s ease",
                }}
              >
                {time}
              </Button>
            </Box>
          ))}

          {/* Custom Time Button */}
          {/* <CustomButton
            label="Custom Time ⏰"
            onClick={() => setShowCustomTimePicker(!showCustomTimePicker)}
            isSelected={false}
            minWidth={200}
          /> */}
        </div>

        {/* TimePicker when "Custom Time" is selected */}
        {/* {showCustomTimePicker && (
          <FormControl fullWidth>
            <TimePicker
              value={formData.time}
              onChange={(val: any) => handleChange("time", val)}
              format="hh:mm aa"
            />
          </FormControl>
        )} */}
      </DialogContent>

      <DialogActions>
        {/* Cancel Button */}
        <Button
          onClick={onClose}
          className="rounded-full"
          style={{ backgroundColor: "#000", color: "#fff", padding: "8px 20px" }}
        >
          Cancel
        </Button>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="rounded-full"
          style={{
            backgroundColor: selectedDate && selectedTime ? "#D81B60" : "#aaa",
            color: "#fff",
            padding: "8px 25px", // Reduced padding for a more compact button
            fontSize: "14px", // Reduced font size
            transition: "background-color 0.3s ease",
          }}
          disabled={!selectedDate || !selectedTime}
        >
          Schedule!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CustomButton = ({
  label,
  onClick,
  isSelected,
  minWidth = 120,
}: {
  label: string;
  onClick: () => void;
  isSelected: boolean;
  minWidth?: string | number;
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 hover:bg-[#D81B60] rounded-full ${isSelected ? "bg-[#D81B60] text-white" : "bg-black text-white"
      }`}
    style={{
      whiteSpace: "nowrap", // Prevent line break inside the button
      minWidth: minWidth, // Ensure the button is wide enough for the text to fit
    }}
  >
    {label}
  </button>
);

// Get Icon for Date Selection
const getDateIcon = (date: string): string => {
  switch (date) {
    case "Today":
      return "🗓️";
    case "Tomorrow":
      return "🌞";
    case "Overmorrow":
      return "🕒";
    default:
      return "📅";
  }
};

export default AppointmentForm;
