export const menuConfig = [
  { label: "Thông Tin Cá Nhân", permission: "VIEW_PROFILE", path: "/profile" },
  { label: "Quản trị hệ thống", permission: "ROLE_ADMIN", path: "/admin" },
  { label: "Đăng Xuất", action: "logout", path: "/logout" },
];
export const menuConfigLogin= [
  { label: "Đăng Nhập", action: "login", path: "/login" },
  { label: "Welcome to the website", action: "home", path: "/" },
  { label: "Đăng Ký", action: "register", path: "/register"},
  { label: "Thông tin liên hệ", action: "contact", path: "/profile/contact" },
  { label: "Bảo Mật", action: "security", path: "/profile/security"},
  { label: "Thông Tin Cá Nhân", action: "profile", path: "/profile" },

];