// 讀取已經解鎖的龜龜 (透過 localStorage，關掉網頁也不會不見)
let unlockedTurtles = JSON.parse(localStorage.getItem("unlockedTurtles")) || [];
// 1. 題庫資料（共 8 題，每題 4 個選項）
const quizData = [
    {
        question: "噗通，你聽到自己跌進了海裡，四周很黑冰冰ㄉ<br>如果可以呼吸會是萬歲牌小魚乾的味道。<br><br>但萬歲牌小魚乾摸起來會黏黏的，你不喜歡黏黏的。為了擺脫黏黏的感覺，你選擇......",
        img: "images/1.png", // 如果這題有圖片，在這裡填入路徑，如 "images/q1.png"
        options: [
            { text: "A黏黏有魚，有魚就是會黏。你悟了，所以不再掙扎。", scores: { x: 0, y: 0 } },
            { text: "B魚死網破，要魚死只能網破了。你打電話停掉了手機門號的網路服務，並大喊了一聲：「破網路 ！」，你想這是必要的犧牲。", scores: { x: 1, y: 1 } },
            { text: "C掉進海裡應該先試著往上遊吧。", scores: { x: 0, y: 1 } },
            { text: "D我要吃小魚乾哇小魚乾最好吃了😋😋😋。", scores: { x: 1, y: 0 } }
        ]
    },
    {
        question: "「黏珊小～」，失去呼吸之際耳畔傳來了神的低語，你在珊瑚礁群中看見一個光的輪廓，裡面有……紅色閃電⚡️⚡️⚡️！<br><br>閃電好像正在朝你靠近，這時候你會……",
        img: "images/2.png",
        options: [
            { text: "A拿出沒有網路的手機估勾這是什麼自然現象，為什麼會這樣🤔🤓🤓。", scores: { x: 0, y: 0 } },
            { text: "B拿出沒有網路的手機，開始錄影拍照，並傳給你的好朋友。", scores: { x: 1, y: 0 } },
            { text: "C拿出沒有網路的手機並開啟麥塊開始遊玩。", scores: { x: 1, y: 1 } },
            { text: "D拿出沒有網路的手機並將其摔向紅色閃電，並吼出魔法咒語，「你為什麼摔我的獎牌阿😭😭😭我也很努力阿💥😫😭這頻道不是只有你一個人在經營欸🏆🏆🏆😭！」", scores: { x: 0, y: 1 } }
        ]
    },
    {
        question: "反正閃電是劈到你了，你失去力氣反而浮上了水面，像是國文課文《愛的辯證》（一題二式）一樣，「水來我在水中等你/火來/我在灰燼中等你」，變成浮屍被撈起來，你可能要送去火化了吧，但你又聽見了神的低語......「其實......我埋下的都是當初的回憶。」即將被埋的你會......",
        img: "images/3.png",
        options: [
            { text: "A安穩的躺好並想著 ㄏㄧㄨˋ 還好是土葬😉👌。", scores: { x: 0, y: 0 } },
            { text: "B開始思考自己泡水很久會不會出現巨人觀，並在棺材裡唱起進擊的巨人主題曲，同時拍打棺材蓋來嚇上面的人😁。", scores: { x: 0, y: 1 } },
            { text: "C你想著，土葬代表可以…… 你從口袋拿出隨身攜帶的效率5鑽石稿，開始沿著下葬地魚骨挖礦。", scores: { x: 1, y: 1 } },
            { text: "D有點累，先睡一下😪💤。", scores: { x: 1, y: 0 } }
        ]
    },
    {
        question: "咕嚕咕嚕，咕嚕咕嚕，陷在土裡，你聽見了肚子餓發出的聲響，但你不餓阿，感到困惑的同時，你發現身上的土一點一點的變輕了，新鮮的空氣順著泥土鬆動的間隙漫了進來，潮濕，下過雨了嗎，腦中浮現了更多的疑問，但你只是具屍體，怎麼會知道。<br><br>土還在變鬆，這個時代還有竊屍賊嗎？疑問也還在增加。你感覺不到土的重量了，頰上傳來與屍體相比更為溫熱的觸感，不知道怎麼做到的，身為屍體的你張開了眼睛，天還是暗的，新生的世界一切都有模糊的輪廓，眼睛漸漸適應了黑暗，你辨識出好像是有一雙手在刨著蓋在你身上的土，目光順著向上，你找到了手的主人。<br><br>夏夜的空氣潮濕，但清新。「欸？你醒了？」<br>竊屍賊是仙女下凡嗎。。。她朝你伸出手<br>「醒了就站起來跟我走吧。」<br>夏夜墓園的空氣清新，可能是露水的味道。<br>聽見問句你選擇......",
        img: "images/4.png",
        options: [
            { text: "A思考0秒後決定…跟著走阿，仙女肯定是好人。", scores: { x: 0, y: 0 } },
            { text: "B思考67秒後決定…跟著走阿！我只是喜歡67。", scores: { x: 1, y: 1 } },
            { text: "C我不，這個，呃…不要!但，慎重考慮後我們還是……跟著走阿，因為不跟著走不能進入下一題😒。", scores: { x: 0, y: 1 } },
            { text: "D呵呵呵哈哈呃呃呃汪汪汪汪汪！", scores: { x: 1, y: 0 } }
        ]
    },
    {
        question: "唉……！我就知道你會跟著走的，神也知道，其實這是神對你的考驗，而很開心地你通過了！神這次不耳語了，他開啟了音訊有些破爛的微損世界廣播，「咳，咳咳，肯額嗯嗯，恭喜你，通過了神ㄉ考驗，現在你可以許一個願望🎉!」<br><br>來，許一個願吧，這時候你想著……",
        img: "images/5.png",
        options: [
            { text: "A一個願望也太少了吧、、、", scores: { x: 0, y: 1 } },
            { text: "B我希望🙏，擁有一顆透明的心靈🫀🫀，和會流淚的眼睛👁💦。給我再去相信的勇氣🎅🎅💥，哦，越過謊言去擁抱你🫂🫂🫂。", scores: { x: 1, y: 0 } },
            { text: "C我想許澡🛀。", scores: { x: 0, y: 0 } },
            { text: "D蛤？所以仙女是假的嗎？！😒😔😔", scores: { x: 1, y: 1 } }
        ]
    },
    {
        question: "神聽到了你的請求，然後忽略了你的請求🤗，他決定送你一個gay year！gap year 有一年的完全空餘且金錢自由的時間，你會如何利用這個🌈gap yaer呢？",
        img: "images/6.png",
        options: [
            { text: "A估勾去年每期大樂透的中獎號碼，並回到去年買對每期大樂透，但這樣好像要再考一次學測，蛋……會有好多錢欸🥚🤑🥚。", scores: { x: 1, y: 0 } },
            { text: "B因為帶著耳機其實聽不清楚神說話🗣🗣🗣，以為他要給你一個gap ear---空的耳朵❌️👂👂，所以你出拳打了神👊👊💥，一步都沒有退欸，怎麼判你輸。", scores: { x: 1, y: 1 } },
            { text: "C申請加入國際救助龜龜組織，拯救每一個無家可歸的龜龜🐢🐢🐢🫶。", scores: { x: 0, y: 0 } },
            { text: "D看天上的星星不停的閃爍💥💥💥～卻不知道他們每顆叫做什麼🤔🤔🤔～你決定花一年的時間投入天文研究👩‍🚀🛸🛸，或是單純的躺在草地上看星星好像也不錯🌠🌠🌠。", scores: { x: 0, y: 1 } }
        ]
    },
    {
        question: "神沒有在聽的，他決定將你送往日本仙台😉，沒有任何物資與金錢支援，真的只是送去而已，這時候你會……",
        img: "images/7.png",
        options: [
            { text: "A我要你愛唉唉😵😫😫我要你為了我變壞，你決定直接變壞，成為會出現在日本新聞台日間播報的，🥷特徵是行竊時會哼唱美秀集團歌曲的日本知名銀行搶劫專家，靠著動人的歌聲與華麗的行竊手法，深受全國人民愛戴❤️‍🔥❤️‍🔥❤️‍🔥，從此不愁吃穿。", scores: { x: 1, y: 1 } },
            { text: "B去海邊捕捉生魚片並開設一家，龜龜の生魚片專賣店🌊🌊🌊，利用開店的薪水定居日本。", scores: { x: 0, y: 1 } },
            { text: "C去海邊淨灘♻️，以保護小型漁民和日本海洋🏊‍♀️，減少海洋酸化並獲得諾貝爾世界海洋不哭獎🦸‍♀️，再利用獎金回台灣。", scores: { x: 0, y: 0 } },
            { text: "D開始在路邊演唱威威孟孟一起去日本～以賺取回程機票的費用🌈。", scores: { x: 1, y: 0 } }
        ]
    },

    {
        question: "噗通，你醒來了，原來剛剛都只是一場夢而已。真是嚇人，睡了太久你感覺有點想料料，這時候你會……",
        img: "images/8.png",
        options: [
            { text: "A直接去料料🚽。", scores: { x: 0, y: 0 } },
            { text: "B打開賴群組傳送，「我好想料料」並拖延著去料料🚪🚻。", scores: { x: 1, y: 0 } },
            { text: "C原地料料🪑。", scores: { x: 0, y: 1 } },
            { text: "D睡回去⚰️🔙。", scores: { x: 1, y: 1 } }
        ]
    }

];

// 2. 結果資料庫
const resultData = {
    "0_0": { title: "​【龜心似箭】", desc: "龜心似箭是軍營中龜派棄弓哥的官配cp，一把弓一隻箭，雖然是單戀也十分般配，故事的開始是阿箭搞得人盡皆知的暗戀，在軍營裡只要龜派出現，旁邊就一定會有阿箭的身影。他們也常互相切磋訓練戰鬥加油打氣，雖然沒有被歸類為戀愛對象但在龜派心中阿箭一定也有一席之地，阿箭也只奢求能一直陪在龜派哥身邊就好，但是有情人終將be，當阿箭得知了龜派死在了沙漠的戰場上，阿箭感到十分的心痛，遺憾，不捨，所有複雜的感覺雜亂的充斥在阿箭的小小戀愛腦裡，愛是克制但他也實在膽小，阿箭的愛一直都只是想要默默守護龜派，但已經，來不及了，也許，能早點說出來，結局就會…不一樣嗎……",advice: "「回不去了，瑞凡，我們回不去了。」", img: "images/99.png" },
    "0_1": { title: "【完龜制麵】", desc: "你是一名​日本拉麵職人，服務於丸亀制麵，為了全心投入拉麵，8年前將自己的本名，高橋桑改名為完龜制麵，完代表你的完人精神，龜代表你的龜龜，制代表你總會先發制人，在客人還沒決定要點什麼拉麵前就先將滾燙的麵條甩到客人臉上，麵代表你麵麵鋸到，由你而出的每根麵條都會先經過你使用電鋸精心修剪成最合適入口的長度大小，內場的閒暇之餘也會拿著電鋸巡外場，確保每位客人都能安心的享受到最好吃的麵條。",advice: "いらっしゃいませ！ララ、今日も頑張ってね！", img: "images/1010.png" },
    "0_2": { title: "​【徹夜未龜】", desc: "徹夜未龜是一隻哲學佬龜龜，原本是一名專門破解烏龜失蹤案的稱職小偵探，準備尋龜蹈矩的過完一生，但某次任務中，你在大西洋南部的英國海外領地聖赫勒拿島的總督府找到了失蹤龜龜，喬納森，住在官邸花園中。他是一隻194 歲的超高齡龜龜，小偵探龜龜詢問了喬納森為何離家出走，在其穩重而成熟的談吐中小偵探龜龜開始思考生命的真諦，美麗的花園、盛開的花園、凋謝的花園，小偵探龜龜陷入了嚴重的存在主義危機。據最後見到的同事描述，小偵探龜龜回到偵探事務所結案的那天十分沉默，眼球也佈滿了紅色的血絲，在整理完喬納森的檔案之後，留下了一句，掰，便離開了事務所，就此沒再回來過，在事務所新人一輪一輪的入職中，他們都始終記得這樣一隻，對本質執拗的前輩，並稱其為～杜蘭朵公主徹夜未龜。", advice: "小小TMI：小偵探龜龜出走前最喜歡穿女裝美美出街哦，難怪日後被稱為杜蘭朵公主徹夜未龜。",img: "images/1111.png" },
    "0_3": { title: "【龜派棄弓】", desc: "龜派棄弓​身為一個勇敢的戰士，因為有大舌頭turtle都會念purple、鐵t救火念成鐵p救火、點pie吃的時候都會不小心叫成tie，所以身上總是掛滿領帶。因為點餐容易失誤，而長年餓吃不飽，所以易怒，作為戰士的他，在西部沙漠迎來了最後的戰役，那一次因為敵人在戰場上，拿出了龜派棄弓一輩子追求的，美味的派，所以拋下了自己的弓箭，死在了派的面前，又因為平常很派所以被後輩戰士們尊稱為---龜派。",advice: "也許可以考慮去上正音班。", img: "images/1212.png" },
    "1_0": { title: "【不醉不龜】", desc: "​你是一隻苦命ㄉ上班族，平常十分乖巧，但下班一定會揪同事一起喝酒，職位不高，但總能招募到公司的年輕小夥伴下班一起跑ktv，每次都會被凹請客，月收入大約等於-8975643，但年輕夥伴都跟你玩得很開心，喝完酒你會不想回家開始耍賴，以龜殼觸地開始華麗發光旋轉，並倒在地上大哭大鬧，有時候不小心在ktv的包廂過夜，用牛肉湯麵洗澡，但隔天一定會再到公司上班。",advice: "下次不妨試試看用花雕雞麵洗澡吧！",img: "images/11.png" },
    "1_1": { title: "【鮭龜】", desc: "​身為烏龜的你，身份認同其實是一隻鮭魚 ，你從龜龜青少年時期，就發現了自己與夥伴龜龜不同的獨特閃光點，你特別鍾愛自己膚色的對比色～～～～🍊🍊🍊橘色！去水上樂園玩飄飄河時，你特別不喜歡這樣子躺在水上，隨波逐流，你想逆流而上上上，你是一隻，無拘無束的～～～🐟鮭鮭！成年後你特別喜歡一個人去壽司店，有時候會躺在醋飯上，假裝自己是一貫美美ㄉ鮭魚壽司，讓師傅們感到有點困擾。", advice: "生活洗洗刷刷，勇敢的鮭鮭要一直忠於自我哦！", img: "images/22.png" },
    "1_2": { title: "​【數學龜納法】", desc: "經過高一的MA_すうがく、수학_​TH嚴格訓練，你知道這題最好要使用數學龜納法來解，但是就會忍不住感到有點生氣，因為字很多。數學龜納法老先生因為童年受過數學老師的嚴格摧殘，每一題都被要求使用數學歸納法解題，連名字都被數學老師改成了數學龜納法！長大後他成為了一位，日常易怒，喜歡罵髒話的冒險老先生，最喜歡找尋體制外的方法、走偏方，常常讓自己身心疲憊，但堅決不再使用被建議的任何方法了！但為了不讓家人擔心，最後都還是會罵罵咧咧的去尋求西醫協助，十分有效。",advice: "大半輩子都被數學老師約束的你，已經不需要任何建議了！隨心所欲的活著吧！去嘗試、去跌倒、去索取、去感受，也許還可以改個名，這是您等來的自己的人生！突き進め!", img: "images/33.png" },
    "1_3": { title: "【中龜中舉】", desc: "逼嘟，回家路上你聽見身後的朋友發出異音，一轉頭，原來是中龜中舉！他剛剛正一邊玩匹克敏一邊把手上的垃圾插進路邊草叢，中龜中舉的獨家種花方法！阿中平時​奉公守法，但就是會亂丟垃圾的那種龜龜，沒辦法，只有這個小小缺點你還是可以包容他的，就算上次他在桌上發現了你掉的一百塊錢，並偷偷拿走去點了一杯，芝芝葡萄果粒加雙倍奶蓋加耶果，並且在你慌忙找錢的時候，優雅啜飲，阿中依舊是你最守規矩的好朋友。",advice: "下次在路邊看到沒關的車門，請中龜中舉的座進去，貼心幫對方關一下下，或是更為暖心的幫他啟動引擎，暖暖車，用你的屁屁暖暖駕駛座，都幫到這裡了，不如就直接幫他開走吧！", img: "images/44.png" },
    "2_0": { title: "​【Phone為龜捏】", desc: "測試結果為phone為龜捏的你，有一點點，一點點，微微的無腦，但是不要擔心，​您還是活的十分清醒的，會為了眼睛與心靈健康，嘗試戒手機，雖然你因為想不到戒手機的好方法所以直接把手機吃了，但是但是。怎麼能說你無腦呢？至少你知道自己手機成癮。怎麼能說你不乖呢？你只是把手機吃了而已。", advice: "我們提供您兩種建議，tip1:快對自己做個哈姆立刻法把手機吐出來吧。tip2:事已至此，不如再吞一條Type-C充電線，65W的變壓豆腐頭與100m延長線，讓肚子裡的手機保持充電吧！",img: "images/55.png" },
    "2_1": { title: "​【你的好龜龜】", desc: "​我是你的好龜龜，我是你的好龜龜，我是你的好龜龜，我是你的好龜龜，追蹤我，追蹤我，追蹤我，追蹤我，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈喝ㄏ痾喝，我喜歡吃日料茄子丸龜好餓喔幹。you r a butttttttt, so i can kick uuuuuu.對啊世足為何不踢屁股呢?一定很精彩，我是天才，我們的愛，過了就不再回來。",advice: "喔愛，啥物是愛?你看我的眼神那呢遮爾可愛，若是講你的心親像大海，我也會甘願，為了你暈船，喔喔喔愛，啥物是愛?你看我的眼神甘嘸一絲絲愛?真想欲在這個花花世界，帶你去一個，溫暖的所在。Now I just want hold you tight, oh baby don’t cry.I miss you in this rainy night.I’ll show you the best in my mind.Let’s dance in the night.I will sing a song for you, the love in my eyes.喔喔喔愛，有你的將來，我對你的感情我講不出來，在這個風風雨雨的世界，你敢會嫌棄，我騎摩托車，喔喔喔愛，有我的未來，我對你的感情我要講出來，在這個風風雨雨的世界，我永遠在這，等你瞭解，喔喔喔愛。", img: "images/66.png" },
    "2_2": { title: "​【生日快樂龜龜】", desc: "恭喜🎉🎉🎉​你是一隻生日快樂龜龜，因為性格溫和，常被當作家寵飼養，只要遇到人就會說：生日快樂！就算是與你親近的主人也阻止不了，但只是一直說生日快樂的話也蠻無害的，而且被制止的時候，生日快樂龜龜也不會生氣，只會這樣看著飼主🥺🥺🥺，所以通常最後都還是能快樂的逢人就，生日快樂🎂！但有一次被飼主帶去參加葬禮，生日快樂龜龜還是改不掉這個習慣，所以主人有點小小的困擾。",advice: "也許在葬禮上我們應該要說，忌日快樂😳，只差了一個字而已，相信龜龜一定能做到的。", img: "images/77.png" },
    "2_3": { title: "【巴西龜】", desc: "​巴西龜是西巴龜的近親，巴西龜（紅耳龜）性格活潑好動、膽大且極為貪吃。牠們對環境適應力強，熟悉飼主後會積極討食、互動性極高。然而，牠們天生具有領域性且掠食性強，不僅混養時容易欺負其他龜類，面對陌生人也常會張嘴威嚇或發出「哈氣」聲，小凶。時常出沒在急診室外，最喜歡插足焦急的病人家屬與護士之間的對話，無腦輸出：「我可以捐！我可以捐！我可以捐！我可以捐！我可以捐！」但護士總會耐心的與他說明：「巴西不行，他不能捐！」",advice: "巴西，要捐，去練舞室捐！平時可以購買小小喉糖，避免觸發全新詞條：「保捐！我的嗓子！」", img: "images/88.png" },
    "3_0": { title: "​【中龜中指】", desc: "是中龜中舉異父異母的好兄弟，中龜中指其實是一隻很乖的小烏龜，只是因為剛學會比中指這個技能，覺得自己很厲害，所以最近不管是出門回家吃飯睡覺還是洗澡都一直比著中指，有時候又要拿蓮蓬頭又要比中指的會不小心把浴室搞得溼答答，但礙於中龜中指實在過於乖巧可愛，飼主也常常拿他們沒辦法，出門散步時，雖然比這中指，但大家路過都會摸摸他的頭。",advice: "也許下次大家在路上遇到中龜中指可以嘗試教導他一些新新的無害手勢哦！67676767", img: "images/1313.png" },
    "3_1": { title: "​【尋龜倒舉】", desc: "尋龜倒舉是一隻很乖巧的肌肉龜龜，​飼主有空時就會跟他一起練習拳擊，飼主沒空時他最喜歡泡在健身房了，但最近全球飼主都擁有一個小小困擾，作為健身陪伴健康運動型寵物龜龜，這一批家寵龜龜好像出廠設定出了點問題，溜他的時候時常會不見蹤影，平均需要尋找3~8分鐘才有機會在不知名角落找到尋龜倒舉龜龜，而被尋獲的龜龜都是默默的在角落倒立舉重，這究竟是人類的陰謀還是外星的危機，且讓我們繼續看下去。",advice: "要為愛運動的素食龜龜補充蛋白質，也許可以試試投喂法式吐司哦！", img: "images/1414.png" },
    "3_2": { title: "【不如龜去！】", desc: "​不如龜去！是一隻熱血龜龜，正如名字裡的！，阿去在遇到任何困難時都不曾畏懼，猶如汪汪隊的小狗總是勇往之前，曾經在與烏龜小伙伴打賭誰比較勇敢時，大喊了一聲：「不如龜去！」，隨後就從亞洲硬生生的遊到了歐洲又遊過了九又四分之三月台最後抵達了霍格華茲，並成功帶上了分類帽，僅在0.00671秒內就被分進了葛來分多，雖然也意外了發現自己其實會說爬說語但為了速速證明自己十分勇敢，便又在大喊了一聲：「不如龜去！」後，一路遊回了小伙伴打賭的地方，並順便在路上取得了葛萊美獎，雖然遊回家時小伙伴都已經不見了，但這並不妨礙不如龜去！成為那一隻最為勇敢的龜龜。",advice: "​又忍著失望的不解的痛恨的\n又只用空瓶把今天砸碎\n然後又哭著對離開了自己的影子道歉\n別氣了沒有誰在跟你作對\n別哭了沒有誰會心碎\n哦沒有勇敢的人\n（哦）\n勇敢的人（哦）\n賣光了一切你的肝和你的肺\n他們扔了你的世界去成為更好的人類\n那廉價的眼淚就別掛在嘴邊\n什麼也沒改變\n什麼也不改變\n請別舉起手槍喔這裡沒有反抗的人\n不用再圍剿啊喔這裡沒有反抗的人\n反抗的人\n(哦)\n反抗的人（哦）\n賣光了一切你的肝和你的肺(所謂的過生活)\n他們扔了你的世界去成為更好的人類(一輩子他都在躲)\n那廉價的眼淚就別掛在嘴邊(一直在躲一直在躲)\n什麼也沒改變(沒有出口沒有出口)\n什麼也不改變", img: "images/1515.png" },
    "3_3": { title: "​【西巴龜】", desc: "​西巴龜早年是一隻相對溫順的巴西龜，但因緣際會之下被送往韓國留學，不知道是在旅途中遭受了什麼打擊，回家後他不再流連於急診室中間，而是隨處跑來跑去，一遇到人就會喊出：「西巴！」，曾有被送至無數訓練中心、寵物學校，但我們活力充沛的西巴龜總能一再逃脫跑來跑去，跑來跑去，西巴，西巴，西巴。",advice: "西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！西巴！", img: "images/1616.png" }
};

// 3. 變數設定
let currentQuestionIndex = 0;
let userScores = { x: 0, y: 0 };
let scoreHistory = [];

// 4. 抓取 HTML 元素
const startPage = document.getElementById("start-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

// 5. 分數轉換程度的函式
function getLevel(score) {
    if (score >= 6) return 3; 
    if (score >= 4) return 2; 
    if (score >= 2) return 1; 
    return 0;                 
}

// 6. 開始測驗 (含年齡檢查)
document.getElementById("start-btn").addEventListener("click", () => {
    if (sessionStorage.getItem("isAdult") == "true") {
        startPage.classList.remove("active");
        quizPage.classList.add("active");
        currentQuestionIndex = 0;
        scoreHistory = [];
        userScores = { x: 0, y: 0 };
        renderQuestion();
        return;
    }

    const isAdult = confirm("此測驗含降智內容，請確認您已年滿 18 歲");
    if (isAdult) {
        sessionStorage.setItem("isAdult", "true");
        startPage.classList.remove("active");
        quizPage.classList.add("active");
        currentQuestionIndex = 0;
        scoreHistory = [];
        userScores = { x: 0, y: 0 };
        renderQuestion();
    } else {
        alert("未滿 18 歲，即將為您跳轉至適合的頁面。");
        window.location.href = "https://www.youtube.com/watch?v=yaKbNveHjRc";
    }
});

// 7. 渲染題目 (加入圖片動態載入邏輯與進度條更新)
function renderQuestion() {
    setTimeout(() => {
        quizPage.scrollTop = 0;
    }, 10);
    const currentQuiz = quizData[currentQuestionIndex];
    
    // 更新進度條文字 (例如：1 / 8)
    const progressText = document.getElementById("progress-text");
    progressText.innerText = (currentQuestionIndex + 1) + " / " + quizData.length;

    // 更新進度條寬度 (依據當前題數填滿比例)
    const progressBar = document.getElementById("progress-bar");
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = progress + "%";

    // 判斷是否顯示回到上一題按鈕 (第一題不顯示)
    const backBtn = document.getElementById("back-btn");
    if (currentQuestionIndex === 0) {
        backBtn.style.display = "none";
    } else {
        backBtn.style.display = "inline-block";
    }
    
    // 渲染文字
    questionText.innerHTML = currentQuiz.question;
    
    // 渲染圖片
    const questionImg = document.getElementById("question-img");
    if (currentQuiz.img) {
        questionImg.src = currentQuiz.img;
        questionImg.style.display = "block";
    } else {
        questionImg.style.display = "none";
    }

    // 渲染按鈕
    optionsContainer.innerHTML = ""; 
    currentQuiz.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = option.text;
        
        btn.addEventListener("click", () => handleOptionClick(option.scores));
        optionsContainer.appendChild(btn);
    });
}

// 8. 點擊選項與計分 (加入分數歷史記錄)
function handleOptionClick(scores) {
    // 在加分之前，先把當前的分數狀態存進歷史紀錄裡
    scoreHistory.push({ x: userScores.x, y: userScores.y });

    userScores.x += scores.x;
    userScores.y += scores.y;
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

// 11. 回到上一題的功能 (請將這段貼在檔案的最下方或適合的地方)
document.getElementById("back-btn").addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        // 從歷史紀錄中取出上一步的分數，並覆蓋當前分數
        const previousScores = scoreHistory.pop();
        userScores.x = previousScores.x;
        userScores.y = previousScores.y;
        
        // 將題目退回一題，並重新渲染畫面
        currentQuestionIndex--;
        renderQuestion();
    }
});

// 9. 顯示結果 (加入結果圖片渲染與 innerHTML 設定)
// 9. 顯示結果 (加入結果圖片渲染與 innerHTML 設定)
function showResult() {
    setTimeout(() => {
        resultPage.scrollTo(0, 0);
    }, 50);
    quizPage.classList.remove("active");
    resultPage.classList.add("active");
    
    const levelX = getLevel(userScores.x);
    const levelY = getLevel(userScores.y);
    
    const resultKey = `${levelX}_${levelY}`;
    const finalResult = resultData[resultKey];

    // 1. 存檔邏輯 (只負責存新龜龜)
    if (!unlockedTurtles.includes(resultKey)) {
        unlockedTurtles.push(resultKey);
        localStorage.setItem("unlockedTurtles", JSON.stringify(unlockedTurtles));
    }

    // 2. 更新背景飄動
    initFloatingTurtles();
    document.getElementById("floating-bg").style.display = "block";

    // 3. 全圖鑑彩蛋觸發邏輯 (已修復：16隻條件與防重複)
    if (unlockedTurtles.length >= 16 && localStorage.getItem("jackpotShown") !== "true") {
        localStorage.setItem("jackpotShown", "true");
        
        setTimeout(() => {
            const jackpot = document.getElementById("jackpot-modal");
            if(jackpot) {
                // 強制賦予全螢幕置中樣式，防止它躲在網頁最底下
                jackpot.style.display = "flex";
                jackpot.style.position = "fixed";
                jackpot.style.top = "0";
                jackpot.style.left = "0";
                jackpot.style.width = "100vw";
                jackpot.style.height = "100vh";
                jackpot.style.backgroundColor = "rgba(0, 0, 0, 0.85)"; // 半透明黑底
                jackpot.style.alignItems = "center";
                jackpot.style.justifyContent = "center";
                jackpot.style.zIndex = "999999"; // 確保在全宇宙的最上層
            } else {
                alert("警告：找不到彩蛋視窗！請檢查 index.html。");
            }
        }, 1500);
    }

    document.getElementById("result-title").innerText = finalResult.title;
    document.getElementById("result-desc").innerHTML = finalResult.desc;
    document.getElementById("result-advice").innerHTML = finalResult.advice || "暫無建議";

    const xPercent = Math.round((userScores.x / 8) * 100);
    const yPercent = Math.round((userScores.y / 8) * 100);
    
    document.getElementById("x-percent-text").innerText = xPercent + "%";
    document.getElementById("x-bar").style.width = xPercent + "%";
    
    document.getElementById("y-percent-text").innerText = yPercent + "%";
    document.getElementById("y-bar").style.width = yPercent + "%";
    
    // 渲染結果圖片
    const resultImg = document.getElementById("result-img");
    if (finalResult.img) {
        resultImg.src = finalResult.img;
        resultImg.style.display = "block";
    } else {
        resultImg.style.display = "none";
    }
}

// 10. 再測一次
document.getElementById("restart-btn").addEventListener("click", () => {
    resultPage.classList.remove("active");
    startPage.classList.add("active");
    setTimeout(() => {
        startPage.scrollTo(0, 0);
        resultPage.scrollTop = 0;
        quizPage.scrollTop = 0; 
    }, 50);
});


// 圖片預載功能：在背景先下載好所有題目與結果的圖片
function preloadImages() {
    // 預載題目圖片
    quizData.forEach(quiz => {
        if (quiz.img) {
            const img = new Image();
            img.src = quiz.img;
        }
    });
    
    // 預載結果圖片
    Object.values(resultData).forEach(result => {
        if (result.img) {
            const img = new Image();
            img.src = result.img;
        }
    });
}

// 當網頁一打開，就立刻執行預載
window.addEventListener("load", preloadImages);
// ==========================================
// 圖鑑系統邏輯
// ==========================================
const collectionModal = document.getElementById("collection-modal");
const closeCollectionBtn = document.getElementById("close-collection");

// 開啟圖鑑按鈕事件 (首頁與結果頁)
document.getElementById("collection-btn-start").addEventListener("click", openCollection);
document.getElementById("collection-btn-result").addEventListener("click", openCollection);

// 關閉圖鑑按鈕事件
closeCollectionBtn.addEventListener("click", () => {
    collectionModal.style.display = "none";
});

// 點擊視窗外面的半透明黑底，也可以關閉圖鑑
window.addEventListener("click", (e) => {
    if (e.target === collectionModal) {
        collectionModal.style.display = "none";
    }
});

// 打開圖鑑並生成 16 個格子
function openCollection() {
    collectionModal.style.display = "flex";
    renderCollection();
    document.querySelector("#collection-modal .modal-content").scrollTop = 0;
}

// 渲染圖鑑網格內容
function renderCollection() {
    const grid = document.getElementById("collection-grid");
    grid.innerHTML = ""; // 先清空，避免重複生成
    
    // 走訪 resultData 裡的 16 種組合
    Object.keys(resultData).forEach(key => {
        const turtle = resultData[key];
        const isUnlocked = unlockedTurtles.includes(key); // 檢查這把鑰匙是否在已解鎖清單中
        
        const itemDiv = document.createElement("div");
        itemDiv.className = "collection-item";
        
        // 如果還沒解鎖，套用 .locked 樣式 (CSS 會自動幫圖片打霧)
        if (!isUnlocked) {
            itemDiv.classList.add("locked");
        }
        
        // 如果沒有圖片路徑，預防性給個空值
        const imgSrc = turtle.img ? turtle.img : "";
        
        // 未解鎖的名稱顯示問號
        const titleText = isUnlocked ? turtle.title : "??? 龜";

        // 把圖片跟文字塞進格子裡
        itemDiv.innerHTML = `
            <img src="${imgSrc}" alt="${titleText}">
            <p>${titleText}</p>
        `;
        
        grid.appendChild(itemDiv);
    });
}
// ==========================================
// 清除所有資料邏輯
// ==========================================
document.getElementById("clear-btn").addEventListener("click", () => {
    // 跳出確認視窗，避免玩家誤觸
    const confirmDelete = confirm("確定要清除所有龜龜圖鑑與測驗紀錄嗎？");
    
    if (confirmDelete) {
        // 1. 清除瀏覽器記憶
        localStorage.removeItem("unlockedTurtles");
        
        // 2. 清除程式內的變數
        unlockedTurtles = [];
        localStorage.removeItem("jackpotShown");
        // 3. 重新渲染圖鑑 (全部變回未解鎖)
        renderCollection();
        
        // 4. 重新初始化背景 (把飄動的龜龜清空)
        initFloatingTurtles();
         sessionStorage.setItem("isAdult", "false");
    }
});
// ==========================================
// 解鎖龜龜背景飄動系統
// ==========================================
const floatingBg = document.getElementById("floating-bg");
let floatingTurtles = [];

function initFloatingTurtles() {
    floatingBg.innerHTML = "";
    floatingTurtles = [];
    
    // 讀取目前解鎖的進度
    const currentUnlocked = JSON.parse(localStorage.getItem("unlockedTurtles")) || [];
    
    currentUnlocked.forEach(key => {
        const turtle = resultData[key];
        if (turtle && turtle.img) {
            const img = document.createElement("img");
            img.src = turtle.img;
            img.className = "floating-turtle";
            
            const size = 100;
            
            // 隨機初始位置
            const x = Math.random() * (window.innerWidth - size);
            const y = Math.random() * (window.innerHeight - size);
            
            // 隨機移動速度
            let vx = (Math.random() - 0.5) * 3;
            let vy = (Math.random() - 0.5) * 3;
            
            // 避免速度太慢停在原地，強迫給個基本速度
            if (Math.abs(vx) < 0.5) vx = vx > 0 ? 1.5 : -1.5;
            if (Math.abs(vy) < 0.5) vy = vy > 0 ? 1.5 : -1.5;
            
            floatingBg.appendChild(img);
            
            floatingTurtles.push({ element: img, x, y, vx, vy, size });
        }
    });
}

function animateTurtles() {
    // 💡 關鍵修改：改用 clientWidth/clientHeight，這是最精準的實際可視範圍
    const winWidth = document.documentElement.clientWidth;
    const winHeight = document.documentElement.clientHeight;
    const numTurtles = floatingTurtles.length;

    let shiftX, shiftY;
    
    // 現在有了 meta viewport，手機寬度絕對會小於 900 了
    if (winWidth <= 900) {
        // 請先把這裡改回較小的數字測試，因為手機不會再誤用電腦版設定了
        shiftX = 0; 
        shiftY = 0; 
    } else {
        // 這是電腦版的設定
        shiftX = 40; 
        shiftY = 40; 
    }

    // 1. 移動碰撞箱的中心點
    floatingTurtles.forEach(t => {
        t.x += t.vx;
        t.y += t.vy;
    });

    // 2. 龜龜與龜龜的碰撞 (完全基於中心點計算，不再受圖片邊界影響)
    for (let i = 0; i < numTurtles; i++) {
        let t1 = floatingTurtles[i];
        for (let j = i + 1; j < numTurtles; j++) {
            let t2 = floatingTurtles[j];

            let dx = t1.x - t2.x;
            let dy = t1.y - t2.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            let sumRadii = (t1.size * 0.55) + (t2.size * 0.55);

            if (distance < sumRadii) {
                let nx = dx / distance;
                let ny = dy / distance;

                let tempVx = t1.vx;
                let tempVy = t1.vy;
                t1.vx = t2.vx;
                t1.vy = t2.vy;
                t2.vx = tempVx;
                t2.vy = tempVy;

                let overlap = sumRadii - distance;
                t1.x += nx * (overlap / 2);
                t1.y += ny * (overlap / 2);
                t2.x -= nx * (overlap / 2);
                t2.y -= ny * (overlap / 2);
            }
        }
    }

    // 3. 螢幕邊緣碰撞 (用真實半徑計算，解決以前貼壁不均勻的問題)
    floatingTurtles.forEach(t => {
        let radius = t.size * 0.35; // 真實碰撞半徑

        // X 軸邊界
        if (t.x + radius >= winWidth) {
            t.x = winWidth - radius;
            t.vx = -Math.abs(t.vx);
        } else if (t.x - radius <= 0) {
            t.x = radius;
            t.vx = Math.abs(t.vx);
        }

        // Y 軸邊界
        if (t.y + radius >= winHeight) {
            t.y = winHeight - radius;
            t.vy = -Math.abs(t.vy);
        } else if (t.y - radius <= 0) {
            t.y = radius;
            t.vy = Math.abs(t.vy);
        }
    });

    // 4. 繪製畫面：將圖片渲染在偏移過的位置上
    floatingTurtles.forEach(t => {
        // t.x, t.y 是碰撞箱中心。
        // 減去 size/2 將圖片置中，再減去 shiftX 與 shiftY 把圖片往左上推。
        let renderX = t.x - (t.size / 2) - shiftX;
        let renderY = t.y - (t.size / 2) - shiftY;
        
        t.element.style.transform = `translate(${renderX}px, ${renderY}px)`;
    });

    requestAnimationFrame(animateTurtles);
}

   
// 網頁初始載入時啟動飄動系統
initFloatingTurtles();
animateTurtles();

// ==========================================
// 全圖鑑彩蛋邏輯
// ==========================================
// ==========================================
// 全圖鑑彩蛋邏輯
// ==========================================
const jackpotModal = document.getElementById("jackpot-modal");
const jackpotFormContainer = document.getElementById("jackpot-form-container");
const jackpotSuccessContainer = document.getElementById("jackpot-success-container");
const jackpotSubmitBtn = document.getElementById("jackpot-submit-btn");
const jackpotClaimBtn = document.getElementById("jackpot-claim-btn");

// 加上安全檢查：如果有找到按鈕，才綁定點擊事件
if (jackpotSubmitBtn) {
    jackpotSubmitBtn.addEventListener("click", () => {
        const lastName = document.getElementById("jackpot-lastname").value;
        const firstName = document.getElementById("jackpot-firstname").value;
        
        if (lastName === "" || firstName === "") {
            alert("請至少填寫您的姓名喔！");
            return;
        }
        
        if (jackpotFormContainer && jackpotSuccessContainer) {
            jackpotFormContainer.style.display = "none";
            jackpotSuccessContainer.style.display = "block";
        }
    });
}

if (jackpotClaimBtn) {
    jackpotClaimBtn.addEventListener("click", () => {
        window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0"; 
    });
}