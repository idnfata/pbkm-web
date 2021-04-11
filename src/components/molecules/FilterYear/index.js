import React from 'react'

const FilterYear = ({year, startYear, selectedYear, handleChange}) => {
    
    const options = [];

    for (let i = startYear; i <= year; i++) {
        options.push(<option value={i} key={i}>{i}</option>);
    }

    
    return (
        <>
            <p>Tahun : </p>
            <select className="select-year" value={selectedYear} onChange={handleChange}>
                {
                    options
                }
                
            </select>
        </>
    )
}

export default FilterYear
