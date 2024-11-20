<template>
  <div>
    <h1 class="list_title">資料列表</h1>
    <div class="page_link">
      <RouterLink class="router" to="/" >首頁</RouterLink> |
      <RouterLink class="router" to="/favorite">我的最愛列表</RouterLink>
    </div>
    <!-- <div v-for="market in fake_res.data" :key="market.id" class="market-card">
      <h2>{{ market.name }}</h2>
      <p>地址: {{ market.address }}</p>
      <p>電話: {{ market.tel }}</p>
      <p>營業時間: {{ market.open_time }}</p>
      <p>{{ market.introduction }}</p>
      <img v-if="market.images.length > 0" :src="market.images[0].src" alt="市場圖片" />
    </div> -->
    <div>
      <label for="category">選擇類別:</label>
      <select v-model="selectedCategoryId" id="category">
        <option value="">全部</option>
        <option v-for="category in categories" 
          :key="category.index" 
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <table class="list_table">
      <thead>
        <tr class="table_title">
          <th>收藏</th>
          <th>圖片</th>
          <th>名稱</th>
          <th>簡介</th>
          <th>地址</th>
          <th>電話</th>
          <th>營業時間</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="market in filteredData"
          :key="market.id"
        >
          <td>
            <input
              type="checkbox"
              :value="market.id"
              :checked="isChecked(market.id)"
              @change="handleCheckboxChange(market.id)"
            />
          </td>
          <td>
            <img
              v-if="market.images.length > 0"
              :src="market.images[0].src"
              alt="市場圖片"
              class="market-image"
            />
          </td>
          <td>{{ market.name }}</td>
          <td class="introduction">{{ shortenText(market.introduction, 50) }}</td>
          <td>{{ market.address }}</td>
          <td>{{ market.tel }}</td>
          <td class="open_time">{{ market.open_time }}</td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁功能 -->
    <div class="pagination">
      <button @click="currentPage--" :disabled="currentPage === 1">上一頁</button>
      <span>第 {{ currentPage }} 頁 / 共 {{ totalPages }} 頁</span>
      <button @click="currentPage++" :disabled="currentPage === totalPages">下一頁</button>
    </div>
  </div>
</template>

<script>
  // import axios from 'axios';
  import { ref, computed } from "vue"
  export default {
    name: 'List',
    setup() {
      // corsURL: 'https://cors-anywhere.herokuapp.com/',
      // url: 'https://www.travel.taipei/open-api/zh-tw/Attractions/All',
      // params: {
      //   page: 1,
      //   lang: 'zh-tw'
      // },
      const fake_res = ref({
        "total": 30,
        "data": [
          {
            "id": 1560,
            "name": "寧夏觀光夜市",
            "name_zh": null,
            "open_status": 1,
            "introduction": "以「千歲宴」打響國際名聲，且獲得眾多美食雜誌和網路爭相報導的寧夏觀光夜市，包含民生西路、南京西路與重慶北路中間的路段，以臺灣傳統小吃為主，其中以大同區圓環附近令人懷念的古早味，最讓老臺北人津津樂道。\r\n\r\n夜市首先將人車分道，方便民眾吃飯與購物，貼心的服務，而隨著科技進步，許多攤販及店家也開始轉型，能夠使用悠遊卡及行動支付，遊客們帶著手機就能吃遍夜市美食。\r\n\r\n知名的「千歲宴」由2010年開始舉辦，名稱由來是因寧夏夜市攤販大多都已超過50年，加起來超過千歲，故取名為千歲宴。如要一嚐寧夏夜市美食「千歲宴」可電話預約或至官網預訂，建議人數7-10人，利用辦桌合菜的方式，讓遊客可以輕鬆享用20道臺灣在地小吃。\r\n\r\n寧夏夜市的小吃充滿濃濃的臺灣味，香噴噴的滷肉飯和雞肉飯、清甜鮮美的蚵仔煎和大腸蚵仔麵線、現炒入味的沙茶牛肉、滋補養顏的豬肝湯、來自府城的臺南碗粿、吳郭魚湯、蛋黃芋餅等等，都讓人忍不住食指大動。夜市另一邊的攤販，以新奇好玩的雜貨和玩具為主，販售的商品頗具流行感，價格不貴，在飽嚐美食之餘，不妨也來走走逛逛。",
            "open_time": "每日18:00~24:00",
            "zipcode": "103",
            "distric": "大同區",
            "address": "103 臺北市大同區寧夏路(位於南京西路與民生西路間)",
            "tel": "+886-2-25505220",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.05668119500556,
            "elong": 121.51536382734776,
            "official_site": "https://www.tcma.gov.taipei/News_Content.aspx?n=FAC14AD2DE4E01A4&sms=32F7BA052C5CA548&s=0C985156C3DB7335",
            "facebook": "https://www.facebook.com/pages/category/Food-Stand/%E5%AF%A7%E5%A4%8F%E8%A7%80%E5%85%89%E5%A4%9C%E5%B8%82-170921516284146/",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-17 05:01:54 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/1560",
            "category": [
              {
                "id": 23,
                "name": "觀光夜市"
              }
            ],
            "target": [],
            "service": [
              {
                "id": 144,
                "name": "餐飲"
              },
              {
                "id": 145,
                "name": "購物"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/221821",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221822",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221813",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221814",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221815",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221816",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221817",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221818",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221819",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221820",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 394,
            "name": "三創生活",
            "name_zh": null,
            "open_status": 1,
            "introduction": "「三創生活」坐落於市民大道三段與金山北路交界，佔地2,687坪，建築外觀呈現前瞻氣勢，立面設計詮釋產業特性，結合鄰近綠帶的視野，實踐自然與科技共生的設計理念。\r\n\r\n空間規劃導入科技生活、潮流影音、子親娛樂、動漫文化、探索體驗、創作育成及藝術展演等多元概念，結合園區內隨處可見的數位視屏，讓影像的多元樣貌，觸動對生活的無限想像。\r\n\r\n園區以人為核心，打造實踐未來的生活平台。期待能藉由互動、分享、探索、學習與創作，帶領大眾重新建構科技、文化與生活的連結。\r\n\r\n園區共12層樓，緊鄰光華數位新天地，提供選購3C產品的更多選擇。\r\n\r\n\r\n\r\n",
            "open_time": "週日至週四 11:00-21:30／週五至週六及國定假日前夕 11:00-22:00",
            "zipcode": "100",
            "distric": "中正區",
            "address": "100 臺北市中正區市民大道三段2號",
            "tel": "+886-809-093300",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.04535,
            "elong": 121.53111,
            "official_site": "https://www.syntrend.com.tw/",
            "facebook": "https://www.facebook.com/syntrend/",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-17 05:01:41 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/394",
            "category": [
              {
                "id": 19,
                "name": "親子共遊"
              },
              {
                "id": 24,
                "name": "主題商街"
              }
            ],
            "target": [],
            "service": [
              {
                "id": 144,
                "name": "餐飲"
              },
              {
                "id": 145,
                "name": "購物"
              },
              {
                "id": 146,
                "name": "公廁"
              },
              {
                "id": 147,
                "name": "停車場"
              },
              {
                "id": 148,
                "name": "失物招領"
              },
              {
                "id": 149,
                "name": "廣播服務"
              },
              {
                "id": 150,
                "name": "寄物櫃"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/65876",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/65877",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/65879",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/65880",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/65883",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/65884",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/65885",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/65886",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/65891",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/65874",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/65875",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 1794,
            "name": "MAJI集食行樂_圓山花博爭豔館",
            "name_zh": null,
            "open_status": 1,
            "introduction": "「MAJI2集食行樂」鄰近台北市立美術館，隱身在台北花博公園圓山園區一角，於2013年6月正式營運。由歌手哈林庾澄慶與知名設計師葉裕清精心規劃，在大自然中運用貨櫃、原木穀倉，巧妙包覆住美食、原創商品、音樂、藝術等元素，打造出具有異國氛圍的生活市集空間：一座城市遊樂園。\r\n\r\nMAJI2包含六大區域：神農市場、寰宇小吃街、創意市集、異國美食餐廳、特色商店街及多功能展演空間。\r\n\r\n【神農市場】\r\n為愛吃愛做菜的人把好吃、安心、天然、無毒食材通通集合再一起的神農市場，精心挑選全國各精緻小農的作物產品，其中為數不少是獲得農業部神農獎章的好農商品，以及一般超市難見的優質小品牌調味醬料，並引進南門市場的傳統食材，與帶入華人口味的熟菜食堂，讓顧客可以直接帶回家。\r\n\r\n【寰宇小吃街】\r\n以貨櫃排列，搭配復古桌椅，營造出獨特用餐空間。無論是臺灣味小吃，還是東西方美食匯串，都在異國小吃街。\r\n\r\n【創意市集】\r\n創意市集聚集手工皮革包、原創服飾、特色飾品，以及各類生活設計小物，讓你目不暇給，隨處發現驚喜。\r\n\r\n(部分資料來源：財團法人臺北市會展產業發展基金會)",
            "open_time": "*神農市場*\r\n星期一～星期五\r\nPM12:00-PM19:30\r\n\r\n*寰宇小吃攤*\r\n星期一~星期四 11:30~20:30\r\n星期五 11:30~21:30\r\n星期六~星期日 10:30~21:30\r\n(含例假日)",
            "zipcode": "104",
            "distric": "中山區",
            "address": "104 臺北市中山區玉門街1號",
            "tel": "+886-2-25977112",
            "fax": "",
            "email": "marketing@majisquare.com",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.06966,
            "elong": 121.52173,
            "official_site": "http://www.majisquare.com/",
            "facebook": "https://www.facebook.com/majisquare/",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-17 05:01:18 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/1794",
            "category": [
              {
                "id": 15,
                "name": "藝文館所"
              },
              {
                "id": 18,
                "name": "公共藝術"
              },
              {
                "id": 24,
                "name": "主題商街"
              }
            ],
            "target": [],
            "service": [
              {
                "id": 145,
                "name": "購物"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/184759",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/184760",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/184761",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/184762",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/184763",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/184764",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/184765",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/184766",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/184767",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/184768",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/184755",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/184756",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/184757",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/184758",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 1810,
            "name": "龍山文創基地",
            "name_zh": null,
            "open_status": 1,
            "introduction": "體驗式學習行文創基地\r\n\r\n萬華本身具豐富內涵與文化，無論是文字、視覺、聲音、表演、工藝甚至氣味與食物等，在在散發獨特的風貌，龍山文創基地以「培養在地設計師、藝術家、創作者」為主軸，發展在地品牌，以導覽、藝文表演、互動工作坊等讓民眾參與及體驗，讓旅客於此體驗，發掘萬華的文化與文創能量。\r\n\r\n從B2認識艋舺美與善\r\n\r\n重新塑造目前龍山文創基地給人的既定形象，從文創品、飲食、街景與服務皆彰顯萬華在地美與善的形象與特色，並將過去常民生活展示於此，讓到萬華的旅客以此為出發點，進而認識艋舺。",
            "open_time": "週二至週日 11:00 - 21:00　\r\n週一 休館日\r\n*遇國定假日或連續假日延後一日休館",
            "zipcode": "108",
            "distric": "萬華區",
            "address": "108 臺北市萬華區西園路一段145號B2 龍山寺地下街B2(龍山寺捷運站1號出口)",
            "tel": "+886-2-23021598",
            "fax": "",
            "email": "monga.longshan.b2@gmail.com",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.03607428455674,
            "elong": 121.49962395429611,
            "official_site": "https://longshan-b2.taipei/home/zh-tw",
            "facebook": "https://www.facebook.com/mongaB2/",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-10 05:01:34 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/1810",
            "category": [
              {
                "id": 15,
                "name": "藝文館所"
              }
            ],
            "target": [],
            "service": [],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/176830",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176831",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176832",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176833",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176834",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176835",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176837",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176838",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176839",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176840",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176841",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176842",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176843",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176844",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176826",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176827",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176828",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176829",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 23,
            "name": "國立中正紀念堂",
            "name_zh": null,
            "open_status": 1,
            "introduction": "中正紀念堂是為了紀念中華民國第一任總統蔣介石，他於1975年逝世，次年行政院就破土開建中正紀念堂，設計師是設計圓山大飯店的楊卓成。\r\n\r\n紀念堂原址是陸軍總部，當時是臺北市區內最大的軍區，據說從大陸運過來的黃金，就曾經存放在這個地方。紀念堂採用的藍白兩色，是國旗上面主要的顏色，紀念堂頂部天穹的裝飾是青天白日12道光芒，銅像朝西面對總統府和中國大陸，其中都有特殊的意義。隨著民主演進思想開放，紀念堂前的廣場已成了民主運動的集會場。\r\n\r\n位於中正紀念堂左右兩側的國家音樂廳與國家戲劇院。戲劇院為戲劇、舞蹈等表演活動的場地，經常舉辦大型的表演活動，包括京劇、戲劇、兒童節目等；音樂廳是臺灣最具水準的音樂展演空間，經常舉辦室內樂，交響樂等大型的音樂活動。而兩廳院前廣場也會不定時舉辦戲劇、音樂活動，吸引眾多遊客前往欣賞。\r\n\r\n白牆藍瓦，70公尺高聳立在紀念公園的中央，不論從哪個角度看過去，都很宏偉。國外觀光客來到臺灣，不論行程如何排，都一定會到這裡來參觀一下。紀念堂的下方有陳列和展覽，也有紀念品販售。\r\n",
            "open_time": "紀念堂開放時間：am09:00-pm06:00（星期一不休館）\r\n紀念公園開放時間：am05:00-pm12:00\r\n(休館日：除年度機電保養日、二二八紀念日、春節除夕及大年初一休館外，幾乎全年不休館)",
            "zipcode": "100",
            "distric": "中正區",
            "address": "100 臺北市中正區中山南路21號",
            "tel": "+886-2-23431100",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.03619,
            "elong": 121.51868,
            "official_site": "http://www.cksmh.gov.tw/",
            "facebook": "https://www.facebook.com/cksmhfb/?locale=zh_TW",
            "ticket": "",
            "remind": "升降旗時間：\r\n夏令時間：4/1~9/30\r\n*升旗：6:00AM    降旗：6:10 PM\r\n冬令時間：10/1~3/31\r\n*升旗：6:30AM    降旗：5:10 PM\r\n \r\n※國軍儀隊禮兵巡查及訓練展示（自113年7月15日實施)：\r\n1.每日上午9點至下午5點，每逢整點實施1次，每天9次(每次約15分鐘)：\r\n上午：9:00、10:00、11:00、12:00\r\n下午：1:00、2:00、3:00、4:00、5:00\r\n2.訓練展示地點：主堂體戶外正面階梯下方之民主大道。\r\n3.如遇雨天則不實施。",
            "staytime": "",
            "modified": "2024-11-10 05:01:14 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/23",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              },
              {
                "id": 15,
                "name": "藝文館所"
              },
              {
                "id": 25,
                "name": "無障礙旅遊推薦景點"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              },
              {
                "id": 62,
                "name": "校外教學"
              },
              {
                "id": 65,
                "name": "賞鳥族"
              }
            ],
            "service": [
              {
                "id": 141,
                "name": "無障礙設施"
              },
              {
                "id": 143,
                "name": "場地租用"
              },
              {
                "id": 144,
                "name": "餐飲"
              },
              {
                "id": 145,
                "name": "購物"
              },
              {
                "id": 146,
                "name": "公廁"
              },
              {
                "id": 147,
                "name": "停車場"
              },
              {
                "id": 148,
                "name": "失物招領"
              },
              {
                "id": 149,
                "name": "廣播服務"
              },
              {
                "id": 150,
                "name": "寄物櫃"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/222951",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/222952",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/222953",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/222954",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/222955",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/222956",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/222957",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/222958",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/222959",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/222960",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 1580,
            "name": "龍山寺地下街",
            "name_zh": null,
            "open_status": 1,
            "introduction": "龍山寺地下街商場位處廣州街、西園路、和平西路及三水街間之艋舺公園正下方，係臺北市首座地下二層之地下街商場。\r\n\r\n龍山寺地下街位於萬華區龍山寺對面，艋舺公園正下方，在地面層公園有7個出入口可通商場，商場有出入口與捷運龍山寺站相互連通，藉由流暢方便的行走動線，民眾可由捷運站直接進入經由商場通往龍山寺商圈。",
            "open_time": "上午11時至下午9時30分",
            "zipcode": "108",
            "distric": "萬華區",
            "address": "108 臺北市萬華區西園路一段145號B1、B2",
            "tel": "+886-2-23065988#24",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.03607,
            "elong": 121.49989,
            "official_site": "https://www.tcma.gov.taipei/News_Content.aspx?n=0D4E37187A7154F0&sms=42464882E656FEC0&s=E1D54780FDD052EC",
            "facebook": "",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-10 05:01:02 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/1580",
            "category": [
              {
                "id": 24,
                "name": "主題商街"
              }
            ],
            "target": [],
            "service": [],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/176806",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176807",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176808",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176809",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176810",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176811",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176812",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176813",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176814",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 101,
            "name": "圓山大飯店",
            "name_zh": null,
            "open_status": 1,
            "introduction": "圓山大飯店創立於民國41年（西元1952年），十四層宮殿式大樓，巍峨高聳於圓山之腰，前臨基隆河、後倚陽明山、東望松山、西眺淡水。飯店紅柱金瓦氣勢宏偉的外觀，襯托富麗堂皇的古典氣氛，傳達了中國的藝術之美，是台北市的代表地標之ㄧ，聞名世界。是中外人士觀光住宿或商務會議的最佳選擇。\r\n\r\n圓山的美，在於中國式的雄偉建築和富麗堂皇的古典氣派，圓山的神秘，在於傳奇性的歷史色彩和祕道傳說，圓山的寧靜清幽，在於它的遠離塵囂和鄰近閒情雅緻的風景線。\r\n\r\n百年金龍\r\n原本只是設置於台灣神社前的銅龍，在圓山飯店增建廳舍時特別保留原貌，完美呈現於金龍餐廳中，並在七十六年整修時，鍍上24K金，特別的是這條蟠龍只有三爪，和中國傳統的四爪或五爪龍不同。\r\n\r\n梅花藻井\r\n圓山大飯店大廳中央天花板有一口梅花造型的藻井，梅花中央五條金龍環繞一顆龍珠，意味「五福臨門」：藻井內周圍雖有23條金龍、16隻鳳凰，取其「3」諧音「升」意指步步高升，「16」伴隨大梅花「發」，則有一路發之意，梅花藻井象徵龍鳳呈祥，意義深遠。\r\n\r\n飛簷斗拱\r\n屋頂的飛簷與斗拱，道出中國的古老文明。垂脊上方一排蹲獸，盤據在挑出的飛簷之上，在正脊、垂脊間安置的鴟尾，是一種瓦製的獸型飾物；而屋頂下方，華麗但精緻有力的斗拱結構，這是中國建築最令人稱奇的堂奧。大廳落地玻璃門圓山大飯店正門的大型落地玻璃窗，典雅端正，但仔細觀察門上所繪紋路，就會發現其中暗藏六個古字「中華民國萬歲」，回溯重建圓山飯店時的時空背景，可以看出時空背景的轉換，及設計師創作時的巧思。\r\n\r\n石敢當\r\n牌樓前石階入口所豎立的大石塊石碑上，刻有于右任先生親筆所題的草書，龍飛鳳舞，筆力遒勁的四個大字『劍潭勝跡』，經過多方查證，這四個字表達出整個圓山就是聖地的意思，也因為如此，維繫了圓山百年人氣不墜的崇高地位。",
            "open_time": "全天開放",
            "zipcode": "104",
            "distric": "中山區",
            "address": "104 臺北市中山區中山北路四段1號",
            "tel": "+886-2-28868888",
            "fax": "+886-2-28852885",
            "email": "grand@grand-hotel.org",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.07861,
            "elong": 121.52629,
            "official_site": "https://www.grand-hotel.org/TW/index.aspx",
            "facebook": "",
            "ticket": "",
            "remind": "※本景點為【士林北藝-無圍牆博物館】景點範圍",
            "staytime": "",
            "modified": "2024-11-10 05:00:50 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/101",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              }
            ],
            "service": [
              {
                "id": 144,
                "name": "餐飲"
              },
              {
                "id": 146,
                "name": "公廁"
              },
              {
                "id": 147,
                "name": "停車場"
              },
              {
                "id": 151,
                "name": "住宿服務"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/64181",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64182",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182763",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182765",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182766",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182768",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 2,
            "name": "關渡碼頭",
            "name_zh": null,
            "open_status": 1,
            "introduction": "關渡原名甘豆門，因背倚觀音山和大屯山，面向淡水河，成為一處地勢險要的港口，早年先民由關渡碼頭進入移居臺灣北部開墾，因此關渡的開發甚早，後因兩河(基隆河、淡水河)河口泥沙淤積，水運才逐漸沒落。\r\n\r\n關渡碼頭位於關渡自然公園及關渡宮旁，每當假日或夜晚均可見遊客駐足關渡碼頭週邊散步休息，亦有許多單車族由八里經關渡大橋前來，或由淡水前來，沿途風光明媚，是一處極佳的賞景地點。\r\n\r\n\r\n\r\n\r\n\r\n\r\n",
            "open_time": "開放空間",
            "zipcode": "112",
            "distric": "北投區",
            "address": "112 臺北市北投區關渡碼頭",
            "tel": "+886-2-27208889",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.120870809229285,
            "elong": 121.4619791507721,
            "official_site": "",
            "facebook": "",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-08 10:45:56 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/2",
            "category": [
              {
                "id": 17,
                "name": "藍色水路"
              }
            ],
            "target": [
              {
                "id": 62,
                "name": "校外教學"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/63313",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63315",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63318",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63319",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63320",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63322",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63323",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 424,
            "name": "竹子湖海芋季",
            "name_zh": null,
            "open_status": 1,
            "introduction": "海芋原產於南非，因為它的苞片盛開時有如倒立的馬蹄，而植株又如同蓮花般生長在水中因此被稱為「馬蹄蓮」。目前竹子湖海芋花田生產總面積約有十三公頃，占全臺海芋產量百分之八十以上；海芋花期自每年元月至五月，花量最盛期在三至四月。竹子湖海芋以白色海芋為主，白色部分形姿優雅的「佛焰苞」並非其花，苞片中央黃色的肉穗花序上開滿了許多毫不起眼的小花，雌雄分隔，井然有序。\r\n\r\n海芋季期間，逢假日(含週休二日)，竹子湖地區湖田橋西經海芋大道方向實施順時針單向行駛交通輸導措施，海芋大道單行管制至往中正山叉路口止；另湖田橋往東湖路段採雙向通行，頂湖段採單向通行且禁止迴轉，疏導由新闢石板路往陽金公路離開。竹子湖地區交通管制實施時段為例假日自上午9時至下午6時，視實際車流量彈性調整\r\n\r\n因竹子湖地區路幅有限，建議欲前往民眾多多利用公眾運輸系統，搭乘捷運、公車前往，相關公眾運輸資訊請上臺北市交通局網站查詢。\r\n\r\n6條海芋步道 不同風情等您領略\r\n想活動一下筋骨，臺北市大地工程處推薦竹子湖的6條溪畔步道，想欣賞大片海芋花田、小油坑壯闊景緻、白鷺鷥和小梯田，可前往頂湖區的「頂湖環狀步道」，路徑平緩易走，老少皆宜，步行時間約20分鐘，如果對早期農家的水車及生態池感興趣，可到下湖區的「海芋環狀步道」，步行時間亦約20分鐘。\r\n\r\n若想觀瀑玩石、欣賞小山丘及梯田景致，水尾區的「文學步道」頗為適合，步行時間僅約10分鐘；想登高遠眺山坡海芋梯田，建議可到「湖底環狀步道」，步行時間約15分鐘。\r\n\r\n至於最長的「竹子湖環狀步道」，由湖田橋進入東湖、頂湖、水尾及下湖，步行時間大約50分鐘，沿路可享受景色怡人的竹子湖風情臺另外還有「芋戀道」，步行時間約15分鐘，3~5月看海芋花、4~6月賞愛情花，5~8月則有繡球花，不同的季節有不同的驚喜。\r\n\r\n提醒上山賞花的民眾，海芋季期間的例假日(含兒童節連假)，竹子湖周邊地區實施交通管制，建議民眾搭乘大眾運輸工具上山。詳細活動及交通資訊可至竹子湖海芋季網站查詢。\r\n\r\n(文：北投區農會)",
            "open_time": "海芋季期間（以官方網站公告為主），逢假日（含週休二日）",
            "zipcode": "112",
            "distric": "北投區",
            "address": "112 臺北市北投區竹子湖",
            "tel": "+886-2-28924185",
            "fax": "",
            "email": "",
            "months": "02,03,04",
            "nlat": 25.1755,
            "elong": 121.53678,
            "official_site": "http://www.callalily.com.tw/index.html",
            "facebook": "https://www.facebook.com/p/%E6%B5%B7%E8%8A%8B%E7%B9%A1%E7%90%83%E7%AB%B9%E5%AD%90%E6%B9%96-100076303840884/",
            "ticket": "",
            "remind": "海芋季期間（以官方網站公告為主），逢假日（含週休二日），仰德大道實施例假日管制；竹子湖地區湖田橋西經海芋大道方向實施順時針單向行駛交通輸導措施，海芋大道單行管制至往中正山叉路口止；另湖田橋往東湖路段採雙向通行，頂湖段採單向通行且禁止迴轉，疏導由新闢石板路往陽金公路離開。竹子湖地區交通管制實施時段為例假日自上午9時至下午6時，視實際車流量彈性調整。因竹子湖地區路幅有限，建議欲前往民眾多多利用公眾運輸系統，搭乘捷運、公車前往，相關公眾運輸資訊請上臺北市交通局網站查詢。",
            "staytime": "",
            "modified": "2024-11-08 10:30:15 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/424",
            "category": [
              {
                "id": 16,
                "name": "戶外踏青"
              },
              {
                "id": 19,
                "name": "親子共遊"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              },
              {
                "id": 62,
                "name": "校外教學"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/181607",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/181610",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/181611",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/181612",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/181613",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/181614",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/181617",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 76,
            "name": "財團法人台北市關渡宮",
            "name_zh": null,
            "open_status": 1,
            "introduction": "<!--\r\n關渡宮是臺灣北部最古老的媽袓廟，其歷史背景可以追朔到清順治年間，由開山石興和尚自福建奉請聖母來臺，當時名稱為「天妃廟」，其後乾隆、道光、光緒年間多次整修，於第5次重修並遷建現址，自石興和尚來臺已有340年以上的歷史。\r\n關渡宮殿內、殿外的石牆、石柱、石獅，都雕滿了歷史故事，作品細膩壯觀。關渡宮的祭典是每年農曆3月23，元宵節和中元節普渡也是年度大事，來自各地參拜的人潮絡繹不絕。由於香火鼎盛，關渡宮不斷擴建，除聖母殿、觀音殿、文昌殿外並有古佛洞，廣渡寺、鼓樓、鐘樓等，面積廣大。\r\n\r\n另外每年元宵節，關渡宮一定會有電動花燈展出，從山下廟宇到山上後花園，大大小小的燈籠及各方精製的花燈，充滿了年節氣息，難怪每年到了這時候，滿滿都是人潮，大人帶著小孩來這裡賞燈並求平安，希望未來一年都可以順順利利。\r\n\r\n\r\n\r\n-->台北市關渡宮擁有三百多年歷史，主祀天上聖母媽祖，是北台灣地區最早的媽祖廟，而除了參拜天上聖母媽祖與諸神明外，來到這裡還可以觀賞許多珍貴的古蹟文物以及豐富的宮廟建築藝術。由於位居大屯、觀音二山的餘脈相交，臨淡水河與基隆河的滙流，風光景緻一覽無遺，每當落日餘暉，宏偉壯闊的景觀，更是令人驚嘆。\r\n\r\n\r\n\r\n\r\n  \r\n  \r\n  \r\n  &nbsp;\r\n\r\n&nbsp;\r\n\r\n  \r\n  \r\n\r\n附近行程推薦:推薦行程\r\n",
            "open_time": "全年無休，每日6:00 - 21:00",
            "zipcode": "112",
            "distric": "北投區",
            "address": "112 臺北市北投區知行路360號",
            "tel": "+886-2-28581281",
            "fax": "",
            "email": "kuantu.eng@msa.hinet.net",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.1177,
            "elong": 121.46395,
            "official_site": "http://www.kuantu.org.tw/",
            "facebook": "https://www.facebook.com/kuantubobi?fref=nf",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-08 10:25:30 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/76",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              },
              {
                "id": 14,
                "name": "宗教信仰"
              },
              {
                "id": 22,
                "name": "借問站"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/64043",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64045",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64046",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64049",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64054",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64062",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 5,
            "name": "關渡_金色水岸_八里左岸自行車道",
            "name_zh": null,
            "open_status": 1,
            "introduction": "基隆河匯入淡水河之前，繞著社子島轉出一個美麗的弧彎，在其北岸與磺港溪以西地帶，保留了都會臺北極其珍貴的稻香田園，連結起河口紅樹林自然保護區，讓人得以在很短的距離內隔絕塵囂嘈雜，單車踩踏其間，尤其能夠體會早年農村氛圍的樸素簡單、踏實自在。夕照裡堤道漫步，河風微微、鳥鳴吱吱，關渡自然保護區生機盎然中，獨有浪漫閒適的野趣滿點。\r\n\r\n穿越關渡平原的自行車道，是全線非封閉性的路徑，西側端點為關渡宮，往東沿著關渡防潮堤至八仙福德祠，轉90度往北穿越關渡平原，直到北投中央北路捷運軌道南側，穿出去便是政戰學校西邊的稻香路。 無法自行攜帶單車的遊人，以關渡宮為起點較方便，一則靠近捷運站，再者可於該處租到自行車或雙人協力車。 關渡宮沿河堤段原有的攤販已完全撤離，改成好走的人行步道，跨越中港河小橋旁停泊的漁船也外移至淡水河邊，雖然少了扁舟停泊的漁港懷舊味，水域卻也另有清爽的風貌。",
            "open_time": "開放空間",
            "zipcode": "112",
            "distric": "北投區",
            "address": "112 臺北市北投區關渡水岸腳踏車道",
            "tel": "+886-2-27258149",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.11382,
            "elong": 121.48003,
            "official_site": "",
            "facebook": "",
            "ticket": "",
            "remind": "1.長度：11.9公里，其中貴子坑溪自行車道約5公里 \r\n2.騎乘時間：約40分鐘",
            "staytime": "",
            "modified": "2024-11-04 17:38:21 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/5",
            "category": [
              {
                "id": 12,
                "name": "單車遊蹤"
              },
              {
                "id": 16,
                "name": "戶外踏青"
              },
              {
                "id": 17,
                "name": "藍色水路"
              },
              {
                "id": 19,
                "name": "親子共遊"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              },
              {
                "id": 62,
                "name": "校外教學"
              },
              {
                "id": 63,
                "name": "單車族"
              },
              {
                "id": 65,
                "name": "賞鳥族"
              },
              {
                "id": 66,
                "name": "健行族"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/63340",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63335",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63337",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63339",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 1,
            "name": "大稻埕碼頭_大稻埕碼頭貨櫃市集",
            "name_zh": null,
            "open_status": 1,
            "introduction": "大稻埕原是平埔族的居住地，因萬華（艋舺）同安人發生激烈的械鬥，造成族人移至大稻埕定居，開始大稻埕淡水河旁商店和房屋的興建，淡水港開放後，大稻埕在劉銘傳的治理下成為臺北城最繁華的物資集散中心，當中以茶葉、布料為主要貿易交易，當時的延平北路及貴德街一帶便是商業活動的重心，也讓大稻埕早年的歷史多采多姿、令人回味。\r\n\r\n",
            "open_time": "平常日以團體預約包船為主，例假日行駛固定航次，請洽詢各船公司。\r\n強烈季風、漲退潮水位差影響航行及靠泊安全，當日實際航班得由現場公告或網站預告調整。\r\n\r\n",
            "zipcode": "103",
            "distric": "大同區",
            "address": "103 臺北市大同區大稻埕碼頭",
            "tel": "+886-2-66057338",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.0564,
            "elong": 121.50761,
            "official_site": "",
            "facebook": "https://www.facebook.com/M.DaDaoCheng/",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-04 17:38:10 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/1",
            "category": [
              {
                "id": 12,
                "name": "單車遊蹤"
              },
              {
                "id": 17,
                "name": "藍色水路"
              },
              {
                "id": 19,
                "name": "親子共遊"
              }
            ],
            "target": [
              {
                "id": 62,
                "name": "校外教學"
              }
            ],
            "service": [
              {
                "id": 144,
                "name": "餐飲"
              },
              {
                "id": 145,
                "name": "購物"
              },
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/182690",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182691",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182692",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182693",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182698",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182702",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182703",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/214149",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/223127",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/223128",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/223129",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63302",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": [
              {
                "src": "https://river-fun.taipei/",
                "subject": "大稻埕古蹟航線 - 藍色水路微旅行"
              }
            ]
          },
          {
            "id": 19,
            "name": "國立故宮博物院",
            "name_zh": null,
            "open_status": 1,
            "introduction": "國立故宮博物院於1965年在外雙溪落成，中國宮殿式的建築，一至三樓為展覽陳列空間，四樓為休憩茶座「三希堂」。藏有全世界最多的中華藝術寶藏，收藏品主要承襲自宋、元、明、清四朝，幾乎涵蓋了整部五千年的中國歷史，數量近70萬件，使國立故宮博物院擁有「中華文化寶庫」的美名。\r\n\r\n故宮博物院內有兩種故宮三寶，一為藝術學界內的故宮三寶，三幅北宋巨碑式水墨畫，但因許多年才展出一次，鮮少人能親眼見到，便又分支出民間版的故宮三寶，也就是翠玉白菜、肉形石、毛公鼎。此三寶因像華人民間小吃「酸菜白肉鍋」，故被封為此稱號。\r\n\r\n國立故宮博物院院區左右側各有一座園林，左側為至善園，右側為至德園。至善園為仿宋代建築而建的庭園，除每周一休園，其餘時間皆可入園參觀，園內有兩座池、三處涼亭，還有許多魚及小動物，非常適合一家大小前來賞園。至德園位於至善路與故宮路交叉口，目前為免費參觀。園區面積不大，入口處是一個別緻的古典圓拱門，園內有一座蓮荷池，夏日來此可以看到大量的蓮花盛開。\r\n\r\n不想假日人擠人參觀故宮的話，故宮還提供了線上故宮的部分，可以透過展覽搶先看觀賞各展覽介紹；利用典藏賞析欣賞各個藏品的美麗樣貌；奇幻互動還能讓你有如進入書畫中，一起感受古人的作品；如果還不夠，可以一同走進故宮，利用720&deg; VR讓你彷彿置身於故宮裡，在虛擬實境空間探索各區域，並能隨時隨地觀看或聆聽展覽及藏品介紹，讓你在家猶如身在故宮。\r\n\r\n國立故宮博物院除了展覽品豐富以外，提供專業導覽，並定期舉辦各類文物研習課程、專題演講及巡迴展出活動，出版百種以上的刊物及專輯，實為世界的文化寶地，國立故宮博物院是來臺灣旅遊的必訪之地。\r\n\r\n(部分資料來源：國立故宮博物院)",
            "open_time": "國立故宮博物院北部院區自109年7月1日起延續開放時間調整措施：開放時間為每週二至週日09:00～17:00，每週一休館，取消每日及週末延長開館時間，同時暫停張大千紀念館對外開放。圖書文獻館自2020年10月19日(一)起至2021年1月底暫停對外開放。\r\n\r\n各項措施調整時間，將參考中央流行疫情指揮中心相關指示辦理，請隨時關注國立故宮博物院官網最新消息。造成您的不便，尚請見諒，感謝您的配合！",
            "zipcode": "111",
            "distric": "士林區",
            "address": "111 臺北市士林區至善路二段221號",
            "tel": "+886-2-28812021",
            "fax": "",
            "email": "service@npm.gov.tw",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.10236,
            "elong": 121.54849,
            "official_site": "https://www.npm.gov.tw/",
            "facebook": "https://www.facebook.com/npmgov/",
            "ticket": "門票及各展區開放時間依官方網站公告為主。",
            "remind": "※本景點為【士林北藝-無圍牆博物館】景點範圍\r\n＊每周一休館\r\n如有需要星期一可配合專場開放\r\n聯繫方式：賴先生\r\n02-28812021#2159\r\n＊免費參觀時間：1月1日元旦、元宵節、5月18日國際博物館日、9月27日世界觀光日、10月10日國慶日。\r\n\r\n＊配合連續假日，112年度週一開館日1/2、1/23、2/27、4/3、5/1、10/9、10/23、10/30、11/6、12/4。",
            "staytime": "2.5-3.5小時",
            "modified": "2024-11-04 17:37:58 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/19",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              },
              {
                "id": 15,
                "name": "藝文館所"
              },
              {
                "id": 19,
                "name": "親子共遊"
              },
              {
                "id": 25,
                "name": "無障礙旅遊推薦景點"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              },
              {
                "id": 62,
                "name": "校外教學"
              }
            ],
            "service": [
              {
                "id": 141,
                "name": "無障礙設施"
              },
              {
                "id": 144,
                "name": "餐飲"
              },
              {
                "id": 145,
                "name": "購物"
              },
              {
                "id": 146,
                "name": "公廁"
              },
              {
                "id": 147,
                "name": "停車場"
              },
              {
                "id": 148,
                "name": "失物招領"
              },
              {
                "id": 149,
                "name": "廣播服務"
              },
              {
                "id": 150,
                "name": "寄物櫃"
              }
            ],
            "friendly": [
              {
                "id": 387,
                "name": "英語友善"
              },
              {
                "id": 388,
                "name": "日語友善"
              },
              {
                "id": 389,
                "name": "韓語友善"
              },
              {
                "id": 390,
                "name": "行動裝置充電"
              },
              {
                "id": 392,
                "name": "無障礙友善服務"
              },
              {
                "id": 393,
                "name": "性別友善"
              },
              {
                "id": 394,
                "name": "信用卡/悠遊卡/第三方支付服務"
              },
              {
                "id": 395,
                "name": "素食友善"
              },
              {
                "id": 396,
                "name": "友善廁所"
              },
              {
                "id": 398,
                "name": "WiFi友善"
              },
              {
                "id": 400,
                "name": "哺(集)乳友善"
              },
              {
                "id": 401,
                "name": "穆斯林友善"
              }
            ],
            "images": [
              {
                "src": "https://www.travel.taipei/image/221733",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221734",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221735",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221736",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221737",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221738",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221739",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221740",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221731",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/221732",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": [
              {
                "src": "https://www.npm.gov.tw/Article.aspx?sNo=02007001",
                "subject": "門票及開放時間"
              }
            ]
          },
          {
            "id": 217,
            "name": "台北101",
            "name_zh": null,
            "open_status": 1,
            "introduction": "台北101購物中心為地上5樓，地下1樓的購物空間，23000坪，是臺灣首座國際頂級購物中心。擁有許多精品旗艦店，如BALLY、LV、Prada、Gucci、Cartier、DIOR及FENDI等，消費者可以享受到最多樣的選擇，與全球流行零時差，輕鬆擁有愉悅的購物時刻。\r\n\r\n台北101購物中心有中式、西式、日式、美式等各國風味美食餐廳，而美食街擁有上千個座位，非常舒適的用餐環境。4樓都會廣場擁有完美的空間設計規劃，佔地500餘坪，挑高40米。採光自然，與四周的露天座椅融合為一體，散發著明亮開闊的現代氛圍。與世貿中心和ATT 4 FUN購物中心有空橋連接，近君悅飯店，交通十分方便。",
            "open_time": "",
            "zipcode": "110",
            "distric": "信義區",
            "address": "110 臺北市信義區信義路5段7號",
            "tel": "+886-2-81018800",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.03361,
            "elong": 121.56476,
            "official_site": "https://www.taipei-101.com.tw/tw/",
            "facebook": "",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-04 17:37:51 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/217",
            "category": [
              {
                "id": 21,
                "name": "101亮點"
              },
              {
                "id": 25,
                "name": "無障礙旅遊推薦景點"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              }
            ],
            "service": [
              {
                "id": 141,
                "name": "無障礙設施"
              },
              {
                "id": 143,
                "name": "場地租用"
              },
              {
                "id": 144,
                "name": "餐飲"
              },
              {
                "id": 145,
                "name": "購物"
              },
              {
                "id": 146,
                "name": "公廁"
              },
              {
                "id": 147,
                "name": "停車場"
              },
              {
                "id": 148,
                "name": "失物招領"
              },
              {
                "id": 149,
                "name": "廣播服務"
              },
              {
                "id": 150,
                "name": "寄物櫃"
              },
              {
                "id": 152,
                "name": "育嬰服務"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/64607",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182758",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182759",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182789",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182847",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182848",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182851",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182852",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182853",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182854",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182855",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 102,
            "name": "臺北北門郵局_臺北901支",
            "name_zh": null,
            "open_status": 1,
            "introduction": "臺灣郵政股份有限公司臺北郵局的前身為劉銘傳所創設的「郵政總局」，日據時期，由於鐵路網設立，火車站的地位日益重要，而郵局業務因為和火車站關係密切，於是遷到今日位置。起初是日式木造建築，後因火災焚毀，乃於1929年重新改建為水泥鋼筋大樓。光復後，因郵政業務擴大及組織變革，遂於民國92年1月1日改制為國營「中華郵政股份有限公司臺北郵局」；96年2月9日更名為「臺灣郵政股份有限公司臺北郵局」。\r\n\r\n臺北郵局是一棟巨大的四層建築，裝飾簡單、線條簡潔。入口門廊突出且呈圓拱狀，建物正面配置四組雙圓形古典式門柱及山頭裝飾，外觀上使用窗洞間內立雙柱分隔窗扇且分化成兩大一小的三開間正面，內部大廳挑高兩層，構造採簡化設計，柱子與大廳天花板的古典雕刻，十分細緻優雅，今日的臺北郵局，由於位在北門旁邊，又稱北門郵局，其郵政業務時間也比較長，直到夜晚還有許多人進出郵寄包裹。\r\n\r\n文字來源：郵政博物館網站",
            "open_time": "週一至週五 郵務:08:30-21:00 \r\n週一至週五 儲匯:08:30-21:00 \r\n 週六:08:30-16:30 \r\n 提供郵務及儲匯業務延時服務郵局(週一至週五)",
            "zipcode": "100",
            "distric": "中正區",
            "address": "100 臺北市中正區忠孝西路1段120號",
            "tel": "+886-2-23615752",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.04692,
            "elong": 121.5114,
            "official_site": "https://www.post.gov.tw/post/internet/I_location/post.jsp?ID=1302&prsb_no=000100-6",
            "facebook": "",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-04 17:37:31 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/102",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              },
              {
                "id": 15,
                "name": "藝文館所"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/64183",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64184",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64185",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64186",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 99,
            "name": "大稻埕辜宅",
            "name_zh": null,
            "open_status": 1,
            "introduction": "位於歸綏街303巷9號的辜家鹽館，是前海基會董事長辜振甫的父親辜顯榮於1910年所興建的。由於辜家當時經營鹽業，因此這棟辜家大宅，也一直被稱為「鹽館」。它就面對著當時的淡水河碼頭，原來是為了做生意，房子建在河邊，船就可以直接在屋前靠岸。\r\n\r\n1961年辜家遷出大宅，1963年現址設立榮星幼稚園，一直到今天。這棟建築相當有特色，仿西洋後期文藝復興式風格，前面設拱廊，外表是淡黃色面磚，還有典雅的拱窗與釉花欄杆，正面中央山牆上的繁瑣勳章與浮雕裝飾，反映了那個時代西風東漸的風潮，是當時富豪之家的代表。走進屋內，大量檜木精工打造的天花、樓梯都保存得相當完好，牆上還有辜顯榮經營的大和洋行標記。辜家鹽館不但見證了辜家的興盛，也成為了臺北的一頁歷史。\r\n",
            "open_time": "",
            "zipcode": "103",
            "distric": "大同區",
            "address": "103 臺北市大同區歸綏街303巷9號",
            "tel": "+886-2-27208889",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.05876,
            "elong": 121.50874,
            "official_site": "",
            "facebook": "",
            "ticket": "古蹟建築(參觀外觀)",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-04 17:37:24 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/99",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              },
              {
                "id": 15,
                "name": "藝文館所"
              }
            ],
            "target": [],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/182510",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182511",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182512",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64178",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64179",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64180",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182507",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182508",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182509",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 90,
            "name": "林安泰古厝民俗文物館",
            "name_zh": null,
            "open_status": 1,
            "introduction": "林安泰古厝初建於1783年，至今已有200多年的歷史。這棟傳統閩南風格的單層2進4合院，是依照民間地理風水習俗而建造的，其屋脊結構採一條龍的單脊做法，以燕尾曲線呈現自然柔和的風貌；外埕舖有紅普石，是當時大陸商船來臺，為避免船身不穩，置於船底作壓艙之用，又稱為壓艙石，它的優點是不長青苔、防滑。材料上大量採用福州杉，石材則採用觀音石，並使用竹釘、木釘，採榫頭方式接合\r\n\r\n古厝前的月眉池，造型正如其名，在中國風水中，屬於聚寶收納的型制，不但具有防禦、防火、供水、降溫等功能，更替古厝環境生色不少。\r\n\r\n走訪古厝內外細細觀察，其中蘊含著無數傳統建築文化的精髓與智慧，也可窺見昔時生活的風貌情境。",
            "open_time": "",
            "zipcode": "104",
            "distric": "中山區",
            "address": "104 臺北市中山區濱江街5號",
            "tel": "+886-2-25996026",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.07175,
            "elong": 121.53035,
            "official_site": "https://linantai.taipei/",
            "facebook": "https://www.facebook.com/LinAnTai/",
            "ticket": "免費入園參觀",
            "remind": "（一）每星期二至星期日09:00-17:00（最後入園時間為16:45）\r\n（二）暑假7-8月期間特別開放至18:00（最後入園時間為17:45）\r\n（三）星期一及民俗節日－春節連假、清明節、端午節、中秋節休館。\r\n（四）免費入園參觀，歡迎租借場地。\r\n\r\n預約申請\r\n（一）提供團體導覽服務，請於活動7日前向駐館人員（02-25996026）申請預約。\r\n（二）攝影相關活動，請依該館規定實名登記入館。",
            "staytime": "",
            "modified": "2024-11-04 17:37:19 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/90",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              },
              {
                "id": 15,
                "name": "藝文館所"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              },
              {
                "id": 62,
                "name": "校外教學"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/388",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64149",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64150",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64151",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64152",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 89,
            "name": "中華民國總統府",
            "name_zh": null,
            "open_status": 1,
            "introduction": "※為辦理本府開放參觀展場更新工程，自113年5月20日起，暫停平日及假日開放參觀活動，重新開放日期將另行公告。\r\n\r\n日本人統治臺灣，並不是一個單純的領土擴張，而是整個東亞殖民地計畫的第一步，所以處處都要是最好的模範，將來才好展示給其它「歸順」的新殖民地。在這個殖民地的目標下，他們學習的對象是西方，在臺灣蓋了很多歐洲巴洛克風格的建築，這些建築技術在今天看來都是很傑出的。\r\n\r\n總統府是日本時期的總督府，於1919年完工，當時總督在辦公室面向東方，可以眺望到四獸山以內的整個臺北市，每天看著旭日東昇，擘劃著永續的宏圖偉業。從第7任總督開始，總共有13位總督在此辦公，光復後陳誠的東南軍政長官公署和中華民國行政院、中華民國總統府共用此建築，而後的歷任總統，均以此為總統府，在此日理萬機。",
            "open_time": "",
            "zipcode": "100",
            "distric": "中正區",
            "address": "100 臺北市中正區重慶南路1段122號",
            "tel": "+886-2-23113731",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.04009,
            "elong": 121.51195,
            "official_site": "https://www.president.gov.tw/",
            "facebook": "https://www.facebook.com/presidentialoffice.tw/",
            "ticket": "免費參觀",
            "remind": "*總統府開放參觀完全免費，詳細參觀資訊請參考官方網站。\r\n*團體請於3天(不含參觀日、預約日及放假日)前辦理網路預約，洽詢專線+886-2-2320-6921、+886-2-2320-6347 (詳如「總統府開放參觀須知」)。",
            "staytime": "",
            "modified": "2024-11-04 17:37:10 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/89",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/215849",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/215850",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/215851",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/215852",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/215853",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/215854",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/215855",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/215856",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/215857",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/215858",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/215859",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/215860",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/215861",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/215862",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 88,
            "name": "北門_承恩門",
            "name_zh": null,
            "open_status": 1,
            "introduction": "臺北古城有一共有5個城門：東門（景福門）、西門（寶成門）、南門（麗正門）、小南門（重熙門）、北門（承恩門），是清光緒年代，劉銘傳時期所建造，鼓勵商人在臺北城內，投資興建房舍，形成街道，活絡發展。\r\n\r\n北門又稱承恩門，面向北方有「承接天恩」之意，是台北僅存的閩南式建築原貌城門，它的區位重要性，在現代是老台北城區「西區」的樞紐地標，在清領時期而言，更是「城內」通往「大稻埕」的核心門戶。是以，西區門戶計畫以北門為核心並聯結周邊日治「鐵道部」、「台北郵局」、「大阪商社」、「三井倉庫」以及清領時期「撫臺街洋樓」、「機器局」......古蹟群，形成「面狀」的歷史景點脈絡，並營造臺北車站前行旅廣場為國家門戶意象，串連臺北車站至北門間軸帶。\r\n\r\n近年建設規劃中原要被拆除的北門，隨著保存文化遺產的觀念興起，於是原樣留下了北門古蹟，北門成為5門當中，唯一以清領時期風貌保留的古城門，是臺北最珍貴的國定古蹟之一，也由於早期具有的防禦功能，成為國防的歷史見證。",
            "open_time": "",
            "zipcode": "100",
            "distric": "中正區",
            "address": "100 臺北市中正區忠孝西路、博愛路交叉口",
            "tel": "+886-2-27208889",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.04773,
            "elong": 121.51123,
            "official_site": "",
            "facebook": "",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-04 17:37:04 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/88",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              },
              {
                "id": 25,
                "name": "無障礙旅遊推薦景點"
              }
            ],
            "target": [],
            "service": [
              {
                "id": 141,
                "name": "無障礙設施"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/64142",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64143",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64144",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64145",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64135",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64136",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64137",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64139",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64140",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 87,
            "name": "臺北市鄉土教育中心_剝皮寮歷史街區",
            "name_zh": null,
            "open_status": 1,
            "introduction": "穿梭在臺北市萬華區的老舊巷弄中，有一處名為「剝皮寮」的老街區，這裡依然延續著百餘年前清代街道的風貌，紅色的磚牆、拱型的騎樓、雕花的窗櫺，呈現典雅樸實之美。\r\n\r\n剝皮寮歷史街區位於龍山寺旁，康定路、廣州街及昆明街口，街區內保存有相當完整的清代街型、清代傳統店屋，其建築空間見證了艋舺市街的發展，擁有獨特之歷史文化和建築特色。\r\n\r\n「臺北市鄉土教育中心」以融入式教育與文化之理念，使其作為推展鄉土教育之園地，將學校教育和社區文化相結合，規劃不同主題展覽，及剝皮寮相關歷史特展，並辦理各項教育活動，以達寓教於樂的功能。\r\n\r\n近年來，剝皮寮街區的發展除了推廣電影文化與活動及教育，更廣納優質的藝文展演，成為文化體驗平臺的入口，期望串聯在地特色，創造故事的流動與回憶，賦予這個空間更多的意義。詳情可見剝皮寮歷史街區營運中心(網址 http://www.bopiliao.taipei)",
            "open_time": "街區：週二～週日 09:00~21:00\r\n室內：週二～週日 09:00~18:00\r\n休館：週一固定休館",
            "zipcode": "108",
            "distric": "萬華區",
            "address": "108 臺北市萬華區康定路173巷",
            "tel": "+886-2-23023199",
            "fax": "",
            "email": "bopiliao@redhouse.org.tw",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.03666,
            "elong": 121.50327,
            "official_site": "http://www.bopiliao.taipei/",
            "facebook": "https://www.facebook.com/Bopiliao/",
            "ticket": "免費入場\r\n\r\n街區：週二～週日 09:00~21:00\r\n室內：週二～週日 09:00~18:00",
            "remind": "團體採預約制，個人可自由參觀，採總量管制入場。",
            "staytime": "",
            "modified": "2024-11-04 17:36:59 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/87",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              },
              {
                "id": 15,
                "name": "藝文館所"
              },
              {
                "id": 18,
                "name": "公共藝術"
              },
              {
                "id": 19,
                "name": "親子共遊"
              }
            ],
            "target": [],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/176584",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176585",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176586",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176587",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176588",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176589",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176576",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176577",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176578",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176579",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176580",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176581",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176582",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/176583",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 86,
            "name": "臺北市孔廟",
            "name_zh": null,
            "open_status": 1,
            "introduction": "臺北市孔廟於1927年興工，座落於文風丕盛的大龍峒老街裡，在臺北市政府規劃推動的都市更新下，與大龍國小、保安宮形成「廟、學、宮」的大龍峒文化園區，具有典儀場所、儒學象徵與市定古蹟等多重意涵。\r\n\r\n臺北市孔廟採曲阜本廟建築形式，樑柱門窗皆未刻字顯得樸實又莊嚴，其布局依序為萬仞宮牆、泮池、櫺星門、儀門、大成殿及崇聖祠，另外可發現孔廟裡所有的柱子、門窗和其他寺廟不同，上面都沒有聯對，據說這表示沒人敢在至聖先師孔夫子門前賣弄文章；且因為民間興築，除形制與規格外，亦加入了區域性裝飾風格，即閩南地區特有之交趾陶與剪粘裝飾，尤以交趾陶裝飾為臺灣地區孔廟建築裡較特殊的一例。\r\n\r\n孔廟的主殿為大成殿，正中央神龕奉祀至聖先師孔子牌位，上方高懸「有教無類」之黑底金字匾額，左右牆奉祀四配(復聖顏子、宗聖曾子、述聖子思、亞聖孟子)與12哲等牌位，瀰漫著莊嚴肅穆的氣息。孔廟的氣氛予人肅敬莊嚴之美，這也是中國儒家文化行事剛正之精神。\r\n\r\n另大成殿裡豐富的交趾陶水車堵飾，是所有臺灣孔廟建築中獨樹一格的特色，值得細細觀賞建築之美。\r\n\r\n孔廟雖然沒有眾多的神像與祭具，但卻擁有不少遵照古制所作的禮器與樂器，每逢9月28日釋奠典禮時表演音樂、舞蹈，並且呈獻牲、酒等祭品，以表達對於孔子的崇敬，每年都吸引了眾多國內外參觀人潮，也讓大家體驗中國傳統祭孔典禮之莊嚴氣氛。\r\n\r\n近年來，孔廟積極活化古蹟，建置了文物展示室、多媒體展示室等設施，可具體瞭解孔廟之美及各項釋奠典禮的禮器、樂器等，還設置了新奇的八佾樂器展示中心，在圖說上輕輕一按，就可以聽到這些樂器的多元聲音，有些低沉，有些清脆高昂，讓遊人在平時就可體會八佾之音，甚至建置全臺孔廟唯一的華語、英語、日語、韓語導覽系統，以服務各國遊客，不僅如此，孔廟更常辦理各項結合傳統與現代藝術的創新活動，每年舉辦的大龍峒文化季系列活動，更可體驗祭禮文化與增進儒學的瞭解，更帶來參觀孔廟的新一波人潮。\r\n\r\n除此之外，在孔廟的明倫堂裡另設有4D虛擬實境劇院，將孔廟的歷史沿革與孔子的生平事蹟以高科技影像技術輔以身歷其境的特效體驗，讓觀眾瞭解孔子與孔廟的故事，除了增添趣味之外，更以嶄新的形式延續了孔廟所代表的教育意義。",
            "open_time": "週二至週日(含國定假日)08:30-21:00  公休日：周一",
            "zipcode": "103",
            "distric": "大同區",
            "address": "103 臺北市大同區大龍街275號",
            "tel": "+886-2-25923934",
            "fax": "+886-2-25852730",
            "email": "ct@mail.taipei.gov.tw",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.07295,
            "elong": 121.5166,
            "official_site": "https://www.tctcc.taipei/",
            "facebook": "https://www.facebook.com/taipeiconfuciustemple",
            "ticket": "免費入園參觀",
            "remind": "每周一公休\r\n導覽服務預約相關資訊請參考官方網站。",
            "staytime": "",
            "modified": "2024-11-04 17:36:49 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/86",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              },
              {
                "id": 14,
                "name": "宗教信仰"
              },
              {
                "id": 19,
                "name": "親子共遊"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              },
              {
                "id": 62,
                "name": "校外教學"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/292831",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/292832",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/292833",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/292834",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/292835",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/292836",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/292837",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/292838",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/292839",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/292840",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/292830",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 85,
            "name": "MAISON ACME｜圓山別邸",
            "name_zh": null,
            "open_status": 1,
            "introduction": "日治時期，台北大稻埕茶商，經營永裕號的陳朝駿，於1913年在台北市基隆河畔圓山地區，起建一棟英國都鐸式風格的洋樓，1914年完工，以作為他招待台灣士紳、政要以及各國茶商的聚會場所，也作為家庭成員休憩、度假及聚會所在地。陳朝駿曾任同業組合台北茶商公會會長，為當時正蓬勃的台灣茶產業重要人物之一。\r\n\r\n這棟房子落成時，正是日治時期，當時政府為建立台灣成為政治、金融及學術教育的中心，有計劃地擴建台北市街，鋪設環城三線林蔭大道；並且引進各種歐洲建築風格，加以混合、變化，使得此時的台灣建築展現了極為繁複的特色，陳朝駿起建的這棟房子正是在這樣的時代風潮下建造的。\r\n\r\n陳朝駿在1923年過世後房子幾經易手，經歷過多次轉變。二次世界大戰後，曾經作為前立法院院長黃國書的住宅，1979年由台北市政府進行徵購，並將此地暫時做為公園路燈管理處北區分隊駐在所，供辦公及置放器具。1987年12月正式交由台北市立美術館管理，於1990年成立「美術家聯誼中心」，1998年被指定為古蹟，調查與修復的工作先後展開。\r\n\r\n在古蹟再利用的理念下，2003年4月19日至2015年4月18日，這棟古蹟由陳國慈女士認養並贊助成立「台北故事館」對外開放，以介紹台灣生活文化和推廣古蹟再利用為目的，透過多樣的活動和展覽讓社會大眾輕鬆的親近古蹟，讓古蹟有了新生命。\r\n\r\n2015年5月起由財團法人郭木生文教基金會接續經營台北故事館，以食、衣、住、行、娛樂為主軸，策劃相關主題展覽及藝文活動、推廣茶文化，持續在「台北故事館」說故事。同時，結合附近社區、民眾和社會資源，一起參與維護古蹟推動文化資產保存教育，延續百年老屋的歷史。\r\n\r\n台北故事館，為仿英國都鐸時期的半木構造建築，是台灣罕見的建築形式。建築一樓以磚造作為承重牆，入口處為愛奧尼克式門柱。二樓為木結構，利用曲線、垂直、水平的木條構成二樓牆外樹枝狀優美的壁面。歌德式塔樓與煙囪則是磚造，塔樓屋頂有弧形屋簷，採用銅瓦鋪成，銅瓦歷久產生銅綠，留下歲月痕跡。\r\n\r\n古蹟入口上方的塔樓鑲嵌著綠、黃、紅三色的彩繪玻璃，室內有著造形優美的壁爐兩座，以及大量流行於二十世紀初，富含大自然、花草圖案的「新藝術」風格凸花磁磚和吊燈。整體室內空間配置，乃至於室外陽台、露台，均與周遭的景觀密切結合，呈現出典雅的風格。\r\n\r\n2021年ACME團隊正式接手台北市定古蹟圓山別莊（原台北故事館）的經營權。興建於1913年，難得的都鐸式風格建築，靜靜地在基隆河畔，跨越超過一世紀的風華洗鍊過去它是大稻埕傳奇茶商的豪邸，也曾是當年頂尖藝術創作者及大文豪的社交中心，我們將其重新定位，作為一座融合新與舊的現代宅邸展演空間。\r\n\r\n",
            "open_time": "台北故事館 10:00~17:30；週一公休。\r\n定時導覽：每日 11:00、15:30。\r\n故事書坊 10:00~﻿17:30；週一公休。",
            "zipcode": "104",
            "distric": "中山區",
            "address": "104 臺北市中山區中山北路三段181之1號",
            "tel": "+886-2-66177979",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.07313,
            "elong": 121.52459,
            "official_site": "",
            "facebook": "https://www.facebook.com/maison.acme",
            "ticket": "",
            "remind": "每周一休館",
            "staytime": "",
            "modified": "2024-11-04 17:36:40 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/85",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              },
              {
                "id": 15,
                "name": "藝文館所"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              },
              {
                "id": 62,
                "name": "校外教學"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/374100",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/374101",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/374102",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/374103",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/374104",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/374095",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/374096",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/374097",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/374098",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/374099",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 84,
            "name": "西門紅樓",
            "name_zh": null,
            "open_status": 1,
            "introduction": "西門紅樓於1908年由日本建築師近藤十郎所建造，由八角樓與十字樓組成，是臺灣第一座官方興建的公營市場，亦是今天全臺所保存最古老完整的三級古蹟建築物。\r\n\r\n其中八角樓的「八卦造型」取其八方雲集之意作為入口、十字樓的「十字架造型」作為主體的特色，另外加上緊鄰兩旁的南北廣場統稱為「西門紅樓」。\r\n\r\n西門紅樓歷經市場、書場、電影院、劇場的角色變換，自2007年起，臺北市政府文化局委由台北市文化基金會營運管理，以文創平台推廣形式，欲達成振興西門町街區發展目標，歷經10餘年經營，已逐步累積文創能量，形塑成現今臺北市甚至是臺灣指標性的文創及藝文據點。\r\n\r\n八角樓一樓為綜合展覽與餐飲、賣場，內部空間規劃了品茶休憩的「紅樓茶坊」、搜羅臺灣風格好物的「紅樓選品」；二樓為古樸別緻的專業表演場地「二樓劇場」。\r\n\r\n十字樓則為推動小型文創產業發展的「河岸留言西門紅樓展演館」與展售空間「16工房」。\r\n\r\n另南北廣場有多元文化體驗活動，除固定館所導覽、創意講談、手作工作坊之外，每個週末還有創意市集及於中央展區不定期展覽等活動。",
            "open_time": "八角樓 ：\r\n週日至週四：11:00-21:30\r\n週五至週六：11:00-22:00\r\n\r\n十字樓：\r\n週二至週四：14:00-21:30\r\n週五：14:00-22:00\r\n週六：11:00-22:00\r\n週日：11:00-21:30\r\n\r\n週一休館",
            "zipcode": "108",
            "distric": "萬華區",
            "address": "108 臺北市萬華區成都路10號",
            "tel": "+886-2-23119380",
            "fax": "+886-2-23142927",
            "email": "service@redhouse.org.tw",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.04207,
            "elong": 121.50693,
            "official_site": "http://www.redhouse.org.tw/",
            "facebook": "https://www.facebook.com/TheRedHouse1908/",
            "ticket": "純參觀無需門票。",
            "remind": "週一休館\r\n市集時間可參考官網",
            "staytime": "",
            "modified": "2024-11-04 17:36:34 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/84",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              },
              {
                "id": 15,
                "name": "藝文館所"
              },
              {
                "id": 18,
                "name": "公共藝術"
              },
              {
                "id": 25,
                "name": "無障礙旅遊推薦景點"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              },
              {
                "id": 62,
                "name": "校外教學"
              }
            ],
            "service": [
              {
                "id": 141,
                "name": "無障礙設施"
              },
              {
                "id": 142,
                "name": "DIY服務"
              },
              {
                "id": 143,
                "name": "場地租用"
              },
              {
                "id": 144,
                "name": "餐飲"
              },
              {
                "id": 145,
                "name": "購物"
              },
              {
                "id": 146,
                "name": "公廁"
              },
              {
                "id": 148,
                "name": "失物招領"
              },
              {
                "id": 149,
                "name": "廣播服務"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/293072",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/293073",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/293074",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/293075",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/293076",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/293068",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/293069",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/293070",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/293071",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 82,
            "name": "臺北清真寺",
            "name_zh": null,
            "open_status": 1,
            "introduction": "走在新生南路上，一定會看到一棟特殊的建築，它有著15公尺高的圓拱頂，每個人經過它，都無法不轉過頭去多看兩眼，這就是臺北的大清真寺。\r\n\r\n清真寺是伊斯蘭教（回教）的禮拜場所。臺北大清真寺面積2,747平方公尺，落成於1960年4月13日，由臺灣與沙烏地阿拉伯共同籌募興建，建築設計者為知名建築師楊卓成先生，他也是圓山飯店的設計師。\r\n\r\n其主體結構採鋼筋混凝土永久式樑柱，外牆加強磚並敷以水泥細石、表面處理及馬賽克圖案裝飾。圓形石柱以斬石加工，主要門窗採大型落地式設計。另外一大特點是大殿之內的圓頂離地有15公尺高，跨距15公尺，中間卻無樑柱支撐。\r\n\r\n大殿內鋪設友邦國王贈送之手工波斯羊毛地毯與懸掛宮廷吊燈，外側之兩座喚拜塔樓高逾20公尺，建築壯觀宏偉。40餘年來，世界各回教國家國王、總統及各界領袖來華訪問，均將蒞臨清真寺為重要行程之一，充分發揮國際外交與民間交流之功能。\r\n\r\n參觀清真寺，需注意禮貌，大禮拜堂和2樓的女士禮拜堂，限回教徒才可以進入。\r\n",
            "open_time": "每日09:00~20:00",
            "zipcode": "106",
            "distric": "大安區",
            "address": "106 臺北市大安區新生南路二段62號",
            "tel": "+886-2-23219445",
            "fax": "+886-2-23935283",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.0279,
            "elong": 121.53403,
            "official_site": "http://www.taipeimosque.org.tw/",
            "facebook": "https://www.facebook.com/taipeimosque/?fref=ts",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-04 17:36:24 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/82",
            "category": [
              {
                "id": 14,
                "name": "宗教信仰"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/64078",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64079",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64075",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64077",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 74,
            "name": "艋舺青山宮",
            "name_zh": null,
            "open_status": 1,
            "introduction": "三國孫權的將軍張滾，治理泉州惠安有成，去世後地方建立青山宮奉祀，張滾被尊稱為青山王或靈安尊王。青山王一向被認為有可以消除瘟疫的威靈，掌握司法、賞懲善惡，配祭的神明有八司、枷將軍和鎖將軍等。\r\n\r\n艋舺青山宮已有百餘年的歷史，是一座三進的木石混合造寺廟，經歷了多次的整修，相當精美，如八角形藻井，相當可觀，整修用料也都頗有典故，如前殿的石柱與石垛，就是取自圓山神社所遺之石材。另外青山王的神像，眼神犀利，從每個角度去凝視，都會感覺不同，民眾可以來這裡親自體會。\r\n\r\n每年的農曆10月23日是青山王聖誕的日子，傳說在前兩天青山王會率領部將巡視艋舺地區的大街小巷，保佑艋舺地區人民的平安。在22日舉辦王爺神轎的夜間遶境活動熱鬧非凡，有著許多的表演活動，像是八家將、鼓陣，樂隊等，家家戶戶在路邊擺設香案和供品，這就是所謂的「艋舺大拜拜」，與大稻埕霞海城隍廟、保生大帝出巡並稱臺北市的3大廟會之一。",
            "open_time": "",
            "zipcode": "108",
            "distric": "萬華區",
            "address": "108 臺北市萬華區貴陽街二段218號",
            "tel": "+886-2-23822296",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.03993,
            "elong": 121.49951,
            "official_site": "",
            "facebook": "https://www.facebook.com/mongaqimgshantempie/",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-04 17:36:09 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/74",
            "category": [
              {
                "id": 14,
                "name": "宗教信仰"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              },
              {
                "id": 149,
                "name": "廣播服務"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/64010",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64013",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64015",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64016",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/64018",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 73,
            "name": "艋舺清水巖",
            "name_zh": null,
            "open_status": 1,
            "introduction": "清水巖位於康定路與長沙路街交叉口，主祀「清水祖師」，故有人稱為清水巖或清水岩，也有人稱它為祖師廟。清水祖師，臺灣民間習慣稱祂祖師公、烏（黑）面祖師、蓬萊祖師、落鼻祖師等等稱呼不一。\r\n\r\n清水祖師為北宋人，生於福建省，俗家名傳說不一，有陳昭、陳應、陳昭應。自幼習佛悟道，曾在蓬萊山的山巖構築一間小精舍修行，由於巖洞內之的水清澈冷冽，精舍被稱為清水巖（岩），此為「清水祖師」名稱的由來。\r\n\r\n相傳清水祖師在清水巖內修行時，有鬼怪用大火將祖師燻得「面目全黑」，而祖師卻是毫髮未傷，「烏（黑）面祖師」由此而來。而「落鼻祖師」之稱，是因為傳說每當祖師廟附近有災難將要發生時，祖師的鼻子就會自動脫落下來，以警示居民與信眾。\r\n\r\n於清水巖的龍、虎二堵牆壁可見磚雕圖騰，正門對聯書：「為清水，為蓬萊，此地並分法界；是金身，是鐵面，入門便見真容。」皆為1817年的重修藝術作品。另外值得一提的是古匾方面，有光緒皇帝御賜「功資拯濟」匾額一面。\r\n\r\n\r\n\r\n\r\n",
            "open_time": "",
            "zipcode": "108",
            "distric": "萬華區",
            "address": "108 臺北市萬華區康定路81號",
            "tel": "+886-2-23711517",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.04028,
            "elong": 121.50265,
            "official_site": "",
            "facebook": "",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-04 17:36:04 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/73",
            "category": [
              {
                "id": 14,
                "name": "宗教信仰"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              },
              {
                "id": 149,
                "name": "廣播服務"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/63980",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63981",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63983",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63985",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63986",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63988",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63992",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63993",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 70,
            "name": "台北天后宮",
            "name_zh": null,
            "open_status": 1,
            "introduction": "台北天后宮，俗稱「西門町媽祖廟」，主祀天上聖母媽祖，現位於臺灣臺北市萬華區成都路上，於1746年時由郊商捐建（當時名為新興宮），與艋舺龍山寺和艋舺祖師廟並稱臺灣清領時期艋舺3大寺廟。1943年因西園路馬路拓寬，所以遭到拆除，神像寄於龍山寺。\r\n\r\n1948年，信徒將暫時寄人籬下的天上聖母神像從龍山寺迎接出來，改供奉在成都路北側近西寧南路口交叉口的「弘法寺」，原先是日本時期日本人所建立的弘法寺，戰後失火燒毀後，新興宮弘法寺的正殿改建更名為「台灣省天后宮」，不久又改稱「台北天后宮」，真是一段曲折的歷史。\r\n\r\n媽祖被視為海上的守護神。早期臺灣有賴海洋以維生，又有東南沿海一帶渡海來臺墾拓，碼頭處即為群眾所居，寺廟亦常築於河巷，是以各地港口多建有媽祖廟，其廟口朝向河對岸的山頭，希望保佑每個討海人及渡海移民安全。\r\n\r\n寺廟內入口處龍邊宮置有古鐘一座，由鐘上所鑄字樣可以得知可見清朝建廟之時其名即為「新興宮」，鑄造年代為1792年（乾隆57年），鑄造地為江蘇無錫。入口處虎邊則置放一座「八仙香爐行宮神龕，八仙蓮花木燭」，原為新興宮神龕，為1820年唐山師傅刻造。\r\n\r\n從1973年以來，日本高野山金剛峰寺及東京別院每年10月到12月間都輪流派遣高僧到台北天后宮，舉行朝聖禮佛法會。台北天后宮的主神是媽祖，陪神是弘法大師，全臺只有台北天后宮有供奉弘法大師，因此往往吸引了許多日本觀光客專程遠道前來參拜。",
            "open_time": "每日07:00~22:00(最後進場時間21:00)",
            "zipcode": "108",
            "distric": "萬華區",
            "address": "108 臺北市萬華區成都路51號",
            "tel": "+886-2-23310421",
            "fax": "+886-2-23122685",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.04279,
            "elong": 121.50633,
            "official_site": "http://xn--djrpt1c90vgrd.tw/Index.aspx?fbclid=IwAR2n4byhykd_jQoXh0x1tpEOn2EhiIO1tR1PWIENUulkWsJigSDRJNp-Tzw",
            "facebook": "https://www.facebook.com/pages/category/Religious-Organization/%E5%8F%B0%E5%8C%97%E5%A4%A9%E5%90%8E%E5%AE%AE-452095124870698/",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-04 17:35:57 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/70",
            "category": [
              {
                "id": 14,
                "name": "宗教信仰"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/63955",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63956",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63958",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63960",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63953",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 69,
            "name": "台北霞海城隍廟",
            "name_zh": null,
            "open_status": 1,
            "introduction": "位於迪化街一段的霞海城隍廟，建於西元1856（咸豐六年），占地約46餘坪，雖沒有巍峨之廟貌，然其信仰圈極廣、香火鼎盛，每逢迎神賽會總是熱鬧非凡、蔚為地方大事，與大稻埕的地方發展息息相關。城隍廟內主祀霞海城隍老爺，從祀二判官（文、武判）、謝范二將軍（七、八爺），配祀三十八義勇公。城隍夫人、八司官、八將軍、馬使爺、及月下老人等，這座著名的古廟，目前有200尊左右的神像，是臺灣神像密度最高的廟。\r\n\r\n在霞海城隍廟中，除了城隍爺之外，最吸引遊客的，莫過於拜月老，每年帶著禮餅來答謝者超過6000對，而其中最搶手的就是馭夫鞋（又名幸福鞋），是臺北市有名的「愛情御守」，平均每年到霞海城隍廟「求鞋」民眾更超過200對家庭。相傳城隍爺和城隍夫人相差約70歲，「老夫疼少妻」下，民間深信這對「神仙伴侶」可為家庭帶來幸福，造就了「馭夫鞋」的由來。\r\n\r\n城隍廟在坊間傳說中，還有著1段神蹟故事。1884年，中法戰爭時，法軍來攻臺灣，當時的臺北人來此虔誠祈禱霞海城隍爺的保護。城隍爺果然大顯靈赫，最終法軍只到五堵為止就被擊敗，未能攻佔臺北，所以民間都尊稱霞海城隍為威靈公。",
            "open_time": "每日早上6:16分至晚上7:47時，全年無休。(除公告之颱風、天然災害外)",
            "zipcode": "103",
            "distric": "大同區",
            "address": "103 臺北市大同區迪化街一段61號",
            "tel": "+886-2-25580346",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.0556,
            "elong": 121.51017,
            "official_site": "http://www.tpecitygod.org/hot-news.html",
            "facebook": "https://www.facebook.com/tpecitygod",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-04 17:35:51 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/69",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              },
              {
                "id": 14,
                "name": "宗教信仰"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/182535",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182536",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182537",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182538",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182539",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182540",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182542",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182543",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/182544",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 68,
            "name": "艋舺龍山寺",
            "name_zh": null,
            "open_status": 1,
            "introduction": "初創之龍山寺，規模雄偉，雕塑精緻，歷經嘉慶二十年（西元1815年）大地震重修，同治六年（西元1867年）暴風雨侵襲再行修築，至民國八年棟樑遭白蟻蛀蝕，當時住持福智大師率先捐出一生積蓄七千餘元，集資修復，奠定今日龍山寺之規模。民國卅四年於第二次世界大戰期間受空襲摧殘，中殿全毀，惟觀世音菩薩聖像仍端坐蓮臺，寶相莊嚴；以往遇有空襲，居民皆以觀世音菩薩蓮座下為避難所，然此次空襲前夕，避難居民因不堪兇蚊肆虐紛紛返家，以致中殿受毀時無人受難，居民相信是觀世音菩薩庇護而奔相走告，此一神蹟更使得觀世音菩薩成為艋舺居民一大精神支柱。龍山寺坐北朝南，面呈回字形，為中國古典三進四合院之宮殿式建築，由前殿、正殿、後殿及左右護龍構成。前殿為11開間，分為三川殿、龍門廳、虎門廳。三川殿前有一對全臺僅見之銅鑄蟠龍柱，正面牆堵則由花崗石與青斗石混合組構而成，牆上故事多出自三國演義和封神榜，富於教育意義。正殿屋頂採歇山重簷式，四面走馬廊共42根柱子構成，殿外牆堵留有多幅著名書法家石刻，殿內的螺旋藻井不費一釘一鐵，全由斗栱相嵌築構而成。後殿屋頂採歇山重簷式，為典型儒、道教諸神佛供奉處。左右護龍各配有鐘樓與鼓樓，晨鐘暮鼓，其轎頂式扁六角形的屋頂，造形獨特。全寺屋頂脊帶和飛簷由龍鳳、麒麟等吉祥物造形，飾以剪黏和交趾陶，色彩瑰麗，堪稱臺灣剪黏藝術之精華。\r\n民國七十四年政府公告艋舺龍山寺為國家保護之二級古蹟，與國立故宮博物院、中正紀念堂並列為國際觀光客來臺旅遊的三大名勝。龍山寺並於板橋文化路興建文化廣場大樓，民國九十四年落成啟用後，辦理多項課程與講座，以善盡弘揚佛法、提倡社教的文化價值。艋舺龍山寺每年定期舉辦節慶祭典及民俗活動，如農曆正月花燈展覽、四月浴佛節、七月盂蘭盆勝會等，民眾來到艋舺龍山寺除了欣賞臺灣寺廟建築藝術之美，亦可以感受傳統民俗文化的樂趣。\r\n\r\n(內文來源：艋舺龍山寺官方網站）",
            "open_time": "6:00~22:00 (辦事處7:00-21:00)",
            "zipcode": "108",
            "distric": "萬華區",
            "address": "108 臺北市萬華區廣州街211號",
            "tel": "+886-2-23025162",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.03716,
            "elong": 121.4999,
            "official_site": "http://www.lungshan.org.tw/",
            "facebook": "",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-04 17:35:41 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/68",
            "category": [
              {
                "id": 14,
                "name": "宗教信仰"
              },
              {
                "id": 25,
                "name": "無障礙旅遊推薦景點"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              }
            ],
            "service": [
              {
                "id": 141,
                "name": "無障礙設施"
              },
              {
                "id": 146,
                "name": "公廁"
              },
              {
                "id": 148,
                "name": "失物招領"
              },
              {
                "id": 149,
                "name": "廣播服務"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/468018",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/468019",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/468020",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/468021",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63935",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/468007",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/468010",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/468011",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/468015",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/468016",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/468017",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          },
          {
            "id": 66,
            "name": "北投普濟寺",
            "name_zh": null,
            "open_status": 1,
            "introduction": "依據臺北「民德寫真館」於1941年發行的《臺灣佛教名蹟寶鑑》，普濟寺與同為臺北市市定古蹟的臨濟護國禪寺都是臨濟宗妙心寺派在臺北的布教據點。1934年重建時，由於其信眾多為臺灣總督府交通局鐵道部員工，因此以鐵道部運輸課長村上彰一之諡號「鐵真」命名為「鐵真院」，並在寺中設立「村上彰一翁碑」。1998年正式列名為市定古蹟，環境充滿寧靜、安適的氣息。\r\n\r\n寺廟採明顯的日式風格，大殿建築為單簷的歇山式面寬3開間，進深亦得3間，近正方形、屋頂向前伸出成為入口玄關、大殿內部地面抬高處鋪上塌塌米，呈現簡樸寧靜而又莊嚴肅穆的日式宗廟之美，而大殿則為高級檜木所造。\r\n\r\n寺廟至今仍保有日式祭拜儀式，有別於傳統的臺灣祭拜模式，正門旁的鐘狀窗牖，深具特色，而入口玄關可看到斗拱，虹樑的精美雕刻，題有普濟寺的匾額是由于右任手書。\r\n\r\n值得一提的是，寺院左邊涼亭內恭奉一尊左手抱嬰兒、右手持禪杖的石佛，一般民眾認為佛像為「送子觀音」，佛教界人士則認為是日本「子安菩薩」，為地藏王菩薩的化身之一，吸引許多善男信女到此祈求子嗣，而湯守觀音與子安菩薩這兩座神祉，成為寺院的一大特色。\r\n\r\n",
            "open_time": "每日08:00~17:00",
            "zipcode": "112",
            "distric": "北投區",
            "address": "112 臺北市北投區溫泉路112號",
            "tel": "+886-2-28914386",
            "fax": "",
            "email": "",
            "months": "01,07,02,08,03,09,04,10,05,11,06,12",
            "nlat": 25.13593,
            "elong": 121.51126,
            "official_site": "https://btdo.gov.taipei/News_Content.aspx?n=0AAD211992E8FC99&s=45EA04B54856D60D",
            "facebook": "https://www.facebook.com/BeitouPujiTemple/",
            "ticket": "",
            "remind": "",
            "staytime": "",
            "modified": "2024-11-04 17:35:36 +08:00",
            "url": "https://www.travel.taipei/zh-tw/attraction/details/66",
            "category": [
              {
                "id": 13,
                "name": "歷史建築"
              },
              {
                "id": 14,
                "name": "宗教信仰"
              }
            ],
            "target": [
              {
                "id": 61,
                "name": "親子共學"
              },
              {
                "id": 66,
                "name": "健行族"
              }
            ],
            "service": [
              {
                "id": 146,
                "name": "公廁"
              }
            ],
            "friendly": [],
            "images": [
              {
                "src": "https://www.travel.taipei/image/63921",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63922",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63923",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63927",
                "subject": "",
                "ext": ".jpg"
              },
              {
                "src": "https://www.travel.taipei/image/63928",
                "subject": "",
                "ext": ".jpg"
              }
            ],
            "files": [],
            "links": []
          }
        ]
      });
      const categories = ref([
        { id: 12, name: "單車遊蹤" },
        { id: 13, name: "歷史建築" },
        { id: 14, name: "宗教信仰" },
        { id: 15, name: "藝文館所" },
        { id: 16, name: "戶外踏青" },
        { id: 17, name: "藍色水路" },
        { id: 18, name: "公共藝術" },
        { id: 19, name: "親子共遊" },
        { id: 21, name: "101亮點" },
        { id: 22, name: "借問站" },
        { id: 23, name: "觀光夜市" },
        { id: 24, name: "主題商街" },
        { id: 25, name: "無障礙旅遊推薦" }
      ]);
      const selectedCategoryId = ref("");
      const filteredData = computed(() => {
      if (!selectedCategoryId.value) {
        return fake_res.value.data || []; //未選擇
      }
      const selectedCategoryIdNum = parseInt(selectedCategoryId.value); //確認類別相同
      //返回類別對應資料
      return fake_res.value.data.filter(item => 
        item.category.some(cat => cat.id === selectedCategoryIdNum)
      );
    });
      const pageSize = ref(10); //每頁筆數
      const currentPage = ref(1); //預設頁面
      //總頁數
      const totalPages = computed(() => {
        const totalItems = fake_res.value?.total ?? 0;
        const size = pageSize.value || 1;
        return Math.ceil(totalItems / size);
      });
      const paginatedData = computed(() => {
        if (!Array.isArray(fake_res.value.data)) {
          return [];
        }
      const startIndex = (currentPage.value - 1) * pageSize.value;
      const endIndex = Math.min(startIndex + pageSize.value, fake_res.value.data.length);
        return fake_res.value.data.slice(startIndex, endIndex);
      });

      return {
        fake_res,
        categories,
        selectedCategoryId,
        filteredData,
        pageSize,
        currentPage,
        totalPages,
        paginatedData
      };
    },
    methods: {
      shortenText(text, length) {
        if (!text) return '';
        return text.length > length ? text.slice(0, length) + '...' : text;
      },
      isChecked(marketId) {
        const selectedMarkets = JSON.parse(localStorage.getItem('selectedMarkets')) || [];
        return selectedMarkets.includes(marketId);
      },
      handleCheckboxChange(marketId) {
      const selectedMarkets = JSON.parse(localStorage.getItem('selectedMarkets')) || [];
      if (selectedMarkets.includes(marketId)) {
        const updatedMarkets = selectedMarkets.filter(id => id !== marketId);
        localStorage.setItem('selectedMarkets', JSON.stringify(updatedMarkets));
      } else {
        selectedMarkets.push(marketId);
        localStorage.setItem('selectedMarkets', JSON.stringify(selectedMarkets));
      }
  }
    },
    mounted() {
      // axios.get(`${this.corsURL}${this.apiURL}`, { params: this.params })
      // .then(res => {
      //   console.log(res, "res");
      //   // this.attractions = res.data.result;
      // })
      // .catch(error => {
      //   console.error("There was an error fetching the data:", error);
      // });
      console.log(this.fake_res);
    }
  };
</script>

<style scoped lang="scss">
  .page_link{
    position: absolute;
    right: 7.2rem;
    top: 1.8rem;
    font-size: 1.1rem;
  }
  .list_title{
    text-align: center;
    font-weight: 1.2rem;
  }
  .market-image{
    width: 200px;
    height: 250px;
  }
  .introduction{
    text-align: left;
  }
  .open_time{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 30ch;
  }
  table{
    border: 1px solid saddlebrown;
  }
  .pagination{
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
</style>
