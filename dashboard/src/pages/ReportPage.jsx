import Header from '../components/common/Header';
import Report from '../components/dashboard/Report';

function ReportPage() {
  return (
    <div className="p-6">
      <Header title="Laporan Hasil" />
      <div className="mt-6">
        <Report />
      </div>
    </div>
  );
}

export default ReportPage;