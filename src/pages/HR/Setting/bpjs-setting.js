import React, { useEffect, useState } from 'react'
import { ContainerSettingBPJS } from './setting.elements'
import { AutoCompleteSelect, Button, Col, FormControl, Gap } from '../../../components'
import { getStyle } from '../../../utils/helpers/errorMessage'
import { Form, Formik } from 'formik'
import * as Yup from "yup";
import API from '../../../config/api'



const basisPenghitungan = [
    {
        value: '', key: "-- Pilih --"
    },
    {
        value: 1, key: "Gaji Pokok"
    },
    {
        value: 2, key: "Gaji Pokok + Tj. Tetap"
    }
];
const jkkOptions = [
    {
        value: '', key: "-- Pilih --"
    },
    {
        value: 0.24, key: "Kel. I 0.24%"
    },
    {
        value: 0.54, key: "Kel. II 0.54%"
    },
    {
        value: 0.89, key: "Kel. III 0.89%"
    },
    {
        value: 1.27, key: "Kel. IV 1.27%"
    },
    {
        value: 1.74, key: "Kel. V 1.74%"
    },
];

const schemaValidation = Yup.object().shape({
    programs: Yup.array()
      .min(1, "Required")
      .of(
        Yup.object()
          .shape({
            label: Yup.string(),
            value: Yup.string()
          })
          .nullable()
      ),
  npp: Yup.string().required('Required'),
  basis_pengali: Yup.string().required('Required'),
  jkk: Yup.string().required('Required'),
  upah_minimum: Yup.string().required('Required'),
    
  
});
  



const SettingBPJS = ({initialValues, options, isAddOrEdit, token, reloadPage, isChildDone}) => {

    
   const handleSubmit = (values, { resetForm, setSubmitting }) => {

    
    // values = JSON.stringify(values)
    if(programs){
        values.jkk = values.programs.some(e => e.label === 'JKK') ? parseFloat(jkk.value) : 0;
        values.jkm = values.programs.some(e => e.label === 'JKM') ? 1 : 0;
        values.jht = values.programs.some(e => e.label === 'JHT') ? 1 : 0;
        values.jp = values.programs.some(e => e.label === 'JP') ? 1 : 0;
        values.jkn = values.programs.some(e => e.label === 'JKN') ? 1 : 0;
    }
    // console.log("handleSubmit values", values);

    if(isAddOrEdit == 'edit'){
        // console.log('edit');
        API.editSetupBPJS(token, values).then(res => {
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
                    // text: err.response.data.message,
                    icon: "error",
                });
            
            
            });

    }else {
        // console.log('add')
        API.addSetupBPJS(token, values).then(res => {
        // console.log(res)
        // console.log(res.data.message);

        swal({
            title: res.data.status,
            text: res.data.message,
            icon: "success",
        })
        
        
        }).catch(err => {
            console.log(err.response);
            swal({
                title: err.status,
                // text: err.response.data.message,
                icon: "error",
            });
        
        
        });
    }
    
    
    resetForm();
    setSubmitting(false);
    reloadPage();
    // reloadPage(true);
    // setInterval(() => {
        
    // }, 500);

    // console.log('simpan pengaturan bpjs')

    };
    // console.log(reloadPage?
    
    // useEffect(() => {
    //     console.log('tereload');
    //     // console.log(initialValues);
    // }, [isChildDone])

    return (
        
        <ContainerSettingBPJS>
            <h3>Sesuaikan Pengaturan BPJS</h3>
            <hr />
            <Gap height={30} />
            <Formik
                enableReinitialize
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

                    <Form className="form">
                    <div className="left-form">
                        <FormControl control="input" type="text" label="Nomor Pendaftaran Perusahaan" name="npp"
                            style={getStyle(errors, touched, 'npp')}
                        />
                        
                     
                        <AutoCompleteSelect
                                id="programs"
                                name="programs"
                                label="Program BPJS yang Diikuti "
                                placeholder="Pilih Program..."
                                options={options}
                                // defaultValue={initialValues.programs}
                                value={values.programs}
                                isMulti={true}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                touched={touched.programs}
                                error={errors.programs}
                                isClearable={true}
                                backspaceRemovesValue={true}
                            />
                        <FormControl control="select" label="Basis Pengali" name="basis_pengali" options={basisPenghitungan}
                            style={getStyle(errors, touched, 'basis_pengali')}
                        
                        />
                        <FormControl control="select" label="Jaminan Kecelakaan Kerja (JKK)" name="jkk" options={jkkOptions}
                            style={getStyle(errors, touched, 'jkk')}
                        
                        />
                      
                       <FormControl control="format-number" label="UMK/UMP Setempat" name="upah_minimum" className="input"
                            style={getStyle(errors, touched, 'upah_minimum')}
                        />
                        
                              
                    <button type="submit" className="save-button" disabled={isSubmitting}>
                            Simpan
                    </button>
                    </div>
   
                    <div className="right-form">
                    <h5>JKK: PP Nomor 76 Tahun 2007 P.28 (3), P.29 (2-3), PP No. 45 th 2015</h5>
                    
                        <table className="bpjs-tk">
                            <thead>
                                <tr>
                                    <th>BPJS TK</th>
                                    <th>PERUSAHAAN</th>
                                    <th>KARYAWAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        JKK
                                    </td>
                                    <td>
                                        {initialValues.jkk}%
                                    </td>
                                    <td>
                                        0.00%
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        JKM
                                    </td>
                                    <td>
                                        0.30%
                                    </td>
                                    <td>
                                        0.00%
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        JHT 5.7%
                                    </td>
                                    <td>
                                        3.70%
                                    </td>
                                    <td>
                                        2.00%
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        JP 3%
                                    </td>
                                    <td>
                                        2.00%
                                    </td>
                                    <td>
                                        1.00%
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    
                        <h5>P. 16 C: Perpres Nomor 111 Tahun 2013</h5>

                        <table className="bpjs-kes">
                            <thead>
                                <tr>
                                    <th>BPJS KES</th>
                                    <th>PERUSAHAAN</th>
                                    <th>KARYAWAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        JKN 5%
                                    </td>
                                    <td>
                                        4%
                                    </td>
                                    <td>
                                        1%
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="perhitungan-bpjs">
                            <thead>
                                <tr>
                                    <th>Dasar Perhitungan BPJS</th>
                                    <th>Batas Terendah</th>
                                    <th>Batas Tertinggi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>JHT</td>
                                    <td>{initialValues.upah_minimum ? initialValues.upah_minimum : 'Masukkan Upah Minimum'}</td>
                                    <td>Sesuai Gaji Karyawan</td>
                                </tr>
                                <tr>
                                    <td>JKK</td>
                                    <td></td>
                                    <td>Sesuai Gaji Karyawan</td>
                                </tr>
                                <tr>
                                    <td>JKM</td>
                                    <td></td>
                                    <td>Sesuai Gaji Karyawan</td>
                                </tr>
                                <tr>
                                    <td>JP(Mar - Dec Th. 2020)</td>
                                    <td></td>
                                    <td>Rp. 8.939.700</td>
                                </tr>
                                <tr>
                                    <td>BPJS KES(Th. 2020)</td>
                                    <td>{initialValues.upah_minimum ? initialValues.upah_minimum : 'Masukkan Upah Minimum'}</td>
                                    <td>Rp. 12.000.000</td>
                                </tr>
                            </tbody>
                        </table>
                       
                   
                    </div>
                   
                   

            

            </Form>
                        
            )}
        </Formik>
        </ContainerSettingBPJS>
    )
}

export default SettingBPJS
