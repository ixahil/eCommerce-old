import Header from "@/components/admin/header/Header";
import MobileMenu from "@/components/admin/mobile-menu/mobile-menu";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import AuthProvider from "@/services/authentication/auth-provider";

const AdminLayout = ({ children }) => {
  return (
    <AuthProvider layout={"ADMIN"}>
      <div className="h-full w-full sm:flex">
        <div id="mobile-menu"></div>
        <Sidebar />
        <div className="p-4 xl:p-8 w-full h-full">
          <MobileMenu />
          <Header />
          <main className="h-full flex-1 p-4 xl:py-8">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default AdminLayout;
