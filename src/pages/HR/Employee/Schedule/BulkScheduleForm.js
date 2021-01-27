import React from 'react'
import { Formik, Form } from "formik";
import { AutoCompleteSelect, FormControl } from '../../../../components';
import {getStyle} from '../../../../utils/helpers/errorMessage'
import API from '../../../../config/api';
import { tahun_bulan_tanggal } from '../../../../utils/helpers/date';
import * as Yup from "yup";


const schemaValidation = Yup.object().shape({
  employees: Yup.array()
    .min(1, "Pilih setidaknya 1 Karyawan")
    .of(
      Yup.object()
        .shape({
          label: Yup.string(),
          value: Yup.string()
        })
        .nullable()
    ),
  work_shift: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.string()
    })
    .nullable()
    .required("Shift / Jam Kerja Tidak Boleh Kosong"),
  work_location: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.string()
    })
    .nullable()
    .required("Lokasi / Area Kerja Tidak Boleh Kosong"),
});




const BulkScheduleForm = ({employeeOptions, locationOptions, shiftOptions, token, closeModal, groupID}) => {
  const initialValues = {
    employees: [],
    work_shift: [],
    work_location: [],
    group_id: groupID,
    from_date: null,
    to_date: null,

    
  };
  const handleSubmit = (values, { resetForm, setSubmitting }) => {

    values.from_date = tahun_bulan_tanggal(values.from_date)
    values.to_date = tahun_bulan_tanggal(values.to_date)
    values.work_location = values.work_location.value
    values.work_shift = values.work_shift.value
    values.employees = values.employees;
    // values = JSON.stringify(values)
    // console.log("handleSubmit values", values);
    API.addSchedule(token, values).then(res => {
      // console.log(res)
      // console.log(res.data.message);
      swal({
          title: res.data.status,
          text: res.data.message,
          icon: "success",
      });
    return closeModal();

      
    }).catch(err => {
        console.log(err.response);
        swal({
            title: err.status,
            // text: err.response.data.message,
            icon: "error",
        });


    });
  

 
    resetForm();
    setSubmitting(false);
  };
    return (
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
            <Form>
              <AutoCompleteSelect
                id="employees"
                name="employees"
                label="Karyawan"
                placeholder="Pilih Karyawan..."
                options={employeeOptions}
                value={values.employees}
                isMulti={true}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.employees}
                error={errors.employees}
                isClearable={true}
                backspaceRemovesValue={true}
              />
              <AutoCompleteSelect
                id="work_shift"
                name="work_shift"
                label="Shift / Jam Kerja"
                placeholder="Pilih Shift / Jam Kerja"
                options={shiftOptions}
                value={values.work_shift}
                isMulti={false}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.work_shift}
                error={errors.work_shift}
                isClearable={true}
                backspaceRemovesValue={true}
              />
              <AutoCompleteSelect
                id="work_location"
                name="work_location"
                label="Lokasi / Area Kerja"
                placeholder="Pilih Lokasi / Area Kerja..."
                options={locationOptions}
                value={values.work_location}
                isMulti={false}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.work_location}
                error={errors.work_location}
                isClearable={true}
                backspaceRemovesValue={true}
              />
              <FormControl
                control="date-range"
                name="date"
                label='Dari & Sampai Tanggal'
                style={getStyle(errors, touched, 'form_date')}
                
              />
              {/* <FormControl
                control="date"
                name=""
                label='Sampai Tanggal'
                name='to_date'
                style={getStyle(errors, touched, 'to_date')}
                // startDate={new Date()}
                // endDate={endDate}
                // selectsRange
                // inline
                
              /> */}


              <button type="submit" className="add-button" disabled={isSubmitting}>
                <h3>Simpan</h3>
              </button>
            </Form>
          )}
        </Formik>
    );
}

export default BulkScheduleForm

