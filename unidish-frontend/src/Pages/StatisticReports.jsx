import { useEffect, useState } from "react";
import {
  getTop3MostActiveUsersReport,
  getWeeklyCommentReport,
  getWeeklyReviewReport,
} from "../Axios/APICalls";

const StatisticReports = () => {
  const [weeklyReviewReport, setWeeklyReviewReport] = useState(null);
  const [weeklyCommentReport, setWeeklyCommentReport] = useState(null);
  const [top3MostActiveUsersReport, setTop3MostActiveUsersReport] =
    useState(null);
  useEffect(() => {
    const fetchStatisticalReports = async () => {
      try {
        const reviewReport = await getWeeklyReviewReport();
        const commentReport = await getWeeklyCommentReport();
        const top3UserReport = await getTop3MostActiveUsersReport();
        setWeeklyReviewReport(reviewReport);
        setWeeklyCommentReport(commentReport);
        setTop3MostActiveUsersReport(top3UserReport);
      } catch (error) {
        throw error;
      }
    };
    fetchStatisticalReports();
  }, []);
  return (
    <div>
      {weeklyReviewReport ? (
        <img src={weeklyReviewReport} alt="Review Report" />
      ) : (
        <p>Loading graph...</p>
      )}
      {weeklyCommentReport ? (
        <img src={weeklyCommentReport} alt="Comment Report" />
      ) : (
        <p>Loading graph...</p>
      )}
      {top3MostActiveUsersReport ? (
        <img src={top3MostActiveUsersReport} alt="Comment Report" />
      ) : (
        <p>Loading graph...</p>
      )}
    </div>
  );
};

export default StatisticReports;
