import axios from "axios";

const baseUrl = "http://localhost:8080/api"

const jwtToken = eliminarComillas(localStorage.getItem("jwt"));

const config = {
    headers: { Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'multipart/form-data' },
   
  };

 
function eliminarComillas(cadena) {
    return cadena.replace(/"/g, "");
  }




export async function getPublications (){
    try{
        const response = await axios({
            url: `${baseUrl}/publication`,
            method: "GET",
        })
    } catch (e) {
        console.log(e);
    }
}

export async function postPublication (publicatonData){
    try{
        const response = await axios({
            url: `${baseUrl}/publication/create`,
            method: "POST",
            config, 
            data: publicatonData,
        })
    } catch (e) {
        console.log(e);
    }
}