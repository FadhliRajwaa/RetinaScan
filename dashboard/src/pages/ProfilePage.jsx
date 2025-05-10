import Header from '../components/common/Header';
import ProfileForm from '../components/dashboard/ProfileForm';

function ProfilePage() {
  return (
    <div className="p-6">
      <Header title="Profil Pengguna" />
      <div className="mt-6">
        <ProfileForm />
      </div>
    </div>
  );
}

export default ProfilePage;