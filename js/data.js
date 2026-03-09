/* ═══════════════════════════════════════════════
   NEW TESTAMENT BOOK DATA
   Comprehensive background for all 27 books
   ═══════════════════════════════════════════════ */

const NT_BOOKS = [
  // ─── GOSPELS ───
  {
    id: "matthew",
    name: "Matthew",
    category: "gospel",
    chapters: 28,
    author: "Matthew (Levi)",
    authorInfo: "Matthew was a Jewish tax collector in Capernaum before Jesus called him to be one of the twelve apostles. As a tax collector, he would have been literate, skilled in record-keeping, and familiar with both Jewish and Roman culture. His profession made him despised by fellow Jews, yet Jesus chose him — a powerful testimony to grace. His Jewish background and knowledge of the Old Testament is evident throughout his Gospel, which contains more Old Testament quotations than any other.",
    date: "AD 50–70",
    dateMid: 60,
    writtenFrom: "Antioch, Syria",
    writtenFromCoords: [540, 295],
    audience: "Jewish Christians",
    audienceDesc: "Primarily written for Jewish believers and those familiar with the Hebrew Scriptures, to demonstrate that Jesus is the promised Messiah.",
    purpose: "To present Jesus as the long-awaited Jewish Messiah and King, the fulfillment of Old Testament prophecy, and to provide a manual for the teaching and discipleship life of the church.",
    historicalContext: "Written during a period of growing tension between the Jewish synagogue and the emerging Christian church. After the destruction of the Temple in AD 70, Jewish identity was in crisis. Matthew's community needed to understand how Jesus fulfilled — rather than abolished — the Law and the Prophets. The Roman Empire provided both the political backdrop and the roads that would carry this Gospel across the ancient world.",
    keyThemes: ["Kingdom of Heaven", "Fulfillment of Prophecy", "Discipleship", "The Church", "Righteousness", "Jesus as King"],
    keyVerse: { text: "Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfill them.", ref: "Matthew 5:17" },
    outline: [
      { title: "Birth and Preparation", ref: "Ch. 1–4", desc: "Genealogy, birth narrative, baptism, temptation" },
      { title: "Sermon on the Mount", ref: "Ch. 5–7", desc: "Jesus' foundational teaching on Kingdom living" },
      { title: "Miracles and Ministry", ref: "Ch. 8–10", desc: "Healing, authority, and commissioning the twelve" },
      { title: "Opposition and Parables", ref: "Ch. 11–13", desc: "Growing conflict, Kingdom parables" },
      { title: "Training the Disciples", ref: "Ch. 14–20", desc: "Deeper teaching, Peter's confession, Transfiguration" },
      { title: "Final Week and Passion", ref: "Ch. 21–27", desc: "Triumphal Entry, crucifixion, burial" },
      { title: "Resurrection and Commission", ref: "Ch. 28", desc: "The Great Commission" }
    ],
    connections: ["Mark", "Luke", "Old Testament Prophets"],
    funFacts: [
      "Contains 5 major teaching discourses, possibly mirroring the 5 books of Moses",
      "Uses the phrase 'Kingdom of Heaven' 32 times (unique among the Gospels)",
      "Includes the only Gospel references to 'the church' (ekklesia)"
    ]
  },
  {
    id: "mark",
    name: "Mark",
    category: "gospel",
    chapters: 16,
    author: "John Mark",
    authorInfo: "John Mark was a companion of both Peter and Paul. Early church tradition (Papias, c. AD 130) says Mark served as Peter's interpreter and wrote down Peter's recollections of Jesus' ministry. Mark's mother Mary hosted the early church in her Jerusalem home (Acts 12:12). Though he initially abandoned Paul on a missionary journey (Acts 13:13), he was later reconciled and Paul called him 'useful to me for ministry' (2 Timothy 4:11).",
    date: "AD 55–65",
    dateMid: 60,
    writtenFrom: "Rome",
    writtenFromCoords: [270, 245],
    audience: "Roman Christians",
    audienceDesc: "Gentile believers in Rome who were likely facing persecution under Nero. Mark explains Jewish customs and translates Aramaic terms for his non-Jewish readers.",
    purpose: "To present Jesus as the suffering Servant and Son of God who came not to be served but to serve, encouraging believers facing persecution to remain faithful.",
    historicalContext: "Rome in the early 60s was a dangerous place for Christians. Emperor Nero blamed Christians for the Great Fire of Rome (AD 64), leading to horrific persecution. Believers were being martyred — including, according to tradition, both Peter and Paul. Mark wrote to strengthen a community under fire, showing them a Jesus who himself suffered and called his followers to take up their cross.",
    keyThemes: ["Jesus as Servant", "Suffering and the Cross", "Discipleship", "The Messianic Secret", "Authority of Jesus", "Urgency"],
    keyVerse: { text: "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.", ref: "Mark 10:45" },
    outline: [
      { title: "Preparation for Ministry", ref: "Ch. 1:1–13", desc: "John the Baptist, baptism, temptation" },
      { title: "Galilean Ministry", ref: "Ch. 1:14–6:6", desc: "Healings, conflicts, parables" },
      { title: "Beyond Galilee", ref: "Ch. 6:7–8:26", desc: "Feeding miracles, growing revelation" },
      { title: "Road to Jerusalem", ref: "Ch. 8:27–10:52", desc: "Passion predictions, discipleship teaching" },
      { title: "Jerusalem Ministry", ref: "Ch. 11–13", desc: "Temple, controversies, Olivet Discourse" },
      { title: "Passion and Resurrection", ref: "Ch. 14–16", desc: "Last Supper, crucifixion, empty tomb" }
    ],
    connections: ["Matthew", "Luke", "1 Peter"],
    funFacts: [
      "The shortest Gospel — fast-paced and action-oriented",
      "Uses the word 'immediately' (euthys) over 40 times",
      "The earliest written Gospel according to most scholars"
    ]
  },
  {
    id: "luke",
    name: "Luke",
    category: "gospel",
    chapters: 24,
    author: "Luke",
    authorInfo: "Luke was a Gentile physician and the only non-Jewish author in the New Testament. He was a close companion of Paul, traveling with him on several missionary journeys (the 'we' passages in Acts). His medical background shows in his precise descriptions of illnesses and healings. He was a careful historian who investigated eyewitness accounts and wrote in polished literary Greek. Paul called him 'the beloved physician' (Colossians 4:14).",
    date: "AD 59–63",
    dateMid: 61,
    writtenFrom: "Caesarea or Rome",
    writtenFromCoords: [470, 310],
    audience: "Theophilus (and Gentile believers)",
    audienceDesc: "Addressed to 'most excellent Theophilus,' likely a Roman official or patron. Written for educated Gentile readers who needed an orderly, historically grounded account of Jesus' life.",
    purpose: "To provide an orderly, historically reliable account of Jesus' life and to show that the Gospel is for all people — Jew and Gentile, rich and poor, men and women.",
    historicalContext: "Luke wrote during a time when Christianity was spreading rapidly across the Roman Empire and needed a credible, well-researched account that would stand up to scrutiny. The Roman world valued historical writing, and Luke positioned his Gospel as serious historiography, naming governors, emperors, and specific dates to anchor his narrative in real history.",
    keyThemes: ["Jesus for All People", "The Holy Spirit", "Prayer", "Joy", "Concern for the Poor and Outcast", "Women in Ministry", "Salvation History"],
    keyVerse: { text: "For the Son of Man came to seek and to save the lost.", ref: "Luke 19:10" },
    outline: [
      { title: "Prologue and Birth Narratives", ref: "Ch. 1–2", desc: "Detailed accounts of John and Jesus' births" },
      { title: "Preparation for Ministry", ref: "Ch. 3–4:13", desc: "Baptism, genealogy, temptation" },
      { title: "Galilean Ministry", ref: "Ch. 4:14–9:50", desc: "Teaching, healing, calling disciples" },
      { title: "Journey to Jerusalem", ref: "Ch. 9:51–19:27", desc: "The great 'travel narrative' with unique parables" },
      { title: "Jerusalem Ministry", ref: "Ch. 19:28–21:38", desc: "Temple cleansing, teaching, prophecy" },
      { title: "Passion and Resurrection", ref: "Ch. 22–24", desc: "Last Supper, cross, Emmaus road, ascension" }
    ],
    connections: ["Acts", "Mark", "Matthew"],
    funFacts: [
      "Contains the most parables unique to one Gospel (15), including the Good Samaritan and Prodigal Son",
      "Luke-Acts together make up about 27% of the New Testament — more than any other author",
      "The longest book in the New Testament by word count"
    ]
  },
  {
    id: "john",
    name: "John",
    category: "gospel",
    chapters: 21,
    author: "John the Apostle",
    authorInfo: "John was one of Jesus' inner circle (along with Peter and James), the son of Zebedee, and a fisherman from Galilee. He refers to himself as 'the disciple whom Jesus loved.' He was likely the youngest apostle and lived the longest, eventually settling in Ephesus where he led the churches of Asia Minor. Tradition says he was the only apostle who died of natural causes, living to an advanced age under Emperor Trajan.",
    date: "AD 85–95",
    dateMid: 90,
    writtenFrom: "Ephesus",
    writtenFromCoords: [430, 265],
    audience: "Broader Christian community",
    audienceDesc: "Written for a mixed audience of Jewish and Gentile believers, particularly in Asia Minor, to deepen faith and combat early heresies about Jesus' true nature.",
    purpose: "To present Jesus as the divine Son of God so that readers may believe and have eternal life. John provides a theological and spiritual complement to the Synoptic Gospels.",
    historicalContext: "By the late first century, the church had grown dramatically but faced new challenges: false teachings about Jesus' nature (early Gnosticism and Docetism denied Jesus' true humanity or divinity), the expulsion of Christians from synagogues, and the need for deeper theological understanding. John wrote as the last living eyewitness of Jesus' ministry, providing his unique perspective after decades of reflection.",
    keyThemes: ["Jesus as the Divine Word", "Belief and Eternal Life", "Light vs. Darkness", "The 'I Am' Statements", "The Holy Spirit (Paraclete)", "Love", "Signs and Glory"],
    keyVerse: { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", ref: "John 3:16" },
    outline: [
      { title: "Prologue: The Word", ref: "Ch. 1:1–18", desc: "The divine nature and incarnation of Jesus" },
      { title: "Book of Signs", ref: "Ch. 1:19–12:50", desc: "Seven miraculous signs revealing Jesus' glory" },
      { title: "Farewell Discourse", ref: "Ch. 13–17", desc: "Last Supper, teaching, high priestly prayer" },
      { title: "Passion Narrative", ref: "Ch. 18–19", desc: "Arrest, trial, crucifixion" },
      { title: "Resurrection", ref: "Ch. 20–21", desc: "Empty tomb, appearances, restoration of Peter" }
    ],
    connections: ["1 John", "2 John", "3 John", "Revelation"],
    funFacts: [
      "Contains 7 'I Am' statements of Jesus (Bread of Life, Light of the World, etc.)",
      "Over 90% of John's content is unique — not found in the other Gospels",
      "The word 'believe' appears about 98 times in John"
    ]
  },

  // ─── HISTORY ───
  {
    id: "acts",
    name: "Acts",
    category: "history",
    chapters: 28,
    author: "Luke",
    authorInfo: "The same Luke who wrote the Gospel — a Gentile physician and companion of Paul. Acts is the second volume of Luke's two-part work (Luke-Acts). Luke was an eyewitness to portions of the events he records (the 'we' sections beginning in Acts 16), giving parts of Acts the quality of a travel diary.",
    date: "AD 62–64",
    dateMid: 63,
    writtenFrom: "Rome",
    writtenFromCoords: [270, 245],
    audience: "Theophilus (and the wider Church)",
    audienceDesc: "Continues the account begun in Luke's Gospel for Theophilus, showing how the message of Jesus spread from Jerusalem to Rome.",
    purpose: "To record the birth and expansion of the early Church through the power of the Holy Spirit, tracing the Gospel's spread from Jerusalem to the ends of the earth.",
    historicalContext: "Acts covers roughly 30 years (AD 30–62) of explosive church growth. It spans the reigns of emperors Tiberius, Caligula, Claudius, and Nero. The church navigated Jewish persecution, Roman suspicion, cultural barriers, and the monumental question of whether Gentiles could be included without becoming Jewish. Paul's missionary journeys established churches across modern-day Turkey, Greece, and eventually reached Rome itself.",
    keyThemes: ["The Holy Spirit", "Witness and Mission", "The Church", "Jew and Gentile United", "Boldness in Persecution", "Prayer", "The Sovereignty of God"],
    keyVerse: { text: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.", ref: "Acts 1:8" },
    outline: [
      { title: "The Church in Jerusalem", ref: "Ch. 1–7", desc: "Pentecost, early community, Stephen's martyrdom" },
      { title: "Expansion to Judea and Samaria", ref: "Ch. 8–12", desc: "Philip, Paul's conversion, Peter and Cornelius" },
      { title: "Paul's First Missionary Journey", ref: "Ch. 13–14", desc: "Cyprus, Galatia" },
      { title: "The Jerusalem Council", ref: "Ch. 15", desc: "Gentile inclusion decided" },
      { title: "Second and Third Journeys", ref: "Ch. 16–20", desc: "Greece, Ephesus, strengthening churches" },
      { title: "Paul's Arrest and Journey to Rome", ref: "Ch. 21–28", desc: "Trials, shipwreck, arrival in Rome" }
    ],
    connections: ["Luke", "Paul's Epistles"],
    funFacts: [
      "Records over 30 sermons and speeches",
      "Covers a geographic span of about 2,000 miles from Jerusalem to Rome",
      "The Holy Spirit is mentioned about 60 times"
    ]
  },

  // ─── PAULINE EPISTLES ───
  {
    id: "romans",
    name: "Romans",
    category: "pauline",
    chapters: 16,
    author: "Paul the Apostle",
    authorInfo: "Paul (originally Saul of Tarsus) was a Pharisee and persecutor of the church who dramatically encountered the risen Jesus on the road to Damascus. He became the greatest missionary of the early church, planting churches across the Roman Empire. A Roman citizen, trained under the renowned rabbi Gamaliel, Paul was uniquely equipped to bridge the Jewish and Gentile worlds.",
    date: "AD 57",
    dateMid: 57,
    writtenFrom: "Corinth",
    writtenFromCoords: [385, 285],
    audience: "Christians in Rome",
    audienceDesc: "A mixed community of Jewish and Gentile believers in the capital of the Empire — a church Paul had not yet visited but longed to see.",
    purpose: "To present a comprehensive explanation of the Gospel: how God's righteousness is revealed through faith in Christ, available to all people equally, and what that means for daily life.",
    historicalContext: "Paul wrote Romans during his third missionary journey while staying in Corinth, preparing to visit Rome on his way to Spain. The Roman church likely began when Jewish believers returned from Pentecost (Acts 2). When Emperor Claudius expelled Jews from Rome in AD 49, the church became predominantly Gentile. When Jews returned after Claudius' death (AD 54), tensions arose between the two groups. Paul addressed the theological foundations that should unite them.",
    keyThemes: ["Justification by Faith", "Grace", "Law and Gospel", "Jew and Gentile Unity", "Sanctification", "God's Sovereignty", "Practical Christian Living"],
    keyVerse: { text: "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes: first to the Jew, then to the Gentile.", ref: "Romans 1:16" },
    outline: [
      { title: "The Human Condition", ref: "Ch. 1–3", desc: "All have sinned — Gentile and Jew alike" },
      { title: "Justification by Faith", ref: "Ch. 4–5", desc: "Abraham's example, peace with God" },
      { title: "Sanctification", ref: "Ch. 6–8", desc: "Freedom from sin, life in the Spirit" },
      { title: "Israel's Place in God's Plan", ref: "Ch. 9–11", desc: "God's faithfulness to Israel" },
      { title: "Practical Christian Living", ref: "Ch. 12–15", desc: "Living sacrifices, love, unity" },
      { title: "Personal Greetings", ref: "Ch. 16", desc: "Commendations and final words" }
    ],
    connections: ["Galatians", "Hebrews", "Genesis"],
    funFacts: [
      "Often called 'the Constitution of Christianity'",
      "Martin Luther's study of Romans sparked the Protestant Reformation",
      "Romans 16 names 26 individuals — more greetings than any other Pauline letter"
    ]
  },
  {
    id: "1corinthians",
    name: "1 Corinthians",
    category: "pauline",
    chapters: 16,
    author: "Paul the Apostle",
    authorInfo: "Paul founded the church in Corinth during his second missionary journey (Acts 18), staying 18 months. He wrote this letter while in Ephesus, having received troubling reports about the church and a letter from them with questions.",
    date: "AD 55",
    dateMid: 55,
    writtenFrom: "Ephesus",
    writtenFromCoords: [430, 265],
    audience: "The church in Corinth",
    audienceDesc: "A troubled but gifted church in one of the most cosmopolitan and morally corrupt cities in the Roman Empire — a major commercial hub connecting east and west.",
    purpose: "To address divisions, immorality, and doctrinal confusion in the Corinthian church, and to answer their questions about marriage, spiritual gifts, worship, and resurrection.",
    historicalContext: "Corinth was a wealthy Roman colony rebuilt by Julius Caesar in 44 BC. It was famous for its commerce, diversity, and moral decadence — the Greek verb 'to corinthianize' meant to practice sexual immorality. The temple of Aphrodite overlooked the city. New believers in this environment struggled to shed their pagan practices and cultural values. The church was fractured by personality cults, lawsuits, and chaotic worship.",
    keyThemes: ["Church Unity", "Wisdom of God vs. World", "Sexual Purity", "Spiritual Gifts", "Love", "Resurrection", "Orderly Worship"],
    keyVerse: { text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", ref: "1 Corinthians 13:4" },
    outline: [
      { title: "Divisions in the Church", ref: "Ch. 1–4", desc: "Factions, wisdom, and apostolic authority" },
      { title: "Moral Issues", ref: "Ch. 5–6", desc: "Sexual immorality, lawsuits" },
      { title: "Marriage and Singleness", ref: "Ch. 7", desc: "Guidance on relationships" },
      { title: "Christian Liberty", ref: "Ch. 8–10", desc: "Food offered to idols, Paul's example" },
      { title: "Worship and Gifts", ref: "Ch. 11–14", desc: "Lord's Supper, spiritual gifts, love chapter" },
      { title: "Resurrection", ref: "Ch. 15–16", desc: "The foundation of Christian hope" }
    ],
    connections: ["2 Corinthians", "Acts 18", "Romans"],
    funFacts: [
      "Chapter 13 (the 'love chapter') is the most-read passage at weddings worldwide",
      "Provides the earliest written account of the Lord's Supper (predating the Gospels)",
      "Corinth had a population of about 100,000 — a major metropolis"
    ]
  },
  {
    id: "2corinthians",
    name: "2 Corinthians",
    category: "pauline",
    chapters: 13,
    author: "Paul the Apostle",
    authorInfo: "Paul wrote this deeply personal letter after a painful visit to Corinth and a severe letter (now lost) that caused grief. Titus brought him good news that the Corinthians had largely responded with repentance, though some opponents remained.",
    date: "AD 55–56",
    dateMid: 56,
    writtenFrom: "Macedonia",
    writtenFromCoords: [370, 250],
    audience: "The church in Corinth",
    audienceDesc: "The same Corinthian church, now mostly reconciled to Paul but still influenced by rival 'super-apostles' who questioned Paul's authority and credentials.",
    purpose: "To express relief at their repentance, defend his apostolic authority against opponents, explain the nature of true Christian ministry, and encourage generous giving.",
    historicalContext: "Between 1 and 2 Corinthians, Paul had made a 'painful visit' to Corinth (2:1) and written a 'severe letter' (2:4). False apostles had infiltrated the church, boasting of their credentials and undermining Paul. This letter reveals Paul at his most vulnerable — sharing his sufferings, weaknesses, and the constant pressures of ministry. It's the most autobiographical of all his letters.",
    keyThemes: ["Strength in Weakness", "New Covenant Ministry", "Comfort in Suffering", "Generosity", "Apostolic Authority", "Reconciliation"],
    keyVerse: { text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'", ref: "2 Corinthians 12:9" },
    outline: [
      { title: "Comfort and Ministry", ref: "Ch. 1–7", desc: "Paul's sufferings, new covenant, reconciliation" },
      { title: "The Collection for Jerusalem", ref: "Ch. 8–9", desc: "Generous giving and the Macedonian example" },
      { title: "Paul's Defense", ref: "Ch. 10–13", desc: "Against the 'super-apostles,' boasting in weakness" }
    ],
    connections: ["1 Corinthians", "Acts 18–20", "Galatians"],
    funFacts: [
      "The most emotionally raw and personal of Paul's letters",
      "Contains the famous 'thorn in the flesh' passage — scholars still debate what it was",
      "Paul's 'fool's speech' (ch. 11–12) is brilliant rhetorical satire"
    ]
  },
  {
    id: "galatians",
    name: "Galatians",
    category: "pauline",
    chapters: 6,
    author: "Paul the Apostle",
    authorInfo: "Paul wrote with urgency and passion to churches he had founded in the region of Galatia (central modern Turkey). This letter reveals Paul at his most forceful — he skips his usual thanksgiving and launches directly into rebuke.",
    date: "AD 49–55",
    dateMid: 50,
    writtenFrom: "Antioch or Ephesus",
    writtenFromCoords: [540, 295],
    audience: "Churches in Galatia",
    audienceDesc: "Gentile believers in the Roman province of Galatia who were being pressured by Jewish-Christian agitators ('Judaizers') to adopt Jewish law, especially circumcision.",
    purpose: "To defend the Gospel of grace against those requiring Gentile believers to follow the Jewish law for salvation, and to call the Galatians back to the freedom they have in Christ.",
    historicalContext: "This may be the earliest of Paul's surviving letters. Shortly after Paul left Galatia, agitators arrived teaching that faith in Christ alone wasn't enough — Gentile believers must also be circumcised and keep the Mosaic Law. This struck at the heart of Paul's Gospel. The issue was so critical it led to the Jerusalem Council (Acts 15). Paul's response was fierce: anyone teaching a different gospel is 'accursed.'",
    keyThemes: ["Justification by Faith Alone", "Freedom in Christ", "Law vs. Grace", "Life in the Spirit", "Paul's Apostolic Authority"],
    keyVerse: { text: "It is for freedom that Christ has set us free. Stand firm, then, and do not let yourselves be burdened again by a yoke of slavery.", ref: "Galatians 5:1" },
    outline: [
      { title: "Paul's Authority", ref: "Ch. 1–2", desc: "Defense of his calling and Gospel" },
      { title: "Faith vs. Law", ref: "Ch. 3–4", desc: "Abraham, the purpose of the Law, adoption" },
      { title: "Freedom in Practice", ref: "Ch. 5–6", desc: "Life by the Spirit, fruit of the Spirit" }
    ],
    connections: ["Romans", "Acts 15", "Genesis"],
    funFacts: [
      "Called the 'Magna Carta of Christian liberty'",
      "Martin Luther considered it his favorite epistle and wrote extensively on it",
      "Paul ends with unusually large handwriting — possibly due to an eye condition"
    ]
  },
  {
    id: "ephesians",
    name: "Ephesians",
    category: "pauline",
    chapters: 6,
    author: "Paul the Apostle",
    authorInfo: "Paul spent nearly 3 years in Ephesus (Acts 19–20), longer than any other city. He wrote this letter from prison in Rome. Some scholars note the letter's general tone and suggest it may have been a circular letter to multiple churches in the region.",
    date: "AD 60–62",
    dateMid: 61,
    writtenFrom: "Rome (prison)",
    writtenFromCoords: [270, 245],
    audience: "Christians in Ephesus and surrounding region",
    audienceDesc: "Believers in the major city of Ephesus — the fourth largest city in the Roman Empire, famous for the Temple of Artemis (one of the Seven Wonders) and a center of pagan worship and magic.",
    purpose: "To set forth God's eternal purpose to create one new humanity in Christ — uniting Jew and Gentile in the Church — and to describe how believers should live in light of this cosmic plan.",
    historicalContext: "Ephesus was the commercial and religious capital of the Roman province of Asia. The Temple of Artemis dominated the city's economy and culture. When Paul preached there, it caused a riot among the silversmiths (Acts 19). Writing from prison, Paul lifts his readers' eyes from their daily struggles to see God's grand cosmic plan unfolding through the Church.",
    keyThemes: ["God's Eternal Plan", "Unity of Jew and Gentile", "The Church as Christ's Body", "Spiritual Blessings", "New Life in Christ", "Spiritual Warfare"],
    keyVerse: { text: "For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast.", ref: "Ephesians 2:8–9" },
    outline: [
      { title: "God's Eternal Purpose", ref: "Ch. 1–3", desc: "Spiritual blessings, saved by grace, Jew-Gentile unity" },
      { title: "Living Worthy of the Calling", ref: "Ch. 4–6", desc: "Unity, new self, relationships, armor of God" }
    ],
    connections: ["Colossians", "Acts 19–20", "Romans"],
    funFacts: [
      "Contains the longest sentence in the Greek New Testament (Eph 1:3–14 — 202 words in Greek)",
      "The 'Armor of God' passage (ch. 6) may reflect the Roman soldier chained to Paul",
      "Shares about 75 of its 155 verses with Colossians"
    ]
  },
  {
    id: "philippians",
    name: "Philippians",
    category: "pauline",
    chapters: 4,
    author: "Paul the Apostle",
    authorInfo: "Paul had a deeply affectionate relationship with the Philippian church — his first European congregation, founded around AD 50 (Acts 16). They supported him financially when no other church did, and sent Epaphroditus to care for him in prison.",
    date: "AD 61–62",
    dateMid: 62,
    writtenFrom: "Rome (prison)",
    writtenFromCoords: [270, 245],
    audience: "The church in Philippi",
    audienceDesc: "A predominantly Gentile church in the Roman colony of Philippi in Macedonia (northern Greece), Paul's first church plant in Europe.",
    purpose: "To thank the Philippians for their gift, update them on his situation, encourage unity and joy regardless of circumstances, and warn against false teachers.",
    historicalContext: "Philippi was a Roman colony — a miniature Rome — proud of its Roman identity. Many residents were retired Roman soldiers. The church began with Lydia (a businesswoman), a slave girl, and a jailer (Acts 16). Paul writes from Roman imprisonment, possibly facing death, yet the letter overflows with joy. His circumstances — chains, opposition, uncertainty — make his joy all the more remarkable.",
    keyThemes: ["Joy in All Circumstances", "Humility (Christ's Example)", "Partnership in the Gospel", "Contentment", "Pressing Toward the Goal"],
    keyVerse: { text: "I can do all this through him who gives me strength.", ref: "Philippians 4:13" },
    outline: [
      { title: "Thanksgiving and Joy in Chains", ref: "Ch. 1", desc: "Paul's circumstances and confidence" },
      { title: "The Mind of Christ", ref: "Ch. 2", desc: "The great Christ hymn, humility" },
      { title: "Pressing Forward", ref: "Ch. 3", desc: "Paul's testimony, knowing Christ" },
      { title: "Rejoice and Be Content", ref: "Ch. 4", desc: "Practical joy, gratitude for partnership" }
    ],
    connections: ["Acts 16", "Philemon", "2 Timothy"],
    funFacts: [
      "The word 'joy' or 'rejoice' appears 16 times — remarkable for a prison letter",
      "Contains one of the earliest Christian hymns (2:6–11)",
      "Paul and Silas first came to Philippi and were thrown in jail — then planted a church"
    ]
  },
  {
    id: "colossians",
    name: "Colossians",
    category: "pauline",
    chapters: 4,
    author: "Paul the Apostle",
    authorInfo: "Paul had never visited Colossae — the church was founded by Epaphras, a convert from Paul's Ephesus ministry (1:7). Paul wrote from prison after Epaphras brought concerning news about false teaching infiltrating the young church.",
    date: "AD 60–62",
    dateMid: 61,
    writtenFrom: "Rome (prison)",
    writtenFromCoords: [270, 245],
    audience: "The church in Colossae",
    audienceDesc: "Believers in the small Phrygian city of Colossae in the Lycus Valley (modern Turkey), threatened by a syncretistic heresy blending Jewish, pagan, and proto-Gnostic elements.",
    purpose: "To combat the 'Colossian heresy' by exalting Christ as supreme over all creation and fully sufficient for salvation — no additional rituals, philosophies, or spiritual intermediaries needed.",
    historicalContext: "Colossae was once a major city but had declined by Paul's day, overshadowed by nearby Laodicea and Hierapolis. A dangerous false teaching had emerged — likely a mix of Jewish legalism (food laws, sabbaths), Greek philosophy, angel worship, and mystical visions. This 'heresy' diminished Christ by placing him as one of many spiritual beings. Paul's response: Christ is supreme over everything.",
    keyThemes: ["Supremacy of Christ", "Fullness in Christ", "Freedom from Legalism", "New Life", "Christ Over All Powers"],
    keyVerse: { text: "For in Christ all the fullness of the Deity lives in bodily form, and in Christ you have been brought to fullness.", ref: "Colossians 2:9–10" },
    outline: [
      { title: "The Supremacy of Christ", ref: "Ch. 1", desc: "Christ hymn, Paul's ministry" },
      { title: "Freedom in Christ", ref: "Ch. 2", desc: "Against false teaching, complete in Christ" },
      { title: "New Life in Christ", ref: "Ch. 3–4", desc: "Practical holiness, relationships, greetings" }
    ],
    connections: ["Ephesians", "Philemon", "Revelation 3 (Laodicea)"],
    funFacts: [
      "Colossae is the smallest, least important city to receive a Pauline letter",
      "Tychicus carried this letter along with Ephesians and Philemon simultaneously",
      "The city was destroyed by an earthquake around AD 60–64 and never fully rebuilt"
    ]
  },
  {
    id: "1thessalonians",
    name: "1 Thessalonians",
    category: "pauline",
    chapters: 5,
    author: "Paul the Apostle",
    authorInfo: "Paul, along with Silas and Timothy, founded the Thessalonian church during his second missionary journey (Acts 17). He was forced to leave after only a few weeks due to violent opposition, and he worried constantly about the young believers' faith.",
    date: "AD 50–51",
    dateMid: 51,
    writtenFrom: "Corinth",
    writtenFromCoords: [385, 285],
    audience: "The church in Thessalonica",
    audienceDesc: "New believers (mostly Gentile converts) in the capital city of the Roman province of Macedonia, who were enduring persecution and had questions about the return of Christ.",
    purpose: "To encourage persecuted believers, commend their faith, correct misunderstandings about the Second Coming of Christ, and urge holy living.",
    historicalContext: "Thessalonica was a major port city and the capital of Macedonia, located on the Via Egnatia — the main Roman highway connecting East and West. Paul was driven out by a mob (Acts 17:1–10) and couldn't return. He sent Timothy to check on them and was overjoyed by the good report. However, some believers had died and the church was confused — had they missed the Lord's return?",
    keyThemes: ["The Second Coming", "Hope and Encouragement", "Holy Living", "Faith Under Persecution", "Brotherly Love"],
    keyVerse: { text: "For the Lord himself will come down from heaven, with a loud command, with the voice of the archangel and with the trumpet call of God, and the dead in Christ will rise first.", ref: "1 Thessalonians 4:16" },
    outline: [
      { title: "Thanksgiving for Their Faith", ref: "Ch. 1", desc: "Their conversion and example" },
      { title: "Paul's Ministry Among Them", ref: "Ch. 2", desc: "Remembering their time together" },
      { title: "Timothy's Report", ref: "Ch. 3", desc: "Joy at their perseverance" },
      { title: "Living to Please God", ref: "Ch. 4:1–12", desc: "Holiness and love" },
      { title: "The Lord's Coming", ref: "Ch. 4:13–5:28", desc: "Hope for the dead in Christ, readiness" }
    ],
    connections: ["2 Thessalonians", "Acts 17", "Philippians"],
    funFacts: [
      "Likely the earliest surviving letter of Paul — possibly the oldest New Testament document",
      "Paul mentions prayer and thanksgiving more here than in any other letter proportionally",
      "The Thessalonian converts 'turned from idols to serve the living God' — mostly former pagans"
    ]
  },
  {
    id: "2thessalonians",
    name: "2 Thessalonians",
    category: "pauline",
    chapters: 3,
    author: "Paul the Apostle",
    authorInfo: "Paul wrote this follow-up letter shortly after the first, addressing ongoing confusion about the Day of the Lord that his first letter may have intensified.",
    date: "AD 51–52",
    dateMid: 51,
    writtenFrom: "Corinth",
    writtenFromCoords: [385, 285],
    audience: "The church in Thessalonica",
    audienceDesc: "The same young Thessalonian church, still under persecution and now troubled by claims that the Day of the Lord had already come.",
    purpose: "To correct the false notion that the Day of the Lord had already arrived, encourage continued faithfulness under persecution, and address idleness among some members.",
    historicalContext: "Someone had apparently taught (possibly through a forged letter claiming to be from Paul) that the Day of the Lord had already come. This caused alarm and led some to stop working, perhaps reasoning that if the end was here, why bother? Paul wrote to calm their fears with specific teaching about events that must precede the Lord's return.",
    keyThemes: ["The Day of the Lord", "Perseverance Under Persecution", "The Man of Lawlessness", "Faithfulness and Discipline", "Working While Waiting"],
    keyVerse: { text: "So then, brothers and sisters, stand firm and hold fast to the teachings we passed on to you, whether by word of mouth or by letter.", ref: "2 Thessalonians 2:15" },
    outline: [
      { title: "Encouragement in Persecution", ref: "Ch. 1", desc: "God's righteous judgment" },
      { title: "The Day of the Lord", ref: "Ch. 2", desc: "The man of lawlessness, stand firm" },
      { title: "Warning Against Idleness", ref: "Ch. 3", desc: "Work and discipline" }
    ],
    connections: ["1 Thessalonians", "Daniel", "Revelation"],
    funFacts: [
      "One of the shortest Pauline letters at just 47 verses",
      "Paul signs in his own hand to prevent forgeries (3:17)",
      "The 'man of lawlessness' passage has generated centuries of interpretation"
    ]
  },
  {
    id: "1timothy",
    name: "1 Timothy",
    category: "pauline",
    chapters: 6,
    author: "Paul the Apostle",
    authorInfo: "Paul considered Timothy his true 'son in the faith.' Timothy's mother was Jewish and his father Greek. He joined Paul on his second missionary journey and became Paul's most trusted delegate, sent to handle difficult situations in churches.",
    date: "AD 62–66",
    dateMid: 64,
    writtenFrom: "Macedonia",
    writtenFromCoords: [370, 250],
    audience: "Timothy in Ephesus",
    audienceDesc: "Paul's young protégé Timothy, who was leading the church in Ephesus — one of the most important and challenging church assignments in the ancient world.",
    purpose: "To give Timothy practical instructions for organizing and leading the church, confronting false teachers, and setting an example of godly leadership despite his youth.",
    historicalContext: "After Paul's first Roman imprisonment (Acts 28), he apparently resumed traveling and left Timothy in charge at Ephesus. The Ephesian church faced false teachers promoting myths, genealogies, and ascetic practices. Timothy, naturally timid and possibly dealing with stomach ailments (5:23), needed Paul's authoritative backing and practical guidance for leading a large, complex urban church.",
    keyThemes: ["Church Leadership", "Sound Doctrine", "Godliness", "Fighting the Good Fight", "Care for the Vulnerable", "Faithfulness"],
    keyVerse: { text: "Don't let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity.", ref: "1 Timothy 4:12" },
    outline: [
      { title: "Charge Against False Teachers", ref: "Ch. 1", desc: "Sound doctrine and Paul's testimony" },
      { title: "Instructions for Worship", ref: "Ch. 2", desc: "Prayer and conduct" },
      { title: "Qualifications for Leaders", ref: "Ch. 3", desc: "Overseers and deacons" },
      { title: "Combating False Teaching", ref: "Ch. 4", desc: "Train in godliness" },
      { title: "Church Administration", ref: "Ch. 5–6", desc: "Widows, elders, wealth, final charge" }
    ],
    connections: ["2 Timothy", "Titus", "Acts 16"],
    funFacts: [
      "One of the 'Pastoral Epistles' — Paul's leadership manual for young pastors",
      "Gives the most detailed description of church leadership qualifications in the NT",
      "Timothy was likely in his mid-30s, considered quite young for such responsibility"
    ]
  },
  {
    id: "2timothy",
    name: "2 Timothy",
    category: "pauline",
    chapters: 4,
    author: "Paul the Apostle",
    authorInfo: "Paul wrote this final letter from a cold Roman prison cell, likely in the Mamertine dungeon, knowing execution was imminent. He had been abandoned by most of his companions. This is Paul's last will and testament to his beloved protégé.",
    date: "AD 66–67",
    dateMid: 67,
    writtenFrom: "Rome (prison)",
    writtenFromCoords: [270, 245],
    audience: "Timothy",
    audienceDesc: "Timothy, still in Ephesus, receiving what would be Paul's final letter — a deeply personal farewell from his spiritual father.",
    purpose: "To pass the baton of ministry to the next generation, urging Timothy to remain faithful to the Gospel, endure hardship, and guard the truth in an increasingly hostile world.",
    historicalContext: "Paul's situation had changed dramatically from his first imprisonment. Nero's persecution intensified after the Great Fire of Rome (AD 64). Christians were executed in gruesome ways. Paul was now in a cold dungeon (not the relative comfort of house arrest), abandoned by Demas and others. He knew his death was near ('the time of my departure has come') and wrote with urgency to ensure the Gospel would continue.",
    keyThemes: ["Endurance", "Guarding the Gospel", "Passing the Baton", "Scripture's Authority", "Courage in Suffering", "Finishing Well"],
    keyVerse: { text: "I have fought the good fight, I have finished the race, I have kept the faith.", ref: "2 Timothy 4:7" },
    outline: [
      { title: "Fan the Flame", ref: "Ch. 1", desc: "Courage, not timidity; guard the deposit" },
      { title: "A Good Soldier", ref: "Ch. 2", desc: "Endurance, approved workman, flee youthful lusts" },
      { title: "The Last Days", ref: "Ch. 3", desc: "Difficult times ahead, Scripture's power" },
      { title: "Paul's Final Charge", ref: "Ch. 4", desc: "Preach the Word, Paul's farewell" }
    ],
    connections: ["1 Timothy", "Titus", "Acts 28"],
    funFacts: [
      "The last letter Paul ever wrote — his spiritual 'last words'",
      "Paul asks Timothy to bring his cloak and scrolls — a poignant personal detail",
      "Contains the famous passage on Scripture being 'God-breathed' (3:16)"
    ]
  },
  {
    id: "titus",
    name: "Titus",
    category: "pauline",
    chapters: 3,
    author: "Paul the Apostle",
    authorInfo: "Paul called Titus 'my true son in our common faith.' Titus was a Greek (uncircumcised) believer who served as Paul's troubleshooter — sent to handle the messy situation in Corinth (2 Cor 7–8) and then left on Crete to organize the churches there.",
    date: "AD 63–65",
    dateMid: 64,
    writtenFrom: "Macedonia or Nicopolis",
    writtenFromCoords: [350, 260],
    audience: "Titus on Crete",
    audienceDesc: "Titus, serving as Paul's representative to organize and appoint leaders in the fledgling churches across the island of Crete.",
    purpose: "To guide Titus in appointing qualified elders, confronting false teachers, and teaching sound doctrine that transforms behavior on the culturally challenging island of Crete.",
    historicalContext: "Crete was a large Mediterranean island with a reputation for dishonesty and laziness — Paul even quotes a Cretan poet/prophet: 'Cretans are always liars, evil brutes, lazy gluttons' (1:12). The churches there were young and needed strong leadership. Paul had apparently visited Crete after his first Roman imprisonment and left Titus to complete the organizational work.",
    keyThemes: ["Sound Doctrine and Godly Living", "Church Leadership", "Grace as Teacher", "Good Works", "Self-Control"],
    keyVerse: { text: "For the grace of God has appeared that offers salvation to all people. It teaches us to say 'No' to ungodliness and worldly passions, and to live self-controlled, upright and godly lives.", ref: "Titus 2:11–12" },
    outline: [
      { title: "Appointing Elders", ref: "Ch. 1", desc: "Qualifications, opposing false teachers" },
      { title: "Sound Teaching for All Groups", ref: "Ch. 2", desc: "Older and younger, grace that teaches" },
      { title: "Doing What Is Good", ref: "Ch. 3", desc: "Christian conduct, avoiding division" }
    ],
    connections: ["1 Timothy", "2 Timothy", "Acts 27 (Crete)"],
    funFacts: [
      "One of the three 'Pastoral Epistles' along with 1–2 Timothy",
      "Paul's quote about Cretans (1:12) is from the poet Epimenides",
      "Contains one of the most concise summaries of the Gospel in the NT (3:4–7)"
    ]
  },
  {
    id: "philemon",
    name: "Philemon",
    category: "pauline",
    chapters: 1,
    author: "Paul the Apostle",
    authorInfo: "Paul wrote this brief, deeply personal letter from prison in Rome. It's essentially a private letter of appeal, making it unique among Paul's writings — not theology or church instruction, but a real-world test of Christian love.",
    date: "AD 60–62",
    dateMid: 61,
    writtenFrom: "Rome (prison)",
    writtenFromCoords: [270, 245],
    audience: "Philemon",
    audienceDesc: "Philemon, a wealthy Christian in Colossae whose house served as a meeting place for the church. He was converted through Paul's ministry.",
    purpose: "To appeal to Philemon to receive back his runaway slave Onesimus — not as a slave but as a beloved brother in Christ — demonstrating how the Gospel transforms social relationships.",
    historicalContext: "Onesimus was a slave who had apparently run away from Philemon (possibly stealing something in the process) and ended up in Rome, where he encountered Paul in prison and became a Christian. Paul sends him back with this letter — a masterpiece of persuasion that doesn't directly demand Onesimus' freedom but makes anything less than full acceptance unthinkable. In the Roman Empire, runaway slaves could face severe punishment or death.",
    keyThemes: ["Forgiveness and Reconciliation", "Christian Brotherhood", "The Gospel's Social Impact", "Love Over Authority", "Freedom in Christ"],
    keyVerse: { text: "Perhaps the reason he was separated from you for a little while was that you might have him back forever — no longer as a slave, but better than a slave, as a dear brother.", ref: "Philemon 15–16" },
    outline: [
      { title: "Greeting and Thanksgiving", ref: "v. 1–7", desc: "Philemon's love and faith" },
      { title: "Paul's Appeal for Onesimus", ref: "v. 8–21", desc: "Receive him as a brother" },
      { title: "Closing and Plans", ref: "v. 22–25", desc: "Paul hopes to visit" }
    ],
    connections: ["Colossians", "Ephesians"],
    funFacts: [
      "The shortest of Paul's letters — just 25 verses",
      "Onesimus' name means 'useful' — Paul makes a play on words (v. 11)",
      "A masterclass in persuasion — Paul never directly commands but makes refusal impossible"
    ]
  },

  // ─── GENERAL EPISTLES ───
  {
    id: "hebrews",
    name: "Hebrews",
    category: "general",
    chapters: 13,
    author: "Unknown",
    authorInfo: "The author of Hebrews is one of the New Testament's great mysteries. Suggestions include Paul, Barnabas, Apollos, Priscilla, and Luke, but none is certain. Origen (3rd century) wrote: 'Who actually wrote the epistle, only God knows.' The author was clearly a brilliant theologian, a skilled writer of literary Greek, and deeply versed in the Old Testament and Jewish worship.",
    date: "AD 60–69",
    dateMid: 65,
    writtenFrom: "Unknown (possibly Rome or Alexandria)",
    writtenFromCoords: [270, 245],
    audience: "Jewish Christians",
    audienceDesc: "Second-generation Jewish believers who were tempted to abandon their faith in Christ and return to Judaism, possibly due to persecution or the appeal of the temple system.",
    purpose: "To demonstrate the absolute superiority of Christ and the new covenant over the old covenant system — Jesus is better than the angels, Moses, the priesthood, the tabernacle, and the sacrifices.",
    historicalContext: "These Jewish Christians were under pressure. Some scholars place the letter just before the destruction of the Temple in AD 70, when returning to Judaism might have seemed safer than facing Roman persecution as Christians. The magnificent temple system with its rituals, priesthood, and sacrifices was tangible and ancient. The author argues passionately that Christ fulfills and surpasses everything the old system pointed to.",
    keyThemes: ["Christ's Superiority", "Faith", "The New Covenant", "Perseverance", "Rest", "The Heavenly Tabernacle", "Warning Against Falling Away"],
    keyVerse: { text: "Now faith is confidence in what we hope for and assurance about what we do not see.", ref: "Hebrews 11:1" },
    outline: [
      { title: "Christ Superior to Angels", ref: "Ch. 1–2", desc: "God's final word through his Son" },
      { title: "Christ Superior to Moses", ref: "Ch. 3–4", desc: "The promise of rest" },
      { title: "Christ the Great High Priest", ref: "Ch. 5–7", desc: "After the order of Melchizedek" },
      { title: "The Superior Covenant", ref: "Ch. 8–10", desc: "New covenant, better sacrifice" },
      { title: "The Hall of Faith", ref: "Ch. 11", desc: "Heroes of faith through the ages" },
      { title: "Endurance and Final Exhortations", ref: "Ch. 12–13", desc: "Run the race, practical instructions" }
    ],
    connections: ["Leviticus", "Psalms", "Romans", "Galatians"],
    funFacts: [
      "Chapter 11 is known as the 'Hall of Faith' — one of the most beloved passages in the Bible",
      "Uses the word 'better' (kreitton) 13 times to describe what Christ offers",
      "Written in some of the most polished literary Greek in the New Testament"
    ]
  },
  {
    id: "james",
    name: "James",
    category: "general",
    chapters: 5,
    author: "James (brother of Jesus)",
    authorInfo: "James was Jesus' half-brother — he grew up with Jesus but didn't believe in him during Jesus' earthly ministry (John 7:5). After seeing the risen Christ (1 Cor 15:7), James became a believer and eventually the leader of the Jerusalem church (Acts 15). He was known as 'James the Just' for his devout piety — tradition says his knees were calloused like a camel's from constant prayer.",
    date: "AD 45–49",
    dateMid: 47,
    writtenFrom: "Jerusalem",
    writtenFromCoords: [490, 325],
    audience: "Jewish Christians in the Diaspora",
    audienceDesc: "The 'twelve tribes scattered among the nations' — Jewish believers dispersed outside Palestine, facing economic hardship, social discrimination, and the temptation to live faith without works.",
    purpose: "To challenge believers to live out their faith practically — genuine faith produces good works, controls the tongue, cares for the poor, and endures trials with patience.",
    historicalContext: "This may be the earliest New Testament book. James wrote to Jewish Christians scattered after the persecution following Stephen's death (Acts 8). These believers faced poverty, oppression by wealthy landowners, and the temptation to show favoritism to the rich. James writes with prophetic fire, echoing Jesus' Sermon on the Mount more than any other New Testament book.",
    keyThemes: ["Faith and Works", "Wisdom", "Trials and Perseverance", "Taming the Tongue", "Care for the Poor", "Prayer"],
    keyVerse: { text: "Faith by itself, if it is not accompanied by action, is dead.", ref: "James 2:17" },
    outline: [
      { title: "Trials and Temptation", ref: "Ch. 1", desc: "Joy in trials, hearing and doing" },
      { title: "Faith and Favoritism", ref: "Ch. 2", desc: "No partiality, faith without works is dead" },
      { title: "Taming the Tongue", ref: "Ch. 3", desc: "The power of words, true wisdom" },
      { title: "Humility and Patience", ref: "Ch. 4–5", desc: "Submit to God, prayer of faith" }
    ],
    connections: ["Matthew 5–7 (Sermon on the Mount)", "Proverbs", "1 Peter"],
    funFacts: [
      "Possibly the earliest written book of the New Testament",
      "Reads more like Old Testament wisdom literature than a typical epistle",
      "Martin Luther initially called it 'an epistle of straw' (he later softened his view)"
    ]
  },
  {
    id: "1peter",
    name: "1 Peter",
    category: "general",
    chapters: 5,
    author: "Peter the Apostle",
    authorInfo: "Simon Peter was a Galilean fisherman, the first disciple called by Jesus, and the leader of the twelve apostles. Despite his famous denial of Jesus, Peter was restored and became the rock upon which the early church was built. Bold and impetuous by nature, he was transformed by the Holy Spirit at Pentecost into the church's primary spokesman. He wrote with the help of Silvanus (Silas).",
    date: "AD 62–64",
    dateMid: 63,
    writtenFrom: "Rome ('Babylon')",
    writtenFromCoords: [270, 245],
    audience: "Believers in Asia Minor",
    audienceDesc: "Christians scattered across five Roman provinces in Asia Minor (modern Turkey) — Pontus, Galatia, Cappadocia, Asia, and Bithynia — facing increasing social hostility.",
    purpose: "To encourage believers to stand firm in their faith during suffering and to live holy, distinctive lives that testify to the grace of God before a watching world.",
    historicalContext: "These Christians were experiencing social persecution — slander, discrimination, economic hardship — as their new faith set them apart from pagan society. Refusing to participate in emperor worship, pagan festivals, and the social drinking culture made them outcasts. Peter wrote from 'Babylon' (likely a code name for Rome) as Nero's persecution was beginning to intensify.",
    keyThemes: ["Hope in Suffering", "Living as Exiles", "Holiness", "Submission and Witness", "The Grace of God", "Christ's Example"],
    keyVerse: { text: "But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect.", ref: "1 Peter 3:15" },
    outline: [
      { title: "Living Hope", ref: "Ch. 1", desc: "Born again to a living hope" },
      { title: "The People of God", ref: "Ch. 2", desc: "Living stones, submission" },
      { title: "Suffering for Doing Good", ref: "Ch. 3", desc: "Following Christ's example" },
      { title: "Living for God", ref: "Ch. 4", desc: "Judgment begins at God's household" },
      { title: "Shepherd the Flock", ref: "Ch. 5", desc: "To elders, humility, standing firm" }
    ],
    connections: ["2 Peter", "Mark", "Romans"],
    funFacts: [
      "Peter uses 'Babylon' as a code word for Rome — a common practice in early Christianity",
      "Contains an early Christian hymn or creed about Christ's suffering (2:21–25)",
      "Peter, who once denied Christ to avoid suffering, now teaches how to suffer well"
    ]
  },
  {
    id: "2peter",
    name: "2 Peter",
    category: "general",
    chapters: 3,
    author: "Peter the Apostle",
    authorInfo: "Peter wrote this as his farewell letter, knowing his death was imminent ('I will soon put aside this tent,' 1:14). Jesus had predicted Peter would die a martyr (John 21:18–19). Tradition says Peter was crucified upside down in Rome under Nero, considering himself unworthy to die in the same manner as his Lord.",
    date: "AD 64–68",
    dateMid: 66,
    writtenFrom: "Rome",
    writtenFromCoords: [270, 245],
    audience: "Same recipients as 1 Peter",
    audienceDesc: "The same churches in Asia Minor, now facing a new threat: false teachers within the church who distorted the faith and denied the Lord's return.",
    purpose: "To warn against false teachers and scoffers, encourage growth in the knowledge of Christ, and reaffirm the certainty of Christ's return despite the delay.",
    historicalContext: "By the mid-60s, the promised return of Christ seemed delayed, and false teachers exploited this uncertainty. These teachers denied future judgment, promoted moral licentiousness, and distorted Paul's letters. Peter, facing his own death, wrote urgently to safeguard the next generation's faith against these threats.",
    keyThemes: ["True vs. False Knowledge", "False Teachers", "The Day of the Lord", "Spiritual Growth", "God's Patience", "Scripture's Authority"],
    keyVerse: { text: "The Lord is not slow in keeping his promise, as some understand slowness. Instead he is patient with you, not wanting anyone to perish, but everyone to come to repentance.", ref: "2 Peter 3:9" },
    outline: [
      { title: "Growing in Faith", ref: "Ch. 1", desc: "Add to your faith, Peter's testament" },
      { title: "Warning Against False Teachers", ref: "Ch. 2", desc: "Their character and judgment" },
      { title: "The Day of the Lord", ref: "Ch. 3", desc: "Scoffers, God's patience, new heavens" }
    ],
    connections: ["1 Peter", "Jude", "Paul's Letters"],
    funFacts: [
      "Shares significant material with the book of Jude (chapter 2 ≈ Jude)",
      "One of Peter's last acts was to commend Paul's writings as Scripture (3:15–16)",
      "The most questioned book in terms of Petrine authorship — debated since antiquity"
    ]
  },
  {
    id: "1john",
    name: "1 John",
    category: "general",
    chapters: 5,
    author: "John the Apostle",
    authorInfo: "The same John who wrote the Gospel, now an elderly pastor in Ephesus — likely the last living apostle. He writes with the tenderness of a spiritual father ('dear children') and the authority of one who walked with Jesus personally.",
    date: "AD 85–95",
    dateMid: 90,
    writtenFrom: "Ephesus",
    writtenFromCoords: [430, 265],
    audience: "Churches in Asia Minor",
    audienceDesc: "Believers in John's network of churches dealing with a split caused by false teachers who denied Christ's true humanity and lived without moral concern.",
    purpose: "To combat early Gnostic-like heresies by affirming that Jesus truly came in the flesh, that genuine faith produces love and obedience, and to assure believers of their salvation.",
    historicalContext: "A group of false teachers had recently left John's churches (2:19), causing confusion and doubt. These teachers held proto-Gnostic views: spirit is good, matter is evil, so Jesus couldn't have truly become flesh. This also led to moral indifference — if the body doesn't matter, sin doesn't matter. John wrote to reassure the faithful and provide clear tests of authentic Christianity.",
    keyThemes: ["God is Love", "Fellowship and Assurance", "Light vs. Darkness", "Truth vs. Error", "Jesus Came in the Flesh", "Obedience"],
    keyVerse: { text: "Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God.", ref: "1 John 4:7" },
    outline: [
      { title: "Walking in the Light", ref: "Ch. 1–2", desc: "Fellowship, confession, obedience, antichrists" },
      { title: "Children of God", ref: "Ch. 3", desc: "Love one another, confidence before God" },
      { title: "Testing the Spirits", ref: "Ch. 4", desc: "God is love, love casts out fear" },
      { title: "Faith That Overcomes", ref: "Ch. 5", desc: "Assurance, victory, eternal life" }
    ],
    connections: ["John (Gospel)", "2 John", "3 John"],
    funFacts: [
      "Uses the word 'love' (agape) about 46 times in just 5 chapters",
      "Lacks the typical letter format — no greeting, no named author, no farewell",
      "Tradition says the aged John was carried to church meetings and would simply say, 'Little children, love one another'"
    ]
  },
  {
    id: "2john",
    name: "2 John",
    category: "general",
    chapters: 1,
    author: "John the Apostle",
    authorInfo: "John identifies himself as 'the elder' — a term of affection and authority used by the aging apostle. This is a brief, personal note on the same themes as 1 John.",
    date: "AD 85–95",
    dateMid: 90,
    writtenFrom: "Ephesus",
    writtenFromCoords: [430, 265],
    audience: "'The chosen lady and her children'",
    audienceDesc: "Either a specific Christian woman and her family, or (more likely) a personification of a local church and its members — a 'sister church' to John's community.",
    purpose: "To urge the community to continue in love and truth, and to warn against showing hospitality to false teachers who deny Christ's incarnation.",
    historicalContext: "In the ancient world, traveling teachers depended on the hospitality of local churches. This created a vulnerability — false teachers could gain a platform simply by being hosted. John warns that welcoming those who deny Christ's incarnation amounts to participating in their deception. This brief letter shows the practical side of the theological battle described in 1 John.",
    keyThemes: ["Truth and Love", "Walking in Obedience", "Guarding Against Deception"],
    keyVerse: { text: "And this is love: that we walk in obedience to his commands. As you have heard from the beginning, his command is that you walk in love.", ref: "2 John 6" },
    outline: [
      { title: "Greeting and Joy", ref: "v. 1–4", desc: "Walking in truth" },
      { title: "Love and Obedience", ref: "v. 5–6", desc: "The old-new commandment" },
      { title: "Warning About Deceivers", ref: "v. 7–11", desc: "Don't welcome false teachers" },
      { title: "Closing", ref: "v. 12–13", desc: "Hope to visit soon" }
    ],
    connections: ["1 John", "3 John", "John (Gospel)"],
    funFacts: [
      "The shortest book in the Bible by verse count (13 verses)",
      "Could fit on a single sheet of papyrus — the standard letter size of the day",
      "One of the least quoted books in the New Testament"
    ]
  },
  {
    id: "3john",
    name: "3 John",
    category: "general",
    chapters: 1,
    author: "John the Apostle",
    authorInfo: "Again writing as 'the elder,' John addresses a specific individual — Gaius — about a leadership conflict in one of his churches. This is the most personal of John's letters.",
    date: "AD 85–95",
    dateMid: 90,
    writtenFrom: "Ephesus",
    writtenFromCoords: [430, 265],
    audience: "Gaius",
    audienceDesc: "A beloved individual named Gaius who was faithfully supporting traveling missionaries, in contrast to a man named Diotrephes who was rejecting them.",
    purpose: "To commend Gaius for his hospitality to traveling missionaries, condemn the domineering behavior of Diotrephes, and recommend Demetrius as trustworthy.",
    historicalContext: "This tiny letter gives us a candid glimpse into early church politics. Diotrephes had apparently seized control of a church, rejecting John's authority and refusing to welcome traveling missionaries. He was even expelling those who did. John contrasts him with Gaius (hospitable and faithful) and Demetrius (a man of good reputation). It reveals that even apostolic churches dealt with power struggles.",
    keyThemes: ["Hospitality", "Truth-Walking", "Good vs. Evil Leadership", "Supporting Missionaries"],
    keyVerse: { text: "Dear friend, do not imitate what is evil but what is good. Anyone who does what is good is from God. Anyone who does what is evil has not seen God.", ref: "3 John 11" },
    outline: [
      { title: "Commendation of Gaius", ref: "v. 1–8", desc: "Walking in truth, supporting missionaries" },
      { title: "Condemnation of Diotrephes", ref: "v. 9–10", desc: "Power-hungry and unwelcoming" },
      { title: "Commendation of Demetrius", ref: "v. 11–14", desc: "A good example" }
    ],
    connections: ["2 John", "1 John"],
    funFacts: [
      "The shortest book in the Bible by word count",
      "Gives us the name of a 'villain' (Diotrephes) — rare in the NT",
      "A glimpse into the everyday administrative challenges of the early church"
    ]
  },
  {
    id: "jude",
    name: "Jude",
    category: "general",
    chapters: 1,
    author: "Jude (brother of Jesus)",
    authorInfo: "Jude (Judas) was another half-brother of Jesus and brother of James (the church leader). Like James, he didn't believe during Jesus' earthly ministry but became a believer after the resurrection. He humbly identifies himself as 'a servant of Jesus Christ and brother of James' rather than claiming the title 'brother of the Lord.'",
    date: "AD 65–80",
    dateMid: 68,
    writtenFrom: "Unknown (possibly Jerusalem)",
    writtenFromCoords: [490, 325],
    audience: "General Christian audience",
    audienceDesc: "Believers being infiltrated by false teachers who were distorting grace as a license for immorality.",
    purpose: "To urgently warn believers against false teachers who had secretly infiltrated the church, and to exhort them to contend earnestly for the faith once delivered to the saints.",
    historicalContext: "Jude originally planned to write about salvation but felt compelled to address an urgent crisis: false teachers had 'slipped in unnoticed' and were perverting grace into moral license. These teachers claimed spiritual authority while living immoral lives. Jude's fiery response draws on Old Testament examples, Jewish tradition, and even non-canonical writings to expose and condemn them.",
    keyThemes: ["Contending for the Faith", "False Teachers Exposed", "God's Judgment", "Perseverance", "God's Keeping Power"],
    keyVerse: { text: "To him who is able to keep you from stumbling and to present you before his glorious presence without fault and with great joy — to the only God our Savior be glory.", ref: "Jude 24–25" },
    outline: [
      { title: "Greeting and Purpose", ref: "v. 1–4", desc: "Contend for the faith" },
      { title: "Warning Examples", ref: "v. 5–16", desc: "OT examples, characteristics of false teachers" },
      { title: "Exhortation and Doxology", ref: "v. 17–25", desc: "Build yourselves up, magnificent closing" }
    ],
    connections: ["2 Peter", "James"],
    funFacts: [
      "Quotes from the non-canonical Book of Enoch (v. 14–15)",
      "References a tradition about Michael disputing with the devil over Moses' body",
      "Contains one of the most beautiful doxologies (closing praises) in the Bible"
    ]
  },

  // ─── PROPHECY ───
  {
    id: "revelation",
    name: "Revelation",
    category: "prophecy",
    chapters: 22,
    author: "John the Apostle",
    authorInfo: "The same John who wrote the Gospel and epistles, now an elderly exile on the island of Patmos. Under Emperor Domitian's persecution, John was banished to this small, rocky island in the Aegean Sea — used by Rome as a penal colony. There, on 'the Lord's day,' he received this extraordinary vision.",
    date: "AD 94–96",
    dateMid: 95,
    writtenFrom: "Island of Patmos",
    writtenFromCoords: [420, 270],
    audience: "Seven churches in Asia Minor",
    audienceDesc: "Seven specific churches in the Roman province of Asia (modern western Turkey): Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, and Laodicea — and through them, the universal Church.",
    purpose: "To reveal Jesus Christ in glory, encourage persecuted believers with the certainty of God's ultimate victory, and call the churches to faithfulness in the face of Roman imperial worship.",
    historicalContext: "Emperor Domitian (AD 81–96) demanded to be worshiped as 'Lord and God' (Dominus et Deus). Refusal meant economic exclusion, imprisonment, or death. The seven churches each faced unique pressures: Smyrna and Philadelphia endured poverty and persecution; Pergamum dwelt where 'Satan's throne' was (likely the great altar of Zeus); Laodicea was lukewarm in its wealth. John's apocalyptic visions assured believers that despite appearances, God is sovereign and Christ will triumph over all earthly powers.",
    keyThemes: ["Christ's Victory", "God's Sovereignty", "Worship", "Judgment and Justice", "The New Creation", "Faithfulness Under Persecution", "The Lamb"],
    keyVerse: { text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.", ref: "Revelation 21:4" },
    outline: [
      { title: "Vision of Christ", ref: "Ch. 1", desc: "John's commission, Christ among the lampstands" },
      { title: "Letters to Seven Churches", ref: "Ch. 2–3", desc: "Praise, warning, and promises to each" },
      { title: "The Throne Room", ref: "Ch. 4–5", desc: "Heavenly worship, the Lamb and the scroll" },
      { title: "Seals, Trumpets, and Signs", ref: "Ch. 6–14", desc: "Judgments unfold, the great conflict" },
      { title: "Bowls of Wrath", ref: "Ch. 15–16", desc: "Final judgments" },
      { title: "Fall of Babylon", ref: "Ch. 17–18", desc: "Judgment on the world system" },
      { title: "Christ's Return and New Creation", ref: "Ch. 19–22", desc: "Victory, new heaven and earth, eternal city" }
    ],
    connections: ["Daniel", "Ezekiel", "John (Gospel)", "1 John"],
    funFacts: [
      "Contains about 500 allusions to the Old Testament — more than any other NT book",
      "The only New Testament book that is primarily apocalyptic literature",
      "Pronounces a blessing on those who read it aloud (1:3) — the only NT book to do so"
    ]
  }
];

// ─── MAP CITIES DATA ───
const MAP_CITIES = [
  { name: "Jerusalem", x: 490, y: 325, books: ["James", "Jude"] },
  { name: "Antioch", x: 540, y: 295, books: ["Matthew", "Galatians"] },
  { name: "Rome", x: 270, y: 245, books: ["Mark", "Acts", "Ephesians", "Philippians", "Colossians", "2 Timothy", "Philemon", "Hebrews", "1 Peter", "2 Peter"] },
  { name: "Corinth", x: 385, y: 285, books: ["Romans", "1 Thessalonians", "2 Thessalonians"] },
  { name: "Ephesus", x: 430, y: 265, books: ["1 Corinthians", "John", "1 John", "2 John", "3 John"] },
  { name: "Caesarea", x: 470, y: 310, books: ["Luke"] },
  { name: "Macedonia", x: 370, y: 250, books: ["2 Corinthians", "1 Timothy"] },
  { name: "Nicopolis", x: 350, y: 260, books: ["Titus"] },
  { name: "Patmos", x: 420, y: 270, books: ["Revelation"] }
];

// ─── TIMELINE ERAS ───
const TIMELINE_ERAS = [
  { label: "AD 45–55 · The Earliest Writings", startYear: 45, endYear: 55 },
  { label: "AD 55–65 · Paul's Major Letters", startYear: 55, endYear: 65 },
  { label: "AD 60–68 · Prison Letters & Final Words", startYear: 60, endYear: 68 },
  { label: "AD 85–96 · John's Later Writings", startYear: 85, endYear: 96 }
];
