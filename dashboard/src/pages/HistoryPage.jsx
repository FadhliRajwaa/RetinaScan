import Header from '../components/common/Header';
import History from '../components/dashboard/History';

function HistoryPage({ toggleMobileMenu, isMobileMenuOpen }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Riwayat Analisis" toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
      <div className="mt-6">
        <History />
      </div>
    </div>
  );
}

export default HistoryPage;