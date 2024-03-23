import { useCart } from '@/store/pinia.store'
const store = useCart()

export function getCart () {
  if (store.getStaff()) {
    const staff = store.getStaff()
    
    return staff
  }
  else {
    throw new Error('Err: 404, Could not get staff at store!')
  }
}
