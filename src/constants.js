const MY_PROXY = `https://cors-anywhere.herokuapp.com/https://kecstock.jsi.com/api/`;



const TheDate=async()=>{
  var d = await new Date();
  let mydate=await d.getFullYear()

  return mydate
}

export default {MY_PROXY,TheDate}