export class UserModel {
  constructor(data) {
    this.name = "";
    this.image = "";
    this.email = "";
    this.phone = "";
    this.walletAddress = "";
    this.role = "";
    this.userId = "";
    this.permissions = [];
    this.organization = {
      name: "",
      image: "",
    };
    this.isActive = false;
    if (data) {
      return this.setData(data);
    }
  }
  setData(user) {
    this.name = user.name ? user.name : "";
    this.image = user.image ? user.image : "";
    this.email = user.email ? user.email : "";
    this.phone = user.phone ? user.phone : "";
    this.walletAddress = user.walletAddress ? user.walletAddress : "";
    this.role = user.role ? user.role : "";
    this.userId = user._id ? user._id : "";
    this.permissions = user.permissions ? user.permissions : [];
    this.organization = user.organization
      ? user.organization
      : {
          name: "",
          image: "",
        };
    this.isActive = user.isActive ? user.isActive : false;
  }
}
