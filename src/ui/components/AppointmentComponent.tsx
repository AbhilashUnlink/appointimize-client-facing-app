/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Drawer_Type } from '../constants/drawer-constants'
// import DatePicker from 'react-date-picker';
// import { TimePicker } from "rsuite";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, setDrawer } from '../../lib/slice/cartSlice'
import {
    TextField, Button, Box
} from '@mui/material'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import toast from 'react-hot-toast';
import 'rsuite/dist/rsuite-no-reset.min.css';
import useSound from "use-sound";
import popsound from "../../assets/sound/pop.mp3";
import { useParams } from 'react-router-dom'
import { addDays, addMinutes, format } from 'date-fns'
import { CustomButton } from './appointment-form/CustomButton'
import { attachTimeToDate, generateAvailableTimes, getNext10Days } from './appointment-form/appointmentHelpers'
import { BASE_URL } from '../constants/api-urls'

const AppointmentComponent = () => {
    const dispatch = useDispatch();

    const [playOn] = useSound(popsound, {
        volume: 0.25,
    });

    const cart = useSelector((store: any) => store.cart);
    const { id } = useParams();


    const [formData, setFormData] = useState<any>({
        name: localStorage.getItem("name") || "",
        mobileNumber: localStorage.getItem("mobileNumber") || ""
    });
    const [selectedDate, setSelectedDate] = useState<string>("Today");
    const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
    const [selectedTime, setSelectedTime] = useState<any>(null);
    const [timesAvailable, setTimesAvailable] = useState<any>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const currentHour = new Date().getHours();
        setTimesAvailable(selectedDate === "Today" ? generateAvailableTimes(currentHour, selectedDate) : generateAvailableTimes(currentHour));
    }, [selectedDate]);


    const handleChange = (name: string, value: any) => {
        setFormData({
            ...formData,
            [name]: value
        })

        if (name === 'mobileNumber') {
            const mobileNumberRegex = /^[0-9]{10}$/;
            if (value && !mobileNumberRegex.test(value)) {
                setError('Mobile number must contain 10 digits.');
            } else {
                setError('');
            }
        }
    }

    const handleDateChange = (date: string, index: number) => {
        setSelectedDate(date);
        setSelectedDateIndex(index);
        setSelectedTime(null);
    };

    const handleTimeClick = (time: any) => {
        setSelectedTime(time);


    };


    const createAppointment = async () => {
        const today = new Date();
        const appointmentDate = addDays(today, selectedDateIndex);
        const appointmentTime = attachTimeToDate(appointmentDate, selectedTime)
        const formattedAppointmentDate = format(appointmentTime, "yyyy-MM-dd")
        const totalDuration = cart.items?.reduce((a: any, b: any) => {
            return a += b.duration;
        }, 0);
        let currentStartTime = appointmentTime;
        const startTime = format(currentStartTime, 'HH:mm:ss')
        const endTime = format(addMinutes(currentStartTime, totalDuration), "HH:mm:ss");
        const payload = {
            companyId: id,
            // clientId: "",
            appmtDate: formattedAppointmentDate,
            status: "pending",
            comment: "",
            clientPayload: {
                firstName: formData?.name,
                mobileNumber: formData?.mobileNumber
            },
            appmtPayload: {
                companyId: id,
                // "clientId": "",
                startTime,
                endTime,
                "appointmentDate": [
                    formattedAppointmentDate
                ],
                endTimeExpected: "",
                totalDuration: totalDuration,
                priceExpected: cart?.totalAmount,
                priceFull: cart?.totalAmount,
                status: "pending",
                priceFinal: cart?.totalAmount,
                svcBooked: cart?.items?.map((item: any) => {
                    const empSvcBkgStartTime = format(currentStartTime, 'HH:mm:ss');
                    const empSvcBkgEndTime = format(addMinutes(currentStartTime, item.duration), 'HH:mm:ss');
                    currentStartTime = addMinutes(currentStartTime, item.duration);
                    return {
                        svcCtlgItemsId: item.id,
                        employeeBookedId: "",
                        price: Number(item.price),
                        empSvcBkgDuration: item.duration,
                        empSvcBkgStartTime,
                        empSvcBkgEndTime
                    };
                }),
                "appointmentStatus": [{ status: "pending" }]
            }

        };
        console.log(payload, "payload")

        // Write api call here 

        fetch(`${BASE_URL}/company/sales-lead/upsert`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json, "json"));





        localStorage.setItem("name", formData?.name)
        localStorage.setItem("mobileNumber", formData?.mobileNumber)


        // do this upon successful completion
        toast.success('Appointment Created Successfully!')
        dispatch(setDrawer({ open: false, type: "" }));
        dispatch(clearCart())



    }



    return (
        <div className="p-2 space-y-6">
            {/* Name Input */}
            <div>
                <label className="block mb-2 text-gray-700">Name</label>
                <TextField
                    fullWidth
                    size='small'
                    placeholder="Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="mb-4"
                />
            </div>

            {/* Mobile Number Input */}
            <div>
                <label className="block mb-2 text-gray-700">Mobile Number</label>

                <TextField
                    fullWidth
                    placeholder="Mobile Number"
                    variant="outlined"
                    type="tel"
                    size="small"
                    value={formData.mobileNumber}
                    onChange={({ target: { value } }) => handleChange('mobileNumber', value)}
                    className="mb-4"
                    error={!!error} // Highlight the text field if there is an error
                    helperText={error} // Display the error message
                />
            </div>
            <div>
                <label className="block mb-2 text-gray-700">Select Appointment Date</label>

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
            </div>
            <div>
                <label className="block mb-2 text-gray-700">Select Appointment Time</label>

                <div className="overflow-x-auto flex gap-2 py-2 sm:gap-4 sm:py-3 no-scrollbar" style={{ flexWrap: "nowrap" }}>
                    {timesAvailable?.map((time: any, index: number) => (
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
            </div>


            <button
                onClick={() => {
                    playOn()
                    createAppointment()
                }}
                style={!selectedDate || !selectedTime || !formData.name || !formData.mobileNumber ? { background: "#e3e3e3", pointerEvents: "none" } : {}}
                disabled={error || !selectedDate || !selectedTime || !formData.name || !formData.mobileNumber ? true : false}
                className="checkout-btn italic absolute bottom-3 left-2 border border-gray-800 py-2 px-6 bg-white text-black flex items-center justify-between group hover:bg-black hover:text-white transition duration-300"
            >
                CREATE BOOKING
                <span className="inline-flex items-center ">
                    <span className="text-xl leading-none">→</span>
                </span>


            </button>



        </div>
    )
}

export default AppointmentComponent


// < div className = "flex gap-5 mt-6" >
//             <Button
//                 variant="contained"
//                 color="inherit"
//                 onClick={() => {
//                     playOn()
//                     dispatch(setDrawer({ open: true, type: Drawer_Type.Cart }))
//                 }}
//                 className="w-full"

//             >
//                 BACK
//             </Button>

//             <Button
//                 variant="contained"
//                 color="success"
//                 onClick={() => {
//                     toast.success('Appointment Created Successfully!')
//                     dispatch(setDrawer({ open: false, type: "" }));
//                     createAppointment()
//                     dispatch(clearCart())
//                     playOn()
//                 }}
//                 className="w-full"
//             >
//                 FINISH
//             </Button>
//         </div >


//     < div >
//                 <label className="block mb-2 text-gray-700">Email</label>

//                 <TextField
//                     fullWidth
//                     placeholder="Email ( optional )"
//                     variant="outlined"
//                     type="email"
//                     value={formData.email}
//                     onChange={({ target: { value } }) => handleChange('email', value)}
//                     className="mb-4"
//                 />
//             </div >



//             <br />
//             <Divider />
//             <br />


// < FormControl fullWidth >
//     <TimePicker value={formData.time} onChange={(val: any) => {
//         handleChange("time", val);
//     }} format="hh:mm aa" />
//             </FormControl >


//     < DatePicker
// value = { formData.date }
// onChange = {(date) => {
//     handleChange("date", date)
// }}
// minDate = { currentDate }
// className = "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
//     />