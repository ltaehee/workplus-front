import ListWrap from "../components/admin/ListWrap";
import SideMenu from "../components/admin/SideMenu";

const AdminPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex border border-black w-[1280px] h-screen px-8">
        <SideMenu />
      </div>
    </div>
  );
};

export default AdminPage;
