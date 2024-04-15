import React, { useState } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";

function Form() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('B.tech');
  const [srNo, setSrNo] = useState(101);

  const handleName = (text)=> {
    setName(text);
    console.log('Name is ', text);
  }

  const handleCourse = ()=> {
    const drp = document.getElementById('course');
    setCourse(drp.value);
    console.log('Course value', drp.value);
  }

  const generatePDF = (e)=> {
    e.preventDefault();
    setSrNo(srNo+1);
    const refCode = srNo;
    console.log('Refcode ', refCode);
    
    const doc = new jsPDF();
    // define the columns we want and their titles
    const tableColumn = ["Year", "One time fee", "Tuition fee"];
    // define array of rows with static data
    const tableRows = [[2024,160,500],[2024,0,500]];
    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 70 });
    // ticket title. and margin-top + margin-left
    doc.text(`Ref-${refCode}`, 14, 20,);
    doc.text(`Name: ${name}`, 14, 30);
    doc.text(`Course: ${course}`, 14, 40);
    doc.text(`Date of offer: ${new Date().toLocaleString()}`, 14, 50);
    doc.text(`Fee struction:`, 14, 65);
    // we define the name of our PDF file.
    doc.save(`${name}_${course}.pdf`);
  }

  return (
    <form>
        <fieldset>
            <legend className='fw-bold'> {'Generate PDF'} </legend>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold"> {'Name:'} </label>
                <input type="text" id="name" className="form-control" placeholder="Enter name" onChange={(e)=> handleName(e.target.value)} value={name} />
            </div>
            <div className="mb-3">
                <label htmlFor="course" className="form-label fw-bold"> {'Course:'} </label>
                <select id="course" className="form-select" onChange={handleCourse} value={course}>
                    <option value={'B.tech'}>{'B.tech'}</option>
                    <option value={'M.tech'}>{'M.tech'}</option>
                </select>
            </div>
            <div id='btns'>
                <button type="submit" className="btn btn-primary" onClick={(e)=> generatePDF(e)}>Submit</button>
                <button type="submit" className="btn btn-success ms-4" onClick={(e)=> generatePDF(e)}>Generate PDF</button>
            </div>
        </fieldset>
    </form>
  )
}

export default Form;
