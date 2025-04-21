"use client";

import { generateMonthlyReport } from "@/utils";
import { ReportRow } from "@/types";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import SkeletonRow from "@/components/skeleton";

export default function ReportPage() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 7) // Format: YYYY-MM
  );
  const [reportData, setReportData] = useState<ReportRow[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [year, month] = selectedDate.split("-").map(Number);

  const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const report = useMemo(() => {
    setIsLoading(true);
    try {
      const result = generateMonthlyReport(month, year);
      return result;
    } finally {
      setTimeout(() => setIsLoading(false), 100);
    }
  }, [month, year]);

  useEffect(() => {
    const res = axios.get(
      `http://localhost:8000/api/attendance/report?year=${year}&month=${month}`
    );
    setIsLoading(true);
    res
      .then((response) => {
        const data = response.data;
        setReportData(data.result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [year, month]);

  console.log(reportData);

  return (
    <div className="container mx-auto text-amber-400">
      <div className="mb-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Monthly Work Hours Report</h1>
          <input
            type="month"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-amber-50"
          />
          <button
            className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition duration-200"
            onClick={async () => {
              axios
                .get(
                  `http://localhost:8000/api/attendance/exel-report?year=${year}&month=${month}`,
                  {
                    responseType: "blob",
                  }
                )
                .then((response) => {
                  console.log(response);
                  const url = window.URL.createObjectURL(response.data);
                  const link = document.createElement("a");
                  document.body.appendChild(link);
                  link.href = url;
                  link.download = response.headers["content-disposition"]
                    .split(" ")[1]
                    .replace("filename=", "");
                  link.click();
                });
            }}
          >
            Export Report
          </button>
        </div>
      </div>

      <div className="overflow-auto max-h-[500px] w-full relative snap-mandatory">
        <table className="bg-white text-nowrap">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="snap-start ">
              <th className="px-10 py-2 left-0 bg-white text-left">
                Mã nhân viên
              </th>
              <th className="px-10 py-2 sticky left-0 bg-white text-left">
                Tên nhân viên
              </th>
              <th className="px-10 py-2 left-0 bg-white">Mã cửa hàng</th>

              <th className="px-10 py-2 text-left">Tên cửa hàng</th>
              {Object.keys(report?.days || {}).map((date) => (
                <th key={date} className=" px-10 py-2 text-left">
                  {new Date(date).getDate()}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={isLoading ? "opacity-50" : ""}>
            {isLoading
              ? Array(5)
                  .fill(0)
                  .map((_, index) => <SkeletonRow key={index} />)
              : reportData.map((data, ind) => {
                  return (
                    <tr
                      key={ind}
                      className="snap-start border-t-2 border-amber-100"
                    >
                      <td className="px-10 py-2 text-left">
                        {data.ma_nhan_vien}
                      </td>
                      <td className=" px-10 py-2 sticky left-0 bg-white text-left">
                        {data.ten_nhan_vien}
                      </td>
                      <td className="px-10 py-2 text-left bg-white">
                        {data.ma_cua_hang}
                      </td>
                      <td className="px-10 py-2 text-left">
                        {data.ten_cua_hang}
                      </td>

                      {(daysOfMonth.length > Object.keys(report.days).length ||
                        daysOfMonth.length ===
                          Object.keys(report.days).length) && (
                        <>
                          {daysOfMonth
                            .slice(
                              0,
                              daysOfMonth.length >
                                Object.keys(report.days).length
                                ? Object.keys(report.days).length
                                : daysOfMonth.length
                            )
                            .map((day) => {
                              const dayKey = `day_${day}`; // Construct the key like "day_1", "day_2"
                              const hours = data[dayKey]; // Access the value using the dynamic key

                              return (
                                <td
                                  key={`data-day-${day}`}
                                  className="px-4 py-2 text-center"
                                >
                                  {hours ?? "-"}
                                </td>
                              );
                            })}
                        </>
                      )}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
