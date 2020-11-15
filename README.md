# date-util-lite

## 使用方法

```js
const { formatDate } = require('./dateUtil');

let date = new Date('2020/10/01 10:12:34 GMT+0800');
formatDate('模式字符串', date)

```

模式串示例：

|   模式串                             |  格式化后的日期                                  |
|-------------------------------------|-------------------------------------------------|
| d/m/yy T h:M:S w W                  | 1/10/20 AM 10:12:34 Thu Thursday                |
| mmm(mmmm) d, yyyy T h:M:S w W       | Sep(September) 1, 2020 AM 10:12:34 Thu Thursday |
| yyyy年mm月dd日(星期几) 上下午HH:MM:SS | 2020年10月01日(星期四) 上午10:12:34              |
| 公元yyyy年m月d日 上下午hh:M:SS        | 公元2020年10月1日 上午10:12:34                   |
| 干支年阳历m月d日 (周几) 时辰          | 庚子年阳历10月1日 (周四) 亥时                     |

