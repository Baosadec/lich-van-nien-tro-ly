import { GoogleGenAI } from "@google/genai";

/**
 * --- APP STATE & CONFIG ---
 */
const state = {
  currentView: 'HOME', // HOME, CALENDAR, ASSISTANT, BLOG, KNOWLEDGE, LOVE
  date: new Date(),
  chatHistory: [
    { role: 'model', text: 'Xin chào! Tôi là trợ lý ảo của bạn. Bạn muốn hỏi về ngày lành tháng tốt, phong thủy hay kiến thức đời sống hôm nay?' }
  ],
  isMenuOpen: false,
  isSubMenuOpen: false
};

// Initialize Gemini
const apiKey = window.process?.env?.API_KEY || process.env.API_KEY;
let aiClient = null;
if (apiKey) {
    aiClient = new GoogleGenAI({ apiKey: apiKey });
}

/**
 * --- CALENDAR SERVICES ---
 */
const getLunarDate = (date) => {
  // Simulated Lunar Date (Approximate for demo)
  const lunarOffsetTime = date.getTime() - (29 * 24 * 60 * 60 * 1000) - (12 * 24 * 60 * 60 * 1000); 
  const d = new Date(lunarOffsetTime);
  
  const stems = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const branches = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  const dayIndex = Math.floor(date.getTime() / (24 * 60 * 60 * 1000));
  const dayName = `${stems[dayIndex % 10]} ${branches[dayIndex % 12]}`;
  const monthName = `${stems[(d.getMonth() + 2) % 10]} ${branches[(d.getMonth() + 2) % 12]}`;
  const yearOffset = d.getFullYear() - 4; 
  const yearName = `${stems[yearOffset % 10]} ${branches[yearOffset % 12]}`;

  return {
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear(),
    dayName, monthName, yearName
  };
};

const getDayInfo = (date) => {
   const lunar = getLunarDate(date);
   const dayIndex = Math.floor(date.getTime() / (24 * 60 * 60 * 1000));
   
   const elements = [
     "Hải Trung Kim - Ngày hoàng đạo", "Lư Trung Hỏa - Ngày hắc đạo", 
     "Đại Lâm Mộc - Ngày bình thường", "Lộ Bàng Thổ - Ngày hoàng đạo", "Kiếm Phong Kim - Ngày hắc đạo"
   ];
   const zodiacs = [
     "Tý (23-1), Dần (3-5), Mão (5-7), Ngọ (11-13), Mùi (13-15), Dậu (17-19)",
     "Sửu (1-3), Thìn (7-9), Tỵ (9-11), Mùi (13-15), Tuất (19-21), Hợi (21-23)",
     "Dần (3-5), Thìn (7-9), Tỵ (9-11), Thân (15-17), Dậu (17-19), Hợi (21-23)"
   ];
   const conflicts = ["Canh Dần, Giáp Dần", "Nhâm Tý, Bính Tý", "Mậu Ngọ, Canh Ngọ", "Đinh Mão, Tân Mão"];

   return {
     gregorian: date,
     lunar: lunar,
     zodiacHours: zodiacs[dayIndex % zodiacs.length],
     element: elements[dayIndex % elements.length],
     conflictingAge: conflicts[dayIndex % conflicts.length]
   };
};

const generateMonthGrid = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const days = [];
  
  // Previous month
  for (let i = startDay; i > 0; i--) {
    const d = new Date(year, month, 1 - i);
    days.push({ date: d, isCurrentMonth: false, lunar: getLunarDate(d) });
  }
  // Current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    days.push({ date: d, isCurrentMonth: true, lunar: getLunarDate(d) });
  }
  // Next month
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    days.push({ date: d, isCurrentMonth: false, lunar: getLunarDate(d) });
  }
  return days;
};

/**
 * --- UI RENDERING ---
 */

const formatWeekDay = (date) => new Intl.DateTimeFormat('vi-VN', { weekday: 'long' }).format(date);

const renderNavigation = () => {
  const desktopMenu = document.getElementById('desktop-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  
  const navItem = (view, label) => {
    const active = state.currentView === view;
    return `<div onclick="app.navigate('${view}')" 
      class="px-4 py-3 cursor-pointer font-medium transition-colors duration-200 flex items-center ${active ? 'text-green-700 bg-green-50 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}">
      ${label}
    </div>`;
  };

  const isParentActive = ['ASSISTANT', 'BLOG', 'KNOWLEDGE'].includes(state.currentView);
  
  // Desktop Render
  desktopMenu.innerHTML = `
    ${navItem('HOME', 'Trang Chủ')}
    ${navItem('CALENDAR', 'Lịch Vạn Niên')}
    <div class="relative group">
       <button class="px-4 py-3 cursor-pointer font-medium transition-colors duration-200 flex items-center ${isParentActive ? 'text-green-700 bg-green-50 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}">
         <span>Kiến thức & Trợ lý</span>
         <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
       </button>
       <div class="absolute left-0 top-full w-48 bg-white rounded-b-md shadow-xl py-2 border border-t-0 border-gray-100 hidden group-hover:block z-50">
          <div onclick="app.navigate('BLOG')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 cursor-pointer">Blog</div>
          <div onclick="app.navigate('KNOWLEDGE')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 cursor-pointer">Kiến thức</div>
          <div onclick="app.navigate('ASSISTANT')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 cursor-pointer">Trợ lý AI</div>
       </div>
    </div>
    ${navItem('LOVE', 'Bói Duyên')}
  `;

  // Mobile Render
  if (state.isMenuOpen) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.innerHTML = `
        <div class="pt-2 pb-3 space-y-1">
          <div onclick="app.navigate('HOME')" class="block px-4 py-3 font-medium text-gray-700 hover:bg-green-50">Trang Chủ</div>
          <div onclick="app.navigate('CALENDAR')" class="block px-4 py-3 font-medium text-gray-700 hover:bg-green-50">Lịch Vạn Niên</div>
          <div onclick="app.toggleSubMenu()" class="block px-4 py-3 font-medium text-gray-700 hover:bg-green-50 flex justify-between">
             <span>Kiến thức & Trợ lý</span>
             <svg class="w-4 h-4 transform ${state.isSubMenuOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
          ${state.isSubMenuOpen ? `
            <div class="bg-gray-50">
               <div onclick="app.navigate('BLOG')" class="block pl-8 pr-4 py-3 text-sm font-medium text-gray-600">Blog</div>
               <div onclick="app.navigate('KNOWLEDGE')" class="block pl-8 pr-4 py-3 text-sm font-medium text-gray-600">Kiến thức</div>
               <div onclick="app.navigate('ASSISTANT')" class="block pl-8 pr-4 py-3 text-sm font-medium text-gray-600">Trợ lý</div>
            </div>
          ` : ''}
          <div onclick="app.navigate('LOVE')" class="block px-4 py-3 font-medium text-gray-700 hover:bg-green-50">Bói Duyên</div>
        </div>
      `;
  } else {
      mobileMenu.classList.add('hidden');
  }
};

const renderDailyDetail = (date) => {
  const info = getDayInfo(date);
  const weekDay = formatWeekDay(date);

  return `
    <div class="bg-white rounded-t-xl shadow-lg overflow-hidden border border-gray-200 mb-8 font-sans animate-fade-in">
      <div class="bg-green-600 px-4 py-3 flex justify-between items-center text-white rounded-t-xl">
        <h2 class="text-lg md:text-xl font-bold uppercase tracking-wide flex items-center gap-2">LỊCH VẠN NIÊN</h2>
        <button onclick="app.scrollToCalendar()" class="bg-green-700 hover:bg-green-800 text-white text-sm px-4 py-2 rounded-lg flex items-center shadow-sm">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Xem nhanh theo ngày
        </button>
      </div>

      <div class="flex flex-col md:flex-row relative">
         <!-- Solar -->
         <div class="flex-1 p-6 md:p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 relative">
            <button onclick="app.changeDate(-1)" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 hover:bg-green-100 text-green-600 flex items-center justify-center transition-colors">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div class="text-gray-500 font-semibold text-lg uppercase tracking-widest mb-4">Dương Lịch</div>
            <div class="text-[100px] md:text-[120px] leading-none font-bold text-green-600 tracking-tighter transform scale-y-110 mb-2">${info.gregorian.getDate()}</div>
            <div class="text-xl text-gray-600 font-medium">Tháng ${info.gregorian.getMonth() + 1} năm ${info.gregorian.getFullYear()}</div>
            <div class="mt-2 text-green-600 font-bold text-2xl capitalize">${weekDay}</div>
         </div>
         
         <!-- Lunar -->
         <div class="flex-1 p-6 md:p-10 flex flex-col items-center justify-center relative bg-gray-50/30">
            <button onclick="app.changeDate(1)" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 hover:bg-green-100 text-green-600 flex items-center justify-center transition-colors">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
            <div class="text-gray-500 font-semibold text-lg uppercase tracking-widest mb-4">Âm lịch</div>
            <div class="text-[100px] md:text-[120px] leading-none font-bold text-gray-800 tracking-tighter transform scale-y-110 mb-2">${info.lunar.day}</div>
            <div class="text-xl text-gray-600 font-medium text-center">Tháng ${info.lunar.month} năm ${info.lunar.yearName}</div>
            <div class="mt-2 text-red-500 font-bold text-lg min-h-[28px]">${info.lunar.day === 1 ? 'Ngày Mồng 1' : info.lunar.day === 15 ? 'Ngày Rằm' : ''}</div>
         </div>
      </div>
      
      <div class="bg-gray-50 p-6 border-t border-gray-200">
          <div class="grid gap-4 text-sm md:text-base">
            <div class="flex flex-col sm:flex-row sm:items-baseline"><span class="font-bold text-gray-900 w-36 shrink-0">Mệnh ngày:</span><span class="text-gray-700">${info.element}</span></div>
            <div class="flex flex-col sm:flex-row sm:items-baseline"><span class="font-bold text-gray-900 w-36 shrink-0">Giờ hoàng đạo:</span><span class="text-gray-700 leading-relaxed">${info.zodiacHours}</span></div>
            <div class="flex flex-col sm:flex-row sm:items-baseline"><span class="font-bold text-gray-900 w-36 shrink-0">Tuổi xung:</span><span class="text-gray-700">${info.conflictingAge}</span></div>
          </div>
      </div>
    </div>
  `;
};

const renderCalendarView = (date) => {
  const grid = generateMonthGrid(date.getFullYear(), date.getMonth());
  const weekDays = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];

  let gridHTML = '';
  grid.forEach((day) => {
    const isSelected = day.date.toDateString() === state.date.toDateString();
    const isToday = day.date.toDateString() === new Date().toDateString();
    const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;

    gridHTML += `
      <div onclick="app.selectDate('${day.date.toISOString()}')" 
           class="calendar-day min-h-[80px] md:min-h-[110px] p-2 border-b border-r border-gray-200 relative cursor-pointer hover:bg-green-50 transition-all duration-200
           ${!day.isCurrentMonth ? 'bg-gray-50/60' : 'bg-white'} 
           ${isSelected ? 'bg-yellow-50 ring-inset ring-2 ring-yellow-400' : ''}">
        
        <div class="flex flex-col h-full justify-between items-center md:items-start">
           <div class="text-xl md:text-3xl font-medium leading-none ${isWeekend ? 'text-red-500' : 'text-gray-800'} ${!day.isCurrentMonth ? 'opacity-30' : ''}">
             ${day.date.getDate()}
           </div>
           <div class="text-[10px] md:text-sm font-medium mt-1 ${day.lunar.day === 1 || day.lunar.day === 15 ? 'text-red-500' : 'text-gray-500'} ${!day.isCurrentMonth ? 'opacity-30' : ''}">
              ${day.lunar.day === 1 ? `${day.lunar.day}/${day.lunar.month}` : day.lunar.day}
           </div>
        </div>
        ${(day.lunar.day === 1 || day.lunar.day === 15) && day.isCurrentMonth ? `<div class="hidden md:block absolute bottom-1 left-0 w-full text-center"><span class="text-[10px] text-red-500 font-semibold bg-red-50 px-1 rounded">${day.lunar.day === 1 ? 'Mùng 1' : 'Rằm'}</span></div>` : ''}
        ${isToday ? '<div class="absolute top-2 right-2"><span class="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Hôm nay</span></div>' : ''}
      </div>
    `;
  });

  return `
    <div id="calendar-view-container" class="bg-white rounded-t-xl shadow-lg border border-gray-200 overflow-hidden font-sans animate-fade-in">
       <!-- Controls -->
       <div class="bg-green-600 p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4 text-white rounded-t-xl">
          <div class="flex items-center gap-4 w-full md:w-auto justify-between">
             <button onclick="app.changeMonth(-1)" class="p-1.5 hover:bg-green-700 rounded-full bg-white/20"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>
             <h2 class="text-xl font-bold uppercase">THÁNG ${date.getMonth() + 1} - ${date.getFullYear()}</h2>
             <button onclick="app.changeMonth(1)" class="p-1.5 hover:bg-green-700 rounded-full bg-white/20"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>
          </div>
          <button onclick="app.selectDate('${new Date().toISOString()}')" class="bg-green-800 text-white px-5 py-1.5 rounded-md font-bold text-sm hover:bg-green-900 shadow-sm">HÔM NAY</button>
       </div>
       <!-- Headers -->
       <div class="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          ${weekDays.map((d, i) => `<div class="py-3 text-center text-xs md:text-sm font-bold uppercase ${i===6 ? 'text-red-500':'text-gray-600'}">${d}</div>`).join('')}
       </div>
       <!-- Grid -->
       <div class="grid grid-cols-7 border-l border-gray-200">${gridHTML}</div>
    </div>
  `;
};

const renderAssistant = () => {
  const msgs = state.chatHistory.map(msg => `
    <div class="flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}">
      <div class="max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${msg.role === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}">
        <p class="whitespace-pre-wrap text-sm md:text-base leading-relaxed">${msg.text}</p>
      </div>
    </div>
  `).join('');

  return `
    <div class="max-w-4xl mx-auto h-[600px] flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in">
       <div class="bg-gradient-to-r from-green-600 to-teal-600 p-4 text-white flex items-center gap-3">
          <div class="p-2 bg-white/20 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
          </div>
          <div><h3 class="font-bold text-lg">Trợ Lý AI Thông Thái</h3><p class="text-xs text-green-100 opacity-90">Hỏi đáp mọi lúc, mọi nơi</p></div>
       </div>
       <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          ${msgs}
       </div>
       <div class="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
           <input type="text" id="chat-input" placeholder="Nhập câu hỏi..." class="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" onkeydown="if(event.key === 'Enter') app.sendChat()">
           <button onclick="app.sendChat()" class="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 shadow-md"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg></button>
       </div>
    </div>
  `;
};

const renderLoveFortune = () => {
    return `
    <div class="max-w-3xl mx-auto animate-fade-in">
      <div class="bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden">
        <div class="bg-pink-500 p-6 text-white text-center">
          <h2 class="text-2xl font-bold mb-2">💘 Bói Duyên Tình Yêu</h2>
          <p class="opacity-90">Xem mức độ hòa hợp giữa bạn và người ấy</p>
        </div>
        <div class="p-8">
          <div class="grid md:grid-cols-2 gap-8 mb-8">
            <div class="space-y-4">
               <div class="text-center font-bold text-pink-500 border-b pb-2 mb-4">Người thứ nhất</div>
               <input type="text" id="love-name-1" class="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Họ và tên">
               <input type="date" id="love-date-1" class="w-full border border-gray-300 rounded-md px-3 py-2">
            </div>
            <div class="space-y-4">
               <div class="text-center font-bold text-pink-500 border-b pb-2 mb-4">Người thứ hai</div>
               <input type="text" id="love-name-2" class="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Họ và tên">
               <input type="date" id="love-date-2" class="w-full border border-gray-300 rounded-md px-3 py-2">
            </div>
          </div>
          <div class="text-center">
            <button onclick="app.checkLove()" id="love-btn" class="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-pink-600 transition shadow-lg">Xem Kết Quả</button>
          </div>
          <div id="love-result" class="mt-8 hidden p-6 bg-pink-50 rounded-xl border border-pink-100 text-gray-700 whitespace-pre-wrap leading-relaxed"></div>
        </div>
      </div>
    </div>`;
};

const renderBlog = () => {
    const posts = [
        {
          title: "Dự báo tử vi năm Ất Tỵ 2025: Cơ hội và Thách thức",
          excerpt: "Năm Ất Tỵ 2025 mang hành Hỏa, dự báo sẽ là một năm đầy biến động nhưng cũng nhiều cơ hội bứt phá cho các tuổi...",
          image: "https://images.unsplash.com/photo-1549833555-46f901a1c97a?q=80&w=800&auto=format&fit=crop",
          date: "12/05/2024"
        },
        {
          title: "Cách bày mâm ngũ quả ngày Tết chuẩn phong thủy 3 miền",
          excerpt: "Mâm ngũ quả ngày Tết không chỉ để cúng tổ tiên mà còn gửi gắm ước mong về một năm mới sung túc, đủ đầy. Xem ngay cách bày...",
          image: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=800&auto=format&fit=crop",
          date: "10/02/2024"
        },
        {
          title: "Văn khấn mùng 1 và ngày rằm hàng tháng chuẩn nhất",
          excerpt: "Tổng hợp các bài văn khấn nôm truyền thống dùng cho ngày mùng 1 và ngày rằm, giúp gia chủ cầu bình an, tài lộc...",
          image: "https://images.unsplash.com/photo-1628148813735-9cb68b81292d?q=80&w=800&auto=format&fit=crop",
          date: "01/04/2024"
        },
        {
          title: "Sao Thái Bạch năm 2025 chiếu mệnh nào? Cách hóa giải",
          excerpt: "Sao Thái Bạch là sao xấu nhất trong hệ thống cửu diệu, thường gây hao tài tốn của. Cùng xem danh sách các tuổi gặp sao này...",
          image: "https://images.unsplash.com/photo-1506318137071-a8bcbf67cc77?q=80&w=800&auto=format&fit=crop",
          date: "28/03/2024"
        }
    ];

    const postsHTML = posts.map(post => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
            <div class="h-48 overflow-hidden">
               <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div class="p-5">
              <div class="text-xs text-green-600 font-semibold mb-2">${post.date}</div>
              <h3 class="font-bold text-lg text-gray-800 mb-2 hover:text-green-600 cursor-pointer line-clamp-2">${post.title}</h3>
              <p class="text-sm text-gray-600 line-clamp-3 mb-4">${post.excerpt}</p>
              <button class="text-green-600 text-sm font-semibold hover:underline">Đọc thêm →</button>
            </div>
        </div>
    `).join('');

    return `
        <div class="space-y-6 animate-fade-in">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Blog Phong Thủy</h2>
            <p class="text-gray-600">Cập nhật những thông tin hữu ích về phong thủy, tâm linh và đời sống.</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${postsHTML}
          </div>
        </div>
    `;
};

const renderKnowledge = () => {
    const categories = [
        {
          title: "Phong Thủy Nhà Ở",
          icon: "🏠",
          articles: ["Cách xem hướng nhà hợp tuổi", "Bố trí phòng bếp hút tài lộc", "Cây phong thủy nên trồng trước nhà", "Kích thước cửa chính theo lỗ ban"]
        },
        {
          title: "Văn Khấn Cổ Truyền",
          icon: "🙏",
          articles: ["Văn khấn mùng 1 hàng tháng", "Văn khấn ngày rằm", "Văn khấn tạ mộ cuối năm", "Văn khấn cúng Ông Công Ông Táo"]
        },
        {
          title: "Sao Hạn & Tử Vi",
          icon: "⭐",
          articles: ["Bảng sao hạn năm 2025", "Cách cúng dâng sao giải hạn", "Tuổi Tam Tai năm Ất Tỵ", "Màu sắc hợp mệnh năm 2025"]
        },
        {
          title: "Phong Tục Tập Quán",
          icon: "🏮",
          articles: ["Ý nghĩa ngày Tết Hàn Thực", "Tục lệ xông đất đầu năm", "Lễ cúng đầy tháng cho bé", "Những điều kiêng kỵ ngày Tết"]
        }
    ];

    const catsHTML = categories.map(cat => `
        <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div class="p-6">
              <div class="flex items-center gap-3 mb-4">
                 <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl">
                   ${cat.icon}
                 </div>
                 <h3 class="text-xl font-bold text-gray-800">${cat.title}</h3>
              </div>
              <ul class="space-y-3">
                ${cat.articles.map(article => `
                  <li class="flex items-center text-gray-600 hover:text-green-600 cursor-pointer group">
                    <svg class="w-4 h-4 mr-2 text-green-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    <span class="text-sm font-medium">${article}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            <div class="bg-gray-50 px-6 py-3 border-t border-gray-100 text-right">
               <button class="text-sm text-green-700 font-semibold hover:underline">Xem tất cả &rarr;</button>
            </div>
        </div>
    `).join('');

    return `
        <div class="space-y-8 animate-fade-in">
          <div class="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-8 text-white shadow-lg">
            <h1 class="text-3xl font-bold mb-2">Kho Tàng Kiến Thức</h1>
            <p class="opacity-90 text-lg">Phong thủy, Tâm linh & Văn hóa Việt Nam</p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            ${catsHTML}
          </div>
          
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
             <h4 class="text-yellow-800 font-bold mb-2 uppercase text-sm tracking-wide">Lời khuyên hôm nay</h4>
             <p class="text-gray-700 italic text-lg">"Tâm an vạn sự an, tâm động vạn sự phiền. Hãy giữ tâm thái bình thản trước mọi biến cố của cuộc đời."</p>
          </div>
        </div>
    `;
};

/**
 * --- APP CONTROLLER ---
 */
const app = {
    navigate: (view) => {
        state.currentView = view;
        state.isMenuOpen = false;
        app.render();
    },
    toggleMenu: () => {
        state.isMenuOpen = !state.isMenuOpen;
        renderNavigation();
    },
    toggleSubMenu: () => {
        state.isSubMenuOpen = !state.isSubMenuOpen;
        renderNavigation();
    },
    selectDate: (dateStr) => {
        state.date = new Date(dateStr);
        app.render();
    },
    changeDate: (delta) => {
        const newDate = new Date(state.date);
        newDate.setDate(state.date.getDate() + delta);
        state.date = newDate;
        app.render();
    },
    changeMonth: (delta) => {
        const newDate = new Date(state.date);
        newDate.setMonth(state.date.getMonth() + delta);
        newDate.setDate(1); // Reset to 1st to avoid overflow issues
        state.date = newDate;
        app.render();
    },
    scrollToCalendar: () => {
        const cal = document.getElementById('calendar-view-container');
        if (cal) cal.scrollIntoView({ behavior: 'smooth' });
        else app.navigate('CALENDAR');
    },
    sendChat: async () => {
        if (!aiClient) {
            alert("Chưa cấu hình API Key. Vui lòng thêm API Key vào file index.html hoặc sử dụng GitHub Secrets.");
            return;
        }
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;
        
        state.chatHistory.push({ role: 'user', text });
        input.value = '';
        app.render(); // Re-render to show user message

        // Scroll bottom
        setTimeout(() => {
             const container = document.getElementById('chat-messages');
             if(container) container.scrollTop = container.scrollHeight;
        }, 50);

        try {
            const response = await aiClient.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: text,
                config: { systemInstruction: "Bạn là trợ lý ảo lịch vạn niên." }
            });
            state.chatHistory.push({ role: 'model', text: response.text });
        } catch (e) {
            console.error(e);
            state.chatHistory.push({ role: 'model', text: "Lỗi kết nối: " + e.message });
        }
        app.render();
         setTimeout(() => {
             const container = document.getElementById('chat-messages');
             if(container) container.scrollTop = container.scrollHeight;
        }, 50);
    },
    checkLove: async () => {
        if (!aiClient) {
             alert("Chưa cấu hình API Key.");
             return;
        }
        const n1 = document.getElementById('love-name-1').value;
        const d1 = document.getElementById('love-date-1').value;
        const n2 = document.getElementById('love-name-2').value;
        const d2 = document.getElementById('love-date-2').value;
        
        if (!n1 || !d1 || !n2 || !d2) return alert("Vui lòng nhập đủ thông tin");
        
        const btn = document.getElementById('love-btn');
        const resultDiv = document.getElementById('love-result');
        btn.innerText = "Đang xem...";
        btn.disabled = true;
        
        const prompt = `Xem bói duyên cho ${n1} (${d1}) và ${n2} (${d2}). Hài hước, tích cực.`;
        try {
             const res = await aiClient.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
             resultDiv.innerText = res.text;
             resultDiv.classList.remove('hidden');
        } catch(e) {
             alert("Lỗi: " + e.message);
        }
        btn.innerText = "Xem Kết Quả";
        btn.disabled = false;
    },
    render: () => {
        renderNavigation();
        const main = document.getElementById('app');
        main.innerHTML = '';
        
        if (state.currentView === 'HOME') {
            main.innerHTML = renderDailyDetail(state.date) + renderCalendarView(state.date);
        } else if (state.currentView === 'CALENDAR') {
            main.innerHTML = renderDailyDetail(state.date) + renderCalendarView(state.date);
        } else if (state.currentView === 'ASSISTANT') {
            main.innerHTML = renderAssistant();
            const container = document.getElementById('chat-messages');
            if(container) container.scrollTop = container.scrollHeight;
        } else if (state.currentView === 'LOVE') {
            main.innerHTML = renderLoveFortune();
        } else if (state.currentView === 'BLOG') {
            main.innerHTML = renderBlog();
        } else if (state.currentView === 'KNOWLEDGE') {
             main.innerHTML = renderKnowledge();
        }
    }
};

// Export to window for HTML event handlers
window.app = app;

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu listener
    document.getElementById('mobile-menu-btn').onclick = app.toggleMenu;
    app.render();
});
