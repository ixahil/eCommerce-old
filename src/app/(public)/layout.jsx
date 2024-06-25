import Announcement from "@/components/public/header/announcement";
import PublicHeader from "@/components/public/header/public-header";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Announcement />
      <div className="container">
        <PublicHeader />
        {children}
      </div>
    </>
  );
};

export default PublicLayout;
