

class UsersServices {

  extractStaffData(payload) {
    const staff = {
      
    }

    Object.keys(staff).forEach(
      (key) => staff[key] === undefined && delete staff[key]
    )
    return staff;
  }

  constructor() {
    // this.StaffModel = StaffModel

  }

}
