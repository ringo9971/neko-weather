import { createContext } from 'react';

export const InvaderGameContext = createContext<{
  cellSize: {
    x: number;
    y: number;
  };
  grid: {
    x: number;
    y: number;
  };
}>({
  cellSize: { x: 1, y: 1 },
  grid: { x: 100, y: 100 },
});

export type cityConfig = {
  name: string;
  hurigana: string;
  prefecture: string;
  prefectureHurigana: string;
  id: string;
};

export const CityListContext = createContext<{
  cities: Array<cityConfig>;
}>({
  cities: [
    {
      name: '稚内',
      hurigana: 'わっかない',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '011000',
    },
    {
      name: '旭川',
      hurigana: 'あさひかわ',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '012010',
    },
    {
      name: '留萌',
      hurigana: 'るもい',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '012020',
    },
    {
      name: '網走',
      hurigana: 'あばしり',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '013010',
    },
    {
      name: '北見',
      hurigana: 'きたみ',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '013020',
    },
    {
      name: '紋別',
      hurigana: 'もんべつ',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '013030',
    },
    {
      name: '根室',
      hurigana: 'ねむろ',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '014010',
    },
    {
      name: '釧路',
      hurigana: 'くしろ',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '014020',
    },
    {
      name: '帯広',
      hurigana: 'おびひろ',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '014030',
    },
    {
      name: '室蘭',
      hurigana: 'むろらん',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '015010',
    },
    {
      name: '浦河',
      hurigana: 'うらかわ',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '015020',
    },
    {
      name: '札幌',
      hurigana: 'さっぽろ',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '016010',
    },
    {
      name: '岩見沢',
      hurigana: 'いわみざわ',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '016020',
    },
    {
      name: '倶知安',
      hurigana: 'くっちゃん',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '016030',
    },
    {
      name: '函館',
      hurigana: 'はこだて',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '017010',
    },
    {
      name: '江差',
      hurigana: 'えさし',
      prefecture: '北海道',
      prefectureHurigana: 'ほっかい',
      id: '017020',
    },
    {
      name: '青森',
      hurigana: 'あおもり',
      prefecture: '青森県',
      prefectureHurigana: 'あおもり',
      id: '020010',
    },
    {
      name: 'むつ',
      hurigana: 'むつ',
      prefecture: '青森県',
      prefectureHurigana: 'あおもり',
      id: '020020',
    },
    {
      name: '八戸',
      hurigana: 'はちのへ',
      prefecture: '青森県',
      prefectureHurigana: 'あおもり',
      id: '020030',
    },
    {
      name: '盛岡',
      hurigana: 'もりおか',
      prefecture: '岩手県',
      prefectureHurigana: 'いわて',
      id: '030010',
    },
    {
      name: '宮古',
      hurigana: 'みやこ',
      prefecture: '岩手県',
      prefectureHurigana: 'いわて',
      id: '030020',
    },
    {
      name: '大船渡',
      hurigana: 'おおふなと',
      prefecture: '岩手県',
      prefectureHurigana: 'いわて',
      id: '030030',
    },
    {
      name: '仙台',
      hurigana: 'せんだい',
      prefecture: '宮城県',
      prefectureHurigana: 'みやぎ',
      id: '040010',
    },
    {
      name: '白石',
      hurigana: 'しろいし',
      prefecture: '宮城県',
      prefectureHurigana: 'みやぎ',
      id: '040020',
    },
    {
      name: '秋田',
      hurigana: 'あきた',
      prefecture: '秋田県',
      prefectureHurigana: 'あきた',
      id: '050010',
    },
    {
      name: '横手',
      hurigana: 'よこて',
      prefecture: '秋田県',
      prefectureHurigana: 'あきた',
      id: '050020',
    },
    {
      name: '山形',
      hurigana: 'やまがた',
      prefecture: '山形県',
      prefectureHurigana: 'やまがた',
      id: '060010',
    },
    {
      name: '米沢',
      hurigana: 'よねざわ',
      prefecture: '山形県',
      prefectureHurigana: 'やまがた',
      id: '060020',
    },
    {
      name: '酒田',
      hurigana: 'さかた',
      prefecture: '山形県',
      prefectureHurigana: 'やまがた',
      id: '060030',
    },
    {
      name: '新庄',
      hurigana: 'しんじょう',
      prefecture: '山形県',
      prefectureHurigana: 'やまがた',
      id: '060040',
    },
    {
      name: '福島',
      hurigana: 'ふくしま',
      prefecture: '福島県',
      prefectureHurigana: 'ふくしま',
      id: '070010',
    },
    {
      name: '小名浜',
      hurigana: 'おなはま',
      prefecture: '福島県',
      prefectureHurigana: 'ふくしま',
      id: '070020',
    },
    {
      name: '若松',
      hurigana: 'わかまつ',
      prefecture: '福島県',
      prefectureHurigana: 'ふくしま',
      id: '070030',
    },
    {
      name: '水戸',
      hurigana: 'みと',
      prefecture: '茨城県',
      prefectureHurigana: 'いばらき',
      id: '080010',
    },
    {
      name: '土浦',
      hurigana: 'つちうら',
      prefecture: '茨城県',
      prefectureHurigana: 'いばらき',
      id: '080020',
    },
    {
      name: '宇都宮',
      hurigana: 'うつのみや',
      prefecture: '栃木県',
      prefectureHurigana: 'とちぎ',
      id: '090010',
    },
    {
      name: '大田原',
      hurigana: 'おおたわら',
      prefecture: '栃木県',
      prefectureHurigana: 'とちぎ',
      id: '090020',
    },
    {
      name: '前橋',
      hurigana: 'まえばし',
      prefecture: '群馬県',
      prefectureHurigana: 'ぐんま',
      id: '100010',
    },
    {
      name: 'みなかみ',
      hurigana: 'みなかみ',
      prefecture: '群馬県',
      prefectureHurigana: 'ぐんま',
      id: '100020',
    },
    {
      name: 'さいたま',
      hurigana: 'さいたま',
      prefecture: '埼玉県',
      prefectureHurigana: 'さいたま',
      id: '110010',
    },
    {
      name: '熊谷',
      hurigana: 'くまがや',
      prefecture: '埼玉県',
      prefectureHurigana: 'さいたま',
      id: '110020',
    },
    {
      name: '秩父',
      hurigana: 'ちちぶ',
      prefecture: '埼玉県',
      prefectureHurigana: 'さいたま',
      id: '110030',
    },
    {
      name: '千葉',
      hurigana: 'ちば',
      prefecture: '千葉県',
      prefectureHurigana: 'ちば',
      id: '120010',
    },
    {
      name: '銚子',
      hurigana: 'ちょうし',
      prefecture: '千葉県',
      prefectureHurigana: 'ちば',
      id: '120020',
    },
    {
      name: '館山',
      hurigana: 'たてやま',
      prefecture: '千葉県',
      prefectureHurigana: 'ちば',
      id: '120030',
    },
    {
      name: '東京',
      hurigana: 'とうきょう',
      prefecture: '東京都',
      prefectureHurigana: 'とうきょう',
      id: '130010',
    },
    {
      name: '大島',
      hurigana: 'おおじま',
      prefecture: '東京都',
      prefectureHurigana: 'とうきょう',
      id: '130020',
    },
    {
      name: '八丈島',
      hurigana: 'はちじょうじま',
      prefecture: '東京都',
      prefectureHurigana: 'とうきょう',
      id: '130030',
    },
    {
      name: '父島',
      hurigana: 'ちちしま',
      prefecture: '東京都',
      prefectureHurigana: 'とうきょう',
      id: '130040',
    },
    {
      name: '横浜',
      hurigana: 'よこはま',
      prefecture: '神奈川県',
      prefectureHurigana: 'かながわ',
      id: '140010',
    },
    {
      name: '小田原',
      hurigana: 'おだわら',
      prefecture: '神奈川県',
      prefectureHurigana: 'かながわ',
      id: '140020',
    },
    {
      name: '新潟',
      hurigana: 'にいがた',
      prefecture: '新潟県',
      prefectureHurigana: 'にいがた',
      id: '150010',
    },
    {
      name: '長岡',
      hurigana: 'ながおか',
      prefecture: '新潟県',
      prefectureHurigana: 'にいがた',
      id: '150020',
    },
    {
      name: '高田',
      hurigana: 'たかだ',
      prefecture: '新潟県',
      prefectureHurigana: 'にいがた',
      id: '150030',
    },
    {
      name: '相川',
      hurigana: 'あいかわ',
      prefecture: '新潟県',
      prefectureHurigana: 'にいがた',
      id: '150040',
    },
    {
      name: '富山',
      hurigana: 'とやま',
      prefecture: '富山県',
      prefectureHurigana: 'とやま',
      id: '160010',
    },
    {
      name: '伏木',
      hurigana: 'ふしき',
      prefecture: '富山県',
      prefectureHurigana: 'とやま',
      id: '160020',
    },
    {
      name: '金沢',
      hurigana: 'かなざわ',
      prefecture: '石川県',
      prefectureHurigana: 'いしかわ',
      id: '170010',
    },
    {
      name: '輪島',
      hurigana: 'わじま',
      prefecture: '石川県',
      prefectureHurigana: 'いしかわ',
      id: '170020',
    },
    {
      name: '福井',
      hurigana: 'ふくい',
      prefecture: '福井県',
      prefectureHurigana: 'ふくい',
      id: '180010',
    },
    {
      name: '敦賀',
      hurigana: 'つるが',
      prefecture: '福井県',
      prefectureHurigana: 'ふくい',
      id: '180020',
    },
    {
      name: '甲府',
      hurigana: 'こうふ',
      prefecture: '山梨県',
      prefectureHurigana: 'やまなし',
      id: '190010',
    },
    {
      name: '河口湖',
      hurigana: 'かわぐちこ',
      prefecture: '山梨県',
      prefectureHurigana: 'やまなし',
      id: '190020',
    },
    {
      name: '長野',
      hurigana: 'ながの',
      prefecture: '長野県',
      prefectureHurigana: 'ながの',
      id: '200010',
    },
    {
      name: '松本',
      hurigana: 'まつもと',
      prefecture: '長野県',
      prefectureHurigana: 'ながの',
      id: '200020',
    },
    {
      name: '飯田',
      hurigana: 'いいだ',
      prefecture: '長野県',
      prefectureHurigana: 'ながの',
      id: '200030',
    },
    {
      name: '岐阜',
      hurigana: 'ぎふ',
      prefecture: '岐阜県',
      prefectureHurigana: 'ぎふ',
      id: '210010',
    },
    {
      name: '高山',
      hurigana: 'たかやま',
      prefecture: '岐阜県',
      prefectureHurigana: 'ぎふ',
      id: '210020',
    },
    {
      name: '静岡',
      hurigana: 'しずおか',
      prefecture: '静岡県',
      prefectureHurigana: 'しずおか',
      id: '220010',
    },
    {
      name: '網代',
      hurigana: 'あじろ',
      prefecture: '静岡県',
      prefectureHurigana: 'しずおか',
      id: '220020',
    },
    {
      name: '三島',
      hurigana: 'みしま',
      prefecture: '静岡県',
      prefectureHurigana: 'しずおか',
      id: '220030',
    },
    {
      name: '浜松',
      hurigana: 'はままつ',
      prefecture: '静岡県',
      prefectureHurigana: 'しずおか',
      id: '220040',
    },
    {
      name: '名古屋',
      hurigana: 'なごや',
      prefecture: '愛知県',
      prefectureHurigana: 'あいち',
      id: '230010',
    },
    {
      name: '豊橋',
      hurigana: 'とよはし',
      prefecture: '愛知県',
      prefectureHurigana: 'あいち',
      id: '230020',
    },
    {
      name: '津',
      hurigana: 'つ',
      prefecture: '三重県',
      prefectureHurigana: 'みえ',
      id: '240010',
    },
    {
      name: '尾鷲',
      hurigana: 'おわせ',
      prefecture: '三重県',
      prefectureHurigana: 'みえ',
      id: '240020',
    },
    {
      name: '大津',
      hurigana: 'おおつ',
      prefecture: '滋賀県',
      prefectureHurigana: 'しが',
      id: '250010',
    },
    {
      name: '彦根',
      hurigana: 'ひこね',
      prefecture: '滋賀県',
      prefectureHurigana: 'しが',
      id: '250020',
    },
    {
      name: '京都',
      hurigana: 'きょうと',
      prefecture: '京都府',
      prefectureHurigana: 'きょうと',
      id: '260010',
    },
    {
      name: '舞鶴',
      hurigana: 'まいづる',
      prefecture: '京都府',
      prefectureHurigana: 'きょうと',
      id: '260020',
    },
    {
      name: '大阪',
      hurigana: 'おおさか',
      prefecture: '大阪府',
      prefectureHurigana: 'おおさか',
      id: '270000',
    },
    {
      name: '神戸',
      hurigana: 'こうべ',
      prefecture: '兵庫県',
      prefectureHurigana: 'ひょうご',
      id: '280010',
    },
    {
      name: '豊岡',
      hurigana: 'とよおか',
      prefecture: '兵庫県',
      prefectureHurigana: 'ひょうご',
      id: '280020',
    },
    {
      name: '奈良',
      hurigana: 'なら',
      prefecture: '奈良県',
      prefectureHurigana: 'なら',
      id: '290010',
    },
    {
      name: '風屋',
      hurigana: 'かぜや',
      prefecture: '奈良県',
      prefectureHurigana: 'なら',
      id: '290020',
    },
    {
      name: '和歌山',
      hurigana: 'わかやま',
      prefecture: '和歌山県',
      prefectureHurigana: 'わかやま',
      id: '300010',
    },
    {
      name: '潮岬',
      hurigana: 'しおのみさき',
      prefecture: '和歌山県',
      prefectureHurigana: 'わかやま',
      id: '300020',
    },
    {
      name: '鳥取',
      hurigana: 'とっとり',
      prefecture: '鳥取県',
      prefectureHurigana: 'とっとり',
      id: '310010',
    },
    {
      name: '米子',
      hurigana: 'よなご',
      prefecture: '鳥取県',
      prefectureHurigana: 'とっとり',
      id: '310020',
    },
    {
      name: '松江',
      hurigana: 'まつえ',
      prefecture: '島根県',
      prefectureHurigana: 'しまね',
      id: '320010',
    },
    {
      name: '浜田',
      hurigana: 'はまだ',
      prefecture: '島根県',
      prefectureHurigana: 'しまね',
      id: '320020',
    },
    {
      name: '西郷',
      hurigana: 'さいごう',
      prefecture: '島根県',
      prefectureHurigana: 'しまね',
      id: '320030',
    },
    {
      name: '岡山',
      hurigana: 'おかやま',
      prefecture: '岡山県',
      prefectureHurigana: 'おかやま',
      id: '330010',
    },
    {
      name: '津山',
      hurigana: 'つやま',
      prefecture: '岡山県',
      prefectureHurigana: 'おかやま',
      id: '330020',
    },
    {
      name: '広島',
      hurigana: 'ひろしま',
      prefecture: '広島県',
      prefectureHurigana: 'ひろしま',
      id: '340010',
    },
    {
      name: '庄原',
      hurigana: 'しんばら',
      prefecture: '広島県',
      prefectureHurigana: 'ひろしま',
      id: '340020',
    },
    {
      name: '下関',
      hurigana: 'しものせき',
      prefecture: '山口県',
      prefectureHurigana: 'やまぐち',
      id: '350010',
    },
    {
      name: '山口',
      hurigana: 'やまぐち',
      prefecture: '山口県',
      prefectureHurigana: 'やまぐち',
      id: '350020',
    },
    {
      name: '柳井',
      hurigana: 'やない',
      prefecture: '山口県',
      prefectureHurigana: 'やまぐち',
      id: '350030',
    },
    {
      name: '萩',
      hurigana: 'はぎ',
      prefecture: '山口県',
      prefectureHurigana: 'やまぐち',
      id: '350040',
    },
    {
      name: '徳島',
      hurigana: 'とくしま',
      prefecture: '徳島県',
      prefectureHurigana: 'とくしま',
      id: '360010',
    },
    {
      name: '日和佐',
      hurigana: 'ひわさ',
      prefecture: '徳島県',
      prefectureHurigana: 'とくしま',
      id: '360020',
    },
    {
      name: '高松',
      hurigana: 'たかまつ',
      prefecture: '香川県',
      prefectureHurigana: 'かがわ',
      id: '370000',
    },
    {
      name: '松山',
      hurigana: 'まつやま',
      prefecture: '愛媛県',
      prefectureHurigana: 'えひめ',
      id: '380010',
    },
    {
      name: '新居浜',
      hurigana: 'にいはま',
      prefecture: '愛媛県',
      prefectureHurigana: 'えひめ',
      id: '380020',
    },
    {
      name: '宇和島',
      hurigana: 'うわじま',
      prefecture: '愛媛県',
      prefectureHurigana: 'えひめ',
      id: '380030',
    },
    {
      name: '高知',
      hurigana: 'こうち',
      prefecture: '高知県',
      prefectureHurigana: 'こうち',
      id: '390010',
    },
    {
      name: '室戸岬',
      hurigana: 'むろとみさき',
      prefecture: '高知県',
      prefectureHurigana: 'こうち',
      id: '390020',
    },
    {
      name: '清水',
      hurigana: 'しみず',
      prefecture: '高知県',
      prefectureHurigana: 'こうち',
      id: '390030',
    },
    {
      name: '福岡',
      hurigana: 'ふくおか',
      prefecture: '福岡県',
      prefectureHurigana: 'ふくおか',
      id: '400010',
    },
    {
      name: '八幡',
      hurigana: 'やはた',
      prefecture: '福岡県',
      prefectureHurigana: 'ふくおか',
      id: '400020',
    },
    {
      name: '飯塚',
      hurigana: 'いいづか',
      prefecture: '福岡県',
      prefectureHurigana: 'ふくおか',
      id: '400030',
    },
    {
      name: '久留米',
      hurigana: 'くるめ',
      prefecture: '福岡県',
      prefectureHurigana: 'ふくおか',
      id: '400040',
    },
    {
      name: '佐賀',
      hurigana: 'さが',
      prefecture: '佐賀県',
      prefectureHurigana: 'さが',
      id: '410010',
    },
    {
      name: '伊万里',
      hurigana: 'いまり',
      prefecture: '佐賀県',
      prefectureHurigana: 'さが',
      id: '410020',
    },
    {
      name: '長崎',
      hurigana: 'ながさき',
      prefecture: '長崎県',
      prefectureHurigana: 'ながさき',
      id: '420010',
    },
    {
      name: '佐世保',
      hurigana: 'させぼ',
      prefecture: '長崎県',
      prefectureHurigana: 'ながさき',
      id: '420020',
    },
    {
      name: '厳原',
      hurigana: 'いづはら',
      prefecture: '長崎県',
      prefectureHurigana: 'ながさき',
      id: '420030',
    },
    {
      name: '福江',
      hurigana: 'ふくえ',
      prefecture: '長崎県',
      prefectureHurigana: 'ながさき',
      id: '420040',
    },
    {
      name: '熊本',
      hurigana: 'くまもと',
      prefecture: '熊本県',
      prefectureHurigana: 'くまもと',
      id: '430010',
    },
    {
      name: '阿蘇乙姫',
      hurigana: 'あそおとひめ',
      prefecture: '熊本県',
      prefectureHurigana: 'くまもと',
      id: '430020',
    },
    {
      name: '牛深',
      hurigana: 'うしぶか',
      prefecture: '熊本県',
      prefectureHurigana: 'くまもと',
      id: '430030',
    },
    {
      name: '人吉',
      hurigana: 'ひとよ',
      prefecture: '熊本県',
      prefectureHurigana: 'くまもと',
      id: '430040',
    },
    {
      name: '大分',
      hurigana: 'おおいた',
      prefecture: '大分県',
      prefectureHurigana: 'おおいた',
      id: '440010',
    },
    {
      name: '中津',
      hurigana: 'なかつ',
      prefecture: '大分県',
      prefectureHurigana: 'おおいた',
      id: '440020',
    },
    {
      name: '日田',
      hurigana: 'ひた',
      prefecture: '大分県',
      prefectureHurigana: 'おおいた',
      id: '440030',
    },
    {
      name: '佐伯',
      hurigana: 'さいき',
      prefecture: '大分県',
      prefectureHurigana: 'おおいた',
      id: '440040',
    },
    {
      name: '宮崎',
      hurigana: 'みやざき',
      prefecture: '宮崎県',
      prefectureHurigana: 'みやざき',
      id: '450010',
    },
    {
      name: '延岡',
      hurigana: 'のべおか',
      prefecture: '宮崎県',
      prefectureHurigana: 'みやざき',
      id: '450020',
    },
    {
      name: '都城',
      hurigana: 'みやこのじょう',
      prefecture: '宮崎県',
      prefectureHurigana: 'みやざき',
      id: '450030',
    },
    {
      name: '高千穂',
      hurigana: 'たかちほ',
      prefecture: '宮崎県',
      prefectureHurigana: 'みやざき',
      id: '450040',
    },
    {
      name: '鹿児島',
      hurigana: 'かごしま',
      prefecture: '鹿児島県',
      prefectureHurigana: 'かごしま',
      id: '460010',
    },
    {
      name: '鹿屋',
      hurigana: 'かのや',
      prefecture: '鹿児島県',
      prefectureHurigana: 'かごしま',
      id: '460020',
    },
    {
      name: '種子島',
      hurigana: 'たねがしま',
      prefecture: '鹿児島県',
      prefectureHurigana: 'かごしま',
      id: '460030',
    },
    {
      name: '名瀬',
      hurigana: 'なぜ',
      prefecture: '鹿児島県',
      prefectureHurigana: 'かごしま',
      id: '460040',
    },
    {
      name: '那覇',
      hurigana: 'なは',
      prefecture: '沖縄県',
      prefectureHurigana: 'おきなわ',
      id: '471010',
    },
    {
      name: '名護',
      hurigana: 'なご',
      prefecture: '沖縄県',
      prefectureHurigana: 'おきなわ',
      id: '471020',
    },
    {
      name: '久米島',
      hurigana: 'くめじま',
      prefecture: '沖縄県',
      prefectureHurigana: 'おきなわ',
      id: '471030',
    },
    {
      name: '南大東',
      hurigana: 'みなみだいとう',
      prefecture: '沖縄県',
      prefectureHurigana: 'おきなわ',
      id: '472000',
    },
    {
      name: '宮古島',
      hurigana: 'みやこじま',
      prefecture: '沖縄県',
      prefectureHurigana: 'おきなわ',
      id: '473000',
    },
    {
      name: '石垣島',
      hurigana: 'いしがきじま',
      prefecture: '沖縄県',
      prefectureHurigana: 'おきなわ',
      id: '474010',
    },
    {
      name: '与那国島',
      hurigana: 'よなぐにじま',
      prefecture: '沖縄県',
      prefectureHurigana: 'おきなわ',
      id: '474020',
    },
  ],
});
