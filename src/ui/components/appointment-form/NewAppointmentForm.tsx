import { useState, useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Box,
    Typography,
    TextField,
    CircularProgress
} from "@mui/material";
import { addDays, format } from "date-fns";
import { generateAvailableTimes, getNext10Days } from "./appointmentHelpers";
import { Divider } from "rsuite";
import toast from "react-hot-toast";
import { CustomButton } from "./CustomButton";

interface AppointmentFormProps {
    open: boolean;
    onClose: () => void;
}

type Time = string;

const NewAppointmentForm = ({ open, onClose }: AppointmentFormProps) => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<string>("Today");
    const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
    const [selectedTime, setSelectedTime] = useState<Time | null>(null);
    const [timesAvailable, setTimesAvailable] = useState<Time[]>([]);

    const appointimizeCustomerName = localStorage.getItem("appointimizeCustomerName") || "";
    const appointimizeCustomerPhoneNumber = localStorage.getItem("appointimizeCustomerPhoneNumber") || "";

    const [customerName, setCustomerName] = useState<string>(appointimizeCustomerName);
    const [phoneNumber, setPhoneNumber] = useState<string>(appointimizeCustomerPhoneNumber);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const currentHour = new Date().getHours();
        setTimesAvailable(selectedDate === "Today" ? generateAvailableTimes(currentHour, selectedDate) : generateAvailableTimes(currentHour));
    }, [selectedDate]);

    const handleDateChange = (date: string, index: number) => {
        setSelectedDate(date);
        setSelectedDateIndex(index);
    };

    const handleTimeClick = (time: Time) => {
        setSelectedTime(time);
    };

    const handleSubmit = () => {
        setLoading(true);

        const today = new Date();
        const appointmentDate = addDays(today, selectedDateIndex);
        const formattedDate = format(appointmentDate, "yyyy-MM-dd");

        // Simulate a submit process
        setTimeout(() => {
            toast.success(`Appointment scheduled for ${formattedDate} at ${selectedTime?.split(" ")[0]} with ${customerName} (Phone: ${phoneNumber})`);
            setLoading(false);
            onClose();
        }, 1500);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            {activeStep === 0 && (
                <DialogTitle sx={{ color: "#D81B60", fontWeight: "bold", textAlign: "center", marginTop: "20px", marginBottom: "5px" }}>
                    🎉 LET'S BOOK 🎉
                </DialogTitle>)}

            {activeStep === 1 && (<DialogTitle sx={{ color: "#D81B60", fontWeight: "bold", textAlign: "center", marginTop: "20px", marginBottom: "5px" }}>
                CREATING APPOINTMENT
                <br />
                <br />
                <span style={{ color: "#000" }}> {customerName} - {phoneNumber} </span>
            </DialogTitle>)}

            <DialogContent>

                {activeStep === 0 && (
                    <Box sx={{ padding: "20px 5px" }}>
                        <Typography variant="h6" sx={{ fontStyle: "italic", color: "#2E3B4E", textAlign: "left", marginBottom: "10px" }} className="text-sm sm:text-base">
                            Your Good Name
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            sx={{ marginBottom: "16px" }}
                            size="small"
                        />
                        <Typography variant="h6" sx={{ fontStyle: "italic", color: "#2E3B4E", textAlign: "left", marginBottom: "10px" }} className="text-sm sm:text-base">
                            Contact Number
                        </Typography>
                        <TextField
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            sx={{ marginBottom: "16px" }}
                            size="small"
                        />

                        <DialogActions
                            sx={{ mt: 4, display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                            <Button onClick={onClose} sx={{ backgroundColor: "#000", color: "#fff", padding: "8px 20px" }} className="text-sm sm:text-base">
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    setActiveStep(1)
                                    localStorage.setItem("appointimizeCustomerName", customerName)
                                    localStorage.setItem("appointimizeCustomerPhoneNumber", phoneNumber)
                                }}
                                sx={{
                                    backgroundColor: customerName && phoneNumber ? "#D81B60" : "#aaa",
                                    color: "#fff",
                                    padding: "8px 25px",
                                    fontSize: "14px",
                                    transition: "background-color 0.3s ease",
                                }}
                                disabled={!customerName || !phoneNumber}
                                className="text-sm sm:text-base"
                            >
                                Next
                            </Button>
                        </DialogActions>
                    </Box>
                )}

                {activeStep === 1 && (
                    <Box sx={{ padding: "20px 5px" }}>
                        <Typography variant="h6" sx={{ fontStyle: "italic", color: "#2E3B4E", textAlign: "left", marginBottom: "10px" }} className="text-sm sm:text-base">
                            Please Pick Date 📅
                        </Typography>
                        <div className="overflow-x-auto flex gap-2 py-2 sm:gap-4 sm:py-3 no-scrollbar" style={{ flexWrap: "nowrap" }}>
                            {["Today", "Tomorrow", ...getNext10Days()].map((date, index) => (
                                <CustomButton
                                    key={index}
                                    label={date}
                                    onClick={() => handleDateChange(date, index)}
                                    isSelected={selectedDate === date}
                                    minWidth={120}
                                />
                            ))}
                        </div>

                        <Typography variant="h6" sx={{ fontStyle: "italic", color: "#2E3B4E", textAlign: "left", marginTop: "20px", marginBottom: "10px" }} className="text-sm sm:text-base">
                            Please Pick Time ⏰
                        </Typography>

                        <div className="overflow-x-auto flex gap-2 py-2 sm:gap-4 sm:py-3 no-scrollbar" style={{ flexWrap: "nowrap" }}>
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
                        </div>
                        <Divider />

                        <DialogActions
                            sx={{ mt: 4, display: "flex", alignItems: "center", justifyContent: "center" }}
                        >

                            <Button onClick={() => setActiveStep(0)} sx={{ backgroundColor: "gray", color: "#fff", padding: "8px 20px" }} className="text-sm sm:text-base">
                                Back
                            </Button>

                            <Button
                                onClick={handleSubmit}
                                sx={{
                                    backgroundColor: selectedDate && selectedTime && customerName && phoneNumber ? "green" : "#aaa",
                                    color: "#fff",
                                    padding: "8px 25px",
                                    fontSize: "14px",
                                    transition: "background-color 0.3s ease",
                                }}
                                disabled={!selectedDate || !selectedTime || !customerName || !phoneNumber}
                                className="text-sm sm:text-base"
                            >
                                {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Schedule!"}
                            </Button>
                        </DialogActions>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};



export default NewAppointmentForm;
