'use client';

import { useEffect, useMemo, useState } from 'react';

const tripDays = [
  { day: 1, date: 'ศ. 9 ต.ค.', fullDate: '2026-10-09', route: 'กรุงเทพฯ → Nagoya', place: 'เดินทางถึงญี่ปุ่น / Nagoya', temp: '18° / 24° / 20° / 16°', rain: 20, weather: '☀️ → 🌦️', note: 'วันเดินทาง • รับรถ/เข้าที่พัก' },
  { day: 2, date: 'ส. 10 ต.ค.', fullDate: '2026-10-10', route: 'Nagoya → Magome Juku → Achi Village', place: 'Magome Juku • Achi Village', temp: '14° / 22° / 18° / 14°', rain: 20, weather: '☀️ → 🌦️', note: 'Nakasendo • Stargazing / Heavens Sonohara' },
  { day: 3, date: 'อา. 11 ต.ค.', fullDate: '2026-10-11', route: 'Achi → Matsumoto', place: 'Matsumoto Castle • City • Museum', temp: '13° / 21° / 16° / 11°', rain: 20, weather: '☀️ → 🌦️', note: 'ชมปราสาทมัตสึโมโตะ • เมืองเก่า' },
  { day: 4, date: 'จ. 12 ต.ค.', fullDate: '2026-10-12', route: 'Matsumoto → Norikura Kogen → Hakuba', place: 'Mt. Norikura / Tatamidaira → Hakuba', temp: '8° / 18° / 10° / 5°', rain: 30, weather: '☀️ → 🌧️', note: 'ภูเขาสูง • Echo Line • น้ำตก/ใบไม้เปลี่ยนสี' },
  { day: 5, date: 'อ. 13 ต.ค.', fullDate: '2026-10-13', route: 'Hakuba: Happo Pond → Tsugaike → Iwatake', place: 'Hakuba Alpine Day', temp: '7° / 17° / 9° / 4°', rain: 40, weather: '☀️ → 🌧️', note: 'Gondola / Hiking / Alpine views' },
  { day: 6, date: 'พ. 14 ต.ค.', fullDate: '2026-10-14', route: 'Hakuba → Kamikochi', place: 'Kamikochi • Myojin Pond', temp: '8° / 20° / 12° / 8°', rain: 10, weather: '☀️ → 🌦️', note: 'เดินป่าเส้นทาง Myojin Pond • พัก Kamikochi' },
  { day: 7, date: 'พฤ. 15 ต.ค.', fullDate: '2026-10-15', route: 'Kamikochi → Takayama', place: 'Taisho Pond → Kappa Bridge → Takayama', temp: '10° / 20° / 12° / 8°', rain: 10, weather: '☀️ → 🌦️', note: 'เดินเส้นทาง Taisho Pond → Kappa Bridge' },
  { day: 8, date: 'ศ. 16 ต.ค.', fullDate: '2026-10-16', route: 'Takayama → Nagoya', place: 'Takayama → Nagoya Shopping', temp: '12° / 22° / 15° / 11°', rain: 20, weather: '☀️ → 🌦️', note: 'Miyagawa Morning Market • Sakae / Nagoya' },
  { day: 9, date: 'ส. 17 ต.ค.', fullDate: '2026-10-17', route: 'Nagoya → BKK', place: 'เดินทางกลับ', temp: '16° / 23° / 18° / 14°', rain: 20, weather: '☀️ → 🌦️', note: 'เช็กเอาต์ • เดินทางกลับ' },
];

const places = [
  { id:'magome', city:'Kiso Valley', title:'Magome Juku', desc:'เมืองพักบนเส้นทาง Nakasendo บ้านไม้โบราณและถนนหิน เหมาะกับการเดินชมบรรยากาศเมืองไปรษณีย์ยุคเอโดะ', image:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80', map:'https://www.google.com/maps/search/?api=1&query=Magome-juku+Nagiso+Nagano', tags:['Day 2','Historic town','Photo spot'] },
  { id:'matsumoto', city:'Matsumoto', title:'Matsumoto Castle', desc:'ปราสาทแห่งชาติที่โดดเด่นด้วยหอคอยสีดำ และเป็นจุดชม Northern Alps ในเมือง Matsumoto', image:'https://imgcp.aacdn.jp/img-a/auto/auto/aa/gm/article/5/1/4/1/8/8/1758792894/topimg_large.jpeg', map:'https://www.google.com/maps/search/?api=1&query=Matsumoto+Castle', tags:['Day 3','Landmark','Autumn'] },
  { id:'norikura', city:'Matsumoto / Norikura', title:'Norikura Kogen & Mt. Norikura', desc:'พื้นที่ภูเขาสูงตั้งแต่ราว 1,500 ม. ไปจนถึงยอดเขา เหมาะสำหรับชมใบไม้เปลี่ยนสีและวิวเหนือเมฆ', image:'https://www.go-nagano.net/hubfs/blog_assets/nagano-day-trips/Hakuba-Happo-Pond-01.jpg', map:'https://www.google.com/maps/search/?api=1&query=Norikura+Kogen', tags:['Day 4','Alpine','Koyo'] },
  { id:'happo', city:'Hakuba', title:'Happo Pond', desc:'เส้นทาง alpine ยอดนิยมของ Hakuba เดินผ่าน gondola/lift ไปยังวิวภูเขา Hakuba Sanzan และบ่อน้ำสะท้อนเทือกเขา', image:'https://www.go-nagano.net/hubfs/blog_assets/nagano-day-trips/Hakuba-Happo-Pond-01.jpg', map:'https://www.google.com/maps/search/?api=1&query=Happo+Pond+Hakuba', tags:['Day 5','Hiking','Live cam'] },
  { id:'tsugaike', city:'Hakuba / Otari', title:'Tsugaike Nature Park', desc:'พื้นที่ธรรมชาติบนระดับสูง มี boardwalk และวิวเทือกเขา Hakuba เหมาะกับช่วงใบไม้เปลี่ยนสี', image:'https://www.go-nagano.net/hubfs/blog_assets/nagano-day-trips/Hakuba-Happo-Pond-01.jpg', map:'https://www.google.com/maps/search/?api=1&query=Tsugaike+Nature+Park', tags:['Day 5','Nature','Gondola'] },
  { id:'iwatake', city:'Hakuba', title:'Hakuba Iwatake Mountain Resort', desc:'จุดชมวิวแบบพาโนรามา พร้อมกิจกรรมบนภูเขา เช่น Mountain Cart และ Giant Swing', image:'https://www.go-nagano.net/hubfs/blog_assets/nagano-day-trips/Hakuba-Happo-Pond-01.jpg', map:'https://www.google.com/maps/search/?api=1&query=Hakuba+Iwatake+Mountain+Resort', tags:['Day 5','Panorama','Activity'] },
  { id:'kamikochi', city:'Matsumoto', title:'Kamikochi / Kappa Bridge', desc:'หุบเขาสูงประมาณ 1,500 ม. มี Azusa River, Kappa Bridge, Myojin Pond และแนวเขา Hotaka เป็นฉากหลัง', image:'https://img.activityjapan.com/wi/nagano-fall-sightseeing13.jpeg', map:'https://www.google.com/maps/search/?api=1&query=Kamikochi+Kappa+Bridge', tags:['Day 6–7','Hiking','Autumn'] },
  { id:'takayama', city:'Gifu', title:'Takayama Old Town', desc:'ย่านเมืองเก่าบรรยากาศดั้งเดิม เหมาะกับการเดินเล่น ชิม Hida beef และแวะตลาดเช้า Miyagawa', image:'https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1200&q=80', map:'https://www.google.com/maps/search/?api=1&query=Takayama+Old+Town', tags:['Day 7–8','Old town','Food'] },
  { id:'sakae', city:'Nagoya', title:'Sakae / Oasis 21', desc:'ย่านช้อปปิ้งและ nightlife ของ Nagoya รอบ Oasis 21, MIRAI TOWER และห้างสรรพสินค้าหลายแห่ง', image:'https://res.cloudinary.com/jnto/image/upload/w_750%2Ch_503%2Cfl_lossy%2Cf_auto/v1645706712/aichi/M_00427_001', map:'https://www.google.com/maps/search/?api=1&query=Oasis+21+Nagoya', tags:['Day 8','Shopping','Night view'] },
];

const food = [
  { city:'Magome', name:'Mikazukian', type:'Soba', note:'ร้านอาหารที่อยู่ในโปรแกรม Day 2 ตามเอกสารทริป', map:'https://www.google.com/maps/search/?api=1&query=Mikazukian+Magome' },
  { city:'Matsumoto', name:'Picnic Kaishu', type:'อาหาร / ร้านในแผน', note:'ชื่อร้านตามเอกสารทริป Day 3', map:'https://www.google.com/maps/search/?api=1&query=Picnic+Kaishu+Matsumoto' },
  { city:'Hakuba', name:'Kikyo-ya', type:'Soba / Japanese', note:'ร้านอาหารในแผน Day 5', map:'https://www.google.com/maps/search/?api=1&query=Kikyo-ya+Hakuba' },
  { city:'Takayama', name:'Sengoku-ya', type:'Hida / Japanese', note:'ร้านอาหารในแผน Day 7', map:'https://www.google.com/maps/search/?api=1&query=Sengoku-ya+Takayama' },
  { city:'Matsumoto', name:'Alps Gohan', type:'Japanese', note:'ตัวเลือกเพิ่มเติมจากข้อมูลธุรกิจที่ค้นล่าสุด', map:'https://www.google.com/maps/search/?api=1&query=Alps+Gohan+Matsumoto' },
  { city:'Hakuba', name:'Goldy’s Hakuba Cafe & Pub', type:'Cafe / Restaurant', note:'ตัวเลือกเพิ่มเติมใน Hakuba', map:'https://www.google.com/maps/search/?api=1&query=Goldys+Hakuba+Cafe+Pub' },
];

const shopping = [
  ['Hakuba','The Big Hakuba','ซูเปอร์มาร์เก็ต เหมาะสำหรับซื้ออาหาร/ของใช้ก่อนเข้าที่พัก'],
  ['Hakuba','snow peak Land Station Hakuba','อุปกรณ์ outdoor และของที่ระลึก'],
  ['Hakuba','Patagonia Hakuba Store','เสื้อผ้า outdoor / ของที่ระลึก'],
  ['Hakuba','The North Face Gravity Hakuba','เสื้อผ้าและอุปกรณ์ outdoor'],
  ['Nagoya','Sakae / Oasis 21','ห้าง ร้านอาหาร แหล่งช้อปปิ้งและ nightlife'],
  ['Nagoya','Osu Shopping Street','ถนนช้อปปิ้งขนาดใหญ่ เหมาะกับของกินและของฝาก'],
];

const activities = [
  ['🌌','Stargazing at Heavens Sonohara','Day 2','เช็กสภาพอากาศ/หมอกและรอบเวลาในวันจริง'],
  ['🚠','Happo Alpen Line + Happo Pond','Day 5','เช็ก live camera ก่อนขึ้นเขา'],
  ['🌿','Tsugaike Nature Park','Day 5','เหมาะกับการเดิน boardwalk ชม alpine foliage'],
  ['🏔️','Iwatake Panorama + Giant Swing','Day 5','เลือกทำกิจกรรมตามอากาศและลม'],
  ['🥾','Myojin Pond / Kappa Bridge','Day 6–7','เดินป่าแบบ easy–moderate; เตรียมรองเท้ากันลื่น'],
  ['🍎','Apple / Hida sweets & local food','Day 3–8','ลองผลผลิตฤดูใบไม้ร่วงและของหวานท้องถิ่น'],
];

const cams = [
  ['🎥','Kamikochi Live / YouTube','https://www.youtube.com/live/Iv2VUE_UhRQ?si=L-IcCZgPPnBF9VRl','ดูสภาพพื้นที่/อากาศก่อนออกเดินทาง'],
  ['📷','Happo-one Live Camera','https://www.happo-one.jp/trekking/livecamera/','Happo Pond / Usagidaira / Gondola / Car Park'],
  ['📷','Tsugaike Live Camera','https://www.tsugaike.gr.jp/livecamera','Tsugaike Gondola / Nature Park / parking'],
  ['📷','Iwatake PANOMAX','https://iwatake.panomax.com/','วิวพาโนรามา Hakuba Iwatake'],
  ['📷','Hakuba Webcams','https://hakubatravel.com/hakuba-webcams/','รวมกล้องหลายจุดใน Hakuba'],
  ['📷','Norikuradake','https://norikuradake.jp/','ข้อมูล/สภาพภูเขา Norikura'],
  ['🚗','Chubu Sangaku Parking Feed','https://chubusangaku.jp/ja/plan/parkingfeed/','เช็กที่จอด/การจราจรพื้นที่ภูเขา'],
];

const foliage = [
  { place:'Kamikochi – Kappa Bridge', period:'10–29 ต.ค.', status:'เริ่มเข้าสู่ช่วงชมใบไม้', color:'green', source:'Visit Matsumoto • อัปเดต 30 ก.ย. 2026' },
  { place:'Kamikochi – Karamatsu (larch)', period:'14–31 ต.ค.', status:'ช่วงเดินทางพอดีกับการเริ่มพีค', color:'amber', source:'Visit Matsumoto • อัปเดต 30 ก.ย. 2026' },
  { place:'Norikura Kogen', period:'10–31 ต.ค.', status:'มีโอกาสสวยมากในทริป', color:'green', source:'Visit Matsumoto • อัปเดต 30 ก.ย. 2026' },
  { place:'Mt. Norikura (Sanbondaki–Kuragahara)', period:'2–10 ต.ค.', status:'ช่วงพีคกำลังผ่านในวันแรก ๆ ของทริป', color:'red', source:'Visit Matsumoto • อัปเดต 1 ต.ค. 2026' },
  { place:'Matsumoto Castle', period:'28 ต.ค.–12 พ.ย.', status:'ยังไม่ใช่ช่วงพีคในทริปนี้', color:'blue', source:'Visit Matsumoto • อัปเดต 30 ก.ย. 2026' },
];

const locations = {
  Nagoya:{lat:35.1815,lon:136.9066}, Achi:{lat:35.4434,lon:137.7137}, Matsumoto:{lat:36.2380,lon:137.9720},
  Norikura:{lat:36.1233,lon:137.6178}, Hakuba:{lat:36.6984,lon:137.8619}, Kamikochi:{lat:36.2481,lon:137.6308}, Takayama:{lat:36.1461,lon:137.2522}
};

function mapsUrl(q){ return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`; }
function formatTimeUntil(target){
  const ms = new Date(target) - new Date(); if(ms<=0) return 'ทริปกำลังเริ่ม/อยู่ระหว่างเดินทาง';
  const d=Math.floor(ms/86400000), h=Math.floor(ms%86400000/3600000), m=Math.floor(ms%3600000/60000);
  return `${d} วัน ${h} ชม. ${m} นาที`;
}

export default function Home(){
  const [active,setActive]=useState('home');
  const [countdown,setCountdown]=useState('');
  const [weather,setWeather]=useState({});
  const [weatherLoading,setWeatherLoading]=useState(true);

  useEffect(()=>{ const tick=()=>setCountdown(formatTimeUntil('2026-10-09T20:15:00+07:00')); tick(); const id=setInterval(tick,60000); return()=>clearInterval(id)},[]);
  useEffect(()=>{
    const load=async()=>{
      try{
        const entries=Object.entries(locations);
        const data={};
        await Promise.all(entries.map(async([name,p])=>{
          const u=`https://api.open-meteo.com/v1/forecast?latitude=${p.lat}&longitude=${p.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&start_date=2026-10-09&end_date=2026-10-17`;
          const r=await fetch(u); const j=await r.json(); data[name]=j.daily;
        }));
        setWeather(data);
      }catch(e){ console.error(e); } finally{ setWeatherLoading(false); }
    }; load();
  },[]);

  const nav=[['home','หน้าแรก'],['plan','แผนเที่ยว'],['places','สถานที่'],['food','กิน'],['shop','ช้อป'],['weather','อากาศ & ใบไม้'],['cams','Live Camera'],['tips','คู่มือ']];
  const go=(id)=>{setActive(id); document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});};
  const selectedWeather=useMemo(()=>weather['Hakuba']?.time?.map((d,i)=>({date:d,max:weather.Hakuba.temperature_2m_max[i],min:weather.Hakuba.temperature_2m_min[i],rain:weather.Hakuba.precipitation_probability_max[i],code:weather.Hakuba.weather_code[i]})),[weather]);

  return <main>
    <header className="hero">
      <div className="heroOverlay">
        <div className="eyebrow">TRIP MEMBER GUIDE • 2026</div>
        <h1>Japan Autumn Trip <span>2026</span></h1>
        <p className="heroSub">Nagoya → Magome → Achi → Matsumoto → Norikura → Hakuba → Kamikochi → Takayama</p>
        <div className="heroMeta"><b>9–17 ตุลาคม 2569</b><span>9 วัน 8 คืน</span><span>🍁 Japan Alps Autumn</span></div>
        <div className="countdown">⏳ เหลือก่อนออกเดินทาง: <b>{countdown}</b></div>
      </div>
    </header>

    <nav className="stickyNav">{nav.map(([id,label])=><button key={id} className={active===id?'active':''} onClick={()=>go(id)}>{label}</button>)}</nav>

    <section id="home" className="section introGrid">
      <div className="welcome card"><span className="pill">TRIP AT A GLANCE</span><h2>คู่มือทริปสำหรับเปิดดูจากมือถือ</h2><p>รวมกำหนดการ สถานที่ อาหาร ช้อปปิ้ง กิจกรรม สภาพอากาศ ใบไม้เปลี่ยนสี และ Live Camera ไว้ในหน้าเดียว</p><div className="quickBtns"><button onClick={()=>go('plan')}>📅 ดูตารางทริป</button><button onClick={()=>go('cams')}>📷 เช็ก Live Camera</button><a href={mapsUrl('Nagoya Station Japan')} target="_blank">📍 เปิด Google Maps</a></div></div>
      <div className="card routeCard"><h3>🗺️ เส้นทางหลัก</h3><div className="routeLine">Nagoya <i>→</i> Kiso Valley <i>→</i> Matsumoto <i>→</i> Norikura <i>→</i> Hakuba <i>→</i> Kamikochi <i>→</i> Takayama <i>→</i> Nagoya</div><div className="miniStats"><div><b>4</b><small>โซนภูเขา</small></div><div><b>3</b><small>เมืองหลัก</small></div><div><b>7+</b><small>Live cams</small></div></div></div>
    </section>

    <section id="plan" className="section"><div className="sectionHead"><div><span className="eyebrow">ITINERARY</span><h2>ตารางแผนการท่องเที่ยว</h2></div><a href="/trip-overview.jpg" className="ghostBtn">📄 เอกสารต้นฉบับ</a></div>
      <div className="tableWrap"><table><thead><tr><th>วัน</th><th>เส้นทาง / โปรแกรม</th><th>อากาศในเอกสาร</th><th>ฝน</th><th>ไฮไลต์</th><th></th></tr></thead><tbody>{tripDays.map(d=><tr key={d.day}><td><b>Day {d.day}</b><small>{d.date}</small></td><td><b>{d.route}</b><small>{d.place}</small></td><td>{d.weather}<small>{d.temp} °C</small></td><td><span className={d.rain>=40?'risk high':d.rain>=30?'risk med':'risk low'}>{d.rain}%</span></td><td>{d.note}</td><td><a className="mapBtn" href={mapsUrl(d.place)} target="_blank">Map ↗</a></td></tr>)}</tbody></table></div>
      <div className="sourceNote">ข้อมูลกำหนดการด้านบนยึดตามเอกสารแผนทริปที่แนบมา; เวลา/ร้าน/รายละเอียดบางรายการใน PDF อาจมีการเปลี่ยนแปลง ควรเช็กอีกครั้งก่อนเดินทาง</div>
    </section>

    <section id="places" className="section"><div className="sectionHead"><div><span className="eyebrow">PLACES & LANDMARKS</span><h2>สถานที่ท่องเที่ยว & Landmark</h2></div></div><div className="cards">{places.map(p=><article className="placeCard" key={p.id}><div className="photo"><img src={p.image} alt={p.title} loading="lazy" onError={(e)=>{e.currentTarget.style.display='none'}}/><div className="photoFallback">🍁 {p.city}</div></div><div className="placeBody"><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><h3>{p.title}</h3><p>{p.desc}</p><a href={p.map} target="_blank">📍 เปิดตำแหน่งบน Google Maps ↗</a></div></article>)}</div></section>

    <section id="food" className="section alt"><div className="sectionHead"><div><span className="eyebrow">FOOD GUIDE</span><h2>ร้านอาหารแนะนำ</h2></div></div><div className="foodGrid">{food.map((f,i)=><article className="foodCard" key={i}><div className="foodIcon">🍜</div><div><span>{f.city} • {f.type}</span><h3>{f.name}</h3><p>{f.note}</p><a href={f.map} target="_blank">📍 Maps ↗</a></div></article>)}</div><div className="sourceNote">รายชื่อร้านที่มาจากเอกสารทริปถูกระบุว่าเป็นร้าน/มื้อในโปรแกรม ส่วนร้านที่ค้นเพิ่มเติมเป็นตัวเลือกเสริม ควรเช็กวันหยุดและเวลาเปิดอีกครั้ง</div></section>

    <section id="shop" className="section"><div className="sectionHead"><div><span className="eyebrow">SHOPPING</span><h2>แหล่งช้อปปิ้ง & ของฝาก</h2></div></div><div className="shopGrid">{shopping.map((s,i)=><article className="shopCard" key={i}><div className="shopEmoji">🛍️</div><div><small>{s[0]}</small><h3>{s[1]}</h3><p>{s[2]}</p><a href={mapsUrl(s[1]+' '+s[0]+' Japan')} target="_blank">📍 Maps ↗</a></div></article>)}</div></section>

    <section id="weather" className="section alt"><div className="sectionHead"><div><span className="eyebrow">WEATHER & AUTUMN LEAVES</span><h2>สภาพอากาศวันเดินทาง & ใบไม้เปลี่ยนสี</h2></div><span className="liveBadge">● อัปเดตผ่าน Open-Meteo</span></div>
      <div className="weatherHero"><div><h3>พยากรณ์แบบสด</h3><p>ระบบจะดึงพยากรณ์รายวัน 9–17 ต.ค. 2026 เมื่อเปิดเว็บ หากข้อมูลยังอยู่นอกช่วงพยากรณ์ของผู้ให้บริการ ระบบจะแสดงเท่าที่มี</p></div><div className="weatherLegend"><span>☀️ แจ่มใส</span><span>🌦️ ฝนบางส่วน</span><span>🌧️ ฝน</span><span>🏔️ พื้นที่สูงอากาศเย็นกว่าพื้นราบ</span></div></div>
      <div className="forecastStrip">{weatherLoading?<div className="loading">กำลังโหลดพยากรณ์…</div>:selectedWeather?.map((w,i)=><div className="forecast" key={w.date}><b>{w.date.slice(5)}</b><span>🌤️</span><strong>{Math.round(w.max)}°</strong><small>{Math.round(w.min)}° • ฝน {w.rain}%</small></div>) || <div className="loading">ยังไม่มีข้อมูลพยากรณ์จาก API</div>}</div>
      <h3 className="subTitle">🍁 Forecast ใบไม้เปลี่ยนสี 2026</h3><div className="foliageGrid">{foliage.map((f,i)=><article className="foliageCard" key={i}><div className={`foliageDot ${f.color}`}></div><div><h3>{f.place}</h3><b>{f.period}</b><p>{f.status}</p><small>{f.source}</small></div></article>)}</div>
      <div className="sourceLinks"><a href="https://weather-jwa.jp/en/news/announcements/post16208" target="_blank">JWA Autumn Foliage Forecast 2026 ↗</a><a href="https://visitmatsumoto.com/flowering/autumn-leaves/" target="_blank">Visit Matsumoto – Autumn Leaves 2026 ↗</a></div>
    </section>

    <section id="cams" className="section"><div className="sectionHead"><div><span className="eyebrow">LIVE CAMERA</span><h2>เช็กสภาพจริงก่อนออกจากที่พัก</h2></div></div><div className="camGrid">{cams.map((c,i)=><a className="camCard" href={c[2]} target="_blank" key={i}><span>{c[0]}</span><div><h3>{c[1]}</h3><p>{c[3]}</p><b>เปิดกล้อง ↗</b></div></a>)}</div><div className="tipBox"><b>💡 Routine แนะนำ:</b> เช็กกล้อง Happo / Tsugaike / Iwatake ตอนเช้าก่อนขึ้นเขา และเช็ก Norikura / Kamikochi ก่อนออกเดินทางในวันที่ 12–15 ต.ค. โดยเฉพาะถ้ามีฝน หมอก ลมแรง หรือการจำกัดการเดินทาง</div></section>

    <section id="tips" className="section alt"><div className="sectionHead"><div><span className="eyebrow">TRAVEL KIT</span><h2>คู่มือใช้งานระหว่างทริป</h2></div></div><div className="tipsGrid"><article><h3>🎒 เสื้อผ้า</h3><ul><li>เสื้อแขนยาว / Light Down</li><li>เสื้อกันฝน / Rain Jacket</li><li>หมวก / ถุงมือ / ผ้าพันคอ</li><li>รองเท้าเดินป่าหรือรองเท้าพื้นเกาะดี</li><li>ถุงเท้าสำรอง + เสื้อผ้าแห้งเร็ว</li></ul></article><article><h3>🥾 วันที่ขึ้นเขา</h3><ul><li>เช็ก Live Camera ก่อนออก</li><li>เช็กเวลาเปิด Gondola / Ropeway</li><li>เตรียมน้ำและของว่าง</li><li>เผื่อเวลาขากลับจากเส้นทาง hiking</li><li>หากอากาศเปลี่ยน ให้ปรับกิจกรรมตามสภาพจริง</li></ul></article><article><h3>🚨 เบอร์ฉุกเฉิน</h3><ul><li>119 — รถพยาบาล / ดับเพลิง</li><li>110 — ตำรวจ</li><li>Japan Visitor Hotline: 050-3816-2787</li><li>เก็บชื่อที่พักและเบอร์ติดต่อไว้ในมือถือ</li></ul></article><article><h3>📱 Mobile Tips</h3><ul><li>บันทึกหน้านี้ไว้บน Home Screen</li><li>กด Maps เพื่อเปิดนำทาง</li><li>เปิดกล้อง Live ก่อนออกจากที่พัก</li><li>ถ่าย screenshot ตารางวันสำคัญไว้เผื่อไม่มีสัญญาณ</li></ul></article></div></section>

    <footer><div><b>Japan Autumn Trip 2026</b><span>9–17 October 2026 • Trip Member Guide</span></div><p>ข้อมูลแผนเที่ยวอ้างอิงจากเอกสารที่แนบ • ข้อมูลสด/พยากรณ์/ใบไม้เปลี่ยนสีอ้างอิงแหล่งข้อมูลภายนอกตามลิงก์ในเว็บ</p></footer>
  </main>
}
