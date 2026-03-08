const stringExteractor = (strInputCode: string) => {
  return strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
};

export { stringExteractor };
