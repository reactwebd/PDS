import {  useCallback, useState } from "react";

const UseFetcher = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  // const [responseData, setResponseData] = useState([])

  type examtype = {
      Id : number,
      Type : string,
      Marks : number,
      Amount : number,
      ExamName : string
  }
  type bidtype = {
    Id : number,
    Condition:string,
    Date:string,
    Type:string,
    Duration : number,
    Amount : number
  }
  type bodyType = examtype|bidtype|null
  const RDH = useCallback(async(requestConfig:{url : string,met : string,body : bodyType,head: any|null},applydata:any)=>{
    try{
      setLoader(true) 
      const response= await fetch(requestConfig.url,{
        method : requestConfig.met,
        body : requestConfig.body !== null ? JSON.stringify(requestConfig.body) : null ,
        headers : requestConfig.head !== undefined ? requestConfig.head : {}
      })
      if (!response.ok) {
        throw new Error('Request failed!');
      }
      let data = await response.json()
     applydata(data)
    }
    catch(error:any){
      setError(error.message)
      setLoader(false)
    }
    setLoader(false)
  },[])
      
      // .catch((err) => setError(err))
    return {loader,error,RDH};
  }
  
export default UseFetcher;