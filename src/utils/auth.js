export default {
  authenticate() {
    const token = sessionStorage.getItem("userToken");
    if (token) {
      return true;
    }
    return false;
  },

  // logout(e, history, alert) {
  //   e.preventDefault();
  //   sessionStorage.removeItem("userToken");
  //   history.push("/");
  //   alert.show(<div style={{ color: "green" }}>You are now Logged out</div>);
  // },
};
