import { Field, Form, Formik, getIn } from 'formik'
import React, { useState } from 'react'
import { iconAdd } from '../../../../assets'
import { FormControl, Icon } from '../../../../components'
import { getStyle } from '../../../../utils/helpers/errorMessage'
import { CopyScheduleField, ScheduleContainer } from './schedule.elements'
import * as Yup from "yup";
import DateView from 'react-datepicker'
import API from '../../../../config/api'
import { tahun_bulan_tanggal } from '../../../../utils/helpers/date'



const schemaValidation = Yup.object({
    copy_from_date: Yup.string().required('Required').typeError('Tidak boleh kosong!'),
    copy_to_date: Yup.string().required('Required').typeError('Tidak boleh kosong!'),
    paste_to_date: Yup.string().required('Required').typeError('Tidak boleh kosong!'),
    
    // photo: Yup.string().required('Required')
  
  });


const CopySchedule = ({
    groupID, token
}) => {

    
    const initialValues = {
        group_id: groupID,
        copy_from_date: null,
        copy_to_date: null,
        paste_to_date: null,
        
    };

    const getMinDate = (copyToDate) => {
      // console.log(copyToDate);
      const date = new Date(copyToDate)

      // Add a day
      const minDate = date.setDate(date.getDate() + 1);
      // console.log(minDate);
      return minDate;
    }

    const handleSubmit = (values, { resetForm, setSubmitting }) => {
        // values = JSON.stringify(values)
        // console.log("handleSubmit values", values);
        // console.log(values);
      
        values.copy_from_date = tahun_bulan_tanggal(values.copy_from_date)
        values.copy_to_date = tahun_bulan_tanggal(values.copy_to_date)
        values.paste_to_date = tahun_bulan_tanggal(values.paste_to_date)
        API.copySchedule(token, values).then(res => {
          // console.log(res)
          // console.log(res.data.message);
          swal({
              title: res.data.status,
              text: res.data.message,
              icon: "success",
          });
    
          
        }).catch(err => {
            console.log(err.response);
            swal({
                title: err.status,
                text: err.response.data.message,
                icon: "error",
            });
    
    
        });
     
        resetForm();
        setSubmitting(false);
    };

    
    
    return (
        <>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, props) => handleSubmit(values, props)}
          validationSchema={() => schemaValidation}
          >
      {({
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
            isSubmitting
          }) => (
            <Form className="copy-schedule">
              <FormControl
                control="date"
                name="copy_from_date"
                label='Copy Dari Tanggal'
                style={getStyle(errors, touched, 'copy_from_date')}
                className="small"
              />
              <FormControl
                control="date"
                name="copy_to_date"
                label='Copy Sampai Tanggal'
                style={getStyle(errors, touched, 'copy_to_date')}
                className="small"
                minDate={ getMinDate(getIn(values, 'copy_from_date')) }

              />
              <FormControl
                control="date"
                name="paste_to_date"
                label='Paste Dari Tanggal'
                style={getStyle(errors, touched, 'copy_to_date')}
                className="small"
                // minDate={new Date()}
                minDate={ getMinDate(getIn(values, 'copy_to_date')) }
                // {console.log(getIn(values, 'copy_to_date'))}
                
              />
        
        

              <button type="submit" className="copy-button" disabled={isSubmitting}>
                <h3>Duplikat</h3>
              </button>

            </Form>
          )}
        </Formik>
        </>
    )
}

export default CopySchedule
