import React from 'react'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AutoCompleteSelect, FormControl } from '../../../../components';
import {getStyle} from '../../../../utils/helpers/errorMessage'
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




const BulkScheduleForm = ({employeeOptions, locationOptions, shiftOptions}) => {
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log("handleSubmit values", values);
  
    resetForm();
    setSubmitting(false);
  };
  const initialValues = {
    employees: [],
    work_shift: [],
    work_location: [],
    from_date: null,
    to_date: null
    
  }
    return (
      <Formik
          initialValues={initialValues}
          onSubmit={(values, props) => handleSubmit(values, props)}
          validationSchema={() => schemaValidation}
          render={({
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
              <p>tampilkan dari tanggal </p>
              <p>tampilkan sampai tanggal </p>
              <p>sampai tanggal tidak bisa memilih tanggal sebelum dari tanggal</p>
              
              <p>react-select, height select </p>

              <button type="submit" className="add-button" disabled={isSubmitting}>
                <h3>Simpan</h3>
              </button>
            </Form>
          )}
        />
    );
}

export default BulkScheduleForm

