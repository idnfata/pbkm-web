import { Field, Form, Formik } from 'formik'
import React from 'react'
import { iconAdd } from '../../../../assets'
import { FormControl, Icon } from '../../../../components'
import { getStyle } from '../../../../utils/helpers/errorMessage'
import { CopyScheduleField, ScheduleContainer } from './schedule.elements'
import * as Yup from "yup";
import DateView from 'react-datepicker'



const schemaValidation = Yup.object({
    copy_from_date: Yup.string().required('Required').typeError('Tidak boleh kosong!'),
    copy_to_date: Yup.string().required('Required').typeError('Tidak boleh kosong!'),
    paste_to_date: Yup.string().required('Required').typeError('Tidak boleh kosong!'),
    
    // photo: Yup.string().required('Required')
  
  });


const CopySchedule = ({
    groupID
}) => {
    const initialValues = {
        group_id: groupID,
        copy_from_date: null,
        copy_to_date: null,
        paste_to_date: null,
        
    };

    const handleSubmit = (values, { resetForm, setSubmitting }) => {
        // values = JSON.stringify(values)
        console.log("handleSubmit values", values);
      
      
    
     
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
                
              />
        
              <FormControl
                control="date"
                name="paste_to_date"
                label='Paste Dari Tanggal'
                style={getStyle(errors, touched, 'copy_to_date')}
                className="small"
                minDate={new Date()}

                
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
