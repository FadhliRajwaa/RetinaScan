import Header from '../components/common/Header';
import ProfileForm from '../components/dashboard/ProfileForm';

function ProfilePage({ toggleMobileMenu, isMobileMenuOpen }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Profil Pengguna" toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
      <div className="mt-6">
        <ProfileForm />
      </div>
    </div>
  );
}

export default ProfilePage;