import Header from '../components/common/Header';
import Report from '../components/dashboard/Report';

function ReportPage({ toggleMobileMenu, isMobileMenuOpen }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Laporan Hasil" toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
      <div className="mt-6">
        <Report />
      </div>
    </div>
  );
}

export default ReportPage;