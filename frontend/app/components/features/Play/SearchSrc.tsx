const SearchSrc = (handTitle: string) => {
  // ジャンケンのSrcのマップ
  const srcMap = new Map<string, string>([
    ["グー", "/images/rock.png"],
    ["チョキ", "/images/scissors.png"],
    ["パー", "/images/paper.png"],
    ["ミラー", "/images/mirror.png"],
    ["全知全能", "/images/knowledge.png"],
    ["無限の手", "/images/threepaper.png"],
    ["リバース", "/images/reverse.png"],
    ["封印", "/images/ban.png"],
  ]);
  const SrcResult = srcMap.get(handTitle);
  if (SrcResult === undefined) return "";
  return SrcResult;
};
export default SearchSrc;
