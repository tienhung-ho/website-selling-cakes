import { useAccountOfStaff } from '@/store/pinia.store'


export const requireAuth = (to, from, next) => {
  const isLoggedIn = useAccountOfStaff().getStaff(); 
  console.log(isLoggedIn.role_id);
  if (isLoggedIn.role_id) {
    next()  
  }
  else {
    return
  }
  
};


