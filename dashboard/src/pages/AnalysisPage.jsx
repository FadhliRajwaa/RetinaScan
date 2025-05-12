import Header from '../components/common/Header';
import Analysis from '../components/dashboard/Analysis';

function AnalysisPage({ toggleMobileMenu, isMobileMenuOpen }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Analisis AI" toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
      <div className="mt-6">
        <Analysis />
      </div>
    </div>
  );
}

export default AnalysisPage;