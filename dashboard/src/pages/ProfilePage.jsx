import ProfileForm from '../components/dashboard/ProfileForm';
import { withPageTransition } from '../context/ThemeContext';

function ProfilePageComponent({ updateProfileStatus }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mt-6">
        <ProfileForm onProfileComplete={updateProfileStatus} />
      </div>
    </div>
  );
}

const ProfilePage = withPageTransition(ProfilePageComponent);
export default ProfilePage;