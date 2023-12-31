import React,{ useState } from "react";

const UseFetcher = () => {
  const [error, setError] = useState<null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  // const [responseData, setResponseData] = useState([])

  type examtype = {
      Id : number,
      Type : string,
      Marks : number,
      Amount : number,
      ExamName : string
  }
  type bidtype = {
    BId : number,
    Condition:string,
    BDate:string,
    BType:string,
    Duration : number,
    BAmount : number
  }
  type bodyType = examtype|bidtype|null
  const RDH = async(requestConfig:{url : string,met : string,body : bodyType,head: any|{}},applydata:any)=>{
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
  }
      
      // .catch((err) => setError(err))
    return {loader,error,RDH};
  }
  
export default UseFetcher;