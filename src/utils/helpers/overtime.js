// function untuk menghitung upah lembur sesuai peraturan pemerintah

const overtimePaid = (overtime_day_type, total_hours, basic_salary, work_day_in_week) => {
    if(total_hours > 0){

        //check overtime_day_type, 
        if(overtime_day_type == 1){ //lembur hari biasa
    
            //1 jam pertama dikal 1.5
            //jam kedua dan seterusnya dikali 2
            
            const overtime_index_rate = (total_hours > 1) ? (1 * 1.5) + ((total_hours - 1) * 2) : 1 * 1.5;
            return overtime_index_rate * 1/173 * basic_salary;

            
            
        } else { //lembur di hari libur
            //check jadwal kerjanya 5 hari atau 6 hari
            if(work_day_in_week > 5) {
                //8 jam pertama dikali 2
                //jam ke-9 dikali 3
                //jam ke-10 - ke-11 dikali 4
                const overtime_index_rate = ((total_hours > 8) > 0) ? (8 * 2) + ( ((total_hours - 8) > 0) && 9 * 3) + ((total_hours - 9 > 0) && (total_hours - 9) * 4) : total_hours * 2;
                return overtime_index_rate * 1/173 * basic_salary;
                
                
            }else { // 6 hari dalam seminggu
                //cek apakah itu hari jumat?     
                //how to check date is friday javascript
                
            }
        

        }

    }else {
        return 0;
    }
    
}
