import { IMentalHealth } from "@/@types/moodtrack/Imoodtrack";
import { getDayPosition, parseDateByMode } from "../date/GetDate";
import { MoodData } from "@/app/moodtrack/MoodData";
import { array, number } from "yup";

interface IPiechart {
  value : number,
  color : string,
  focused?: boolean,
  mood?:string
}


//process stress chart
export function ProcessStressChart(
  data: IMentalHealth[],
  startDate: string,
  endDate: string,
  mode: string
) {
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
            barData[dayPosition - 1].frontColor = "#41cdff";
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
            barData[dayPosition - 1].frontColor = "#41cdff";
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
        barData[i].frontColor = "#41cdff";
      }
    }
    return barData;
  }
}

//process sleep chart
export function ProcessSleepChart(
  data: IMentalHealth[],
  startDate: string,
  endDate: string,
  mode: string
) {
  const StartDay: Date = new Date(startDate);
  const EndDay: Date = new Date(endDate);
  if (mode === "Weekly") {
    const days = ["Sun", "Mon", "True", "Wed", "Thu", "Fri", "Sat"];
    let barData = days.map((label, index) => ({
      label,
      value: 0,
      dataPointText: 0,
    }));
    data &&
      data.map((item) => {
        let DayIndex: Date = new Date(item.date);
        if (DayIndex >= StartDay && DayIndex <= EndDay) {
          const dayPosition = getDayPosition(
            StartDay.toString(),
            DayIndex.toString()
          );
          barData[dayPosition - 1].value = item.sleep_hours;
          barData[dayPosition - 1].dataPointText = item.sleep_hours;
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
      dataPointText: 0,
    }));
    data &&
      data.map((item) => {
        let DayIndex: Date = new Date(item.date);
        if (DayIndex >= StartDay && DayIndex <= EndDay) {
          const dayPosition = getDayPosition(
            StartDay.toString(),
            DayIndex.toString()
          );
          barData[dayPosition - 1].value = item.sleep_hours;
          barData[dayPosition - 1].dataPointText = item.sleep_hours;
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
      dataPointText: 0,
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
      barData[i].dataPointText = resultData;
    }
    return barData;
  }
}

//process mood chart
export function ProcessMoodChart(
  data: IMentalHealth[],
  startDate: string,
  endDate: string,
) {
  const StartDay: Date = new Date(startDate);
  const EndDay: Date = new Date(endDate);
  let FilteredData = data
    ? data.filter((item) => {
        const DayIndex = new Date(item.date);
        return DayIndex >= StartDay && DayIndex <= EndDay;
      })
    : [];
  const Mood = MoodData.map((e) => {
    return {
      mood: e.name,
      color: e.RefColor,
    };
  });
  let barData: IPiechart[] = Mood.map((item, index) => {
    const MoodCount =
      FilteredData.filter((e) => e.mood == item.mood).length ?? 0;
    const Count = FilteredData.length ?? 0;
    const Value =
      ((MoodCount / Count) * 100).toString() == "NaN"
        ? 0
        : (MoodCount / Count) * 100;
    return {
      value: Value,
      color: item.color,
      mood: item.mood,
    };
  });
  const maxValue = Math.max(...barData.map((item) => item.value));
  const result = barData.map((item) => ({
    ...item,
    focused: item.value === maxValue,
    mood: item.mood,
  }));
  const moodWithMaxValue = result.find((item) => item.value === maxValue)?.mood;
  return {
    Data: result,
    MaxValueLabel: `${moodWithMaxValue}`,
    MaxValue: parseInt(maxValue.toFixed(0)),
  };
}
