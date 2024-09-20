const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getCurrentDate = () =>{
    const date = new Date();
    const day =  date.getDate();
    const month = monthNames[date.getMonth() + 1];
    const year = date.getFullYear();

    return  {day, month, year};
}