const { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  StringSelectMenuBuilder, 
  EmbedBuilder, 
  Events 
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ]
});

// ================== CATEGORY CONFIG ==================
const CATEGORY_CONFIG = {
  gender: { title: "✅ Gender", description: "Choose your gender identity! 🌈", color: 0xFF69B4, emoji: "⚧️", placeholder: "Select your gender..." },
  pronoun: { title: "✅ Pronouns", description: "How should we address you? 💬", color: 0x7289DA, emoji: "🗣️", placeholder: "Select your pronouns..." },
  sexuality: { title: "✅ Sexuality", description: "Show your true colors! 🌈", color: 0x9B59B6, emoji: "❤️‍🔥", placeholder: "Select your sexuality..." },
  status: { title: "💘 Relationship Status", description: "What's your current romantic situation?", color: 0xE91E63, emoji: "💕", placeholder: "Select your status..." },
  looking: { title: "👀 Looking For", description: "What are you seeking here?", color: 0xFEE75C, emoji: "🔍", placeholder: "Select your preference..." },
  dm: { title: "💌 DM Status", description: "Set your DM preferences", color: 0xFFB6C1, emoji: "✉️", placeholder: "Select DM policy..." },
  location: { title: "🌍 Location", description: "Where are you from?", color: 0x00FFFF, emoji: "📍", placeholder: "Select your region..." },
  age: { title: "🎂 Age", description: "Select your age group", color: 0x00BB2D, emoji: "🎂", placeholder: "Choose your age..." }
};

// ================== ROLE DATA ==================
const ROLE_DATA = {
  gender: [
    { label: "🚹 Male", value: "1407056899203141634" },
    { label: "🚺 Female", value: "1407056901853679737" },
    { label: "⚧️ Trans", value: "1407056904399753388" },
    { label: "🌈 Non-Binary", value: "1407056906140520589" },
    { label: "❓ Other", value: "1407056908761829378" }
  ],
  pronoun: [
    { label: "👨 He/Him", value: "1407056809482522644" },
    { label: "👩 She/Her", value: "1407056812515266612" },
    { label: "🌀 They/Them", value: "1407056814737985638" },
    { label: "🔥 Any", value: "1407056817015619635" },
    { label: "❓ Other", value: "1407056818768711854" }
  ],
  sexuality: [
    { label: "❤️‍🔥 Straight", value: "1407056908761829378" },
    { label: "🌈 Gay", value: "1407056913539272805" },
    { label: "💜 Bi", value: "1407056915632095284" },
    { label: "💖 Pan", value: "1407056917469331598" },
    { label: "🖤 Ace", value: "1407056920329850971" },
    { label: "❓ Other", value: "1407056922447843481" }
  ],
  status: [
    { label: "❤️ Taken & Taking", value: "1407056949039861921" },
    { label: "💔 Single & Horny", value: "1407056952370008228" },
    { label: "💕 It's Complicated", value: "1407056957466087435" }
  ],
  looking: [
    { label: "👀 Looking For Fun", value: "1407056960158830683" },
    { label: "😌 Not Looking", value: "1407056963027730653" }
  ],
  dm: [
    { label: "🍑 Slide In For Fun", value: "1407056874528047220" },
    { label: "🔒 Only For Daddy/Mommy", value: "1407056877321453698" },
    { label: "👅 Ask & Maybe I'll Say Yes", value: "1407056879468937376" },
    { label: "💦 Open For Dirty Talk", value: "1407056881687728271" },
    { label: "🚫 Don't Even Try", value: "1407056884577468578" }
  ],
  location: [
    { label: "🌎 North America", value: "1407056925165879298" },
    { label: "🌍 Europe", value: "1407056928097439837" },
    { label: "🌏 Asia", value: "1407056930886914190" },
    { label: "🐘 Africa", value: "1407056934460199007" },
    { label: "🐨 Oceania", value: "1407056937148878949" },
    { label: "🌎 South America", value: "1407056939443294373" }
  ],
  age: [
    { label: "🎈 13", value: "1407577557217312918" },
    { label: "🎀 14", value: "1407577560287805451" },
    { label: "🌟 15", value: "1407577563085410406" },
    { label: "🌹 16", value: "1407577565169975298" },
    { label: "🔥 17", value: "1407577567573053450" },
    { label: "💎 18+", value: "1407577570001555606" }
  ]
};

// ================== SPICY MESSAGES ==================
const spicyMessages = {
  // Gender
  "1407056899203141634": "🚹 Male? Alpha energy unlocked, king. 👑",
  "1407056901853679737": "🚺 Female? Goddess vibes, everyone bow down. 💃✨",
  "1407056904399753388": "⚧️ Trans? Iconic. Trendsetter. 🌟",
  "1407056906140520589": "🌈 Non-Binary? Breaking limits, serving looks. 💅",
  "1407056908761829378": "❓ Other? Unique as hell, love it. 🔥",

  // Pronouns
  "1407056809482522644": "👨 He/Him? Strong protector vibes 🛡️",
  "1407056812515266612": "👩 She/Her? Pure divine queen energy 👑",
  "1407056814737985638": "🌀 They/Them? Smooth mystery aura 😎",
  "1407056817015619635": "🔥 Any? Absolute chaos energy 😈",
  "1407056818768711854": "❓ Other? Undefined but unstoppable 🚀",

  // Sexuality
  "1407056908761829378": "❤️‍🔥 Straight? Classic player energy 😉",
  "1407056913539272805": "🌈 Gay? Fabulous and flawless 💅",
  "1407056915632095284": "💜 Bi? Double the options, double the trouble 😏",
  "1407056917469331598": "💖 Pan? Everyone's a snack to you 🍭",
  "1407056920329850971": "🖤 Ace? Chillin’ above the chaos 🧘",
  "1407056922447843481": "❓ Other? Too unique to define 🔮",

  // Status
  "1407056949039861921": "❤️ Taken? Someone’s winning the jackpot 🎰",
  "1407056952370008228": "💔 Single & Horny? DMs unlocked, beware 🔥🍑",
  "1407056957466087435": "💕 Complicated? That’s drama fuel 🎭",

  // Looking
  "1407056960158830683": "👀 Looking for fun? Bad decisions await 😏",
  "1407056963027730653": "😌 Not looking? Untouchable zen mode 🌸",

  // DM
  "1407056874528047220": "🍑 Slide in? Open for chaos 💦",
  "1407056877321453698": "🔒 Only VIPs allowed 😏",
  "1407056879468937376": "👅 Ask first? Playing hard to get 😈",
  "1407056881687728271": "💦 Dirty talk only? Wild nights ahead 🌙",
  "1407056884577468578": "🚫 No DMs? Anti-simp shield active 🛡️",

  // Location
  "1407056925165879298": "🌎 North America? Land of dreams 🍔",
  "1407056928097439837": "🌍 Europe? Serving tea and elegance ☕",
  "1407056930886914190": "🌏 Asia? Culture + vibes overload 🐉",
  "1407056934460199007": "🐘 Africa? Roots and royalty 👑",
  "1407056937148878949": "🐨 Oceania? Sun, surf, and chill 🏄",
  "1407056939443294373": "🌎 South America? Passion turned to 100 🔥",

  // Age
  "1407577557217312918": "🎈 13? Baby steps into the chaos 😂",
  "1407577560287805451": "🎀 14? Just getting spicy 🌶️",
  "1407577563085410406": "🌟 15? Teenage madness activated ⚡",
  "1407577565169975298": "🌹 16? Sweet but deadly 🌹",
  "1407577567573053450": "🔥 17? Almost legal, already dangerous 😏",
  "1407577570001555606": "💎 18+? Full chaos license unlocked 🍷"
};

// ================== COMMAND HANDLER ==================
client.on(Events.MessageCreate, async (message) => {
  if (!message.content.startsWith("!rolesel")) return;

  const args = message.content.split(" ");
  const category = args[1]?.toLowerCase();

  if (!ROLE_DATA[category]) {
    return message.reply({
      content: "⚠️ Available categories: gender, pronoun, sexuality, status, looking, dm, location, age"
    }).then(msg => setTimeout(() => msg.delete(), 5000));
  }

  const config = CATEGORY_CONFIG[category];
  const embed = new EmbedBuilder()
    .setColor(config.color)
    .setTitle(`${config.emoji} ${config.title}`)
    .setDescription(config.description);

  const menu = new StringSelectMenuBuilder()
    .setCustomId(category)
    .setPlaceholder(config.placeholder)
    .addOptions(ROLE_DATA[category]);

  await message.channel.send({
    embeds: [embed],
    components: [new ActionRowBuilder().addComponents(menu)]
  });
});

// ================== INTERACTION HANDLER ==================
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  const { customId: category, values: [roleId], member } = interaction;
  const role = interaction.guild.roles.cache.get(roleId);

  if (!role) {
    return interaction.reply({ content: "⚠️ Role not found in this server.", ephemeral: true });
  }

  try {
    await member.roles.remove(ROLE_DATA[category].map(r => r.value));
    await member.roles.add(role);

    const response = spicyMessages[roleId] || `✅ Role updated: ${role.name}`;
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply({ content: response });
    } else {
      await interaction.reply({ content: response, ephemeral: true });
    }
  } catch (err) {
    console.error("Role update error:", err);
    if (!interaction.replied) {
      await interaction.reply({ content: "❌ Failed to update role. Check my permissions!", ephemeral: true });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

