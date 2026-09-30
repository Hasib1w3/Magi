/* CLASS 2 — input(), সংখ্যার হিসাব, তুলনা, if / elif / else
   ব্যাখ্যা বাংলায়, কোড ইংরেজিতে। `next` নিজে নিজে বসে যায়, তাই লেসন যোগ/সরালে নম্বর ঠিক করতে হবে না। */

(() => {
/* ---------- ছোট helper (শুধু লেখা সহজ করার জন্য) ---------- */
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const C = (s, hl = '', x = '') => `<pre class='code ${x}' data-hl='${hl}'>${esc(s)}</pre>`;          // code block
const Q = t => `<p class='q'>${t}</p>`;                                                              // heading
const N = (t, d = 0) => `<p class='note step' style='--d:${d}'>${t}</p>`;                           // note (d = কোন ধাপে আসবে)
const V = (n, v, d = 0) => `<div class='var'><b>${n}</b><span class='fill' style='--d:${d}'>${v}</span></div>`; // variable box
const B = (t, d = 0, x = '') => `<div class='box step ${x}' style='--d:${d}'>${t}</div>`;           // graphic box
const A = (d = 0) => `<svg class='g arw' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path class='draw' pathLength='1' style='--d:${d}' d='M5 12h14M13 6l6 6-6 6'/></svg>`;
const F = (...i) => `<div class='flow'>${i.join('')}</div>`;
const R = (...i) => `<div class='row'>${i.join('')}</div>`;
const SC = (...r) => `<div class='screen'>${r.join('')}</div>`;                                     // কম্পিউটারের স্ক্রিন
const T = (t, d) => `<div class='step' style='--d:${d}'>${esc(t)}</div>`;                            // স্ক্রিনে এক লাইন আউটপুট
const TY = (p, u, d = 0) => `<div><span class='type' style='--n:${p.length};--d:${d}'>${esc(p)}</span><span class='type you' style='--n:${u.length};--d:${d + 2}'>${esc(u)}</span></div>`; // প্রশ্ন + ইউজারের টাইপ
const W = (t, ...n) => [Q(t), ...n.map(x => N(x))];                                                   // ভুল উত্তরের পর্দা

const L = [];
const learn = (...h) => L.push({ state: 'learn', html: h.flat() });
const mcq = (col, html, options, answer, wrong, extra = {}) => L.push({ state: 'mcq', is_column: col, html: [].concat(html), options, answer, wrong, ...extra });

/* ================= ভূমিকা ================= */
learn(
  Q('Class 2 — এবার প্রোগ্রাম তোমার সাথে কথা বলবে'),
  N('Class 1 এ তুমি শিখেছো <code>print</code>, variable আর ৪টা type:', 1),
  R(V('name', '"Mahi"', 2), V('age', '13', 3), V('height', '5.2', 4), V('is_student', 'True', 5)),
  N('আজকের ৪টা ধাপ:<br>১. <code>input()</code> — ইউজারকে প্রশ্ন করো<br>২. সংখ্যা নিয়ে হিসাব<br>৩. তুলনা — বড়, ছোট, সমান<br>৪. <code>if / else</code> — কম্পিউটার নিজে সিদ্ধান্ত নেবে', 7)
);

/* ================= ধাপ ১: input() ================= */
learn(
  Q('input() — ইউজারকে প্রশ্ন করো'),
  N('এতদিন তুমি নিজেই কোডে <code>name = "Mahi"</code> লিখে দিয়েছো। কিন্তু অন্য কেউ প্রোগ্রাম চালালে? তার নাম তো Mahi না!'),
  N('<code>input()</code> কম্পিউটারকে বলে: <b>থামো, ইউজারকে জিজ্ঞেস করো, উত্তরের জন্য অপেক্ষা করো।</b>', 1),
  C('input("Your name: ")', '1'),
  SC(TY('Your name: ', 'Mahi', 2)),
  N('<b>নীল</b> লেখাটা ইউজার টাইপ করছে। Enter চাপলে প্রোগ্রাম আবার চলতে শুরু করে।', 6)
);

learn(
  Q('উত্তরটা কোথায় যায়?'),
  C('name = input("Your name: ")', '1'),
  F(B('প্রশ্ন দেখায়', 1), A(2), B('ইউজার লেখে', 3), A(4), B('Enter', 5, 'plain'), A(6), V('name', '"Mahi"', 7)),
  N('বাঁ দিকের বাক্সে <code>name</code> আর ডান দিকে <code>input(...)</code>। <code>=</code> মানে <b>রাখো</b> — ইউজারের উত্তরটা <code>name</code> বাক্সে জমা হয়।', 8),
  N('বন্ধনীর ভেতরের লেখা (<code>"Your name: "</code>) হলো ইউজারকে দেখানো প্রশ্ন।', 9)
);

mcq(true, [Q('input() কী করে?'), C('city = input("City: ")', '1')],
  ['স্ক্রিনে City লেখা দেখায় আর থামে না', 'ইউজারের লেখা নিয়ে city বাক্সে রাখে', 'city নামে একটা সংখ্যা বানায়', 'প্রোগ্রাম বন্ধ করে দেয়'], 1, {
  0: W('না, সেটা print এর কাজ', '<code>print</code> স্ক্রিনে <b>দেখায়</b>। <code>input</code> উল্টো — ইউজারের কাছ থেকে <b>নেয়</b>।'),
  2: W('না, সংখ্যা না', 'ইউজার যা লিখবে (নাম, শহর, যা খুশি) সেটাই <code>city</code> এ যাবে।'),
  '*': W('না, বন্ধ হয় না', 'প্রোগ্রাম শুধু <b>অপেক্ষা করে</b>। Enter চাপলে আবার চলে।')
});

learn(
  Q('উত্তর ব্যবহার করো'),
  C('name = input("Your name: ")\nprint("Hello", name)', '1,2', 'run'),
  SC(TY('Your name: ', 'Rafi', 0), T('Hello Rafi', 5)),
  N('<code>print("Hello", name)</code> — কমা (<code>,</code>) দিয়ে দুটো জিনিস দিলে মাঝে <b>নিজে থেকে space</b> বসে।', 5),
  N('Class 1 এ শিখেছো <code>+</code> দিয়ে লেখা জোড়া লাগে। তাই <code>print("Hello " + name)</code> ও একই কাজ করে — কিন্তু space নিজেকে দিতে হয়।', 7)
);

mcq(true, [Q('কী print হবে?'), C('name = "Rafi"\nprint("Hi " + name)', '1,2')],
  ['Hi name', 'HiRafi', 'Hi Rafi', 'Error'], 2, {
  0: W('না, name quotes ছাড়া', '<code>name</code> এ quotes নেই, তাই এটা variable। Python বাক্স খুলে ভেতরের <code>Rafi</code> দেখায়।'),
  1: W('প্রায় ঠিক, কিন্তু space আছে!', '<code>"Hi "</code> এর শেষে একটা space আছে। তাই জোড়া লাগলে <code>Hi Rafi</code>।'),
  '*': W('না, Error নেই', 'লেখা + লেখা সবসময় চলে। <code>"Hi " + "Rafi"</code> = <code>Hi Rafi</code>')
});

/* ================= ধাপ ২: input() সবসময় String ================= */
learn(
  Q('⚠️ input() সবসময় String দেয়!'),
  C('age = input("Age: ")\nprint(type(age))', '1,2', 'run'),
  SC(TY('Age: ', '15', 0), T("<class 'str'>", 5)),
  R(V('age', '"15"', 6)),
  N('ইউজার <code>15</code> টাইপ করলেও Python সেটাকে <b>লেখা</b> ধরে — quotes সহ <code>"15"</code>।', 7),
  N('কারণ ইউজার কী লিখবে Python আগে থেকে জানে না — নাম, সংখ্যা, যা খুশি হতে পারে। তাই সবসময় নিরাপদ ধরন: <b>str</b>।', 8)
);

mcq(false, [Q('ইউজার 20 লিখলো। type(x) কী দেবে?'), C('x = input()\nprint(type(x))', '1,2')],
  ['int', 'str', 'float', 'bool'], 1, {
  0: W('না, int না!', '<code>input()</code> সবসময় <b>লেখা (str)</b> দেয়। সংখ্যা লিখলেও।'),
  2: W('না, float না!', 'ইউজার দশমিক লিখলেও <code>input()</code> সেটাকে <b>str</b> বানিয়ে দেয়।'),
  '*': W('না, bool না!', '<code>input()</code> সবসময় <b>str</b> দেয়। এটাই নিয়ম।')
});

/* ================= ধাপ ৩: int(), float(), str() ================= */
learn(
  Q('int() — লেখাকে সংখ্যা বানাও'),
  C('age = int(input("Age: "))', '1'),
  F(B('"15"<br>লেখা', 1), A(2), B('int( )', 3, 'plain'), A(4), B('15<br>সংখ্যা', 5)),
  N('<code>int()</code> একটা <b>যন্ত্র</b>: লেখা ঢোকালে সংখ্যা বের হয়। এখন <code>age</code> দিয়ে হিসাব করা যাবে।', 6),
  N('আগে <code>input()</code> চলে, তারপর তার উত্তর <code>int()</code> এ যায় — <b>ভেতর থেকে বাইরে</b>।', 7),
  N('দশমিক সংখ্যা হলে <code>float()</code>। উল্টোটা: <code>str(15)</code> সংখ্যাকে লেখা বানায়।', 8)
);

mcq(true, [Q('দুটো সংখ্যা যোগ করতে ফাঁকা জায়গায় কী বসবে?'), C('a = ___(input("A: "))\nb = ___(input("B: "))\nprint(a + b)', '1,2,3')],
  ['str', 'int', 'print', 'type'], 1, {
  0: W('না, str দিলে জোড়া লাগবে!', '<code>str</code> দিলে 3 আর 4 লেখা হয়ে যায়। <code>"3" + "4"</code> = <code>"34"</code>, যোগফল 7 না!'),
  2: W('না, print দিলে ভুল', '<code>print</code> স্ক্রিনে দেখায়, লেখাকে সংখ্যা বানায় না।'),
  '*': W('না, type দিয়ে হবে না', '<code>type</code> শুধু ধরন <b>বলে</b>, বদলায় না। বদলাতে চাই <code>int()</code>।')
});

/* ================= ধাপ ৪: সংখ্যার হিসাব ================= */
learn(
  Q('সংখ্যার হিসাব — operator'),
  C('print(10 + 3)\nprint(10 - 3)\nprint(10 * 3)\nprint(10 / 4)\nprint(10 // 4)\nprint(10 % 4)\nprint(2 ** 3)', '1,2,3,4,5,6,7', 'run'),
  SC(T('13', 1), T('7', 3), T('30', 5), T('2.5', 7), T('2', 9), T('2', 11), T('8', 13)),
  N('<code>+</code> যোগ &nbsp; <code>-</code> বিয়োগ &nbsp; <code>*</code> গুণ (× না!) &nbsp; <code>**</code> power', 14),
  N('<code>/</code> ভাগ — উত্তর <b>সবসময় দশমিক</b> (<code>10 / 5</code> = <code>2.0</code>)', 15)
);

learn(
  Q('// আর % — চকলেট ভাগ 🍫'),
  N('১০টা চকলেট ৪ জনের মধ্যে ভাগ করলে:'),
  R(...Array.from({ length: 10 }, (_, i) => `<span class='step' style='--d:${i * .3 + 1}'>🍫</span>`)),
  C('print(10 // 4)\nprint(10 % 4)', '1,2', 'run'),
  SC(T('2', 3), T('2', 5)),
  N('<code>//</code> = <b>ভাগফল</b>, প্রত্যেকে কয়টা পাবে (পুরো সংখ্যা)।<br><code>%</code> = <b>ভাগশেষ</b>, কয়টা বাকি থাকবে।', 6)
);

mcq(true, [Q('কী print হবে?'), C('print(17 % 5)', '1'), N('হিন্ট: ১৭ কে ৫ দিয়ে ভাগ করলে ভাগশেষ কত?')],
  ['3', '2', '3.4', '12'], 1, {
  0: W('3 হলো ভাগফল', '<code>17 // 5</code> = 3। কিন্তু <code>%</code> চায় <b>ভাগশেষ</b>: 5×3 = 15, বাকি 17 − 15 = <b>2</b>।'),
  2: W('না, 3.4 হলো / এর উত্তর', '<code>17 / 5</code> = 3.4। কিন্তু <code>%</code> দেয় ভাগশেষ: <b>2</b>।'),
  '*': W('না, এটা কোথা থেকে এলো?', '5×3 = 15, বাকি 17 − 15 = <b>2</b>। এটাই <code>17 % 5</code>।')
});

/* ================= ধাপ ৫: তুলনা ================= */
learn(
  Q('তুলনা — উত্তর সবসময় True / False'),
  C('print(5 > 3)\nprint(5 < 3)\nprint(5 == 5)\nprint(5 != 5)\nprint(5 >= 5)', '1,2,3,4,5', 'run'),
  SC(T('True', 1), T('False', 3), T('True', 5), T('False', 7), T('True', 9)),
  N('<code>&gt;</code> বড় &nbsp; <code>&lt;</code> ছোট &nbsp; <code>==</code> সমান &nbsp; <code>!=</code> সমান না &nbsp; <code>&gt;=</code> বড় বা সমান &nbsp; <code>&lt;=</code> ছোট বা সমান', 10),
  N('⚠️ <code>=</code> মানে <b>রাখো</b> (variable এ)।<br><code>==</code> মানে <b>সমান কিনা?</b> (প্রশ্ন)। এদের গুলিয়ে ফেলো না!', 11)
);

mcq(true, [Q('age == 15 এর মানে কী?'), C('age = 15\nprint(age == 15)', '1,2')],
  ['age বাক্সে 15 রাখো', 'age কি 15 এর সমান? (উত্তর True/False)', 'age কে 15 বানাও', 'Error'], 1, {
  0: W('না, সেটা = এর কাজ', 'একটা <code>=</code> মানে রাখো। দুটো <code>==</code> মানে <b>প্রশ্ন</b>: সমান কি?'),
  2: W('না, বানানোর কাজ = এর', '<code>==</code> কিছু বদলায় না, শুধু <b>জিজ্ঞেস করে</b>।'),
  '*': W('না, Error নেই', 'কোডটা ঠিক। <code>age</code> এ 15 আছে, তাই উত্তর <code>True</code>।')
});

mcq(false, [Q('কী print হবে?'), C('print("Mahi" == "mahi")', '1'), N('ভালো করে দেখো: M বড় হাতের, m ছোট হাতের।')],
  ['True', 'False', 'Error', 'Mahi'], 1, {
  0: W('না, অক্ষর মেলেনি!', 'Python এ বড় হাতের <code>M</code> আর ছোট হাতের <code>m</code> <b>আলাদা</b>। তাই সমান না।'),
  2: W('না, Error নেই', 'লেখার তুলনা করা যায়। শুধু বড়/ছোট হাতের অক্ষর আলাদা ধরা হয়।'),
  '*': W('না, print তুলনার ফল দেখায়', 'তুলনার উত্তর সবসময় <code>True</code> বা <code>False</code>। এখানে <b>False</b>।')
});

/* ================= ধাপ ৬: if ================= */
learn(
  Q('if — শর্ত মিললে তবেই করো'),
  F(B('বৃষ্টি হচ্ছে?', 1), A(2), B('হ্যাঁ → ছাতা নাও ☂️', 3, 'plain')),
  C('age = 15\nif age >= 13:\n    print("Teenager")', '1,2,3', 'run'),
  SC(T('Teenager', 5)),
  N('<code>if</code> এর পরে <b>শর্ত</b>, শেষে <b>colon <code>:</code></b>। শর্ত <code>True</code> হলে নিচের লাইন চলে।', 5),
  N('নিচের লাইনটা <b>৪ space ভেতরে</b> (indent)। এভাবেই Python বোঝে কোনটা <code>if</code> এর ভেতরের কাজ।', 7)
);

learn(
  Q('শর্ত False হলে?'),
  C('age = 10\nif age >= 13:\n    print("Teenager")\nprint("Done")', '1,2,4', 'run'),
  SC(T('Done', 7)),
  N('<code>10 &gt;= 13</code> False। তাই ভেতরের লাইন <b>স্কিপ</b> — ধূসর লাইনটা চলেনি।', 4),
  N('শেষ লাইনটা indent ছাড়া, তাই সেটা <code>if</code> এর বাইরে। সেটা সবসময় চলে।', 6)
);

mcq(true, [Q('কী print হবে?'), C('x = 3\nif x > 5:\n    print("Big")\nprint("End")', '1,2,3,4')],
  ['Big', 'End', 'Big End', 'Error'], 1, {
  0: W('না, 3 কি 5 এর বড়?', '<code>3 &gt; 5</code> False। তাই <code>print("Big")</code> স্কিপ।'),
  2: W('না, Big চলেনি', 'শর্ত False, তাই <code>Big</code> আসে না। শুধু <code>End</code> আসে — সেটা indent ছাড়া, সবসময় চলে।'),
  '*': W('না, Error নেই', 'কোড ঠিক আছে। শর্ত False হলে ভেতরের লাইন শুধু স্কিপ হয়, Error দেয় না।')
});

learn(
  Q('⚠️ দুটো সাধারণ ভুল'),
  C('if age >= 13\n    print("Teenager")', '1'),
  N('❌ <b>colon ভুলে গেছো</b> → <code>SyntaxError</code>', 1),
  C('if age >= 13:\nprint("Teenager")', '2'),
  N('❌ <b>indent নেই</b> → <code>IndentationError</code>', 3),
  N('✅ সবসময়: শর্তের শেষে <code>:</code> আর নিচের লাইনে <b>৪ space</b>।', 4)
);

mcq(true, [Q('কোনটা সঠিক if লাইন?')],
  ['if x > 5', 'if x > 5:', 'if x = 5:', 'if x > 5;'], 1, {
  0: W('না, colon নেই!', 'শেষে <code>:</code> না দিলে <code>SyntaxError</code>।'),
  2: W('না, = না, == হবে!', 'তুলনা করতে <code>==</code>। একটা <code>=</code> মানে "রাখো" — শর্তে চলে না।'),
  '*': W('না, semicolon না', 'Python এ <code>:</code> (colon) লাগে, <code>;</code> না।')
});

/* ================= ধাপ ৭: else / elif ================= */
learn(
  Q('else — নাহলে এটা করো'),
  C('age = 10\nif age >= 13:\n    print("Teenager")\nelse:\n    print("Child")', '1,2,4,5', 'run'),
  SC(T('Child', 9)),
  N('<code>else:</code> মানে <b>"নাহলে"</b>। <code>if</code> এর শর্ত False হলে <code>else</code> এর কাজ চলে।', 5),
  N('<b>দুটোর মধ্যে ঠিক একটাই চলে</b> — কখনো দুটো একসাথে না, কখনো একটাও বাদ যায় না।', 7)
);

mcq(true, [Q('কী print হবে?'), C('x = 2\nif x > 5:\n    print("A")\nelse:\n    print("B")', '1,2,3,4,5')],
  ['A', 'B', 'A B', 'Error'], 1, {
  0: W('না, 2 কি 5 এর বড়?', '<code>2 &gt; 5</code> False। তাই <code>if</code> এর কাজ স্কিপ, <code>else</code> চলে।'),
  2: W('না, দুটো একসাথে চলে না', '<code>if</code> আর <code>else</code> থেকে <b>একটাই</b> চলে।'),
  '*': W('না, Error নেই', 'কোড ঠিক। শর্ত False, তাই <code>else</code> চলে: <code>B</code>।')
});

learn(
  Q('elif — অনেক রাস্তা'),
  C('score = 65\nif score >= 80:\n    print("A")\nelif score >= 60:\n    print("B")\nelse:\n    print("C")', '1,2,4,5', 'run'),
  SC(T('B', 9)),
  N('Python <b>ওপর থেকে নিচে</b> একটা একটা করে শর্ত দেখে। <code>65 &gt;= 80</code> False → পরেরটা। <code>65 &gt;= 60</code> True → <code>B</code>।', 5),
  N('<b>প্রথম যেটা True, সেটা চলে — বাকি সব স্কিপ।</b> <code>elif</code> = else + if।', 7)
);

mcq(true, [Q('score = 85 হলে কী print হবে?'), C('if score >= 80:\n    print("A")\nelif score >= 60:\n    print("B")\nelse:\n    print("C")', '1,2,3,4,5,6,7')],
  ['A', 'B', 'A B', 'C'], 0, {
  1: W('না, B না!', '85 >= 60 ও True, কিন্তু Python <b>প্রথম True</b> এ থেমে যায়। আগেই <code>85 &gt;= 80</code> True হয়েছে, তাই <code>A</code>।'),
  2: W('না, একটাই চলে', '<code>if / elif / else</code> এর মধ্যে <b>একটাই</b> চলে — যেটা আগে True।'),
  '*': W('না, C না', '<code>else</code> চলে শুধু যখন <b>কোনো</b> শর্তই True না। এখানে প্রথমটাই True।')
});

/* ================= ধাপ ৮: and / or / not ================= */
learn(
  Q('and, or, not — শর্ত জোড়া দাও'),
  C('age = 15\nprint(age >= 13 and age <= 19)\nprint(age < 5 or age > 60)\nprint(not True)', '1,2,3,4', 'run'),
  SC(T('True', 3), T('False', 5), T('False', 7)),
  N('<code>and</code> — <b>দুটোই</b> True হলে True। (13 এর বেশি <b>এবং</b> 19 এর কম → teenager)', 4),
  N('<code>or</code> — <b>যেকোনো একটা</b> True হলেই True। (5 এর কম <b>অথবা</b> 60 এর বেশি → ১৫ দুটোর কোনোটাই না)', 6),
  N('<code>not</code> — <b>উল্টে দেয়</b>। <code>not True</code> = <code>False</code>', 8)
);

mcq(true, [Q('কী print হবে?'), C('print(5 > 3 and 2 > 9)', '1'), N('ভাঙো: 5 > 3 কী? 2 > 9 কী? তারপর and।')],
  ['True', 'False', 'Error', '5'], 1, {
  0: W('না, দ্বিতীয়টা False!', '<code>and</code> এ দুটোই True হতে হয়। <code>2 &gt; 9</code> False, তাই পুরোটা <b>False</b>।'),
  2: W('না, Error নেই', 'দুটো তুলনা <code>and</code> দিয়ে জোড়া দেওয়া একদম ঠিক।'),
  '*': W('না, উত্তর সংখ্যা না', 'তুলনা আর <code>and</code> এর ফল সবসময় <code>True</code> বা <code>False</code>।')
});

/* ================= সব একসাথে ================= */
learn(
  Q('সব একসাথে — টিকিটের দাম 🎟️'),
  C('age = int(input("Age: "))\nif age < 5:\n    print("Free")\nelif age < 18:\n    print("50 taka")\nelse:\n    print("100 taka")', '1,2,4,5', 'run'),
  SC(TY('Age: ', '12', 0), T('50 taka', 9)),
  N('১. <code>input()</code> — ইউজার লেখে <code>"12"</code> (লেখা)<br>২. <code>int()</code> — সংখ্যা 12 বানায়<br>৩. <code>12 &lt; 5</code> False<br>৪. <code>12 &lt; 18</code> True → <code>50 taka</code>', 9),
  N('Class 2 এর প্রায় সবকিছু এই ছোট প্রোগ্রামে আছে! 💪', 11)
);

mcq(true, [Q('🧪 টাস্ক ১: ইউজার 3 লিখলে কী আসবে?'), C('age = int(input("Age: "))\nif age < 5:\n    print("Free")\nelif age < 18:\n    print("50 taka")\nelse:\n    print("100 taka")', '1,2,3,4,5,6,7')],
  ['Free', '50 taka', '100 taka', 'Error'], 0, {
  1: W('না, প্রথম শর্তই True!', '<code>3 &lt; 5</code> True। Python প্রথম True এ থেমে যায়, <code>elif</code> পর্যন্ত যায়ই না।'),
  2: W('না, else শেষ ভরসা', '<code>else</code> চলে শুধু যখন আগের সব শর্ত False। এখানে প্রথমটাই True।'),
  '*': W('না, Error নেই', '<code>int()</code> দেওয়া আছে, তাই 3 সংখ্যা। কোডটা ঠিক।')
});

mcq(false, [Q('🧪 টাস্ক ২: বাগ কোথায়?'), C('n = input("Number: ")\nif n > 10:\n    print("Big")', '1,2,3')],
  ['লাইন 1: input ভুল', 'লাইন 2: n লেখা (str), সংখ্যার সাথে তুলনা', 'লাইন 3: print ভুল', 'কোনো বাগ নেই'], 1, {
  0: W('না, input ঠিক আছে', '<code>input()</code> ঠিকই আছে। সমস্যা হলো এর উত্তর <b>str</b>, সেটাকে সংখ্যা বানানো হয়নি।'),
  2: W('না, print ঠিক আছে', '<code>print("Big")</code> ঠিক। সমস্যা আগে — লাইন 2 এ।'),
  '*': W('না, বাগ আছে!', '<code>n</code> এ লেখা (str)। লেখা আর সংখ্যা তুলনা করলে <code>TypeError</code>। ঠিক করতে: <code>int(input(...))</code>।')
});

mcq(true, [Q('🧪 শেষ টাস্ক: ইউজার 20 লিখলে কী আসবে?'), C('age = int(input("Age: "))\nif age < 5:\n    print("Free")\nelif age < 18:\n    print("50 taka")\nelse:\n    print("100 taka")', '1,2,3,4,5,6,7')],
  ['Free', '50 taka', '100 taka', 'Error'], 2, {
  0: W('না, 20 কি 5 এর ছোট?', '<code>20 &lt; 5</code> False।'),
  1: W('না, 20 কি 18 এর ছোট?', '<code>20 &lt; 18</code> False। দুটো শর্তই False।'),
  '*': W('না, Error নেই', 'কোড ঠিক। দুটো শর্তই False, তাই <code>else</code> চলে।')
}, {
  end_html: [
    "<div class='center'>",
    "<svg class='g' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path class='draw' pathLength='1' d='M8 12.5l3 3 5-6'/></svg>",
    "<p class='q'>🎉 Class 2 শেষ!</p>",
    "<p class='note'>তুমি এখন জানো:</p>",
    "<p class='note'>✅ <code>input()</code> — ইউজারের কাছ থেকে নাও (সবসময় str)<br>✅ <code>int()</code>, <code>float()</code>, <code>str()</code> — ধরন বদলাও<br>✅ <code>+ - * / // % **</code> — হিসাব<br>✅ <code>== != &gt; &lt; &gt;= &lt;=</code> — তুলনা (ফল True/False)<br>✅ <code>if / elif / else</code> — সিদ্ধান্ত, colon আর indent সহ<br>✅ <code>and / or / not</code> — শর্ত জোড়া দেওয়া</p>",
    "<p class='note'>পরের Class এ শিখবে: <b>while</b> আর <b>for</b> loop 🔁</p>",
    "</div>"]
});

window.LESSONS = L.map((x, i) => ({ ...x, next: i === L.length - 1 ? null : i + 1 }));
})();
