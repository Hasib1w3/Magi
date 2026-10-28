/* CLASS 3 — কোড পড়া (Real-world code reading)
   এই ক্লাসে কিছু লেখা বা মুখস্থ নেই। শুধু পড়া: কোড দেখে বলো কী হচ্ছে।
   ব্যাখ্যা বাংলায়, কোড ইংরেজিতে। `next` নিজে নিজে বসে যায়। */

(() => {
/* ---------- ছোট helper ---------- */
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const C = (s, hl = '', x = '') => `<pre class='code ${x}' data-hl='${hl}'>${esc(s)}</pre>`;
const Q = t => `<p class='q'>${t}</p>`;
const N = (t, d = 0) => `<p class='note step' style='--d:${d}'>${t}</p>`;
const V = (n, v, d = 0) => `<div class='var'><b>${n}</b><span class='fill' style='--d:${d}'>${v}</span></div>`;
const B = (t, d = 0, x = '') => `<div class='box step ${x}' style='--d:${d}'>${t}</div>`;
const A = (d = 0) => `<svg class='g arw' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path class='draw' pathLength='1' style='--d:${d}' d='M5 12h14M13 6l6 6-6 6'/></svg>`;
const F = (...i) => `<div class='flow'>${i.join('')}</div>`;
const R = (...i) => `<div class='row'>${i.join('')}</div>`;
const SC = (...r) => `<div class='screen'>${r.join('')}</div>`;
const TY = (p, u, d = 0) => `<div><span class='type' style='--n:${p.length};--d:${d}'>${esc(p)}</span><span class='type you' style='--n:${u.length};--d:${d + 2}'>${esc(u)}</span></div>`;
const W = (t, ...n) => [Q(t), ...n.map(x => N(x))];

const L = [];
const learn = (...h) => L.push({ state: 'learn', html: h.flat() });
const mcq = (col, html, options, answer, wrong, extra = {}) => L.push({ state: 'mcq', is_column: col, html: [].concat(html), options, answer, wrong, ...extra });
const trace = (title, code, steps, intro) => L.push({ state: 'trace', html: [Q(title), `<pre class='code' data-trace>${esc(code)}</pre>`, `<div class='tr'></div>`], steps, intro });

/* ================= ভূমিকা ================= */
learn(
  Q(`Class 3 — কোড পড়ো, সত্যিকারের প্রোগ্রামের মতো`),
  N(`আজ তুমি <b>কিছু লিখবে না। কিছু মুখস্থও করবে না।</b>`, 1),
  N(`শুধু একটা কাজ: কোড <b>পড়ে বুঝবে</b> — এখানে কী হচ্ছে, কেন হচ্ছে, শেষে কী দেখা যাবে।`, 3),
  N(`সত্যিকারের প্রোগ্রামাররা কোড লেখার চেয়ে অনেক বেশি সময় কোড <b>পড়ে</b>। আজ সেই পড়াটাই শিখবে।`, 5),
  N(`নতুন কিছু সামনে এলে আমি বলে দেবো কীভাবে পড়বে। তুমি শুধু ধাপে ধাপে পড়বে।`, 7)
);

/* ================= পড়ার নিয়ম ================= */
learn(
  Q(`পড়ার ৩টা নিয়ম`),
  N(`<b>১. ওপর থেকে নিচে</b>, এক লাইন এক লাইন করে।`, 1),
  N(`<b>২. ভেতরে সরানো লাইন</b> মানে সেই লাইন ওপরের লাইনের "ভেতরের কাজ"।`, 2),
  N(`<b>৩. নাম দেখে আন্দাজ করো।</b> <code>price</code>, <code>total</code>, <code>student</code> — নামই অর্ধেক গল্প বলে দেয়।`, 3),
  C(`age = 10\nif age < 18:\n    print("Child")\n    print("Ticket 50")\nprint("Bye")`, '3,4', ''),
  N(`হলুদ দাগের ২টা লাইন <code>if</code> এর <b>ভেতরে</b> (ডান দিকে সরানো)। শর্ত সত্য হলেই এ দুটো চলবে। শেষ লাইনটা বাইরে, তাই <b>সবসময়</b> চলবে।`, 5)
);

mcq(true, [Q(`পড়ো: কী কী print হবে?`), C(`age = 20\nif age < 18:\n    print("Child")\n    print("Ticket 50")\nprint("Bye")`, '1,2,3,4,5')],
  [`শুধু Bye`, `Child`, `Child আর Bye`, `Ticket 50 আর Bye`], 0, {
  1: W(`না, শর্ত সত্য না`, `<code>20 &lt; 18</code> False। তাই ভেতরের দুটো লাইন বাদ।`),
  2: W(`না, Child চলবে না`, `<code>if</code> এর শর্ত False, তাই ভেতরের <code>print("Child")</code> চলেনি।`),
  '*': W(`না, Ticket 50 ভেতরের লাইন`, `ভেতরের দুটো লাইনই বাদ যাবে। শুধু বাইরের লাইনটা চলবে।`)
});

/* ================= list + for ================= */
learn(
  Q(`list — সারি করে রাখা অনেক জিনিস`),
  C(`prices = [120, 80, 45]`, '1'),
  R(B(`120`, 1), B(`80`, 2), B(`45`, 3)),
  N(`<code>[ ]</code> এর ভেতরে কমা দিয়ে অনেক জিনিস = <b>list</b>। একটা variable, কিন্তু ভেতরে অনেকগুলো।`, 4),
  C(`for price in prices:\n    total += price`, '1'),
  N(`এটা এভাবে পড়ো: <b>"prices এর প্রতিটা জিনিসকে একে একে <code>price</code> ডাকো, আর ভেতরের লাইনটা প্রতিবার চালাও।"</b>`, 5),
  N(`<code>total += price</code> পড়ো: <b>"total এর সাথে price যোগ করে total এ রাখো"।</b>`, 6)
);

trace(`পড়ো আর দেখো: দোকানের মোট দাম`, `prices = [120, 80, 45]
total = 0
for price in prices:
    total += price
print("Total:", total)`, [
  { l: 1, v: { prices: `[120, 80, 45]` }, t: `তিনটা দামের একটা list বাক্সে রাখা হলো।` },
  { l: 2, v: { total: `0` }, t: `total শুরুতে 0। এটা যোগফল জমানোর খালি খাতা।` },
  { l: 3, v: { price: `120` }, t: `<code>for</code> list থেকে প্রথম জিনিস তুলে নাম দিল <code>price</code>। এখন price = 120।` },
  { l: 4, v: { total: `120` }, t: `ভেতরের লাইন: total এ price যোগ। 0 + 120 = 120।` },
  { l: 3, v: { price: `80` }, t: `ঘুরে আবার লাইন 3। list এর পরের জিনিস: price = 80।` },
  { l: 4, v: { total: `200` }, t: `120 + 80 = 200।` },
  { l: 3, v: { price: `45` }, t: `শেষ জিনিস: price = 45।` },
  { l: 4, v: { total: `245` }, t: `200 + 45 = 245।` },
  { l: 5, p: `Total: 245`, t: `list এ আর জিনিস নেই, তাই loop শেষ। এবার ভেতরে-না-সরানো লাইন 5 চলল।` }
]);

mcq(true, [Q(`পড়ো: কী print হবে?`), C(`prices = [50, 30, 20, 10]\ncount = 0\nfor price in prices:\n    if price > 25:\n        count += 1\nprint(count)`, '3,4,5')],
  [`1`, `2`, `3`, `4`], 1, {
  0: W(`না, আরেকটা আছে`, `50 আর 30 — দুটোই 25 এর বেশি।`),
  2: W(`না, এত না`, `20 আর 10 হলো 25 এর ছোট, ওদের বেলায় <code>count += 1</code> চলেনি।`),
  '*': W(`না, 4 হলো list এ মোট জিনিস`, `কিন্তু শর্ত সত্য হয়েছে শুধু 50 আর 30 এর জন্য। তাই 2।`)
});

/* ================= while ================= */
learn(
  Q(`while — যতক্ষণ শর্ত সত্য, ততক্ষণ ঘোরো`),
  C(`while tries < 3:\n    ...`, '1'),
  N(`পড়ো: <b>"যতক্ষণ tries 3 এর ছোট, ভেতরের কাজ বারবার করো।"</b>`, 1),
  C(`if guess == secret:\n    break`, '2'),
  N(`<code>break</code> পড়ো: <b>"এক্ষুনি loop থেকে বেরিয়ে যাও।"</b>`, 3),
  N(`পরের পাতায় একটা পাসওয়ার্ড-চেক প্রোগ্রাম। প্রতিটা ধাপ দেখো।`, 4)
);

trace(`পড়ো আর দেখো: পাসওয়ার্ড চেক`, `secret = "open123"
tries = 0
while tries < 3:
    guess = input("Password: ")
    tries += 1
    if guess == secret:
        print("Welcome!")
        break
print("Finished")`, [
  { l: 1, v: { secret: `"open123"` }, t: `সঠিক পাসওয়ার্ড বাক্সে রাখা হলো।` },
  { l: 2, v: { tries: `0` }, t: `চেষ্টার গুনতি 0।` },
  { l: 3, t: `<code>0 &lt; 3</code> সত্য, তাই ভেতরে ঢুকলো।` },
  { l: 4, ask: `Password: `, t: `ইউজারকে প্রশ্ন করে অপেক্ষা।` },
  { l: 4, type: `abc`, v: { guess: `"abc"` }, t: `ইউজার লিখলো <code>abc</code>। guess বাক্সে গেল।` },
  { l: 5, v: { tries: `1` }, t: `চেষ্টা গোনা: tries = 1।` },
  { l: 6, t: `<code>"abc" == "open123"</code> False। ভেতরের ২টা লাইন বাদ। loop এর শুরুতে ফেরা।` },
  { l: 3, t: `<code>1 &lt; 3</code> সত্য, আবার ভেতরে।` },
  { l: 4, ask: `Password: `, t: `আবার প্রশ্ন।` },
  { l: 4, type: `open123`, v: { guess: `"open123"` }, t: `এবার ইউজার ঠিক পাসওয়ার্ড লিখলো।` },
  { l: 5, v: { tries: `2` }, t: `tries = 2।` },
  { l: 6, t: `<code>"open123" == "open123"</code> True! ভেতরে ঢুকলো।` },
  { l: 7, p: `Welcome!`, t: `Welcome! দেখালো।` },
  { l: 8, t: `<code>break</code>: loop থেকে বেরিয়ে গেল, tries 3 হওয়ার আগেই।` },
  { l: 9, p: `Finished`, t: `loop এর পরের লাইন চলল।` }
]);

mcq(true, [Q(`পড়ো: শেষে কী print হবে?`), C(`secret = "abc"\ntries = 0\nwhile tries < 3:\n    guess = input("Code: ")\n    tries += 1\n    if guess == secret:\n        break\nprint("Tries:", tries)`, '3,4,5,6,7,8'), SC(TY(`Code: `, `x`, 1), TY(`Code: `, `abc`, 5))],
  [`Tries: 1`, `Tries: 2`, `Tries: 3`, `Tries: 0`], 1, {
  0: W(`না, প্রথমবার ভুল ছিল`, `<code>"x" == "abc"</code> False, তাই break হয়নি। loop আবার ঘুরেছে।`),
  2: W(`না, তৃতীয়বার ঘোরেনি`, `দ্বিতীয়বারেই ঠিক কোড পেয়ে <code>break</code> হয়েছে।`),
  '*': W(`না, 0 কখনো থাকেনি`, `দুইবার ঘুরে tries দুইবার বেড়েছে।`)
});

/* ================= function ================= */
learn(
  Q(`def আর return — নিজের নামে কাজের যন্ত্র`),
  C(`def discount(price, percent):\n    cut = price * percent / 100\n    return price - cut`, '1,3'),
  N(`<code>def</code> পড়ো: <b>"একটা কাজের নাম রাখলাম, এখনই চালাচ্ছি না।"</b> কাজটা চলে যখন কেউ নাম ধরে ডাকে।`, 1),
  N(`<code>return</code> পড়ো: <b>"ফলাফল ফেরত দাও, কাজ শেষ।"</b>`, 2),
  C(`final = discount(200, 10)`, '1'),
  N(`ডাকা মানে: 200 আর 10 ঢুকিয়ে কাজটা চালাও, যা ফেরত আসে তা final এ রাখো।`, 3)
);

trace(`পড়ো আর দেখো: ডিসকাউন্ট`, `def discount(price, percent):
    cut = price * percent / 100
    return price - cut

final = discount(200, 10)
print(final)`, [
  { l: [1, 3], t: `<code>def</code> শুধু নামটা মনে রাখলো। ভেতরের কিছু এখনো চলেনি।` },
  { l: 5, call: `discount`, v: { price: `200`, percent: `10` }, t: `এখানে ডাকা হলো। কাজের ভেতরে নতুন ছোট বাক্স: price = 200, percent = 10।` },
  { l: 2, v: { cut: `20.0` }, t: `200 * 10 / 100 = 20.0।` },
  { l: 3, ret: `180.0`, t: `200 - 20.0 = 180.0। এটাই ফেরত গেল।` },
  { l: 5, v: { final: `180.0` }, t: `ফেরত আসা 180.0 বসলো final এ।` },
  { l: 6, p: `180.0`, t: `print দেখালো।` }
]);

mcq(true, [Q(`পড়ো: কী print হবে?`), C(`def area(w, h):\n    return w * h\n\nprint(area(3, 4) + area(2, 5))`, '4')],
  [`22`, `12`, `10`, `Error`], 0, {
  1: W(`না, দ্বিতীয়টা ভুলে গেছো`, `দুইবার ডাকা হয়েছে: <code>area(3, 4)</code> = 12, আর <code>area(2, 5)</code> = 10। দুটো যোগ হবে।`),
  2: W(`না, প্রথমটা ভুলে গেছো`, `12 + 10 = 22।`),
  '*': W(`না, Error নেই`, `ডাকা কাজ সংখ্যা ফেরত দেয়, আর সংখ্যা যোগ করা যায়। 12 + 10 = 22।`)
});

/* ================= dictionary ================= */
learn(
  Q(`{ } — একটা কার্ড (dictionary)`),
  C(`student = {"name": "Rafi", "age": 14}`, '1'),
  R(B(`name → Rafi`, 1), B(`age → 14`, 2)),
  N(`<code>{ }</code> এর ভেতরে <b>নাম: মান</b> জোড়া। যেন ফর্মের খোপ।`, 3),
  C(`print(student["name"])`, '1'),
  N(`পড়ো: <b>"student কার্ডে name খোপে কী লেখা আছে?"</b> উত্তর: Rafi।`, 4)
);

mcq(true, [Q(`পড়ো: কী print হবে?`), C(`student = {"name": "Tania", "age": 13, "city": "Dhaka"}\nprint(student["city"])`, '2')],
  [`Dhaka`, `city`, `Tania`, `13`], 0, {
  1: W(`না, city হলো খোপের নাম`, `ওটা খুঁজতে দেওয়া চাবি। যা ফেরত আসে তা খোপের ভেতরের মান।`),
  2: W(`না, name না`, `আমরা <code>"city"</code> খোপ চেয়েছি, <code>"name"</code> না।`),
  '*': W(`না, ওটা age এর মান`, `city খোপে লেখা আছে Dhaka।`)
});

/* ================= অচেনা শব্দ ================= */
learn(
  Q(`অচেনা শব্দ দেখলে ভয় নেই`),
  N(`বাস্তব কোডে অনেক অচেনা জিনিস থাকবে। প্রোগ্রামাররাও সব জানে না।`, 1),
  N(`তখন দুটো কাজ: <b>১. নাম দেখে আন্দাজ করো, ২. আগে-পরে কী ঢুকছে আর কী বেরোচ্ছে দেখো।</b>`, 2),
  N(`আজ অচেনা কিছু এলে আমি পাশে ছোট সাহায্য দেবো। মুখস্থ করতে হবে না।`, 3)
);

mcq(true, [Q(`পড়ো: কী print হবে?`), C(`def clean(name):\n    return name.strip().title()\n\nprint(clean("  mahi khan "))`, '2,4'), N(`সাহায্য: <code>.strip()</code> = দুই পাশের ফাঁকা জায়গা ফেলে দাও। <code>.title()</code> = প্রতিটা শব্দের প্রথম অক্ষর বড় হাতের করো।`)],
  [`Mahi Khan`, `  mahi khan `, `MAHI KHAN`, `Error`], 0, {
  1: W(`না, এটা তো কিছুই বদলায়নি`, `<code>strip</code> ফাঁকা ফেলেছে আর <code>title</code> বড় হাতের করেছে।`),
  2: W(`না, সব অক্ষর বড় না`, `<code>title()</code> শুধু প্রতিটা শব্দের <b>প্রথম</b> অক্ষর বড় করে।`),
  '*': W(`না, Error নেই`, `কোডটা ঠিক, দুটো কাজ পরপর চলেছে।`)
});

mcq(true, [Q(`পড়ো: কী print হবে?`), C(`numbers = [4, 7, 10, 3]\nevens = []\nfor n in numbers:\n    if n % 2 == 0:\n        evens.append(n)\nprint(evens, len(evens))`, '2,4,5,6'), N(`সাহায্য: <code>[]</code> = খালি list। <code>.append(x)</code> = list এর শেষে x যোগ। <code>len(x)</code> = x এ কয়টা জিনিস। ভাগশেষ 0 মানে জোড় সংখ্যা।`)],
  [`[4, 10] 2`, `[7, 3] 2`, `[4, 7, 10, 3] 4`, `[] 0`], 0, {
  1: W(`না, এগুলো বিজোড়`, `7 আর 3 কে 2 দিয়ে ভাগ করলে ভাগশেষ 1, 0 না। শর্ত সত্য হয়নি।`),
  2: W(`না, সবাই ঢোকেনি`, `শুধু যাদের জন্য <code>n % 2 == 0</code> সত্য তারাই <code>evens</code> এ গেছে।`),
  '*': W(`না, খালি থাকেনি`, `4 আর 10 জোড়, তারা evens এ জমা হয়েছে।`)
});

/* ================= আসল প্রোগ্রাম A ================= */
const PA = `students = [
    {"name": "Rafi", "marks": [80, 90, 70]},
    {"name": "Tania", "marks": [95, 85, 100]},
    {"name": "Sumon", "marks": [40, 50, 30]},
]

def average(marks):
    return sum(marks) / len(marks)

def grade(avg):
    if avg >= 80:
        return "A"
    elif avg >= 50:
        return "B"
    else:
        return "C"

for student in students:
    avg = average(student["marks"])
    print(student["name"], grade(avg))`;

learn(
  Q(`এবার আসল প্রোগ্রাম 📋`),
  N(`নিচের কোডটা স্কুলের রেজাল্ট দেখানোর মতো একটা বাস্তব ধরনের প্রোগ্রাম। বড় লাগছে? ভয় নেই, এতে যা আছে সবই তুমি আজ দেখে ফেলেছো।`),
  C(PA, ''),
  N(`বড় কোড পড়ার কৌশল: <b>ছোট ছোট টুকরোয় ভাগ করো।</b> এই কোডের ৩ টুকরো: ডেটা, দুটো কাজ, আর মূল কাজ।`)
);

learn(
  Q(`টুকরো ১: ডেটা`),
  C(PA, '1,2,3,4,5'),
  N(`<code>students</code> একটা list। এর ভেতরে ৩টা কার্ড (dictionary)। প্রতিটা কার্ডে একজন ছাত্রের <code>name</code> আর তার <code>marks</code> (আবার একটা list)।`),
  N(`কোডের শুরুতে প্রায়ই এমন ডেটা থাকে। এটা শুধু তথ্য, কিছু চলছে না।`)
);

learn(
  Q(`টুকরো ২: দুটো কাজ`),
  C(PA, '7,8,10,11,12,13,14,15,16'),
  N(`<code>average</code>: marks এর সব যোগ (<code>sum</code>) ভাগ কয়টা (<code>len</code>) = গড়।`),
  N(`<code>grade</code>: গড় 80 বা বেশি হলে "A", না হলে 50 বা বেশি হলে "B", নইলে "C"। শর্তগুলো ওপর থেকে নিচে একে একে।`),
  N(`এখানে শুধু <b>নাম রাখা</b> হয়েছে, এখনো কিছু চলেনি।`)
);

learn(
  Q(`টুকরো ৩: মূল কাজ`),
  C(PA, '18,19,20'),
  N(`এই ৩ লাইনেই আসল কাজ শুরু হয়। বড় কোডে <b>শেষের দিকের বাইরের লাইনগুলো</b> আগে দেখলে বুঝবে কোডটা কী করতে চায়।`),
  N(`প্রতিটা student এর জন্য: তার marks দিয়ে গড় বের করো, তারপর নাম আর grade দেখাও।`)
);

mcq(false, [Q(`বড় ছবি: পুরো প্রোগ্রামটা কী করে?`), C(PA, '18,19,20')],
  [`প্রতিজন ছাত্রের গড় নম্বর থেকে grade বের করে দেখায়`, `ইউজারের কাছ থেকে নাম নেয়`, `সবার নম্বর যোগ করে একটা সংখ্যা দেখায়`, `পাসওয়ার্ড মিলিয়ে দেখে`], 0, {
  1: W(`না, input নেই`, `কোডের কোথাও <code>input()</code> নেই। ডেটা কোডের ভেতরেই দেওয়া।`),
  2: W(`না, একটা সংখ্যা না`, `loop এর ভেতরে প্রতিজনের জন্য আলাদা লাইন print হয়।`),
  '*': W(`না, পাসওয়ার্ড নেই`, `এতে নম্বর, গড় আর grade নিয়ে কাজ।`)
});

trace(`পড়ো আর দেখো: প্রথম ছাত্র Rafi`, PA, [
  { l: [1, 5], v: { students: `[3টা কার্ড]` }, t: `তিনজন ছাত্রের তথ্য list এ রাখা হলো।` },
  { l: [7, 8], t: `<code>def average</code> — শুধু নাম মনে রাখলো।` },
  { l: [10, 16], t: `<code>def grade</code> — আবার শুধু নাম মনে রাখলো।` },
  { l: 18, v: { student: `{Rafi, [80, 90, 70]}` }, t: `loop শুরু। প্রথম কার্ড: Rafi।` },
  { l: 19, call: `average`, v: { marks: `[80, 90, 70]` }, t: `<code>student["marks"]</code> মানে Rafi এর marks list। সেটা দিয়ে <code>average</code> ডাকা হলো।` },
  { l: 8, ret: `80.0`, t: `sum = 240, len = 3। 240 / 3 = 80.0 ফেরত।` },
  { l: 19, v: { avg: `80.0` }, t: `ফেরত আসা 80.0 বসলো avg এ।` },
  { l: 20, call: `grade`, v: { avg: `80.0` }, t: `print এর ভেতরেই <code>grade(avg)</code> ডাকা হলো।` },
  { l: 11, t: `<code>80.0 &gt;= 80</code> True! ঢুকলো।` },
  { l: 12, ret: `"A"`, t: `"A" ফেরত।` },
  { l: 20, p: `Rafi A`, t: `নাম আর grade একসাথে দেখালো। এরপর Tania আর Sumon এর জন্য একই ঘোরা।` }
]);

mcq(true, [Q(`পড়ো: Tania এর জন্য কী print হবে?`), C(PA, '3,7,8,10,11,12,13,14,15,16'), N(`হিন্ট: 95 + 85 + 100 = 280, ভাগ 3।`)],
  [`Tania A`, `Tania B`, `Tania C`, `Error`], 0, {
  1: W(`না, গড় আরো বেশি`, `280 / 3 = 93.33...। এটা 80 এর বেশি, তাই প্রথম শর্তই সত্য।`),
  2: W(`না, C নয়`, `<code>else</code> তখনই চলে যখন আগের সব শর্ত False। এখানে প্রথমটাই সত্য।`),
  '*': W(`না, Error নেই`, `কোড ঠিক। গড় 93.33, তাই "A"।`)
});

mcq(true, [Q(`পড়ো: Sumon এর জন্য কী print হবে?`), C(PA, '4,7,8,10,11,12,13,14,15,16'), N(`হিন্ট: 40 + 50 + 30 = 120, ভাগ 3।`)],
  [`Sumon A`, `Sumon B`, `Sumon C`, `Sumon 40.0`], 2, {
  0: W(`না, 40 তো 80 এর অনেক কম`, `গড় 40.0। প্রথম আর দ্বিতীয় দুটো শর্তই False।`),
  1: W(`না, 40.0 কি 50 এর বেশি?`, `<code>40.0 &gt;= 50</code> False। তাই "B" না।`),
  '*': W(`না, avg print হয় না`, `print এ দেওয়া হয়েছে <code>grade(avg)</code>, যা "A", "B" বা "C" ফেরত দেয়।`)
});

mcq(true, [Q(`কেউ লাইন 11 বদলালো। এবার Rafi এর কী print হবে?`), C(PA.replace('avg >= 80', 'avg > 80'), '11'), N(`মনে রাখো: Rafi এর গড় ঠিক 80.0।`)],
  [`Rafi A`, `Rafi B`, `Rafi C`, `Error`], 1, {
  0: W(`না, 80.0 কি 80 এর চেয়ে বড়?`, `<code>80.0 &gt; 80</code> False (সমান, বড় না)। প্রথম শর্ত ফেল।`),
  2: W(`না, 80 তো 50 এর বেশি`, `প্রথম শর্ত ফেল করে <code>elif avg &gt;= 50</code> এ গেছে, যা সত্য। তাই "B"।`),
  '*': W(`না, Error নেই`, `শুধু একটা চিহ্ন বদলেছে, কোডটা ঠিক আছে। ফল হয় "B"।`)
});

/* ================= আসল প্রোগ্রাম B ================= */
learn(
  Q(`দোকানের বিল 🛒`),
  C(`cart = {"rice": 2, "oil": 1, "egg": 12}\nprices = {"rice": 60, "oil": 180, "egg": 12}\ntotal = 0\nfor item in cart:\n    cost = prices[item] * cart[item]\n    print(item, cost)\n    total += cost\nif total > 300:\n    total = total - 50\nprint("Pay:", total)`, '1,2,5'),
  N(`<code>cart</code>: কোন জিনিস কয়টা। <code>prices</code>: কোন জিনিসের একটার দাম।`, 1),
  N(`কার্ডের ওপর <code>for</code> ঘুরলে একে একে <b>নামগুলো</b> পাওয়া যায়: rice, oil, egg।`, 2),
  N(`লাইন 5 পড়ো: <b>"item এর দাম × item এর সংখ্যা"।</b>`, 3),
  N(`লাইন 8-9: মোট 300 এর বেশি হলে 50 টাকা ছাড়।`, 4)
);

trace(`পড়ো আর দেখো: বিলের হিসাব`, `cart = {"rice": 2, "oil": 1, "egg": 12}
prices = {"rice": 60, "oil": 180, "egg": 12}
total = 0
for item in cart:
    cost = prices[item] * cart[item]
    print(item, cost)
    total += cost
if total > 300:
    total = total - 50
print("Pay:", total)`, [
  { l: [1, 2], v: { cart: `{rice:2, oil:1, egg:12}`, prices: `{rice:60, oil:180, egg:12}` }, t: `দুটো কার্ড তৈরি: কয়টা কিনেছে আর কার দাম কত।` },
  { l: 3, v: { total: `0` }, t: `মোট শুরুতে 0।` },
  { l: 4, v: { item: `"rice"` }, t: `প্রথম নাম: rice।` },
  { l: 5, v: { cost: `120` }, t: `rice এর দাম 60 × সংখ্যা 2 = 120।` },
  { l: 6, p: `rice 120`, t: `দেখালো।` },
  { l: 7, v: { total: `120` }, t: `0 + 120।` },
  { l: 4, v: { item: `"oil"` }, t: `পরের নাম: oil।` },
  { l: 5, v: { cost: `180` }, t: `180 × 1 = 180।` },
  { l: 6, p: `oil 180`, t: `দেখালো।` },
  { l: 7, v: { total: `300` }, t: `120 + 180 = 300।` },
  { l: 4, v: { item: `"egg"` }, t: `শেষ নাম: egg।` },
  { l: 5, v: { cost: `144` }, t: `12 × 12 = 144।` },
  { l: 6, p: `egg 144`, t: `দেখালো।` },
  { l: 7, v: { total: `444` }, t: `300 + 144 = 444।` },
  { l: 8, t: `<code>444 &gt; 300</code> সত্য, ভেতরে ঢুকলো।` },
  { l: 9, v: { total: `394` }, t: `444 - 50 = 394।` },
  { l: 10, p: `Pay: 394`, t: `চূড়ান্ত বিল।` }
]);

mcq(true, [Q(`পড়ো: egg এর সংখ্যা 12 এর বদলে 6 হলে শেষ লাইনে কী আসবে?`), C(`cart = {"rice": 2, "oil": 1, "egg": 6}\nprices = {"rice": 60, "oil": 180, "egg": 12}\ntotal = 0\nfor item in cart:\n    total += prices[item] * cart[item]\nif total > 300:\n    total = total - 50\nprint("Pay:", total)`, '1,5,6,7'), N(`হিন্ট: rice 120, oil 180, egg 72।`)],
  [`Pay: 322`, `Pay: 372`, `Pay: 394`, `Pay: 300`], 0, {
  1: W(`না, ছাড় ভুলে গেছো`, `মোট 372, যা 300 এর বেশি। তাই লাইন 7 এ 50 কমবে।`),
  2: W(`না, 394 তো আগের হিসাব`, `এবার egg 12 না, 6টা। egg এ 72 টাকা।`),
  '*': W(`না, 300 কোথা থেকে?`, `300 হলো শর্তের সীমা। মোট 372, ছাড়ের পর 322।`)
});

/* ================= আসল প্রোগ্রাম C: ATM ================= */
const ATM = `balance = 1000
while True:
    choice = input("1=Deposit 2=Withdraw 3=Exit: ")
    if choice == "3":
        break
    amount = int(input("Amount: "))
    if choice == "1":
        balance += amount
    elif choice == "2":
        if amount > balance:
            print("Not enough money")
        else:
            balance -= amount
print("Final:", balance)`;

learn(
  Q(`ATM মেশিন 🏧`),
  C(ATM, ''),
  N(`<code>while True:</code> পড়ো: <b>"চিরকাল ঘোরো — ভেতরে কেউ <code>break</code> বললে তবেই থামো।"</b> মেনু-ওয়ালা প্রোগ্রামে এটা খুব দেখা যায়।`, 1),
  N(`লাইন 4-5: ইউজার 3 দিলে loop শেষ। লাইন 6: নইলে amount নেবে।`, 2),
  N(`লাইন 9-13: <b>if এর ভেতরে if</b>। যত ভেতরে সরানো, তত গভীর শর্ত। টাকা কম থাকলে "Not enough money", নইলে কেটে নাও।`, 3)
);

mcq(true, [Q(`পড়ো: ইউজার এগুলো টাইপ করলে শেষে কী আসবে?`), C(ATM, '7,8,9,10,11,12,13,14'), SC(TY(`Choice: `, `2`, 1), TY(`Amount: `, `300`, 4), TY(`Choice: `, `1`, 8), TY(`Amount: `, `100`, 11), TY(`Choice: `, `3`, 15))],
  [`Final: 800`, `Final: 1000`, `Final: 1400`, `Final: 600`], 0, {
  1: W(`না, balance বদলেছে`, `300 তোলা আর 100 জমা, দুটোই হয়েছে।`),
  2: W(`না, 2 মানে জমা না`, `choice "2" মানে Withdraw (টাকা তোলা)। তাই <code>balance -= amount</code>। 1000 - 300 + 100 = 800।`),
  '*': W(`না, 100 জমা হয়েছে`, `choice "1" মানে Deposit, টাকা বাড়ে। 1000 - 300 + 100 = 800।`)
});

mcq(false, [Q(`পড়ো: ইউজার 2 আর তারপর 5000 লিখলে কী হবে?`), C(ATM, '9,10,11,12,13'), SC(TY(`Choice: `, `2`, 1), TY(`Amount: `, `5000`, 4))],
  [`"Not enough money" লিখে আবার মেনু দেখাবে`, `প্রোগ্রাম বন্ধ হয়ে যাবে`, `balance এ 5000 হয়ে যাবে`, `Error হবে`], 0, {
  1: W(`না, break হয়নি`, `<code>break</code> চলে শুধু choice "3" হলে।`),
  2: W(`না, জমা হয়নি`, `choice 2 মানে তোলা। আর 5000 &gt; 1000, তাই তোলা যায়নি।`),
  '*': W(`না, কোড ঠিক`, `<code>5000 &gt; balance</code> সত্য, তাই "Not enough money" print। loop চলতে থাকে।`)
});

/* ================= কৌশল + বাগ পড়া ================= */
learn(
  Q(`আজ তুমি যা করলে`),
  N(`কোড পড়ার কৌশল:`, 1),
  N(`<b>১.</b> বড় কোড হলে ছোট ছোট টুকরোয় ভাগ করো।`, 2),
  N(`<b>২.</b> শেষের বাইরের লাইনগুলো দেখলে বুঝবে কোডটা আসলে কী চায়।`, 3),
  N(`<b>৩.</b> <code>for</code>/<code>while</code> দেখলে একবার ঘুরে দেখো, কোন variable কীভাবে বদলায়।`, 4),
  N(`<b>৪.</b> <code>def</code> শুধু নাম রাখে, চলে ডাকলে। <code>return</code> মানে ফেরত দাও।`, 5),
  N(`<b>৫.</b> অচেনা শব্দ দেখলে নাম থেকে আন্দাজ করো।`, 6)
);

mcq(false, [Q(`🧪 বাগ কোথায়? কোডটা 600 print করতে চায়, কিন্তু 300 দেখায়।`), C(`cart = [100, 200, 300]\ntotal = 0\nfor price in cart:\n    total = price\nprint("Total:", total)`, '1,2,3,4,5')],
  [`লাইন 2: total = 0 ভুল`, `লাইন 4: += না দিয়ে = দেওয়া হয়েছে`, `লাইন 3: for ভুল`, `লাইন 5: print ভুল`], 1, {
  0: W(`না, 0 দিয়ে শুরু ঠিক`, `যোগফল জমাতে 0 দিয়েই শুরু করতে হয়।`),
  2: W(`না, for ঠিক`, `<code>for</code> তিনটা দামই একে একে নিচ্ছে।`),
  '*': W(`না, print ঠিক`, `print তো শুধু total দেখাচ্ছে। সমস্যা total এর মান জমানোয়।`)
});

mcq(true, [Q(`🧪 শেষ টাস্ক: কী print হবে?`), C(`def is_adult(age):\n    return age >= 18\n\nages = [12, 18, 25, 9]\ncount = 0\nfor a in ages:\n    if is_adult(a):\n        count += 1\nprint(count)`, '1,2,4,5,6,7,8,9'), N(`হিন্ট: <code>is_adult</code> True বা False ফেরত দেয়।`)],
  [`1`, `2`, `3`, `4`], 1, {
  0: W(`না, 18 কি গোনা হয়েছে?`, `<code>18 &gt;= 18</code> True। <code>&gt;=</code> মানে "বড় অথবা সমান"। তাই 18 আর 25, মোট 2।`),
  2: W(`না, 12 আর 9 ছোট`, `12 আর 9 কে 18 এর সাথে মেলালে False, ওদের জন্য count বাড়েনি।`),
  '*': W(`না, সবাই বড় না`, `12 আর 9 অপ্রাপ্তবয়স্ক। শুধু 18 আর 25 এর জন্য True।`)
}, {
  end_html: [
    `<div class='center'>`,
    `<svg class='g' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path class='draw' pathLength='1' d='M8 12.5l3 3 5-6'/></svg>`,
    `<p class='q'>🎉 Class 3 শেষ!</p>`,
    `<p class='note'>আজ তুমি লেখা ছাড়াই পড়লে:</p>`,
    `<p class='note'>✅ <code>for</code> আর <code>while</code> loop<br>✅ list, dictionary (কার্ড)<br>✅ <code>def</code> / <code>return</code> — নিজের কাজের যন্ত্র<br>✅ রেজাল্ট, দোকানের বিল, ATM — বাস্তব ধরনের প্রোগ্রাম<br>✅ বড় কোড টুকরো করে পড়া, বাগ খুঁজে পাওয়া</p>`,
    `<p class='note'>পরের Class এ: আরো বড় কোড পড়া 📖</p>`,
    `</div>`]
});

window.LESSONS = L.map((x, i) => ({ ...x, next: i === L.length - 1 ? null : i + 1 }));
})();