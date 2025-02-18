export function parseDateByMode(dateString: string, mode: "getdate" | "getmonth" | "getyear" | "gethours" | "getminutes" | "getseconds" | "getmilliseconds" | "getday" | "toisostring" | "tolocalestring" | "getfullyear" | "getfullmonth" | "getfulldate" | "getstartofweek" | "getendofweek" | "getstartofmonth" | "getendofmonth" | "getstartofyear" | "getendofyear"): string | number | null {
  // Parse the input date string into a Date object
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  switch (mode.toLowerCase()) {
    case "getdate":
      return date.getDate(); // Returns the day of the month

    case "getmonth":
      return date.getMonth() + 1; // Returns the month (0-indexed, so add 1)

    case "getyear":
      return date.getFullYear(); // Returns the full year

    case "gethours":
      return date.getHours(); // Returns the hours

    case "getminutes":
      return date.getMinutes(); // Returns the minutes

    case "getseconds":
      return date.getSeconds(); // Returns the seconds

    case "getmilliseconds":
      return date.getMilliseconds(); // Returns the milliseconds

    case "getday":
      return date.getDay(); // Returns the day of the week (0 = Sunday, 6 = Saturday)

    case "toisostring":
      return date.toISOString(); // Returns the ISO string of the date

    case "tolocalestring":
      return date.toLocaleString(); // Returns a localized string of the date

    case "getfullyear":
      return `${date.getFullYear()}`; // Returns the year as a string

    case "getfullmonth":
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`; // Returns "YYYY-MM"

    case "getfulldate":
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`; // Returns "YYYY-MM-DD"

    case "getstartofweek": {
      const startOfWeek = new Date(date);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday as the first day of the week
      startOfWeek.setDate(diff);
      return `${startOfWeek.getFullYear()}-${(startOfWeek.getMonth() + 1).toString().padStart(2, '0')}-${startOfWeek.getDate().toString().padStart(2, '0')}`; // Returns "YYYY-MM-DD"
    }

    case "getendofweek": {
      const endOfWeek = new Date(date);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? 0 : 7); // Adjust to Sunday as the last day of the week
      endOfWeek.setDate(diff);
      return `${endOfWeek.getFullYear()}-${(endOfWeek.getMonth() + 1).toString().padStart(2, '0')}-${endOfWeek.getDate().toString().padStart(2, '0')}`; // Returns "YYYY-MM-DD"
    }

    case "getstartofmonth": {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      return `${startOfMonth.getFullYear()}-${(startOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${startOfMonth.getDate().toString().padStart(2, '0')}`; // Returns "YYYY-MM-DD"
    }

    case "getendofmonth": {
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return `${endOfMonth.getFullYear()}-${(endOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${endOfMonth.getDate().toString().padStart(2, '0')}`; // Returns "YYYY-MM-DD"
    }

    case "getstartofyear": {
      return `${date.getFullYear()}-01-01`; // Returns "YYYY-01-01"
    }

    case "getendofyear": {
      return `${date.getFullYear()}-12-31`; // Returns "YYYY-12-31"
    }

    default:
      return null; // Return null if the mode is not recognized
  }
}


export function getDayPosition(startDateStr: string, targetDateStr: string): number {
  // แปลงสตริงวันที่เป็น Date object
  const startDate = new Date(startDateStr);
  const targetDate = new Date(targetDateStr);

  // ตรวจสอบว่า targetDate อยู่ในช่วงของสัปดาห์หรือไม่
  if (targetDate < startDate) {
      throw new Error("Target date must be on or after the start date.");
  }

  // คำนวณลำดับของวัน
  const dayPosition = (targetDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

  return Math.floor(dayPosition); // ปัดค่าทศนิยมทิ้ง
}