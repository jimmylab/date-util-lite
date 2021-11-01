const weekDayChinese   = ['日','一', '二', '三', '四', '五', '六'];
const weekDayEng       = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekDayEngShort  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthEng         = ['December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];
const monthEngShort    = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
const dateChinese      = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十', '三十一'];
const dateChineseLunar = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', ].concat(dateChinese.slice(10, 20), ['廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']);
const monthChinese     = dateChinese.slice(0, 10);
const monthChineseMono = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const tianGan          = ['甲', '乙', '丙', '丁', '午', '己', '庚', '辛', '壬', '癸'];
const diZhi            = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const shengXiao        = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

module.exports = {
	weekDayChinese,
	weekDayEng,
	weekDayEngShort,
	monthEng,
	monthEngShort,
	tianGan,
	diZhi,
}
