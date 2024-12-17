/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux'
import { clearCart, setDrawer } from '../../lib/slice/cartSlice'
import { Drawer_Type } from '../constants/drawer-constants'
import { TextField, Button, Divider, FormControl } from '@mui/material'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import toast from 'react-hot-toast';
import { TimePicker } from "rsuite";
import 'rsuite/dist/rsuite-no-reset.min.css';
import useSound from "use-sound";
import popsound from "../../assets/sound/pop.mp3";

const AppointmentComponent = ({ formData, setFormData }: any) => {
    const dispatch = useDispatch();



    const [playOn] = useSound(popsound, {
        volume: 0.25,
    });


    const handleChange = (name: string, value: any) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const currentDate = new Date()

    return (
        <div className="p-6 space-y-6">

            <div>
                <label className="block mb-2 text-gray-700">Select Appointment Date</label>
                <DatePicker
                    value={formData.date}
                    onChange={(date) => {
                        handleChange("date", date)
                    }}
                    minDate={currentDate}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block mb-2 text-gray-700">Select Appointment Time</label>
                <FormControl fullWidth>
                    <TimePicker value={formData.time} onChange={(val: any) => {
                        handleChange("time", val);
                    }} format="hh:mm aa" />
                </FormControl>
            </div>


            {/* Name Input */}
            <div>
                <label className="block mb-2 text-gray-700">Name</label>
                <TextField
                    fullWidth
                    size='small'
                    placeholder="Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={({ target: { value } }) => handleChange('name', value)}
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
                    size='small'

                    value={formData.mobileNumber}
                    onChange={({ target: { value } }) => handleChange('mobileNumber', value)}
                    className="mb-4"
                />
            </div>

            {/* Email Input */}
            {/* <div>
                <label className="block mb-2 text-gray-700">Email</label>

                <TextField
                    fullWidth
                    placeholder="Email ( optional )"
                    variant="outlined"
                    type="email"
                    value={formData.email}
                    onChange={({ target: { value } }) => handleChange('email', value)}
                    className="mb-4"
                />
            </div> */}



            <br />
            <Divider />
            <br />
            {/* Buttons */}
            <div className="flex gap-5 mt-6">
                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        playOn()
                        dispatch(setDrawer({ open: true, type: Drawer_Type.Cart }))
                    }}
                    className="w-full"

                >
                    BACK
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                        toast.success('Appointment Created Successfully!')
                        dispatch(setDrawer({ open: false, type: "" }))
                        dispatch(clearCart())
                        playOn()
                    }}
                    className="w-full"
                >
                    FINISH
                </Button>
            </div>
        </div>
    )
}

export default AppointmentComponent
