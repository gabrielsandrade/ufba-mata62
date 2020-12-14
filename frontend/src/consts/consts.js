const consts = {
  CAN_MANAGE_USERS: ["DIRE", "SUPER"], 
  CAN_MANAGE_COURSES: ["COL"], 
  CAN_ADD_INST: ["SUPER", "DIRE", "DIRI"], 
  CAN_GET_EDIT_INST: ["SUPER", "DIRE"], 
  CAN_MANAGE_SOLICITATIONS : ["SUPER"], 
  CAN_GET_SOLICITATIONS : ["SUPER", "COOR"],
};

for (const x in consts) {
  consts[x] = Object.freeze(consts[x]);
}
export default consts;
