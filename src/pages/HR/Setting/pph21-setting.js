import React, { useEffect, useState } from 'react'
import { Col, FormControl, Row } from '../../../components'
import { ContainerSettingPPh21 } from './setting.elements'
import { Form, Formik } from 'formik'
import * as Yup from "yup";
import API from '../../../config/api'
import { getStyle } from '../../../utils/helpers/errorMessage';
import NumberFormat from 'react-number-format';


const schemaValidationKPP = Yup.object().shape({

    kpp_name: Yup.string().required('Required'),
    kpp_address: Yup.string().required('Required'),
    npwp_company: Yup.string().required('Required'),
    npwp_responsible_person: Yup.string().required('Required'),
    npwp_responsible_person: Yup.string().required('Required'),
    name_responsible_person: Yup.string().required('Required'),
    status_responsible_person: Yup.string().required('Required'),
    
    
  
});

const schemaValidationCalcMethod = Yup.object().shape({

    calc_method_pph21_empl: Yup.string().required('Required'),
    calc_method_effective_date: Yup.string().required('Required'),
    midyear_ptkp_change: Yup.string().required('Required'),
    format_penomoran_1721_i: Yup.string().required('Required')
    
    
  
});

const setupPPh21KPPFields = [
    { 
        control: 'input',
        type: 'text',
        label: 'Nama KPP',
        name: 'kpp_name'
    },
    { 
        control: 'input',
        type: 'text',
        label: 'Alamat KPP',
        name: 'kpp_address'
    },
    { 
        control: 'input',
        type: 'text',
        label: 'NPWP Perusahaan',
        name: 'npwp_company'
    },
    { 
        control: 'input',
        type: 'text',
        label: 'NPWP Penanggung Jawab',
        name: 'npwp_responsible_person'
    },
    { 
        control: 'input',
        type: 'text',
        label: 'Nama Penanggung Jawab',
        name: 'name_responsible_person'
    },
    {   
        control: 'radio',
        options:  [
                    { key: 'Pemotong Pajak', value: 'Pemotong Pajak' },
                    { key: 'Kuasa', value: 'Kuasa' },
                    
                ],
        type: 'radio',
        label: 'Status Penanggung Jawab',
        name: 'status_responsible_person'
    },
    { 
        control: 'input',
        type: 'text',
        label: 'Jabatan Penanggung Jawab',
        name: 'title_responsible_person'
    },
];

const setupPPh21Fields = [
    {   
        control: 'select',
        options:  [
                { key: '-- Pilih --', value: '' },
                { key: 'Gross', value: 1 },
                { key: 'Net', value: 2 },
                { key: 'Gross Up', value: 3 },
                
            ],
        label: 'Metode Penghitungan',
        name: 'calc_method_pph21_empl'
    },
    {   
        control: 'input',
        label: 'Berlaku Mulai Tanggal',
        name: 'calc_method_effective_date',
        type: 'date'
    },
    {   
        control: 'radio',
        options:  [
                    { key: 'Boleh', value: "1" },
                    { key: 'Tidak Boleh', value: "0" },
                    
                ],
        type: 'radio',
        label: 'Perubahan PTKP Karyawan di Pertengahan Tahun',
        name: 'midyear_ptkp_change'
    },
    {   
        control: 'select',
        options:  [
                { key: '-- Pilih --', value: '' },
                { key: 'Selalu Mulai Dari 1', value: 1 },
                { key: 'Melanjutkan Nomor Sebelumnya', value: 2 },

                
            ],
        label: 'Format Penomoran Form 1721-I',
        name: 'format_penomoran_1721_i'
    },
];
  

const SettingPPh21 = ({initialValuesKPP, initialValuesCalcMethod, PPh21KPPAddOrEdit, PPh21AddOrEdit, token, reloadPage, isChildDone}) => {

    const [biayaJabatan, setBiayaJabatan] = useState({});
    const [PTKP, setPTKP] = useState([]);
    const [tarif, setTarif] = useState([]);

    const handleSubmitKPP = (values, { resetForm, setSubmitting }) => {
        // console.log("handleSubmit values", values);
        if(PPh21KPPAddOrEdit == 'edit'){
            // console.log('api edit kpp');
            API.editSetupPPh21KPP(token, values).then(res => {
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
            API.addSetupPPh21KPP(token, values).then(res => {
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
        }
        resetForm();
        setSubmitting(false);
        reloadPage();
    }

    const handleSubmitCalcMethod = (values, { resetForm, setSubmitting }) => {
        // console.log("handleSubmit values", values);
        if(PPh21AddOrEdit == 'edit'){
            // console.log('api edit calc method');
            API.editSetupPPh21(token, values).then(res => {
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
            // console.log('api add calc method');
            API.addSetupPPh21(token, values).then(res => {
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
        }
        resetForm();
        setSubmitting(false);
        reloadPage();

    }

    useEffect(() => {
        API.getPTKPBiayaJabatanTarifPPh21(token).then(res => {
            // console.log(res.data)
            setBiayaJabatan(res.data.biaya_jabatan);
            setPTKP(res.data.ptkp);
            setTarif(res.data.tarif);
        })
    }, []);

    return (
 
         <ContainerSettingPPh21>
            {/* <h3>Sesuaikan Pengaturan PPh 21</h3> */}
            {/* <hr /> */}
            <Row>
            <Col>
                    <h3 className="border-left">KPP</h3>
                    
                    <Formik
                        enableReinitialize
                        initialValues={initialValuesKPP}
                        onSubmit={(values, props) => handleSubmitKPP(values, props)}
                        validationSchema={() => schemaValidationKPP}
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
                            {/* fields kpp */}
                            {
                                
                                setupPPh21KPPFields.map(field => {
                                    return (
                                        <FormControl key={field.name}
                                            control={field.control}
                                            type={field.type}
                                            label={field.label}
                                            name={field.name}
                                            style={getStyle(errors, touched, field.name)}
                                            options={field.options}
                                            callback={field.callback}
                                            {...field}

                                            />
                                    )
                                })
                            }
                            <button type="submit" className="save-button" disabled={isSubmitting}>
                                Simpan
                            </button>
                            <br />
                            <br />
                            <br />
                            <br />
                            <div style={{width: "80%", margin: '0 auto'}}>
                                
                                
                                <h3>Tarif</h3>
                                <h5>Dasar Hukum : Tarif Pasal 17 ayat (1) huruf a UU PPh</h5>
                                <br />
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No. </th>
                                            <th>Lapisan Penghasilan</th>
                                            <th>NPWP</th>
                                            <th>Non NPWP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tarif.map((tarif, index) => (
                                            <tr key={tarif.ket}>
                                                <td>{1+index}</td>                           
                                                <td>
                                                    {tarif.ket}

                                                </td>
                                                <td>
                                                    {tarif.npwp}%
                                                </td>
                                                <td>
                                                    {tarif.non_npwp}%
                                                </td>
                                            </tr>
                                        ))}
                                       
                                    
                                    </tbody>
                                </table>
                            </div>
                        </Form>
                        
                       )}
                       
                    </Formik>
                    

                </Col>
                <Col>
                    <h3 className="border-left">Metode Penghitungan</h3>
                    
                    <Formik
                        enableReinitialize
                        initialValues={initialValuesCalcMethod}
                        onSubmit={(values, props) => handleSubmitCalcMethod(values, props)}
                        validationSchema={() => schemaValidationCalcMethod}
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
                            {/* fields metode perhitungan */}
                            {
                                
                                setupPPh21Fields.map(field => {
                                    return (
                                        <FormControl key={field.name}
                                            control={field.control}
                                            type={field.type}
                                            label={field.label}
                                            name={field.name}
                                            style={getStyle(errors, touched, field.name)}
                                            options={field.options}
                                            callback={field.callback}
                                            {...field}

                                            />
                                    )
                                })
                            }
                            <button type="submit" className="save-button" disabled={isSubmitting}>
                                Simpan
                            </button>
                            <br />
                            <br />
                            <br />
                            <br />
                            <div>
                                <h3>Pendapatan Tidak Kena Pajak (PTKP)</h3>
                                <h5>Dasar Hukum : Peraturan Direktur Jendral Pajak No. Per-16/PJ/2016</h5>
                                <br />

                                <table>
                                    <thead>
                                        <tr>
                                            <th>No. </th>
                                            <th>Status Perkawinan</th>
                                            <th>Code</th>
                                            <th>PTKP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {PTKP.map((PTKP, index) => (
                                            <tr key={PTKP.code}>
                                                <td>{1+index}</td>                           
                                                <td>
                                                    {PTKP.name}

                                                </td>
                                                <td>
                                                    {PTKP.code}
                                                </td>
                                                <td>
                                                    
                                                    <NumberFormat style={{marginLeft: 'auto'}} value={PTKP.ptkp} displayType={'text'} thousandSeparator={'.'} decimalSeparator={false}  prefix={'Rp. '} />
                                                </td>
                                                
                                            </tr>
                                        ))}
                                       
                                     
                                    </tbody>
                                </table>
                                <br />
                                <h3>Biaya Jabatan</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Persentase</th>
                                            <th>Max. Biaya Jabatan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            
                                            <td>
                                                {biayaJabatan.persentase}%

                                            </td>
                                            <td>
                                                
                                                <NumberFormat style={{marginLeft: 'auto'}} value={biayaJabatan.besaran_maksimal} displayType={'text'} thousandSeparator={'.'} decimalSeparator={false}  prefix={'Rp. '} />
                                            </td>
                                        </tr>
                                    
                                    </tbody>
                                </table>
                            </div>
                           
                            

                        </Form>
                        
                        )}
                    </Formik>
                </Col>
               
            </Row>
        
        </ContainerSettingPPh21>
        
    )
}

export default SettingPPh21
