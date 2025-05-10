import Header from '../components/common/Header';
import History from '../components/dashboard/History';

function HistoryPage() {
  return (
    <div className="p-6">
      <Header title="Riwayat Analisis" />
      <div className="mt-6">
        <History />
      </div>
    </div>
  );
}

export default HistoryPage;