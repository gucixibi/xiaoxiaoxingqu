# 小小星球资源接入格式 v1

入口：家长专区 → 扩展资源管理。

## 接入方式

1. 选择本机 `.json` 文件，或把 JSON 粘贴到输入框。
2. 输入公开资源 URL：应用通过浏览器发送 GET 请求，读取 JSON；不会执行远程脚本，不携带账号凭据。
3. 开发者可使用页面提供的 `window.LittleOrbitResources` JavaScript 接口。

资源会先检查格式并预览，点击“确认加入知识库”才保存。不会上传到网站，也不会同步到其他浏览器。这里是静态应用的资源读取接口，不是服务端上传或写入 API。

## 资源包字段

- `format`：固定 `little-orbit.resources`。
- `schemaVersion`：数字 `1`。
- `id`：资源包稳定 ID；2–64 位小写字母、数字、下划线或连字符，字母开头。
- `name`：展示名；`version`：作者自己的版本字符串。
- `lessons`：练习主题数组，最多 100 项。
- `poems`：诗词数组，最多 50 项。

每包至少有一个主题或诗词。单包、当前浏览器扩展总量均限 2 MB，每包最多 5000 道题。同一资源包 ID 不可重复导入；同学科主题名不可与已有主题重名。当前为追加导入，如要更换资源，可先导出备份并移除原包，再导入；移除会清理该包的错题和理解标记，保留学习历史。

## 练习主题

必填：`id`、`subject`、`title`、`minAge`、`concept`、`tip`、`questions`。

`subject` 为已有学科之一：`english`、`chinese`、`math`、`science`、`geography`、`life`、`logic`、`history`、`arts`。诗词通过 `poems` 字段接入。

`minAge` 为 4–12 的整数，用于分龄推荐；1–3 岁仍使用亲子活动模式。每主题 5–200 道题，每轮随机抽取 5 道。

题目对象：

```json
{
  "id": "q1",
  "q": "题干",
  "options": ["正确选项", "干扰选项一", "干扰选项二"],
  "answerIndex": 0,
  "explanation": "为什么这个答案正确"
}
```

`answerIndex` 从 0 开始，只能是 0、1、2。三个选项不能重复，同主题的题目 ID 不能重复。ID 保持不变，才能维持错题等引用的稳定性。

## 诗词

必填：`id`、`title`、`author`、`dynasty`、`minAge`、`lines`、`pinyin`、`meaning`、`words`、`prompt`、`questions`。

`lines` 为 2–40 行原文，`pinyin` 与原文逐行对应，`questions` 恰好 5 道，格式同上。诗文使用纯文字，不含 HTML、尖括号、英文引号或反引号。使用自己有权使用的文本，并自行核对拼音、字词和解释。

## 公开资源 URL

使用 HTTPS；本地调试允许 `http://localhost` 和 `http://127.0.0.1`。资源地址应直接返回资源包 JSON，不允许重定向。跨站资源服务器需提供合适的 CORS 响应头，例如公开资源可返回：

```http
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Origin: *
```

请求 10 秒超时。此入口不支持私密 API Key 或登录鉴权；不要把秘密密钥写进资源包。若跨域读取失败，可以先下载 JSON，再选择文件导入。

## 页面 JavaScript 接口

在应用载入后使用：

```js
const api = window.LittleOrbitResources;
const checked = api.validate(pack); // 返回标准化资源包；格式错误会抛出 Error
const result = api.importPack(checked); // 检查重复并保存、接入；返回包 ID 和数量
const installed = api.list(); // 返回当前已导入资源包的副本
```

网页入口还提供示例预览、JSON 模板下载、已导入资源导出备份与移除。示例包含一个科学主题与《鸟鸣涧》，导入后增加 2 个主题、10 道题和 1 首诗。
