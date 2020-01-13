import React,{useContext,useEffect, useState} from 'react'
import { createContext } from 'react'
import html2canvas from "html2canvas";
const pdfConverter = require("jspdf");

export const SaveToPdfContext =createContext();

const SaveToPdfContextProvider=(props)=>{

    const saveToPdf=(node)=>{
      let myClass = window
      .document
      .getElementsByClassName("theGraph");
     
      let myIndex
        
        //var className = node.className;
        var num = 0;
        for (var i = 0; i < myClass.length; i++) {
          if (myClass[i] === node) {
            myIndex=num
            return num;
           
          }
          num++;
        }
        myIndex=num-1
        //alert(myIndex)
        //return -1;
      

     

      let input = window
      .document
      .getElementsByClassName("theGraph")[myIndex];

       
         
            html2canvas(input).then(canvas => {
              const imgData = canvas.toDataURL("image/png");
              const pdf = new pdfConverter("l", "pt");
              pdf.addImage(imgData, "JPEG", 15, 110, 800, 250);
              pdf.save("chart.pdf");
            });
        
    }

    return(
        <SaveToPdfContext.Provider value={{saveToPdf}}>
            {props.children}

        </SaveToPdfContext.Provider>
    )

}

export default SaveToPdfContextProvider;