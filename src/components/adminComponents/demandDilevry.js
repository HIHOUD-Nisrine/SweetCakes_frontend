import React, { useEffect, useState } from 'react';
import { Input, Select } from '../../basicComponents';
import { DelivryDemandsTable } from '.';

const DemandDilevry = () => {
  
        const [filters, setFilters] = useState({
            "date_livraison": "",
            "statut": "non traité",
        })
        const [showDetails, setShowDetails] = useState(false)
        const options = ["traité", "non traité"]
    
        useEffect(()=>{
            console.log("date_livraison ====>"+filters.date_livraison)
            },[filters])
    
    
        return (
            <div style={{
                width: "100%",
                height: "100vh",
    
            }}>
                <div style={{
                    marginLeft: "10%",
                    width : "600px",
                    display : 'flex',
                    justifyContent : 'space-around'
                    
                }}>
                    <Select label="Statut" options={options} width="250px" name="statut" data={filters} setData={setFilters} />
                    <Input label="Date de livraison" width="250px" type = "date" name="date_livraison" data={filters} setData={setFilters} />
                </div>
                <DelivryDemandsTable statut={filters.statut} date_livraison = {filters.date_livraison} />
    
    
            </div>
        )
    
}

export default DemandDilevry;
