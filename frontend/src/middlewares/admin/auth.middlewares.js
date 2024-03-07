import { useAccountOfStaff } from '@/store/pinia.store'


export const requireAuth = (to, from, next) => {
  const isLoggedIn = useAccountOfStaff().getStaff(); 
  // console.log(isLoggedIn.staff.role_id);
  if (isLoggedIn !== undefined) {
    if (isLoggedIn.staff) {
      next()  
    } else {
      // next()
      next('/staff/auth/login'); 
      throw new Error("Err: 404 Không tìm thấy người dùng!")  
    }
  } else {
    next('/staff/auth/login'); 
    throw new Error("Err: 300 Người dùng cần đăng nhập!")
  }
};
