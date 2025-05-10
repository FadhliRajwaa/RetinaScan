import Header from '../components/common/Header';
import Analysis from '../components/dashboard/Analysis';

function AnalysisPage() {
  return (
    <div className="p-6">
      <Header title="Analisis AI" />
      <div className="mt-6">
        <Analysis />
      </div>
    </div>
  );
}

export default AnalysisPage;