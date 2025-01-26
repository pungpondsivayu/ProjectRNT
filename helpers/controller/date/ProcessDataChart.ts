import { IMentalHealth } from "@/@types/moodtrack/Imoodtrack";

export function processWeeklyData(
  data: IMentalHealth[],
  startDate: string,
  endData: string
) {
  const StartDate = new Date(startDate);
  const EndDate = new Date(endData);
  const days = ["Sun", "Mon", "True", "Wed", "Thu", "Fri", "Sat"];
  let index = 0;

  let barData = days.map((label, index) => ({
    label,
    value: 0,
    frontColor : "#d1d5db",
  }));

  if (data) {
    data.map((item) => {
      let dateIndex: Date = new Date(item.date);
      if(dateIndex >= StartDate && dateIndex <= EndDate){
        barData[index].value = item.stress_level
        if(item.stress_level >= 5){
            barData[index].frontColor = "#d3ff00"
        }else{
            barData[index].frontColor = "#ff2a2a"
        }
        index++;
      }
    });
  }

  return barData;
}
