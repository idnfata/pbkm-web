import React from 'react'

const date = new Date();

let months = 12;
let monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
"Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

let monthOptions = [];
for(let i = 0; i < months; i++) {
    let m = date.getMonth();
    // monthOption += `<option value=${m}>${monthNames[m]}</option>`
    monthOptions.push({
        value: i, name: monthNames[i]
    })
    date.setMonth(date.getMonth() + 1);

}

const FilterMonth = ({handleChange, month, className = "", showTagP = false, type}) => {

    if(type == "next") {
        return <div>
             {/* show previous button if month > current month  */}
            {month >= new Date().getMonth() + 1 && <button onClick={() => handleChange(month - 1)}> prev </button>}
            
            <span>{ // render component from our components array
                monthNames[month]
            }</span>

       

            {/* hide next button if we are at the last month */}
            {month < monthNames.length - 1 && <button onClick={() => handleChange(month + 1)}>next</button>}
        </div>;
    }else {
        return (
            <>
                {showTagP == true && <p>Bulan : </p>}
                <select name="month" onChange={handleChange} value={month} className={className}>
                    {monthOptions.map(monthOption => (
                        <option key={monthOption.name} value={monthOption.value}>{monthOption.name}</option>
                    ))}
                </select>
            </>
        )
    }
    
}

export default FilterMonth
