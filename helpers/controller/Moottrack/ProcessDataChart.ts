import { IMentalHealth } from "@/@types/moodtrack/Imoodtrack";
import { getDayPosition, parseDateByMode } from "../date/GetDate";

export function ProcessDataChart(
  data: IMentalHealth[],
  startDate: string,
  endDate: string,
  mode: string
) {
  // console.clear();
  // console.log("=======================================");
  // console.log("data ", data);
  // console.log("startDate ", startDate);
  // console.log("endData ", endDate);
  // console.log("mode ", mode);
  // console.log("=======================================");
  const StartDay: Date = new Date(startDate);
  const EndDay: Date = new Date(endDate);
  if (mode === "Weekly") {
    const days = ["Sun", "Mon", "True", "Wed", "Thu", "Fri", "Sat"];
    let barData = days.map((label, index) => ({
      label,
      value: 0,
      frontColor: "#d1d5db",
    }));
    data &&
      data.map((item) => {
        let DayIndex: Date = new Date(item.date);
        if (DayIndex >= StartDay && DayIndex <= EndDay) {
          const dayPosition = getDayPosition(
            StartDay.toString(),
            DayIndex.toString()
          );
          barData[dayPosition - 1].value = item.stress_level;
          if (item.stress_level >= 5) {
            barData[dayPosition - 1].frontColor = "#d3ff00";
          } else {
            barData[dayPosition - 1].frontColor = "#ff2a2a";
          }
        }
      });
    return barData;
  } else if (mode === "Daily") {
    let days: string[] = [];
    let startDay = StartDay.getDate();
    let endDay = EndDay.getDate();
    for (let i = startDay; i <= endDay; i++) {
      days.push(i.toString());
    }
    let barData = days.map((label, index) => ({
      label,
      value: 0,
      frontColor: "#d1d5db",
    }));
    data &&
      data.map((item) => {
        let DayIndex: Date = new Date(item.date);
        if (DayIndex >= StartDay && DayIndex <= EndDay) {
          const dayPosition = getDayPosition(
            StartDay.toString(),
            DayIndex.toString()
          );
          barData[dayPosition - 1].value = item.stress_level;
          if (item.stress_level >= 5) {
            barData[dayPosition - 1].frontColor = "#d3ff00";
          } else {
            barData[dayPosition - 1].frontColor = "#ff2a2a";
          }
        }
      });
    return barData;
  } else if (mode == "Monthly") {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let newStartDate = new Date(StartDay);
    let barData = months.map((label, index) => ({
      label,
      value: 0,
      frontColor: "#d1d5db",
    }));
    for (let i = 0; i < 12; i++) {
      const newDate = new Date(newStartDate);
      newDate.setMonth(newDate.getMonth() + i);
      const newDateMonth =
        parseDateByMode(newDate.toString(), "getfullmonth")?.toString() ?? "";
      const resultData = data
        .filter((e) => e.date.includes(newDateMonth))
        .reduce((accumulator, value) => {
          return (accumulator + value.stress_level) % 10;
        }, 0);
      barData[i].value = resultData;
      if (resultData >= 5) {
        barData[i].frontColor = "#d3ff00";
      } else {
        barData[i].frontColor = "#ff2a2a";
      }
    }
    return barData;
  }else if(mode == "Yearly"){

  }
}
