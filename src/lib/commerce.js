import Commerce from "@chec/commerce.js";

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);

export const categories = {
  motherboard: "cat_ZM8X5n0Krwpv4q",
  processor: "cat_gvRjwO2vel4mNL",
  memory: "cat_4OANwR2QawvYL8",
  graphicCard: "cat_yA6nldK0W5EWbz",
  case: "cat_VPvL5zxqGwAQkX",
  powerSupply: "cat_nPEVlNNP0la7dM",
  liquidCooling: "cat_9BAmwJxeQ5eXdn",
  airCooling: "cat_mOVKl4KzM5prRP",
  solidStateDrive: "cat_ZM8X5n0v3wpv4q",
  hardDrive: "cat_gvRjwO29ml4mNL",
  gamingMonitor: "cat_N7GKwbrE8w3EX4",
  gamingChairs: "cat_ZRjywMzD3o7Y8G",
  mouse: "cat_aZWNoyeZVo80JA",
  mousePad: "cat_BkyN5YYz250b69",
  keyboard: "cat_31q0o3VdkwDdjR",
  gamingHeadset: "cat_p6dP5g8aKln7kA",
};
