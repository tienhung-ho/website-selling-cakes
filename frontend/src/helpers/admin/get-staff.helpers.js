import { useAccountOfStaff } from '@/store/pinia.store'
const store = useAccountOfStaff()


export function staff () {
  if (store.getStaff()) {
    const staff = store.getStaff().staff
    
    return staff
  }
  else {
    throw new Error('Err: 404, Could not get staff at store!')
  }
}


export function permissions () {
  if (store.getStaff()) {
    const permissions = store.getStaff().permissions
    
    return permissions
  }
  else {
    throw new Error('Err: 404, Could not get staff at store!')
  }
}

