import { GoogleGenAI } from "@google/genai";

/**
 * --- DATA & CONFIG ---
 */

// Dữ liệu bài viết Blog chi tiết
const blogData = [
  {
    id: 1,
    title: "5 Loại cây phong thủy hút tài lộc cực tốt cho bàn làm việc",
    excerpt: "Việc bài trí cây cảnh trên bàn làm việc không chỉ giúp thanh lọc không khí mà còn mang lại năng lượng tích cực, thu hút tài lộc nếu chọn đúng loại cây hợp mệnh.",
    image: "https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?q=80&w=800&auto=format&fit=crop",
    date: "15/12/2024",
    author: "Thầy Phong Thủy",
    content: `
      <p>Theo quan niệm phong thủy, cây xanh không chỉ để trang trí mà còn là vật phẩm giúp cân bằng âm dương, mang lại sinh khí. Dưới đây là 5 loại cây "thần tài" dân văn phòng nên có:</p>
      
      <h3>1. Cây Kim Tiền</h3>
      <p>Đúng như tên gọi, cây Kim Tiền (hay Kim Phát Tài) tượng trưng cho sự giàu sang, phú quý. Lá cây xanh mướt, dày và bóng, vươn thẳng lên cao thể hiện sự thăng tiến không ngừng. Loại cây này rất dễ sống, không cần tưới nhiều nước, thích hợp trong môi trường máy lạnh.</p>
      
      <h3>2. Cây Lưỡi Hổ</h3>
      <p>Cây Lưỡi Hổ có khả năng xua đuổi tà khí và những điều xui xẻo. Lá cây mọc thẳng đứng thể hiện sự quyết đoán, ý chí vươn lên của gia chủ. Ngoài ra, Lưỡi Hổ còn là "máy lọc không khí" tự nhiên cực tốt, hấp thụ bức xạ từ máy tính.</p>

      <h3>3. Cây Phú Quý</h3>
      <p>Với viền lá màu đỏ hồng đặc trưng, cây Phú Quý mang lại vẻ đẹp rực rỡ và sự may mắn. Màu đỏ trong phong thủy thuộc hành Hỏa, rất hợp với người mệnh Hỏa và mệnh Thổ, giúp kích hoạt cung danh vọng.</p>

      <h3>4. Cây Ngọc Ngân</h3>
      <p>Cây Ngọc Ngân (Valentine) có lá đốm trắng xanh đẹp mắt. Trong phong thủy, nó được mệnh danh là cây tài lộc, mang đến sự thịnh vượng và may mắn trong tình duyên.</p>

      <div class="blog-quote">
        <strong>Lưu ý:</strong> Khi chọn cây, bạn nên tránh những cây có hình dáng gai góc hoặc lá quá nhọn chĩa vào người ngồi, vì sẽ tạo ra sát khí không tốt cho công việc.
      </div>
    `
  },
  {
    id: 2,
    title: "Văn khấn mùng 1 và ngày Rằm chuẩn truyền thống",
    excerpt: "Tổng hợp bài văn khấn Thần Linh và Gia Tiên dùng cho ngày mùng 1 (Sóc) và ngày Rằm (Vọng) hàng tháng, giúp gia chủ cầu bình an, may mắn.",
    image: "https://images.unsplash.com/photo-1628148813735-9cb68b81292d?q=80&w=800&auto=format&fit=crop",
    date: "01/12/2024",
    author: "Ban Biên Tập",
    content: `
      <p>Cúng ngày Sóc (mùng 1) và ngày Vọng (Rằm) là nghi thức tâm linh quan trọng của người Việt để tưởng nhớ gia tiên và cầu mong một tháng mới hanh thông.</p>

      <h3>Sắm lễ</h3>
      <ul>
        <li>Hương, hoa tươi (cúc, hồng, huệ...).</li>
        <li>Trầu cau, rượu, nước sạch.</li>
        <li>Đèn dầu hoặc nến.</li>
        <li>Bánh kẹo, hoa quả theo mùa.</li>
        <li>Vàng mã (tùy tâm).</li>
      </ul>

      <h3>Bài văn khấn Thần Linh, Thổ Địa</h3>
      <div class="bg-gray-50 p-6 rounded-lg font-serif text-gray-700 italic border border-gray-300 my-4">
        "Nam mô A Di Đà Phật! (3 lần)<br/>
        - Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.<br/>
        - Con kính lạy Hoàng thiên, Hậu thổ chư vị Tôn thần.<br/>
        - Con kính lạy ngài Đông trù Tư mệnh Táo phủ Thần quân.<br/>
        - Con kính lạy ngài Bản gia Thổ địa Long Mạch Tôn thần.<br/>
        - Con kính lạy các ngài Ngũ phương, Ngũ thổ, Phúc đức Tôn thần.<br/>
        ...<br/>
        Hôm nay là ngày... tháng... năm...<br/>
        Tín chủ con là... ngụ tại...<br/>
        Thành tâm sửa biện hương hoa, lễ vật, kim ngân, trà quả... đốt nén tâm hương dâng lên trước án.<br/>
        Chúng con thành tâm kính mời: Ngài Kim Niên Đương Cai Thái Tuế Chí Đức Tôn Thần, ngài Bản cảnh Thành hoàng Chư vị Đại Vương...<br/>
        Cúi xin các Ngài thương xót tín chủ, giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật, phù trì tín chủ chúng con toàn gia an lạc, công việc hanh thông..."
      </div>
      
      <p class="text-sm text-gray-500 italic">*Lưu ý: Đây là bài khấn tham khảo chung, tùy theo phong tục từng vùng miền có thể có sự thay đổi nhỏ.</p>
    `
  },
  {
    id: 3,
    title: "Dự báo tử vi tuổi Tỵ năm Ất Tỵ 2025",
    excerpt: "Năm 2025 là năm tuổi của người cầm tinh con Rắn. Liệu đây là thách thức hay cơ hội? Cùng xem dự báo chi tiết về sự nghiệp, tài lộc.",
    image: "https://images.unsplash.com/photo-1549833555-46f901a1c97a?q=80&w=800&auto=format&fit=crop",
    date: "10/11/2024",
    author: "Chuyên Gia Tử Vi",
    content: `
      <p>Năm Ất Tỵ 2025 mang hành Hỏa (Phú Đăng Hỏa). Với người tuổi Tỵ, đây là năm bản mệnh (năm tuổi), thường được cho là có nhiều biến động.</p>

      <h3>Tổng quan</h3>
      <p>Người tuổi Tỵ năm nay chịu ảnh hưởng của Thái Tuế, nên tâm lý dễ bất ổn, hay lo âu. Tuy nhiên, nhờ có cát tinh "Thiên Giải" chiếu mệnh, mọi khó khăn rồi sẽ qua nếu bạn giữ vững tinh thần.</p>

      <h3>Sự nghiệp</h3>
      <p>Công việc có sự thay đổi, có thể là chuyển việc, chuyển vị trí hoặc đi công tác xa. Lời khuyên là hãy "án binh bất động" trước những quyết định rủi ro cao. Nên tập trung trau dồi kỹ năng hơn là mở rộng đầu tư mạo hiểm.</p>

      <h3>Tài lộc</h3>
      <p>Tài chính ở mức trung bình. Cần quản lý chi tiêu chặt chẽ, đề phòng mất mát tiền bạc do tin người. Không nên cho vay mượn số tiền lớn.</p>

      <h3>Tình duyên</h3>
      <p>Với người độc thân, năm nay có cơ hội gặp gỡ nhưng khó đi đến cam kết lâu dài. Người đã có gia đình cần chú ý nhường nhịn để tránh xung đột không đáng có.</p>
    `
  },
  {
    id: 4,
    title: "Hướng dẫn chọn màu sơn nhà hợp mệnh gia chủ",
    excerpt: "Màu sắc ngôi nhà không chỉ ảnh hưởng đến thẩm mỹ mà còn tác động trực tiếp đến vận khí. Cùng tìm hiểu cách phối màu sơn chuẩn phong thủy.",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop",
    date: "28/10/2024",
    author: "KTS. Thanh Tùng",
    content: `
      <p>Chọn màu sơn nhà theo quy luật Ngũ Hành Tương Sinh - Tương Khắc là nguyên tắc vàng để mang lại may mắn.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div class="bg-blue-50 p-4 rounded border border-blue-200">
           <strong class="text-blue-800">Mệnh Kim</strong>
           <p class="text-sm mt-1">Hợp: Trắng, Xám, Ghi (Bản mệnh) hoặc Vàng, Nâu đất (Thổ sinh Kim).<br/>Kỵ: Đỏ, Hồng, Tím (Hỏa khắc Kim).</p>
        </div>
        <div class="bg-green-50 p-4 rounded border border-green-200">
           <strong class="text-green-800">Mệnh Mộc</strong>
           <p class="text-sm mt-1">Hợp: Xanh lá (Bản mệnh) hoặc Đen, Xanh dương (Thủy sinh Mộc).<br/>Kỵ: Trắng, Ánh kim (Kim khắc Mộc).</p>
        </div>
        <div class="bg-blue-100 p-4 rounded border border-blue-300">
           <strong class="text-blue-900">Mệnh Thủy</strong>
           <p class="text-sm mt-1">Hợp: Đen, Xanh dương (Bản mệnh) hoặc Trắng, Xám (Kim sinh Thủy).<br/>Kỵ: Vàng, Nâu (Thổ khắc Thủy).</p>
        </div>
        <div class="bg-red-50 p-4 rounded border border-red-200">
           <strong class="text-red-800">Mệnh Hỏa</strong>
           <p class="text-sm mt-1">Hợp: Đỏ, Hồng, Tím (Bản mệnh) hoặc Xanh lá (Mộc sinh Hỏa).<br/>Kỵ: Đen, Xanh dương (Thủy khắc Hỏa).</p>
        </div>
         <div class="bg-yellow-50 p-4 rounded border border-yellow-200 md:col-span-2">
           <strong class="text-yellow-800">Mệnh Thổ</strong>
           <p class="text-sm mt-1">Hợp: Vàng, Nâu (Bản mệnh) hoặc Đỏ, Hồng, Tím (Hỏa sinh Thổ).<br/>Kỵ: Xanh lá (Mộc khắc Thổ).</p>
        </div>
      </div>
      
      <p>Ngoài ra, bạn có thể phối hợp màu sắc theo nguyên tắc 60-30-10 (60% màu chủ đạo, 30% màu cấp 2, 10% màu nhấn) để ngôi nhà vừa hài hòa phong thủy vừa đẹp hiện đại.</p>
    `
  }
];

const state = {
  currentView: 'HOME', // HOME, CALENDAR, ASSISTANT, BLOG, KNOWLEDGE, LOVE
  viewingPostId: null, // ID bài viết đang xem chi tiết
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
          <div onclick="app.navigate('BLOG')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 cursor-pointer">Blog Phong Thủy</div>
          <div onclick="app.navigate('KNOWLEDGE')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 cursor-pointer">Kiến thức Đời Sống</div>
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
               <div onclick="app.navigate('BLOG')" class="block pl-8 pr-4 py-3 text-sm font-medium text-gray-600">Blog Phong Thủy</div>
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
          <div>
            <h3 class="font-bold text-lg">Trợ Lý AI Thông Thái</h3>
            <p class="text-xs text-green-100 opacity-90">Hỏi đáp mọi lúc, mọi nơi</p>
          </div>
       </div>

       <div id="chat-box" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          ${msgs}
       </div>

       <div class="p-4 bg-white border-t border-gray-100">
         <div class="flex items-center gap-2">
           <input
             type="text"
             id="chat-input"
             placeholder="Nhập câu hỏi của bạn..."
             class="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
             onkeydown="if(event.key === 'Enter') app.sendMessage()"
           />
           <button onclick="app.sendMessage()" class="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition shadow-md">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
           </button>
         </div>
       </div>
    </div>
  `;
};

/**
 * --- BLOG LOGIC & RENDERING ---
 * Tách biệt phần hiển thị Blog: List View và Detail View
 */
const renderBlog = () => {
  // Nếu đang xem chi tiết một bài viết
  if (state.viewingPostId) {
    const post = blogData.find(p => p.id === state.viewingPostId);
    if (!post) return '<div class="text-center p-8">Bài viết không tồn tại</div>';

    return `
      <div class="animate-fade-in max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <!-- Back Button -->
        <div class="p-4 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-10">
          <button onclick="app.backToBlog()" class="text-gray-500 hover:text-green-600 flex items-center gap-2 font-medium transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Quay lại danh sách
          </button>
        </div>

        <!-- Article Content -->
        <div class="p-6 md:p-10">
          <div class="text-sm text-green-600 font-bold mb-3 uppercase tracking-wider">${post.date} &bull; ${post.author}</div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">${post.title}</h1>
          
          <img src="${post.image}" class="w-full h-64 md:h-96 object-cover rounded-xl shadow-md mb-8" alt="${post.title}">
          
          <div class="blog-detail-content">
             ${post.content}
          </div>
        </div>
      </div>
    `;
  }

  // Giao diện Danh sách bài viết (Grid View)
  return `
    <div class="space-y-8 animate-fade-in">
      <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Blog Phong Thủy</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">Cập nhật những kiến thức phong thủy, tâm linh và văn hóa truyền thống hữu ích cho cuộc sống hàng ngày của bạn.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        ${blogData.map(post => `
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
            <div class="h-56 blog-card-image-container relative">
               <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover blog-card-image" />
               <div class="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-4">
                 <span class="text-white text-xs font-bold bg-green-600 px-2 py-1 rounded">${post.date}</span>
               </div>
            </div>
            <div class="p-6 flex-1 flex flex-col">
              <h3 onclick="app.viewPost(${post.id})" class="font-bold text-xl text-gray-900 mb-3 hover:text-green-600 cursor-pointer line-clamp-2 transition-colors">${post.title}</h3>
              <p class="text-gray-600 line-clamp-3 mb-4 flex-1 leading-relaxed">${post.excerpt}</p>
              <button onclick="app.viewPost(${post.id})" class="text-green-700 font-bold text-sm uppercase tracking-wide hover:underline self-start flex items-center">
                Đọc chi tiết 
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

const renderKnowledge = () => {
    return `
    <div class="space-y-8 animate-fade-in">
      <div class="bg-gradient-to-r from-green-700 to-green-900 rounded-xl p-10 text-white shadow-xl text-center">
        <h1 class="text-4xl font-bold mb-4">Kho Tàng Kiến Thức</h1>
        <p class="opacity-90 text-xl font-light">Phong thủy, Tâm linh & Văn hóa Việt Nam</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div class="p-6">
              <div class="flex items-center gap-3 mb-4">
                 <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl">🏠</div>
                 <h3 class="text-xl font-bold text-gray-800">Phong Thủy Nhà Ở</h3>
              </div>
              <ul class="space-y-3">
                <li class="flex items-center text-gray-600 hover:text-green-600 cursor-pointer group"><svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>Cách xem hướng nhà hợp tuổi</li>
                <li class="flex items-center text-gray-600 hover:text-green-600 cursor-pointer group"><svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>Bố trí phòng bếp hút tài lộc</li>
              </ul>
            </div>
        </div>
        
         <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div class="p-6">
              <div class="flex items-center gap-3 mb-4">
                 <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl">🙏</div>
                 <h3 class="text-xl font-bold text-gray-800">Văn Khấn Cổ Truyền</h3>
              </div>
              <ul class="space-y-3">
                <li class="flex items-center text-gray-600 hover:text-green-600 cursor-pointer group"><svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>Văn khấn mùng 1 hàng tháng</li>
                <li class="flex items-center text-gray-600 hover:text-green-600 cursor-pointer group"><svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>Văn khấn ngày rằm</li>
              </ul>
            </div>
        </div>
      </div>
      
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center shadow-sm">
         <h4 class="text-yellow-800 font-bold mb-2 uppercase text-sm tracking-wide">Lời khuyên hôm nay</h4>
         <p class="text-gray-700 italic text-lg">"Tâm an vạn sự an, tâm động vạn sự phiền. Hãy giữ tâm thái bình thản trước mọi biến cố của cuộc đời."</p>
      </div>
    </div>
    `;
};

const renderLove = () => {
    return `<div class="text-center p-10 bg-white rounded-xl shadow">Tính năng Bói Duyên đang được cập nhật...</div>`;
}

/**
 * --- CORE APP LOGIC ---
 */

const app = {
  init: () => {
    renderNavigation();
    app.render();
  },

  render: () => {
    const main = document.getElementById('app');
    if (state.currentView === 'HOME' || state.currentView === 'CALENDAR') {
      main.innerHTML = `
        ${renderDailyDetail(state.date)}
        <div id="calendar-view">${renderCalendarView(state.date)}</div>
      `;
    } else if (state.currentView === 'ASSISTANT') {
      main.innerHTML = renderAssistant();
    } else if (state.currentView === 'BLOG') {
      main.innerHTML = renderBlog();
    } else if (state.currentView === 'KNOWLEDGE') {
        main.innerHTML = renderKnowledge();
    } else if (state.currentView === 'LOVE') {
        main.innerHTML = renderLove();
    }
  },

  navigate: (view) => {
    state.currentView = view;
    // Reset viewing post when navigating away or to main blog
    if (view !== 'BLOG') state.viewingPostId = null;
    state.isMenuOpen = false;
    state.isSubMenuOpen = false;
    renderNavigation();
    app.render();
  },

  // Blog Navigation Logic
  viewPost: (id) => {
    state.viewingPostId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    app.render();
  },
  
  backToBlog: () => {
    state.viewingPostId = null;
    app.render();
  },

  toggleSubMenu: () => {
    state.isSubMenuOpen = !state.isSubMenuOpen;
    renderNavigation();
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
    newDate.setDate(1); 
    state.date = newDate;
    app.render();
  },

  selectDate: (isoDate) => {
    state.date = new Date(isoDate);
    app.render();
    // Scroll to daily detail if on calendar view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  
  scrollToCalendar: () => {
      document.getElementById('calendar-view').scrollIntoView({ behavior: 'smooth' });
  },

  sendMessage: async () => {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    state.chatHistory.push({ role: 'user', text: text });
    input.value = '';
    app.render();

    // Scroll to bottom
    const box = document.getElementById('chat-box');
    box.scrollTop = box.scrollHeight;

    // Loading state simulation
    state.chatHistory.push({ role: 'model', text: '...' });
    app.render();

    try {
      let responseText = "Xin lỗi, tôi không thể trả lời ngay lúc này.";
      if (aiClient) {
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: text,
            config: {
                systemInstruction: "Bạn là một trợ lý ảo thông thái về văn hóa, lịch sử, phong thủy và đời sống Việt Nam. Hãy trả lời ngắn gọn, thân thiện và hữu ích.",
            }
        });
        responseText = response.text;
      } else {
          responseText = "Chưa cấu hình API Key. Vui lòng kiểm tra cài đặt.";
      }
      
      // Remove loading and add response
      state.chatHistory.pop();
      state.chatHistory.push({ role: 'model', text: responseText });
    } catch (e) {
      state.chatHistory.pop();
      state.chatHistory.push({ role: 'model', text: "Đã có lỗi xảy ra: " + e.message });
    }
    app.render();
     // Scroll to bottom again
     setTimeout(() => {
         const b = document.getElementById('chat-box');
         if(b) b.scrollTop = b.scrollHeight;
     }, 100);
  }
};

// Expose app to window for HTML events
window.app = app;

// Start
app.init();
