interface logsMessageType {
    type: string;
    message: string;
    time: Date;
}

const logsMessage: logsMessageType[] = [];

export default function logEvent(type: string, message:string, time: Date){
    console.log(`${type} ${message} ${time}`)
    console.log(logsMessage)

    logsMessage.push({type, message, time})
}