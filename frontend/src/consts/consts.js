const consts = {
  CAN_ADD_USERS: ["DIRE", "SUPER"],
  CAN_ADD_COURSES: ["DIRE"],
  CAN_ADD_INST: ["SUPER"],
  CAN_SEE_INST: ["SUPER", "COOR"],
  CAN_SEE_COURSES: ["DIRE", "COL"],
  CAN_SEE_SOLICITATIONS : ["SUPER"],
};

for (const x in consts) {
  consts[x] = Object.freeze(consts[x]);
}
export default consts;
