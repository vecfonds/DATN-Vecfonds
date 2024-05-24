import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { getChartProduct, tongQuanSelector } from "../../store/features/tongQuanSlice";
import { Select } from "antd";
import { selectTime } from "../../utils/func";

const data = [
  { name: "Áo", revenue: 1 },
  { name: "Dép", revenue: 1 },
  { name: "Bút", revenue: 1 },
  { name: "Balo", revenue: 1 },
  { name: "Giầy Dây Conse", revenue: 10 },
  { name: "Laci Hk1", revenue: 1 },
  { name: "Lưới Conse", revenue: 1 },
  { name: "Sandal Chaco", revenue: 1 },
  { name: "Sandal Teva", revenue: 1 },
  { name: "Dép Laci", revenue: 1 },
];

const ChartSanpham = () => {
  const dispatch = useDispatch();

  const {
    isSuccessGetChartRevenue,
    isSuccessGetChartProduct,
    chartRevenueData,
    chartProductData,
  } = useSelector(tongQuanSelector);

  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    if (chartProductData) {
      // chartProductData?.forEach(item => {
      //   if (item.key < 6) {
      //     data[item.key - 1]["Doanh thu"] = item["Doanh thu"];
      //   }
      // })
      for (let i = 0; i < 12; ++i) {
        if (i < 6) {
          chartProductData?.forEach(item => {
            if (item.key - 1 === i) {
              data[i]["Doanh thu"] = item["Doanh thu"];
            }
          })
        }
        else {
          chartProductData?.forEach(item => {
            if (item.key - 1 === i) {
              data[i]["Doanh thu"] = 0;
            }
          })
        }
      }

      setDataProduct(data);
    }
  }, [chartProductData]);

  useEffect(() => {
    dispatch(getChartProduct());

    // const dataConvert = {
    //   "startDate": "2020-01-01",
    //   "endDate": "2025-01-01",
    //   "name": "xxx",
    //   "description": "xxx",
    //   "customerIds": []
    // }

    // dispatch(postReportTHCNRaw({ values: dataConvert }));
  }, []);


  const handleChange = (value) => {

    const timeRange = selectTime(value);

    const dataConvert = {
      // "startDate": formatDate(values.rangePicker[0].$d),
      // "endDate": formatDate(values.rangePicker[1].$d),
      // "startDate": "2020-01-01",
      // "endDate": "2025-01-01",
      ...timeRange,
      "name": "xxx",
      "description": "xxx",
      "salespersonIds": []
    }

    console.log("dataConvert", dataConvert)
    // dispatch(postReportDTBHRaw({ values: dataConvert }));


  };

  return (
    <div>
      <p className="font-bold text-xl mt-5 ml-10">Biều đồ top 10 sản phẩm bán chạy nhất</p>
      <Select
        defaultValue={'thisMonth'}
        style={{
          width: 120,
        }}
        className="bg-[#FFF6D8]  ml-10"
        onChange={handleChange}
        options={[
          {
            value: 'thisWeek',
            label: 'Tuần này',
          },
          {
            value: 'lastWeek',
            label: 'Tuần trước',
          },
          {
            value: 'thisMonth',
            label: 'Tháng này',
          },
          {
            value: 'lastMonth',
            label: 'Tháng trước',
          },
          {
            value: 'thisQuarter',
            label: 'Quý này',
          },
          {
            value: 'lastQuarter',
            label: 'Quý trước',
          },
          {
            value: 'Q1',
            label: 'Quý 1',
          },
          {
            value: 'Q2',
            label: 'Quý 2',
          },
          {
            value: 'Q3',
            label: 'Quý 3',
          },
          {
            value: 'Q4',
            label: 'Quý 4',
          },
          {
            value: 'thisYear',
            label: 'Năm này',
          },
          {
            value: 'lastYear',
            label: 'Năm trước',
          },
        ]}
      />
      <ResponsiveContainer width={750} height={400} className={"border border-gray-300 shadow-xl rounded-lg ml-10"}>
        <BarChart
          width={750}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#ff8042">
            <LabelList dataKey="revenue" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSanpham;
