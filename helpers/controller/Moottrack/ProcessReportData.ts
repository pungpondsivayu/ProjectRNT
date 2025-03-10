export const analyzeStressTrend = (
  mode: "Daily" | "Weekly" | "Monthly",
  chartData: any[]
) => {
  if (!chartData || chartData.length === 0) {
    return { title: "No Data", message: "ไม่มีข้อมูลสำหรับการวิเคราะห์" };
  }
  
  let title: string = "";
  if(mode == "Daily"){
    title = "รายวัน"
  }else if(mode = "Weekly"){
    title = "รายสัปดา"
  }else if(mode = "Monthly"){
    title = "รายเดือน"
  }

  // คำนวณค่าเฉลี่ย
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const average = total / chartData.length;

  // หาค่าต่ำสุดและค่าสูงสุด
  const minValue = Math.min(...chartData.map((item) => item.value));
  const maxValue = Math.max(...chartData.map((item) => item.value));

  let label = [];  
  // คำนวณแนวโน้มขั้นสูง
  const trend = calculateAdvancedTrend(chartData);

  // ให้คำแนะนำตามแนวโน้ม
  let recommendations: string[] = [];
  if (trend === "Rapid Increase") {
    recommendations.push(
      "ความเครียดเพิ่มขึ้นอย่างรวดเร็ว ควรพักผ่อนและหาวิธีลดความเครียดทันที"
    );
  } else if (trend === "Gradual Increase") {
    recommendations.push(
      "ระดับความเครียดเพิ่มขึ้นเรื่อย ๆ ลองฝึกการหายใจลึก ๆ หรือทำกิจกรรมที่ช่วยลดความเครียด"
    );
  } else if (trend === "Stable") {
    recommendations.push(
      "ระดับความเครียดของคุณคงที่ ควรลองทำกิจกรรมใหม่ ๆ เพื่อช่วยเพิ่มความผ่อนคลาย"
    );
  } else if (trend === "Gradual Decrease") {
    recommendations.push(
      "ความเครียดลดลง ควรรักษาพฤติกรรมที่ดีและหากิจกรรมผ่อนคลายต่อเนื่อง"
    );
  } else if (trend === "Rapid Decrease") {
    recommendations.push(
      "ความเครียดลดลงเร็ว ควรสังเกตว่ามีการเปลี่ยนแปลงอะไรที่ส่งผลดีและรักษามันไว้"
    );
  }

  // สร้างรายงานผล
  const report = {
    title: `รายงานความเครียด ${title}`,
    summary: {
      averageStress: average.toFixed(2),
      minStress: minValue,
      maxStress: maxValue,
      trend,
    },
    recommendations,
  };

  return report;
};

// ฟังก์ชันคำนวณแนวโน้ม
const calculateAdvancedTrend = (data: { value: number }[]) => {
  let increasing = 0;
  let decreasing = 0;
  let rapidIncrease = 0;
  let rapidDecrease = 0;
  for (let i = 0; i < data.length; i++) {
    if(i != 0){
        const change = data[i].value - data[i - 1].value;
        if (change > 2) rapidIncrease++;
        else if (change < -2) rapidDecrease++;
        else if (change > 0) increasing++;
        else if (change < 0) decreasing++;
    }
}
  if (rapidIncrease > increasing && rapidIncrease > decreasing)
    return "Rapid Increase";
  if (increasing > decreasing) return "Gradual Increase";
  if (rapidDecrease > decreasing && rapidDecrease > increasing)
    return "Rapid Decrease";
  if (decreasing > increasing) return "Gradual Decrease";
  return "Stable";
};
