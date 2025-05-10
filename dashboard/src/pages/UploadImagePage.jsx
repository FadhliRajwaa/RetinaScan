import Header from '../components/common/Header';
import UploadImage from '../components/dashboard/UploadImage';

function UploadImagePage() {
  return (
    <div className="p-6">
      <Header title="Unggah Citra" />
      <div className="mt-6">
        <UploadImage />
      </div>
    </div>
  );
}

export default UploadImagePage;