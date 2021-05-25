import React, { useEffect, useRef, useState } from 'react'
import { CircleMarker, MapConsumer, MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { isArraySame } from '../../../utils/helpers/array';
import { attendanceText, getDistance, overtimeText } from '../../../utils/helpers/attendance';
import { format_tanggal_indo, jam_menit_detik } from '../../../utils/helpers/date';
import { AttendanceOverview, AttendanceRecordButton, AttendanceTextInfo, OvertimeTextInfo } from './attendance.elements';
import AttendanceButton from './AttendanceButton';
import OvertimeAttendanceButton from './OvertimeAttendanceButton';


const redOptions = { color: 'red' }
const greenOptions = { color: 'green' }

const AttendanceMap = (props) => {
    const {schedule, userLocation, zoom, distance, time, attendance, overtime, absenMasuk, absenPulang} = props;
    // console.log(schedule)
    const today = new Date();
    const markerRef = useRef(null);
    const [currTime, setCurrTime] = useState(time);
    const [distanceText, setDistanceText] = useState(null);

   
    

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log('This will run every second!');
            setCurrTime(jam_menit_detik());
         }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // console.log(distance)
        setDistanceText(Math.abs(distance) > 999 ? Math.sign(distance)*((Math.abs(distance)/1000).toFixed(1)) + ' KM' : Math.sign(distance)*Math.abs(distance).toFixed(0) + ' meter')
    }, [distance])
    function ChangeView({ center }) {
        const map = useMap();
        let marker = markerRef.current;
        if(marker != null){
            const markCoords = marker.getLatLng()
            if(isArraySame(center, [markCoords.lat, markCoords.lng])){
                // console.log('posisi tidak berubah')
                return null;
            }else {
                // console.log('posisi berubah')
                 //cek apakah berubahnya lebih dari 4 meter
                const move = getDistance(center, [markCoords.lat, markCoords.lng])
                // console.log(move);
                if(move > 2){
                    // console.log('bergerak lebih dari 4 meter')
                    map.flyTo(center)
                    
                }
            }
        }
    
        return null;
      }
 
    return (
        <>
        {/* {console.log(markerRef.current && markerRef.current.getLatLng())} */}
            <MapContainer center={userLocation} zoom={zoom} animate={true} scrollWheelZoom={false} id="attendance-map">
             
                <ChangeView center={userLocation} /> 
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <CircleMarker center={schedule.attLocation} pathOptions={distance <= schedule.attRadius ? greenOptions : redOptions} radius={schedule.attRadius}>
                    <Popup>{schedule.attLocationName} | {distanceText} dari lokasimu</Popup>
                </CircleMarker>
                <Marker position={userLocation} ref={markerRef}>
                <Popup>
                    Lokasimu. <br /> {distanceText} dari lokasi absen.

                </Popup>
                </Marker>
            
            </MapContainer>
                {schedule.attType == 'shift' && overtime ? <OvertimeTextInfo to="/attendance/record/overtime">Ada Jadwal Lembur</OvertimeTextInfo> : null}
            <AttendanceOverview>
                {/* kalo belum absen tampilkan ini, kalo sudha absen tampilkan durasi */}
                <div className="schedule-info">
                    <div className="si-location-info">

                        <div className="si-location-code">
                            {schedule.attLocationCode}
                        </div>
                        <div className="location-name">
                            <p>{schedule.attLocationName}</p>
                            <p className="si-location-distance"><b>{distanceText}</b> dari lokasimu.</p>
                        
                        </div>
                        
                    </div>
                        
                    
                    
                    <div className="si-shift-info">
                        <div className="si-shift-detail">
                            <div className="si-time-in">
                                <p>{schedule.attType == 'shift' ? 'Jam Masuk' : 'Mulai'}</p>
                                <p>{schedule.attTimeIn.substring(0, 5)}</p>

                            </div>
                            <div className="si-time-out">
                                <p>{schedule.attType == 'shift' ? 'Jam Keluar' : 'Selesai'}</p>
                                <p>{schedule.attTimeOut.substring(0, 5)}</p>

                            </div>
                            

                        </div>
                        <div className="si-shift-code">{schedule.attCode}</div>
                    </div>
                </div>
                <h4>
                    {format_tanggal_indo(today)}
                </h4>
                
                {schedule.attType == 'shift' ?
                    <div className="attendance-text">
                        <p dangerouslySetInnerHTML={{__html: attendanceText(currTime, schedule, attendance) }} />
                    </div>
                :
                    <div className="attendance-text">
                        <p dangerouslySetInnerHTML={{__html: overtimeText(currTime, schedule, attendance) }} />
                    </div>
                }
                    
                
            </AttendanceOverview>
    
            {schedule.attType == 'shift' ? AttendanceButton(currTime, schedule, attendance, absenMasuk, absenPulang) : <OvertimeAttendanceButton
                current_time={currTime}
                schedule={schedule}
                attendance={attendance}
                absenMasuk={absenMasuk}
                absenPulang={absenPulang}
            />}

            {schedule.attType == 'shift' ? <AttendanceTextInfo>
                <p dangerouslySetInnerHTML={{__html: attendanceText(currTime, schedule, attendance) }} />
            </AttendanceTextInfo>
             : <AttendanceTextInfo>
                 <p dangerouslySetInnerHTML={{__html: overtimeText(currTime, schedule, attendance) }} />
            </AttendanceTextInfo>}

            

        </>
    )
}

export default AttendanceMap
