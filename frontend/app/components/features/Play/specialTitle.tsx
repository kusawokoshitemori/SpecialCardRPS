const randomSpecialTitle = () => {
  const specialTitleList = [
    "ミラー",
    "全知全能",
    "無限の手",
    "リバース",
    "封印",
  ];
  return specialTitleList[Math.floor(Math.random() * specialTitleList.length)];
};

export default randomSpecialTitle;
