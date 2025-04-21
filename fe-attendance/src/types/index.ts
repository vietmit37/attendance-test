export interface ReportRow {
  ma_nhan_vien: string;
  ten_nhan_vien: string;
  ma_cua_hang: string | null;
  ten_cua_hang: string | null;
  total_hours: string | null;
  [key: string]: string | null | number;
}
export interface MonthlyReportTable {
  reportData: ReportRow[];
}