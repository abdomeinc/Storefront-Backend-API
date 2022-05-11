export class SystemLogger {
  static log = (msg: string | number) => {
    const date: Date = new Date()
    const date_: string =
      date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
    const time_: string =
      date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    const dateTime: string = date_ + ' ' + time_
    console.log(`${dateTime}: ${msg}`)
  };
}
