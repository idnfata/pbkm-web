import React, { useEffect } from 'react'
import { getStyle } from '../../../../utils/helpers/errorMessage'
import { RequestLeaveValidationSchema } from '../fields'
import { Form, Formik, getIn } from 'formik'
import { FormControl } from '../../../../components'
import { tahun_bulan_tanggal } from '../../../../utils/helpers/date'
import API from '../../../../config/api'


const LeaveForm = ({setting, employee_id, token, history}) => {
    const today = new Date();
    const minStartDate = new Date(today.setDate(today.getDate() + setting.request_before_day));
    // console.log(setting)
    
    const getDate = (date, nums) => {
        const dateBefore = new Date(date)
        // Add a day
        const dateAfter = dateBefore.setDate(dateBefore.getDate() + nums);
        // console.log(dateAfter);
        return dateAfter;
      }



    const initialValues = {
        employee_id: employee_id,
        leave_type : setting.leave_type,
        periode: today.getFullYear(),
        request_date_start: '',
        request_date_end: '',
        employee_note: '',
        address_during_leave: '',
        contact_during_leave: '',
        attachment: ''



    };

   const handleSubmit = (values, { resetForm, setSubmitting }) => {
        // values = JSON.stringify(values)
        // console.log("handleSubmit values", values);
        
        values.request_date_start = tahun_bulan_tanggal(values.request_date_start)
        values.request_date_end = tahun_bulan_tanggal(values.request_date_end)
        // values.paste_to_date = tahun_bulan_tanggal(values.paste_to_date)
        
        // console.log(values);
    
        API.addLeaveRequest(token, values).then(res => {
            // console.log(res)
            // console.log(res.data.message);
            swal({
                title: res.data.status,
                text: res.data.message,
                icon: "success",
            });

            history.push('/leave');
      
            
          }).catch(err => {
            //   console.log(err.response);
              swal({
                  title: err.status,
                  text: err.response.data.message,
                  icon: "error",
              });
              history.push('/leave');
      
      
          });
     
        resetForm();
        setSubmitting(false);
    };

    return (
        <>  
            <Formik
                initialValues={initialValues}
                onSubmit={(values, props) => handleSubmit(values, props)}
                validationSchema={() => RequestLeaveValidationSchema}
                >
            {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    setFieldTouched,
                    isSubmitting
                }) => (
                    <Form>
                        <FormControl
                            control="date"
                            name="request_date_start"
                            label='Dari Tanggal'
                            style={getStyle(errors, touched, 'request_date_start')}
                            minDate={minStartDate}

                        />
                        <FormControl
                            control="date"
                            name="request_date_end"
                            label='Sampai Tanggal'
                            style={getStyle(errors, touched, 'request_date_end')}
                            minDate={getDate(getIn(values, 'request_date_start'), 0) }
                            maxDate={getDate(getIn(values, 'request_date_start'), setting.max_duration_per_1_request - 1)}

                        />
                        <FormControl
                            control="textarea"
                            name="employee_note"
                            label="Keterangan"
                            style={getStyle(errors, touched, 'employee_note')}
                        />
                        <FormControl
                            control="input"
                            type="text"
                            name="address_during_leave"
                            label="Alamat Selama Cuti"
                            style={getStyle(errors, touched, 'address_during_leave')}
                        />
                        <FormControl
                            control="input"
                            type="text"
                            name="contact_during_leave"
                            label="Kontak Selama Cuti"
                            style={getStyle(errors, touched, 'contact_during_leave')}
                        />
                        {
                            setting.need_attachment != 1 ? null :
                                <FormControl
                                    control="input"
                                    type="file"
                                    name="attachment"
                                    label="Lampiran"
                                    style={getStyle(errors, touched, 'attachment')}
                                />
                        }
                        
                        
                
                

                        <button type="submit" className="request-button" disabled={isSubmitting}>
                            Ajukan
                        </button>

                    </Form>
                )}
            </Formik>
        </>
    )
}

export default LeaveForm
